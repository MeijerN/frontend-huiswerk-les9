// STAPPEN

// div maken in HTML zodat de content in het midden gezet kan worden
// h1 element maken met de titel
// figure element maken waarin de image komt
// section element maken waar de form in komt
// section element maken waar de landinformatie in komt

// functie schrijven die informatie ophaalt van een land (eerst met 1 land beginnen) met een try and catch blok
    // Maak API call
    // Deconstruct de data
    // Maak een card element die de details informatie weergeeft voor het land. Voeg deze toe met innerHTML
    // Schrijf functies voor het bouwen van de custom strings (currencies en languages) en integreer deze met template literals
        // controleer of het land meer dan 1 currency's heeft
        // Zo ja, loop er dan over heen en bouw de p apart op zoals in het voorbeeld
        // Zo nee, maak het p element zoals in het voorbeeld
        // Herhaal deze aanpak voor de languages

// Zet eventlistner op die de user input verzameld en deze aan de hoofd functie meegeeft
// Zorg dat na het zoeken de balk weer leeg is door na het uitvoeren van het try/catch blok het formulier te resetten
// Bij melding 404 een foutmelding bij de zoekbalk dat het land niet bestaat, deze verdwijnt als er een land gevonden is
// Bij een input.lengt van 0 een foutmelding weergeven dat er een waarde ingevuld moet worden

import axios from "axios";

function makeCurrencyString(currencies, capital) {
    if (currencies.length === 1) {
        return `<p>The capital is ${capital} and you can pay with ${currencies[0].name}</p>`
    } else {
        return `<p>The capital is ${capital} and you can pay with ${currencies[0].name} and ${currencies[1].name}</p>`
    }
}

function makeLanguagesString(languages) {
    if (languages.length === 1) {
        return `<p>They speak ${languages[0].name}</p>`
    } else {
        let languagesString = '';
        for (let i = 0; i < languages.length; i++) {
            if (i === 0) {
                languagesString += `${languages[i].name}`;
            } else if (i === (languages.length - 1)) {
                languagesString += ` and ${languages[i].name}`;
            } else {
                languagesString += `, ${languages[i].name}`;
            }
        }
        return `<p>They speak ${languagesString}</p>`
    }
}

async function searchCountry(e) {
    try {
        // Reset error message to '' and if present, clear card content for clean look
        document.getElementById('error').textContent = '';
        if (document.getElementById('card')) {
            const element = document.getElementById('card');
            element.remove();
        }

        // Make API call
        const results = await axios.get(`https://restcountries.com/v2/name/${e}`);

        // Deconstruct response object to filter the right data
        const {name, flags: {png}, subregion, population, capital, currencies, languages} = results.data[0];

        // Get details card element and inject card div with detail information
        const cardElement = document.getElementById('country-details-container');
        cardElement.innerHTML = `
            <div class="card" id="card">
                <h2><img src=${png} alt="country-flag" style="width:35px;height:20px;"> ${name}</h2>
                <hr>
                <p>${name} is situated in ${subregion}. It has a population of ${population} people</p>
                ${makeCurrencyString(currencies, capital)}
                ${makeLanguagesString(languages)}
            </div>
        `
        // Reset form to get empty search field
        document.getElementById('form').reset();

        // Catch errors and inject error's to the page
    } catch (e) {
        if (document.getElementById('search-field').value.length === 0) {
            document.getElementById('error').innerText = 'Vul een waarde in';
        }
        if (e.response.status === 404 && document.getElementById('search-field').value.length !== 0) {
            document.getElementById('error').innerText = 'Geen resultaten gevonden';
        }
        // Reset form to get clean search field
        document.getElementById('form').reset();
        // Print error information to console
        console.error(e);
    }
}

// Event listener collects user input and call's main function
const test = document.getElementById('form');
test.addEventListener('submit', (e) => {
    // Prevents page refresh
    e.preventDefault();

    // Collect user input from search field
    const userInput = document.getElementById('search-field').value;

    // Call main function with user input
    searchCountry(userInput);
})