
// Array de objetos con datos
const data = [
    { nombre: "Juan", edad: 30, ocupación: "Ingeniero" },
    { nombre: "María", edad: 25, ocupación: "Diseñadora" },
    { nombre: "Carlos", edad: 35, ocupación: "Profesor" }
];

// Función para exportar a PDF
function exportarAPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Título del documento
    doc.setFontSize(16);
    doc.text("Information Custumers", 10, 10);


    doc.setFontSize(12);
    let y = 20;
    data.forEach((item, index) => {
        doc.text(`${index + 1}. Nombre: ${item.nombre}, Edad: ${item.edad}, Ocupación: ${item.ocupación}`, 10, y);
        y += 10;
    });


    doc.save("datos.pdf");
}
