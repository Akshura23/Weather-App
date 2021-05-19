const apiKey ="c0e9a51705f5158ce4f0c653acfb2079";

const main =document.getElementById('main');
const form =document.getElementById('form');
const search =document.getElementById('search');


const url =(city) => `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
//const url =(city) => `https://pro.openweathermap.org/data/2.5/forecast/hourly?q=${city}&appid=${apiKey}`;

async function getWeatherByLocation(city){
    const response = await fetch(url(city),{origin: "cors"});
    const resData = await response.json();
    
    //console.log(resData,KtoC(resData.main.temp));
    addWeatherToPage(resData);
    console.log(resData);
}

function addWeatherToPage(data){
    const temp = KtoC(data.main.temp);
    const weather = document.createElement('div');
    
    weather.classList.add('weather');
    
    weather.innerHTML=`
            <small>${search.value}</small>
            <h2>${temp}°C</h2>
            <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png"/>
            <h6>${data.weather[0].main}</h6>
            
        `;
        //cleanup
        main.innerHTML="";
        main.appendChild(weather);
}

function KtoC(K){
    return Math.floor(K-273);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const city = search.value;

    if(city){
        getWeatherByLocation(city);
    }
});