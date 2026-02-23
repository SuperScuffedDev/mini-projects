import "./styles.css";
import buildMenu from "./menu.js"
import buildAbout from "./about.js"

import homepage_image from "./images/borger.png";

const content_div = document.querySelector("#content");
const nav_buttons = document.querySelectorAll("nav > button")

const buildHome = function() {
    const image = document.createElement("img");
    image.src = homepage_image;
    const h1 = document.createElement("h1");
    h1.textContent = "Good Burger";
    const para = document.createElement("p");
    para.textContent = "Pretty good burgers";
    const para2 = document.createElement("p");
    const para2em = document.createElement("em");
    para2em.textContent = "The burgers here are pretty good.";

    content_div.append(image);
    content_div.append(h1);
    content_div.append(para);
    para2.append(para2em);
    content_div.append(para2);
};

const clearContent = function() {
    content_div.innerHTML = "";
};

buildHome();

const buttonHandler = (event) => {
    clearContent();
    switch (event.target.getAttribute("id")) {
        case "home":
            buildHome();
            break;
        case "menu":
            buildMenu(content_div);
            break;
        case "about":
            buildAbout(content_div);
            break;
    };
};

nav_buttons.forEach(button => {
    button.addEventListener("click", buttonHandler)
})