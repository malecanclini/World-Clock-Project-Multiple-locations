function updateTime() {
  // --- Ciudad 1: Los Angeles ---
  let losAngelesElement = document.querySelector("#los-angeles");
  if (losAngelesElement) {
    let losAngelesDateElement = losAngelesElement.querySelector(".date");
    let losAngelesTimeElement = losAngelesElement.querySelector(".time");
    let losAngelesTime = moment().tz("America/Los_Angeles");

    losAngelesDateElement.innerHTML = losAngelesTime.format("MMMM Do YYYY");
    losAngelesTimeElement.innerHTML = losAngelesTime.format(
      "h:mm:ss [<small>]A[</small>]"
    );
  }

  // --- Ciudad 2: Paris ---
  let parisElement = document.querySelector("#paris");
  if (parisElement) {
    let parisDateElement = parisElement.querySelector(".date");
    let parisTimeElement = parisElement.querySelector(".time");
    let parisTime = moment().tz("Europe/Paris");

    parisDateElement.innerHTML = parisTime.format("MMMM Do YYYY");
    parisTimeElement.innerHTML = parisTime.format(
      "h:mm:ss [<small>]A[</small>]"
    );
  }
}

function updateCity(event) {
  let cityTimeZone = event.target.value;

  // Bono 2: Detectar ubicación actual si se elige esa opción
  if (cityTimeZone === "current") {
    cityTimeZone = moment.tz.guess();
  }

  // Si no hay zona horaria seleccionada, no hacer nada
  if (!cityTimeZone) return;

  // Formatear el nombre de la ciudad para que se vea bien (ej: de "America/New_York" a "New York")
  let cityName = cityTimeZone.replace("_", " ").split("/")[1];
  let cityTime = moment().tz(cityTimeZone);
  let citiesElement = document.querySelector("#cities");

  // Inyectar la nueva ciudad y el BOTÓN de retorno (Bono 1)
  citiesElement.innerHTML = `
  <div class="city">
    <div>
      <h2>${cityName}</h2>
      <div class="date">${cityTime.format("MMMM Do YYYY")}</div>
    </div>
    <div class="time">${cityTime.format("h:mm:ss")} <small>${cityTime.format(
    "A"
  )}</small></div>
  </div>
  <a href="/" class="back-link">All cities</a>
  `;
}

// Ejecutar la función de tiempo una vez al cargar
updateTime();

// Configurar el intervalo para que el segundero se mueva cada segundo
setInterval(updateTime, 1000);

// Escuchar cambios en el selector de ciudades
let citiesSelectElement = document.querySelector("#city");
citiesSelectElement.addEventListener("change", updateCity);
