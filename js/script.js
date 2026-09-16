// 1. Visor de imágenes grandes (Lightbox)
const imagenes = document.querySelectorAll(".pieza img");

if (imagenes.length > 0) {
    imagenes.forEach((imagen) => {
        imagen.addEventListener("click", () => {
            const visor = document.createElement("div");
            visor.classList.add("visor");

            const imagenGrande = document.createElement("img");
            imagenGrande.src = imagen.src;
            imagenGrande.alt = imagen.alt;

            visor.appendChild(imagenGrande);
            document.body.appendChild(visor);

            visor.addEventListener("click", () => {
                visor.remove();
            });
        });
    });
}

// 2. Menú desplegable para móviles
const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector("nav ul");

if (menuToggle && menu) {
    menuToggle.addEventListener("click", () => {
        menu.classList.toggle("menu-abierto");
    });
}

// 3. Animaciones al hacer scroll (Intersection Observer)
const elementosAnimados = document.querySelectorAll(
    ".pieza, .paso, .sobre-mi-imagen, .sobre-mi-contenido, .contacto-info, .contacto-formulario"
);

if (elementosAnimados.length > 0) {
    const observador = new IntersectionObserver((elementos) => {
        elementos.forEach((elemento) => {
            if (elemento.isIntersecting) {
                elemento.target.classList.add("mostrar");
            }
        });
    }, {
        threshold: 0.15
    });

    elementosAnimados.forEach((elemento) => {
        observador.observe(elemento);
    });
}

// 4. Envío de formulario a WhatsApp (Solo en páginas con formulario de contacto)
document.getElementById('form-contacto-multiples').addEventListener('submit', function(e) {
    e.preventDefault();

    const canal = document.getElementById('canal-contacto').value;
    const mensaje = document.getElementById('mensaje-texto').value.trim();

    if (!mensaje) {
        alert('Por favor, escribí un mensaje antes de enviar.');
        return;
    }

    // Configuración de destinos (Reemplazar con los datos reales)
    const NUMERO_WHATSAPP = "5491155888108"; // Número con código de país sin + ni espacios
    const USUARIO_INSTAGRAM = "ceramica_artesanal_jessi"; // Nombre de usuario sin @
    const PAGINA_FACEBOOK = "Jessica Romero";   // Nombre de usuario o ID de la página de FB

    if (canal === 'whatsapp') {
        const urlWhatsApp = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
        window.open(urlWhatsApp, '_blank');

    } else if (canal === 'instagram') {
        navigator.clipboard.writeText(mensaje).then(() => {
            alert('¡Tu mensaje fue copiado al portapapeles! Abril el chat de Instagram y pegalo.');
            window.open(`https://instagram.com/${USUARIO_INSTAGRAM}`, '_blank');
        }).catch(() => {
            window.open(`https://instagram.com/${USUARIO_INSTAGRAM}`, '_blank');
        });

    } else if (canal === 'facebook') {
        navigator.clipboard.writeText(mensaje).then(() => {
            alert('¡Tu mensaje fue copiado al portapapeles! Abril el chat de Facebook y pegalo.');
            window.open(`https://m.me/${PAGINA_FACEBOOK}`, '_blank');
        }).catch(() => {
            window.open(`https://m.me/${PAGINA_FACEBOOK}`, '_blank');
        });
    }
});