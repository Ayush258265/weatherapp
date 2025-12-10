const temperaturefield = document.querySelector(".temperature");
const conditionfield = document.querySelector(".condition");
const cityfield = document.querySelector(".cityname");
const timefield = document.querySelector(".time");
const searchfield = document.querySelector(".search_area");
const form = document.querySelector(".search_form");
const weatherIcon = document.querySelector(".weather_icon");

// Prevent numbers in search input
searchfield.addEventListener("input", function (){
    this.value = this.value.replace(/[0-9]/g, "");
});

form.addEventListener("submit", searchforcity);

let target_location = "mumbai";

const fetchresult = async (target_location) => {
    let url = `https://api.weatherapi.com/v1/current.json?key=1a1b081ce330421b852124840253011&q=${target_location}&aqi=no`;

    const response = await fetch(url);
    const data = await response.json();

    console.log(data);

    let city_name = data.location.name;
    let time_zone = data.location.localtime;
    let temp_c = data.current.temp_c;
    let condition_text = data.current.condition.text;
    let icon_url = "https:" + data.current.condition.icon; 

    updateweather(city_name, time_zone, temp_c, condition_text, icon_url);
};

function updateweather(city_name, time_zone, temp_c, condition_text, icon_url) {
    temperaturefield.innerText = temp_c + "°C";
    conditionfield.innerText = condition_text;
    cityfield.innerText = city_name;
    timefield.innerText = time_zone;
    weatherIcon.src = icon_url; // ✅ Now works correctly
}

function searchforcity(event) {
    event.preventDefault();
    target_location = searchfield.value.trim();

    if (target_location === "") {
        alert("Please enter a valid city name (letters only).");
        return;
    }

    fetchresult(target_location);
}

fetchresult(target_location);
