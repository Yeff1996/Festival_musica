"user strict";

document.addEventListener("DOMContentLoaded", ()=> {
    iniciarApp();
});

function iniciarApp(){
    fijarHeader();
    crearGaleria();
    scrollNav();
};

function fijarHeader() {
    const barra = document.querySelector(".header");
    const video = document.querySelector(".video");
    const body = document.querySelector("body");

    window.addEventListener("scroll", ()=>{
        if(video.getBoundingClientRect().bottom < 0){
            barra.classList.add("fijo");
            body.classList.add("rellenoPadding");
        } else {
            barra.classList.remove("fijo");
            body.classList.remove("rellenoPadding");
        };
    });
};

function crearGaleria(){
    const galeriaContenedor = document.querySelector(".galeria__imagenes");
    const fragment = document.createDocumentFragment();

    for(let i = 1; i <= 12; i++) {
        const imagenDiv = document.createElement("div");
        imagenDiv.classList.add("galeria__imagen");
        imagenDiv.innerHTML = `
            <picture>
                <source srcset="build/img/thumb/${i}.avif" type="image/avif">
                <source srcset="build/img/thumb/${i}.webp" type="image/webp">
                <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg" alt="imagen galeria">
            </picture>
        `;

        imagenDiv.onclick = ()=> {
            mostrarImagen(i);
        };

        fragment.appendChild(imagenDiv);
    };

    galeriaContenedor.appendChild(fragment);
};

function mostrarImagen(id){
    const body = document.querySelector("body");
    body.classList.add("modal");

    const ventanaModal = document.createElement("div");
    ventanaModal.classList.add("ventanaModal");
    ventanaModal.onclick = ()=> {
        ventanaModal.remove();
        body.classList.remove("modal");
    };

    const imagenDiv = document.createElement("div");
    imagenDiv.classList.add("ventanaModal__imagen");
    imagenDiv.innerHTML = `
        <picture>
            <source srcset="build/img/grande/${id}.avif" type="image/avif">
            <source srcset="build/img/grande/${id}.webp" type="image/webp">
            <img loading="lazy" width="200" height="300" src="build/img/grande/${id}.jpg" alt="imagen galeria">
        </picture>
    `;

    const botonX = document.createElement("button");
    botonX.classList.add("ventanaModal__btn");
    botonX.textContent = "X";

    ventanaModal.appendChild(imagenDiv);
    ventanaModal.appendChild(botonX);

    body.appendChild(ventanaModal);
};

function scrollNav() {
    const enlaces = document.querySelectorAll(".header__enlace");

    enlaces.forEach( enlace => {
        enlace.addEventListener("click", e => {
            e.preventDefault();

            const seccionScroll = e.target.getAttribute("href");
            const seccion = document.querySelector(seccionScroll);
            seccion.scrollIntoView({ behavior: "smooth" });
        });
    });
};