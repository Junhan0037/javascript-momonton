const weather = document.querySelector(".js-weather");

const API_KEY = "###"; // Insert API_KEY
const COORDS = "coords";

function getWeather(lat, lng) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`)
    .then(function(response) { // then : API에서 데이터를 보내주는걸 기다린 후 작동
        return response.json();
    }).then(function(json) { // 위의 response.json() 데이터네 network정보만 들어있기 때문에 한번 더 기다린다
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature}°C @${place}`;
    });
}

function saveCoords(coordsObj) { // localStorage에 저장
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position) {
    const latitude = position.coords.latitude; // 위도 불러오기
    const longitude = position.coords.longitude; // 경도 불러오기
    const coordsObj = {
        latitude, // latitude:latitude 처럼 객체의 key와 value가 같을 때 다음과 같이 작성
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError() {
    console.log("Cant access geo location");
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError)
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null) {
        askForCoords();
    } else {
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init() {
    loadCoords();
}

init();
