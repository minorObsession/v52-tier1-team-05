// AppointmentsView.js
import { saveAppointmentsToLocalStorage } from '../helpers';
import newAptView from './newAptView';

class AppointmentsView {
  _tableBody;
  _appointmentsPerPage = 5;
  _currentPage = 1;
  _currentFilter = 'all';
  _paginationContainer;

  constructor() {
    this._tableBody = document.querySelector('#appointments-tbody');
    this._paginationContainer = document.querySelector('#pagination-controls');
    this.displayAppointments();
    this._addNavigationEventListeners();
  }

  _addNavigationEventListeners() {
    const filters = [
      { id: 'all-appointments', filter: 'all' },
      { id: 'todays-appointments', filter: 'today' },
      { id: 'next-7-days', filter: 'next7days' },
      { id: 'next-30-days', filter: 'next30days' },
    ];

    filters.forEach(({ id, filter }) => {
      document.getElementById(id).addEventListener('click', () => {
        // If the clicked filter is already active, do nothing
        if (this._currentFilter === filter) return;

        // Remove 'active' class from all elements
        filters.forEach(({ id }) => {
          document.getElementById(id).classList.remove('active');
        });

        // Add 'active' class to the clicked element
        document.getElementById(id).classList.add('active');
        document.getElementById(id).blur();

        // Set the current filter and page, then display appointments
        this._currentFilter = filter;
        this._currentPage = 1; // Reset to page 1 when a new filter is selected
        this.displayAppointments(filter);
      });
    });
  }

  handleModifyButtonClick(appointmentId) {
    const appointment = this._getAppointmentsFromLocalStorage().find(
      appt => appt.id === appointmentId
    );
    if (appointment) {
      this.renderEditForm(appointment); // Pass the appointment with the existing ID
    }
  }

  renderEditForm(appointment) {
    // Open the modal
    newAptView.toggleVisibility(
      document.querySelector('.newAppointmentForm'),
      document.querySelector('.form-overlay')
    );
    newAptView.populateFormWithExistingData(appointment); // Populate the form with existing data
  }

  // Handle modal toggle
  handleToggleModal() {
    const formContainer = document.querySelector('.edit-form-container');
    if (formContainer) {
      formContainer.remove();
    }
  }

  generateMockAppointments() {
    const appointments = [];
    const names = ['John Doe', 'Jane Smith', 'Alice Johnson', 'Bob Brown'];
    const timeslots = [
      '7AM-9AM',
      '9AM-11AM',
      '11AM-1PM',
      '1PM-3PM',
      '3PM-5PM',
      '5PM-7PM',
    ];

    function getRandomDate() {
      const today = new Date();
      const randomizer = Math.random();
      let randomDate;

      if (randomizer < 0.3) {
        // 30% chance for appointments today
        randomDate = new Date(today);
      } else if (randomizer < 0.7) {
        // 40% chance for appointments in the next 7 days
        const daysAhead = Math.floor(Math.random() * 7) + 1;
        randomDate = new Date(today);
        randomDate.setDate(today.getDate() + daysAhead);
      } else {
        // 30% chance for appointments in the next 30 days
        const daysAhead = Math.floor(Math.random() * 30) + 8;
        randomDate = new Date(today);
        randomDate.setDate(today.getDate() + daysAhead);
      }

      const year = randomDate.getFullYear();
      const month = ('0' + (randomDate.getMonth() + 1)).slice(-2);
      const day = ('0' + randomDate.getDate()).slice(-2);
      return `${year}-${month}-${day}`;
    }

    function getRandomTimeslot() {
      const randomIndex = Math.floor(Math.random() * timeslots.length);
      return timeslots[randomIndex];
    }
    //  prettier-ignore
    const validZipCodes = [
      '90001',
      '90002',
      '90003',
      '90004',
      '90005',
      '90006',
      '90007',
      '90008',
      '90009',
      '90010',
      '90011',
      '90012',
      '90013',
      '90014',
      '90015',
      '90016',
      '90017',
      '90018',
      '90019',
      '90020',
      '90021',
      '90022',
      '90023',
      '90024',
      '90025',
      '90026',
      '90027',
      '90028',
      '90029',
      '90030',
      '90031',
      '90032',
      '90033',
      '90034',
      '90035',
      '90036',
      '90037',
      '90038',
      '90039',
      '90040',
      // Add more as needed.
    ];
    for (let i = 0; i < 66; i++) {
      const appointment = {
        fullName: names[Math.floor(Math.random() * names.length)],
        id: Math.random().toString(),
        email: `user${i}@example.com`,
        streetAddress: `${Math.floor(Math.random() * 1000)} ${
          ['S', 'W', 'E', 'N'][Math.floor(Math.random() * 4)]
        } Bentley`,
        zipCode:
          validZipCodes[Math.floor(Math.random() * validZipCodes.length)],
        secondLineAddress: Math.floor(Math.random() * 200) + 1,
        aptDate: getRandomDate(),
        aptTimeslot: getRandomTimeslot(),
        status: 'confirmed',
      };

      appointments.push(appointment);
    }

    saveAppointmentsToLocalStorage(appointments);
    this.displayAppointments();

    return appointments;
  }

  _filterAppointmentsForToday(appointments) {
    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
    return appointments.filter(appt => appt.aptDate === today);
  }

  _filterAppointmentsNext7Days(appointments) {
    const today = new Date();
    const next7Days = new Date(today);
    next7Days.setDate(today.getDate() + 7);

    return appointments.filter(appt => {
      const appointmentDate = new Date(appt.aptDate);
      return appointmentDate >= today && appointmentDate <= next7Days;
    });
  }

  _filterAppointmentsNext30Days(appointments) {
    const today = new Date();
    const next30Days = new Date(today);
    next30Days.setDate(today.getDate() + 30);

    return appointments.filter(appt => {
      const appointmentDate = new Date(appt.aptDate);
      return appointmentDate >= today && appointmentDate <= next30Days;
    });
  }

  _renderPagination(totalNumAppointments) {
    const totalPages = Math.ceil(
      totalNumAppointments / this._appointmentsPerPage
    );
    this._paginationContainer.innerHTML = ''; // Clear existing pagination

    // Create the main container for pagination controls
    const paginationControls = document.createElement('div');
    paginationControls.classList.add('pagination-controls');
    paginationControls.style.display = 'flex';
    paginationControls.style.flexDirection = 'row';

    // Create Prev button
    const prevButton = document.createElement('button');
    prevButton.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#5d5a88" viewBox="0 0 256 256"><path d="M224,88v80a16,16,0,0,1-16,16H128v40a8,8,0,0,1-13.66,5.66l-96-96a8,8,0,0,1,0-11.32l96-96A8,8,0,0,1,128,32V72h80A16,16,0,0,1,224,88Z"></path></svg>';
    prevButton.classList.add('pagination-btn', 'pagination-prev');
    prevButton.disabled = this._currentPage === 1;

    prevButton.addEventListener('click', () => {
      if (this._currentPage > 1) {
        this._currentPage--;
        this.displayAppointments(this._currentFilter); // Pass current filter
      }
    });
    paginationControls.appendChild(prevButton);

    // Create Page buttons
    for (let i = 1; i <= totalPages; i++) {
      const button = document.createElement('button');
      button.textContent = i;
      button.classList.add('pagination-button');
      if (i === this._currentPage) button.classList.add('active');

      button.addEventListener('click', () => {
        this._currentPage = i;
        this.displayAppointments(this._currentFilter); // Pass current filter
      });

      paginationControls.appendChild(button);
    }

    // Create Next button
    const nextButton = document.createElement('button');
    nextButton.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#5d5a88" viewBox="0 0 256 256"><path d="M237.66,133.66l-96,96A8,8,0,0,1,128,224V184H48a16,16,0,0,1-16-16V88A16,16,0,0,1,48,72h80V32a8,8,0,0,1,13.66-5.66l96,96A8,8,0,0,1,237.66,133.66Z"></path></svg>';
    nextButton.classList.add('pagination-btn', 'pagination-next');
    nextButton.disabled = this._currentPage === totalPages;

    nextButton.addEventListener('click', () => {
      if (this._currentPage < totalPages) {
        this._currentPage++;
        this.displayAppointments(this._currentFilter); // Pass current filter
      }
    });
    paginationControls.appendChild(nextButton);

    // Append the pagination buttons container to the main pagination container
    this._paginationContainer.appendChild(paginationControls);

    // Create the page info container
    const paginationInfoContainer = document.createElement('div');
    paginationInfoContainer.classList.add('pagination-info-container');

    // Calculate and display results info (e.g., "Showing 5/55 results")
    const startResult = (this._currentPage - 1) * this._appointmentsPerPage + 1;
    const endResult = Math.min(
      this._currentPage * this._appointmentsPerPage,
      totalNumAppointments
    );

    const paginationInfo = document.createElement('span');
    paginationInfo.classList.add('pagination-info');
    paginationInfo.style.backgroundColor = '#ff9000';
    paginationInfo.style.borderRadius = '20px';
    paginationInfo.style.fontWeight = '800';
    paginationInfo.style.padding = '0.5rem 3rem';

    paginationInfo.textContent = `Showing ${startResult}-${endResult} / ${totalNumAppointments} total results`;
    paginationInfoContainer.appendChild(paginationInfo);

    // Append the pagination info container to the main pagination container
    this._paginationContainer.prepend(paginationInfoContainer);
  }

  displayAppointments(filter = this._currentFilter) {
    let appointments = this._getAppointmentsFromLocalStorage();
    if (
      !appointments ||
      (Array.isArray(appointments) && appointments.length === 0)
    ) {
      appointments = this.generateMockAppointments();
    }

    // Apply the selected filter
    if (filter === 'today') {
      appointments = this._filterAppointmentsForToday(appointments);
    } else if (filter === 'next7days') {
      appointments = this._filterAppointmentsNext7Days(appointments);
    } else if (filter === 'next30days') {
      appointments = this._filterAppointmentsNext30Days(appointments);
    }

    // Calculate paginated results
    const start = (this._currentPage - 1) * this._appointmentsPerPage;
    const end = start + this._appointmentsPerPage;
    const paginatedAppointments = appointments.slice(start, end);

    // Check if there are appointments to display
    if (!appointments || appointments.length === 0) {
      this._tableBody.innerHTML =
        '<tr><td colspan="6">No appointments available</td></tr>';
      this._paginationContainer.style.display = 'none';
      return;
    }

    if (!paginatedAppointments || paginatedAppointments.length === 0) {
      this._tableBody.innerHTML =
        '<tr><td colspan="6">No appointments available for this page</td></tr>';
    } else {
      // Generate table rows
      const rows = paginatedAppointments.map(
        appt => `
        <tr>
          <td>${appt.fullName}</td>
          <td>${appt.streetAddress}</td>
          <td>${appt.aptDate}</td>
          <td>${appt.aptTimeslot}</td>
          <td>${appt.status}</td>
          <td>
<button class="action-button modify-button" data-tooltip="Modify" data-id="${appt.id}">
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#5d5a88" viewBox="0 0 256 256">
    <path d="M227.32,73.37,182.63,28.69a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31l83.67-83.66,3.48,13.9-36.8,36.79a8,8,0,0,0,11.31,11.32l40-40a8,8,0,0,0,2.11-7.6l-6.9-27.61L227.32,96A16,16,0,0,0,227.32,73.37ZM192,108.69,147.32,64l24-24L216,84.69Z"></path>
  </svg>
</button>
<button class="action-button cancel-button" data-tooltip="Cancel" data-id="${appt.id}">
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#5d5a88" viewBox="0 0 256 256"><path d="M224,56a8,8,0,0,1-8,8h-8V208a16,16,0,0,1-16,16H64a16,16,0,0,1-16-16V64H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,56ZM88,32h80a8,8,0,0,0,0-16H88a8,8,0,0,0,0,16Z"></path></svg>
  
</button>
          </td>
        </tr>
      `
      );

      this._tableBody.innerHTML = rows.join('');
    }

    // Render pagination if more than one page of results
    if (appointments.length > this._appointmentsPerPage) {
      this._paginationContainer.style.display = 'flex';
      this._renderPagination(appointments.length);
    } else {
      this._paginationContainer.style.display = 'none';
    }
  }

  _getAppointmentsFromLocalStorage() {
    const appointmentsJSON = localStorage.getItem('appointments');
    return appointmentsJSON ? JSON.parse(appointmentsJSON) : [];
  }

  addHandlerActionButton(handlerFunction) {
    this._tableBody.addEventListener('click', function (e) {
      const button = e.target.closest('.action-button');
      console.log('Clicked element:', e.target);
      console.log('Closest button:', button);

      if (!button) return;

      const appointmentId = button.dataset.id;
      console.log(appointmentId);
      handlerFunction(button, appointmentId);
    });
  }
}

export default new AppointmentsView();
