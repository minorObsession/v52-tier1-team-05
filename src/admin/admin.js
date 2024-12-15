function loadAppointments() {
  fetch('/src/data/appointments.json')
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to fetch appointments: ${response.statusText}`);
      }
      return response.json();
    })
    .then(appointments => {
      const tbody = document.getElementById('appointments-tbody');
      tbody.innerHTML = ''; // Clear any existing content

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
    })
    .catch(error => console.error('Error loading appointments:', error));
}

// Confirm an appointment
function confirmAppointment(index) {
  alert(`Appointment ${index + 1} confirmed!`);
  // Logic to update status could go here
}

// Cancel an appointment
function cancelAppointment(index) {
  alert(`Appointment ${index + 1} canceled!`);
  // Logic to update status could go here
}

//export to PDF
function exportTableToPDF() {
  const element = document.getElementById('appointments-table');

  const options = {
    margin: 1,
    filename: 'appointments.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 4 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'landscape' }
  };


  html2pdf().from(element).set(options).save();
}






document.getElementById('download-pdf').addEventListener('click', exportTableToPDF);

// Load appointments when the page is loaded
window.onload = loadAppointments;
