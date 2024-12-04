// controller.js

import { formatDate, notyf } from './helpers';
import { optimizedValidateAddress } from './databaseUtility.js';

import * as model from './model';

import adminLoginModal from './views/adminLoginModal';
import newAptView from './views/newAptView';

async function controlAppointmentFormSubmit(formData) {
  console.log('controlAppointmentFormSubmit running');
  try {
    // Save form data to localStorage for persistence
    localStorage.setItem('pendingAppointment', JSON.stringify(formData));

    // Show loading spinner or feedback to the user
    newAptView.renderSpinner(
      'Processing your appointment... Feel free to check out the rest of the page in the meantime!'
    );

    // 1) Fetch and validate the address
    const { streetAddress, zipCode } = formData;
    const isValidAddress = await optimizedValidateAddress(
      zipCode,
      streetAddress
    );

    if (!isValidAddress)
      throw new Error(
        'Your address could not be found in our database. Please try again and select a valid address from the suggestions pop-up!'
      );

    // 4) Process form submission (e.g., update database or state)
    model.AppState.addAppointment(formData);

    // 5) Render success message
    notyf.open({
      type: 'success',
      message: `Your appointment is confirmed for ${
        formData.aptTimeslot
      } on ${formatDate(formData.aptDate)} !`,
    });
  } catch (err) {
    notyf.error(`Could not create your appointment. ${err.message}.`);
  } finally {
    newAptView.cancelSpinner(); // Ensure the spinner is stopped in the finally block
    localStorage.removeItem('pendingAppointment');
    newAptView.handleToggleModal(); // Close modal window
  }
}

async function controlAdminLogin() {
  // ! activate form handler

  console.log('function running');
}

async function controlToggleReviews() {
  const slides = document.querySelectorAll('.slide');
  const sliderBtnLeft = document.querySelector('.slider-btn-left');
  const sliderBtnRight = document.querySelector('.slider-btn-right');

  const dots = document.querySelector('.dots');

  // ! SLIDER

  // 0% , 100%, 200%
  let currSlide = 0;
  const maxSlide = slides.length - 1;
  const minSlide = 0;

  slides.forEach((s, i) => (s.style.transform = `translateX(${i * 100}%)`));

  function goToSlide(goTo) {
    currSlide = goTo;
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${(i - goTo) * 100}%)`)
    );
    // activateDot(currSlide);
  }
  goToSlide(0);

  function nextSlide() {
    if (currSlide === maxSlide) goToSlide(0);
    else {
      currSlide++;
      goToSlide(currSlide);
    }
    activateDot(currSlide);
  }

  function prevSlide() {
    if (currSlide === 0) goToSlide(maxSlide);
    else {
      currSlide--;
      goToSlide(currSlide);
    }
    activateDot(currSlide);
  }

  // ! DOTS

  function createDots() {
    slides.forEach((_, i) => {
      const html = `<button class="dot" data-slide="${i}"></button>`;

      dots.insertAdjacentHTML('beforeend', html);
    });
  }
  createDots();

  function activateDot(slide) {
    document.querySelectorAll('.dot').forEach(dot => {
      dot.classList.remove('dot-active');
    });

    document
      .querySelector(`.dot[data-slide="${slide}"]`)
      .classList.add('dot-active');
  }

  activateDot(currSlide);

  dots.addEventListener('click', function (e) {
    e.preventDefault();
    const clickedDot = e.target.closest('.dot');
    if (!clickedDot) return;
    const dotNumber = clickedDot.dataset.slide;
    goToSlide(dotNumber);
    activateDot(dotNumber);
  });

  sliderBtnRight.addEventListener('click', nextSlide);
  sliderBtnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    e.preventDefault();
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
    activateDot(currSlide);
  });
}

controlToggleReviews();

async function init() {
  model.AppState.initializeState();
  // * check for pending requests and finish them
  if (model.AppState.pendingAppointmentObject)
    controlAppointmentFormSubmit(model.AppState.pendingAppointmentObject);
  // * initialize form submit handler
  newAptView.addHandlerSubmitForm(controlAppointmentFormSubmit);
  adminLoginModal.addHandlerSubmitForm(controlAdminLogin);
}

init();

// ! testing sela's table
function loadAppointments() {
  console.log('running loadAppointments');
  const tbody = document.getElementById('appointments-tbody');

  const appointments = model.AppState.appointments;

  console.log(appointments);
  // .then(appointments => {
  //   const tbody = document.getElementById('appointments-tbody');
  //   tbody.innerHTML = ''; // Clear any existing content

  appointments.forEach((appointment, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
          <td>${appointment.fullName}</td>
          <td>${appointment.streetAddress}</td>
          <td>${appointment.aptDate}</td>
          <td>${appointment.aptTimeslot}</td>
          <td>${appointment.status}</td>
          <td>
            <button class="confirm" onclick="confirmAppointment(${index})">Confirm</button>
            <button class="cancel" onclick="cancelAppointment(${index})">Cancel</button>
          </td>
        `;
    tbody.appendChild(row);
  });
}

// Load appointments when the page is loaded
window.onload = loadAppointments;
