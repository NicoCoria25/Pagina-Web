// 1. Visor de imágenes grandes (Lightbox inteligente con navegación)
const imagenes = document.querySelectorAll(".pieza img");

if (imagenes.length > 0) {
    imagenes.forEach((imagen) => {
        imagen.addEventListener("click", (e) => {
            // Si el clic vino de una flechita de la tarjeta, no abre el visor
            if (e.target.classList.contains("carrusel-btn")) return;

            // Detectamos si la imagen pertenece a un carrusel
            const carruselPadre = imagen.closest(".carrusel-imagenes");
            let grupoImagenes = [imagen];
            let indiceActual = 0;

            if (carruselPadre) {
                grupoImagenes = Array.from(carruselPadre.querySelectorAll("img"));
                indiceActual = grupoImagenes.indexOf(imagen);
            }

            // Crear fondo del visor
            const visor = document.createElement("div");
            visor.classList.add("visor");

            // Botón de cerrar
            const btnCerrar = document.createElement("span");
            btnCerrar.classList.add("visor-cerrar");
            btnCerrar.innerHTML = "&times;";
            visor.appendChild(btnCerrar);

            // Imagen en tamaño grande
            const imagenGrande = document.createElement("img");
            imagenGrande.src = grupoImagenes[indiceActual].src;
            imagenGrande.alt = grupoImagenes[indiceActual].alt;
            visor.appendChild(imagenGrande);

            // Si hay más de una imagen en el grupo, agregamos flechas al visor grande
            if (grupoImagenes.length > 1) {
                const btnPrev = document.createElement("button");
                btnPrev.classList.add("visor-btn", "prev");
                btnPrev.innerHTML = "❮";

                const btnNext = document.createElement("button");
                btnNext.classList.add("visor-btn", "next");
                btnNext.innerHTML = "❯";

                visor.appendChild(btnPrev);
                visor.appendChild(btnNext);

                // Eventos de navegación dentro del visor
                btnPrev.addEventListener("click", (eEvt) => {
                    eEvt.stopPropagation();
                    indiceActual = (indiceActual - 1 + grupoImagenes.length) % grupoImagenes.length;
                    imagenGrande.src = grupoImagenes[indiceActual].src;
                    imagenGrande.alt = grupoImagenes[indiceActual].alt;
                });

                btnNext.addEventListener("click", (eEvt) => {
                    eEvt.stopPropagation();
                    indiceActual = (indiceActual + 1) % grupoImagenes.length;
                    imagenGrande.src = grupoImagenes[indiceActual].src;
                    imagenGrande.alt = grupoImagenes[indiceActual].alt;
                });
            }

            document.body.appendChild(visor);

            // Cerrar el visor al hacer clic en el fondo o en la 'X'
            visor.addEventListener("click", (eEvt) => {
                if (eEvt.target === visor || eEvt.target === btnCerrar) {
                    visor.remove();
                }
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
const formContacto = document.getElementById('form-contacto-multiples');

if (formContacto) {
    formContacto.addEventListener('submit', function(e) {
        e.preventDefault();

        const canal = document.getElementById('canal-contacto').value;
        const mensaje = document.getElementById('mensaje-texto').value.trim();

        if (!mensaje) {
            alert('Por favor, escribí un mensaje antes de enviar.');
            return;
        }

        // Configuración de destinos
        const NUMERO_WHATSAPP = "5491155888108"; // Número con código de país sin + ni espacios
        const USUARIO_INSTAGRAM = "ceramica_artesanal_jessi"; // Nombre de usuario sin @
        const PAGINA_FACEBOOK = "Jessica Romero";   // Nombre de usuario o ID de la página de FB

        if (canal === 'whatsapp') {
            const urlWhatsApp = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
            window.open(urlWhatsApp, '_blank');

        } else if (canal === 'instagram') {
            navigator.clipboard.writeText(mensaje).then(() => {
                alert('¡Tu mensaje fue copiado al portapapeles! Abrí el chat de Instagram y pegalo.');
                window.open(`https://instagram.com/${USUARIO_INSTAGRAM}`, '_blank');
            }).catch(() => {
                window.open(`https://instagram.com/${USUARIO_INSTAGRAM}`, '_blank');
            });

        } else if (canal === 'facebook') {
            navigator.clipboard.writeText(mensaje).then(() => {
                alert('¡Tu mensaje fue copiado al portapapeles! Abrí el chat de Facebook y pegalo.');
                window.open(`https://m.me/${PAGINA_FACEBOOK}`, '_blank');
            }).catch(() => {
                window.open(`https://m.me/${PAGINA_FACEBOOK}`, '_blank');
            });
        }
    });
}

// Funcionalidad de flechas para las tarjetas en la galería
const carruseles = document.querySelectorAll(".carrusel-imagenes");

if (carruseles.length > 0) {
    carruseles.forEach((carrusel) => {
        const pista = carrusel.querySelector(".carrusel-pista");
        const btnPrev = carrusel.querySelector(".carrusel-btn.prev");
        const btnNext = carrusel.querySelector(".carrusel-btn.next");

        if (pista && btnPrev && btnNext) {
            btnPrev.addEventListener("click", (e) => {
                e.stopPropagation();
                pista.scrollBy({ left: -pista.clientWidth, behavior: "smooth" });
            });

            btnNext.addEventListener("click", (e) => {
                e.stopPropagation();
                pista.scrollBy({ left: pista.clientWidth, behavior: "smooth" });
            });
        }
    });
}