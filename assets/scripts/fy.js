// ba362a52904248d3bd0c275d9165253e
// 6d88e7708e8ea21f1c957c2f53d60054
const timeEl = document.getElementById(`time`);
const dateEl = document.getElementById(`date`);
const currentweatheritemsEl = document.getElementById(`current-weather-items`);
const timezone = document.getElementById(`time-zone`);
const countryEl = document.getElementById(`country`);
const weatherforcastEl = document.getElementById(`weather-forcast`);
const currenttempEl = document.getElementById(`current-temp`);

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] 
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] 
const API_KEY = '6d88e7708e8ea21f1c957c2f53d60054';

setInterval(() => { 
    const time = new Date(); 
    const month = time.getMonth(); 
    const date = time.getDate(); 
    const day = time.getDay(); 
    const hour = time.getHours(); 
    const hoursin12hrformate = hour >= 13 ? hour % 12 : hour 
    const minutes = time.getMinutes(); const ampm = hour >= 12 ? 'PM' : 'AM'

    timeEl.innerHTML = (hoursin12hrformate < 10?'0'+hoursin12hrformate:hoursin12hrformate) + ':' + (minutes <10?'0'+minutes:minutes) + '' + `<span id="am-pm">${ampm}</span>` 

dateEl.innerHTML = days[day] + ',' + date + '' + months[month] }, 1000);

getWeatherData() 
function getWeatherData () {
    navigator.geolocation.getCurrentPosition((success) => { 
        let { latitude, longitude } = success.coords; 
        
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {

        console.log(data)
        showWeatherData(data);
        }) 
    })
}

function showWeatherData (data){
    let {humidity,pressure,sunrise,sunset,wind_speed}=data.current;

      timezone.innerHTML = data.timezone;
      countryEl.innerHTML = data.lat + 'N'+ data.lon+'E'


    currentweatheritemsEl.innerHTML=
      `<div class="weather-items">
            <h6>Humidity</h6>
            <p>${humidity}%</p>
        </div>
        <div class="weather-items">
            <h6>Pressure</h6>
            <p>${pressure}</p>
        </div>
         <div class="weather-items">
            <h6>Wind Speed</h6>
            <p>${wind_speed}km/h</p>
         </div>
         <div class="weather-items">
            <h6>Sunrise</h6>
            <p>${window.moment(sunrise*1000).format('HH:mm a')}</p>
         </div>
         <div class="weather-items">
            <h6>Sunset</h6>
            <p>${window.moment(sunset*1000).format('HH:mm a')}</p>
         </div>
         
         `;
        let otherDayForcast =''
         data.daily.forEach((day,idx) => {
             if(idx == 0){
             currenttempEl.innerHTML =`
             <img src=" http://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png" alt="error" class="w-icon">
                    <div class="other">
                        <div class="day">${window.moment(day.dt*1000).format('ddd')}</div>
                        <div class="temp">night - ${day.temp.night}&#176; c</div>
                        <div class="temp">day -  ${day.temp.day}&#176; c</div>
                    </div>
                    `
             }
             else{
               otherDayForcast +=`
               <div class="weather-forcast-item">
                        <div class="day">${window.moment(day.dt*1000).format('ddd')}</div>
                    <img src=" http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="error" class="w-icon">
                        <div class="temp">night - ${day.temp.night}&#176; c</div>
                        <div class="temp">day - ${day.temp.day}&#176; c</div>
                    </div>
               `  
             }
         })

weatherforcastEl.innerHTML = otherDayForcast;

}
