// Update year and last modified date
const yearSpan = document.getElementById("currentyear");
const lastModifiedSpan = document.getElementById("lastModified");

yearSpan.textContent = new Date().getFullYear();
lastModifiedSpan.textContent = document.lastModified;

// Hamburger Menu Functionality
const nav = document.querySelector("nav ul");
const header = document.querySelector("header");
const hamburger = document.createElement("button");
hamburger.textContent = "☰"; // Menu Icon
header.appendChild(hamburger); // Append to header, not before anything

hamburger.addEventListener("click", () => {
    nav.classList.toggle("visible");
    hamburger.textContent = nav.classList.contains("visible") ? "✖" : "☰"; // Switch between menu and close icon
});
