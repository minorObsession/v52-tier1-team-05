// Array de objetos con datos
const data = [
    {
        nombre: "Juan",
        edad: 30,
        "ocupaci\xf3n": "Ingeniero"
    },
    {
        nombre: "Mar\xeda",
        edad: 25,
        "ocupaci\xf3n": "Dise\xf1adora"
    },
    {
        nombre: "Carlos",
        edad: 35,
        "ocupaci\xf3n": "Profesor"
    }
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
    data.forEach((item, index)=>{
        doc.text(`${index + 1}. Nombre: ${item.nombre}, Edad: ${item.edad}, Ocupaci\xf3n: ${item.ocupaci\u00f3n}`, 10, y);
        y += 10;
    });
    doc.save("datos.pdf");
}

//# sourceMappingURL=index.23ed6023.js.map
