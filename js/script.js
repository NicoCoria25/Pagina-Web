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
const formulario = document.querySelector("#formulario-contacto");
const enlaceWhatsApp = document.querySelector(".contacto-enlace");

if (formulario && enlaceWhatsApp) {
    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault();

        const nombre = document.querySelector("#nombre").value.trim();
        const correo = document.querySelector("#correo").value.trim();
        const mensaje = document.querySelector("#mensaje").value.trim();

        const texto = `Hola, soy ${nombre}.\nMi correo es: ${correo}.\n\nConsulta:\n${mensaje}`;

        const urlWhatsApp = new URL(enlaceWhatsApp.href);
        urlWhatsApp.searchParams.set("text", texto);

        window.open(urlWhatsApp.href, "_blank");

        formulario.reset();
    });
}