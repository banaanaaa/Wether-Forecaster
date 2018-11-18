let container = document.querySelector('.info');
let error = document.querySelector('.error');
let loader = document.querySelector('.round');
let name = document.querySelector('.city-name');
let weather = document.querySelector('.weather');
let temp = document.querySelector('.temp');
let press = document.querySelector('.press');
let humudity = document.querySelector('.humidity');
let wind = document.querySelector('.wind');
let cloud = document.querySelector('.cloud');
let coords = document.querySelector('.coords');
let desc = document.querySelector('.description');

function changeInfo(response) {
    name.innerHTML = response.name;
    weather.innerHTML = response.weather[0].main;
    temp.innerHTML = Math.round(response.main.temp - 273.15);
    press.innerHTML = response.main.pressure;
    humudity.innerHTML = response.main.humidity;
    wind.innerHTML = response.wind.speed;
    cloud.innerHTML = response.clouds.all;
    desc.innerHTML = '(' + response.weather[0].description + ')';
    coords.innerHTML = '(' + response.coord.lon + '; ' + response.coord.lat + ')';
}

function showError(errorText) {
    error.innerHTML = errorText;
    error.classList.add('error-visible');
    cityInput.classList.add('input-error');

    stopLoader();
}

function hideError() {
    if (error.classList.contains('error-visible')) {
        error.classList.remove('error-visible');
        cityInput.classList.remove('input-error');

        stopLoader();
    }
}

function startLoader() {
    loader.classList.add('round-animation');
}

function stopLoader() {
    loader.classList.remove('round-animation');
}

function showWeatherForecast() {
    if (!error.classList.contains('info-visible')) {
        container.classList.add('info-visible');
    }
    error.classList.remove('error-visible');

    stopLoader();
}

var colors = new Array(
    [62, 35, 255],
    [60, 255, 60],
    [255, 35, 98],
    [45, 175, 230],
    [255, 0, 255],
    [255, 128, 0]);

var step = 0;
//color table indices for: 
// current color left
// next color left
// current color right
// next color right
var colorIndices = [0, 1, 2, 3];

//transition speed
var gradientSpeed = 0.002;

function updateGradient() {

    if ($ === undefined) return;

    var c0_0 = colors[colorIndices[0]];
    var c0_1 = colors[colorIndices[1]];
    var c1_0 = colors[colorIndices[2]];
    var c1_1 = colors[colorIndices[3]];

    var istep = 1 - step;
    var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
    var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
    var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
    var color1 = "rgb(" + r1 + "," + g1 + "," + b1 + ")";

    var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
    var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
    var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
    var color2 = "rgb(" + r2 + "," + g2 + "," + b2 + ")";

    $('#gradient').css({
        background: "-webkit-gradient(linear, left top, right top, from(" + color1 + "), to(" + color2 + "))"
    }).css({
        background: "-moz-linear-gradient(left, " + color1 + " 0%, " + color2 + " 100%)"
    });

    step += gradientSpeed;
    if (step >= 1) {
        step %= 1;
        colorIndices[0] = colorIndices[1];
        colorIndices[2] = colorIndices[3];

        //pick two new target color indices
        //do not pick the same as the current one
        colorIndices[1] = (colorIndices[1] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;
        colorIndices[3] = (colorIndices[3] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;

    }
}

setInterval(updateGradient, 10);