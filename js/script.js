const imagenes = document.querySelectorAll(".pieza img");

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

const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector("nav ul");

menuToggle.addEventListener("click", () => {
    menu.classList.toggle("menu-abierto");
});

const elementosAnimados = document.querySelectorAll(
    ".pieza, .paso, .sobre-mi-imagen, .sobre-mi-contenido, .contacto-info, .contacto-formulario"
);

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

const formulario = document.querySelector("#formulario-contacto");
const enlaceWhatsApp = document.querySelector(".contacto-enlace");

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nombre = document.querySelector("#nombre").value.trim();
    const correo = document.querySelector("#correo").value.trim();
    const mensaje = document.querySelector("#mensaje").value.trim();

    const texto = `Hola, soy ${nombre}.
Mi correo es: ${correo}.

Consulta:
${mensaje}`;

    const urlWhatsApp = new URL(enlaceWhatsApp.href);
    urlWhatsApp.searchParams.set("text", texto);

    window.open(urlWhatsApp.href, "_blank");

    formulario.reset();
});