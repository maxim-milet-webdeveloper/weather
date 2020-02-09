const placesAutocomplete = places({
    appId: 'plY28X00R200',
    apiKey: 'd14c911d078e3c193a4d69f44c7fe68a',
    container: document.querySelector('#address-input')
});

placesAutocomplete.on('change', async ({suggestion}) => {
    const long = suggestion.latlng.lng;
    const lat = suggestion.latlng.lat;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=6ac0c76ff8474276fd2cfdda8bf2593d`;
    const response = await fetch(url);
    const json = await response.json();
    updateUi(json);
});

function getUiElements() {
    return ({
        weatherResults : document.querySelector('.weather-results'),
        weatherMain : document.querySelector('#weather-main'),
        weatherDesc : document.querySelector('#weather-desc'),
        iconImg : document.querySelector('#icon > img'),
        celc : document.querySelector('#celc'),
        fah : document.querySelector('#fah'),
        speed : document.querySelector('#speed'),
        deg  : document.querySelector('#deg'),
    })
}

function updateUi(json) {
    const {weatherResults, weatherMain, weatherDesc, iconImg, celc, fah, speed, dec} = getUiElements();
    weatherMain.textContent = json.weather[0].main;
    weatherDesc.textContent = json.weather[0].description;
    iconImg.src = `http://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`
    celc.textContent = Math.round(json.main.temp - 273.15) + '°C'
    fah.textContent = Math.round(json.main.temp * 9/5 - 459.67) + '°F'
    speed.textContent = json.wind.speed + 'm/s';
    if(json.wind.deg) {
        deg.textContent = json.wind.deg + 'deg';
    }
    weatherResults.classList.add('active');
}