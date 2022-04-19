// STAPPEN
// **** Eerst de stappen doorlopen voor 1 land, daarna ombouwen naar functies ****
// Installeer en importeer Axios
// Schrijf functie met Axios die de data binnenhaalt van alle landen
// Bekijk de hoe je bij de juiste data kan komen

// Containers en vaste elementen in HTML maken
// H1 titel maken
// Afbeelding van de wereld maken
// <li> element aanmaken in onderste container en 1 naam van het land weergeven
// Zorg dat populatie string eronder weergegeven wordt
// Maak aparte functie die regionaam verwacht en een correct naam-kleur returned (denk aan maken van CSS classes)

import axios from "axios";

async function fetchCountries(e) {
    try {
        // fetch countries array and filter data
        const result = await axios.get("https://restcountries.com/v2/all");
        const countriesArray = result.data

        // sort countries on population low -> high
        countriesArray.sort((a, b) => {
            return a.population - b.population;
        });

        // get reference to countries element
        const getCountriesListElement = document.getElementById("countries-list");

        countriesArray.map((country) => {
            const countryColor = getCountryColor(country.region);
            getCountriesListElement.innerHTML += `
                    <li>                       
                        <p class=${countryColor} id="country-name" >
                            <img src="${country.flags.png}" id="list-image" style="width:35px;height:20px;" alt="country-flag">  ${country.name}
                        <p/>
                        <p>Has a population of ${country.population} people<p/>                     
                    </li>
                    `;
        })
    } catch {
        console.error(e);
    }
}

function getCountryColor(region) {
    switch (region) {
        case "Africa":
            return "blue";
        case "Americas":
            return "green";
        case "Asia":
            return "red";
        case "Europe":
            return "yellow";
        case "Oceania":
            return "purple";
    }
}

fetchCountries()

