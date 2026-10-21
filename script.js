// Variables globales para almacenar el Blob principal y el Blob recortado
let miBlob = null;
let blobCortado = null;

const btnCrear = document.getElementById('btnCrear');
const btnDescargar = document.getElementById('btnDescargar');
const btnSlice = document.getElementById('btnSlice');
const divResultado = document.getElementById('resultado');

// 1. Crear Blob de texto
btnCrear.addEventListener('click', () => {
    const contenidoTexto = "Hola! Este es un archivo de texto creado dinámicamente utilizando el concepto de Blob en JavaScript para el Trabajo Práctico N°4.";
    
    // Creación del Blob especificando el contenido en un array y sus opciones de tipo MIME
    miBlob = new Blob([contenidoTexto], { type: 'text/plain;charset=utf-8' });

    // Mostrar información visual en el contenedor
    divResultado.style.display = 'block';
    divResultado.textContent = `[ÉXITO] Blob creado correctamente.\nTamaño total: ${miBlob.size} bytes\nTipo MIME: ${miBlob.type}\nContenido: "${contenidoTexto}"`;

    // Habilitar los siguientes botones de acción
    btnDescargar.disabled = false;
    btnSlice.disabled = false;
});

// 2. Descargar el Blob creado
btnDescargar.addEventListener('click', () => {
    if (!miBlob) return;

    // Generar una URL temporal en memoria que apunta al Blob
    const url = URL.createObjectURL(miBlob);
    
    // Crear un elemento <a> temporal y oculto para forzar la descarga del navegador
    const enlace = document.createElement('a');
    enlace.href = url;
    enlace.download = 'archivo_blob.txt';
    
    document.body.appendChild(enlace);
    enlace.click();
    
    // Limpieza posterior eliminando el enlace y revocando la URL temporal
    document.body.removeChild(enlace);
    URL.revokeObjectURL(url);
});

// 3. Utilizar el concepto de Slice (recortar el Blob)
btnSlice.addEventListener('click', () => {
    if (!miBlob) return;

    // Utilizar el método .slice() para extraer una porción del Blob (desde el byte 0 al 30)
    blobCortado = miBlob.slice(0, 30, 'text/plain');

    // Leer el fragmento del Blob cortado mediante FileReader para mostrar su contenido por pantalla
    const lector = new FileReader();
    lector.onload = function(e) {
        divResultado.textContent += `\n\n--- Uso de slice() ---\nFragmento extraído (bytes 0 a 30):\n"${e.target.result}..."\nTamaño del nuevo fragmento: ${blobCortado.size} bytes`;
    };
    lector.readAsText(blobCortado);
});