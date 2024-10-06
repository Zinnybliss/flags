let allCountries = [];

// Fetch countries and display them
async function fetchCountries() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        allCountries = await response.json();
        displayCountries(allCountries);
    } catch (error) {
        console.error('Error fetching the countries:', error);
    }
}

// Display countries in the grid
function displayCountries(countries) {
    const container = document.getElementById('countries-container');
    container.innerHTML = '';

    countries.forEach(country => {
        const card = document.createElement('div');
        card.className = 'card';
        const flag = country.flags.svg || country.flags.png;

        card.innerHTML = `
            <img src="${flag}" alt="Flag of ${country.name.common}">
            <h2>${country.name.common}</h2>
            <p>Population: ${country.population.toLocaleString()}</p>
            <p>Continent: ${country.region}</p>
        `;

        card.addEventListener('click', () => {
            showCountryDetail(country);
        });

        container.appendChild(card);
    });
}

// Function to filter countries
function filterCountries() {
    const searchInput = document.getElementById('search').value.toLowerCase();
    const continentFilter = document.getElementById('continent-filter').value;

    const filteredCountries = allCountries.filter(country => {
        const matchesName = country.name.common.toLowerCase().includes(searchInput);
        const matchesContinent = continentFilter ? country.region === continentFilter : true;
        return matchesName && matchesContinent;
    });

    displayCountries(filteredCountries);
}

// Display detailed view for a selected country
function showCountryDetail(country) {
    const detailContainer = document.getElementById('country-detail');
    const countriesContainer = document.getElementById('countries-container');
    const detailContent = document.getElementById('detail-content');

    // Hide the countries list and show the detail view
    countriesContainer.classList.add('hidden');
    detailContainer.classList.remove('hidden');

    const flag = country.flags.svg || country.flags.png;
    detailContent.innerHTML = `
        <img src="${flag}" alt="Flag of ${country.name.common}" style="width:200px;">
        <h2>${country.name.common}</h2>
        <p><strong>Native Name:</strong> ${country.name.nativeName ? Object.values(country.name.nativeName)[0].common : 'N/A'}</p>
        <p><strong>Region:</strong> ${country.region}</p>
        <p><strong>Subregion:</strong> ${country.subregion}</p>
        <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
        <p><strong>Top-level domain:</strong> ${country.tld ? country.tld[0] : 'N/A'}</p>
        <p><strong>Currencies:</strong> ${country.currencies ? Object.values(country.currencies).map(c => c.name).join(', ') : 'N/A'}</p>
    `;
}

// Back button functionality to return to the countries list
const backButton = document.getElementById('back-button');
backButton.addEventListener('click', () => {
    const detailContainer = document.getElementById('country-detail');
    const countriesContainer = document.getElementById('countries-container');

    // Hide the detail view and show the countries list
    detailContainer.classList.add('hidden');
    countriesContainer.classList.remove('hidden');
});

// Toggle dark mode
const toggleButton = document.querySelector('.toggle');
toggleButton.addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
    const icon = this.querySelector('i');

    if (document.body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        // icon.textContent = ' Light Mode';
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        // icon.textContent = ' Dark Mode';
    }
});

// Fetch countries on page load
fetchCountries();