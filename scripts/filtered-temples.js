const yearSpan = document.getElementById("currentyear");
const lastModifiedSpan = document.getElementById("lastModified");

yearSpan.textContent = new Date().getFullYear();
lastModifiedSpan.textContent = document.lastModified;


const nav = document.querySelector("nav ul");
const header = document.querySelector("header");
const hamburger = document.createElement("button");
hamburger.textContent = "☰"; 
header.appendChild(hamburger); 

hamburger.addEventListener("click", () => {
    nav.classList.toggle("visible");
    hamburger.textContent = nav.classList.contains("visible") ? "✖" : "☰"; 
});

const temples = [
    {
        name: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        image:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
      },
      {
        name: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        image:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
      },
      {
        name: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        image:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
      },
      {
        name: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        image:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
      },
      {
        name: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        image:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
      },
      {
        name: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        image:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
      },
      {
        name: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        image:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
      },
    
  ];
  
function displayTemples(templesToDisplay) {
    const gallery = document.querySelector(".temple-gallery");
    gallery.innerHTML = ""; 
  
    templesToDisplay.forEach((temple) => {
      const templeCard = `
        <figure>
          <img src="${temple.image}" alt="${temple.name}" loading="lazy">
          <figcaption>
            <h3>${temple.name}</h3>
            <p>Location: ${temple.location}</p>
            <p>Dedicated: ${temple.dedicated}</p>
            <p>Area: ${temple.area} sq ft</p>
          </figcaption>
        </figure>`;
      gallery.innerHTML += templeCard;
    });
  }
  displayTemples(temples);

  document.querySelector("nav").addEventListener("click", (event) => {
    if (event.target.tagName === "A") {
      event.preventDefault();
  
      const filter = event.target.textContent;
      let filteredTemples;
  
      switch (filter) {
        case "Old":
          filteredTemples = temples.filter((temple) => new Date(temple.dedicated).getFullYear() < 1900);
          break;
        case "New":
          filteredTemples = temples.filter((temple) => new Date(temple.dedicated).getFullYear() > 2000);
          break;
        case "Large":
          filteredTemples = temples.filter((temple) => temple.area > 90000);
          break;
        case "Small":
          filteredTemples = temples.filter((temple) => temple.area < 10000);
          break;
        default:
          filteredTemples = temples; 
          break;
      }
  
      displayTemples(filteredTemples);
    }
  });
  