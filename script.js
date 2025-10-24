const searchBtn = document.querySelector(".search button");
searchBtn.addEventListener("click", handleWeather);
window.addEventListener("keydown", (e) => {
  if(e.key === "Enter"){
    handleWeather()
  }
})
  function handleWeather() {
  const apiKey = "99288e9267d3a7bfbd502136927ca0d6";
  const searchField = document.querySelector(".search input");
  const city = searchField.value;
  const unit = "metric";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  let data;
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        document.querySelector(".weather").style.display = "block";
        data = JSON.parse(this.responseText);
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML =
          Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML =
          data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";
        document.querySelector(
          ".weather-icon"
        ).src = `./images/${data.weather[0].main}.png`;
      } else {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
      }
    }
  };
  xhr.send()
// 4 days weather data
const url4day = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${unit}`
async function checkResponse() {
  document.querySelector('.error').style.display = "none"
  const response = await fetch(url4day)
  if(response.ok){
  var data4 = await response.json()
  let forecast = []
  let todayDate = new Date().getDate();
  let tomorrow;
  for (let i = 0; i < data4.list.length; i++) {
    const forecastDate = new Date(data4.list[i].dt_txt).getDate()
    if(forecastDate != todayDate){
      tomorrow = i;
      break;
    }
  }
  for (let i = tomorrow; i < data4.list.length; i+=8) {
    forecast.push(i)
  }
  for (const i in forecast) {
    let lData = data4.list[forecast[i]];
    let day = new Date(lData.dt_txt)
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let dayName = days[day.getDay()]
    document.querySelector(`.day${i} .dayE`).innerHTML = dayName
    document.querySelector(`.day${i} img`).src = `./images/${data4.list[forecast[i]].weather[0].main}.png`
    document.querySelector(`.day${i} .dayTemp`).innerHTML = `${Math.round(data4.list[forecast[i]].main.temp)}°C`
  }
} else{
  document.querySelector('.error').style.display = "block"
}
}
checkResponse();
};
