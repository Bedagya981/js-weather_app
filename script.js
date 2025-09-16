const apiKey = "99288e9267d3a7bfbd502136927ca0d6"
const searchField = document.querySelector(".search input")
const searchBtn = document.querySelector(".search button")
let city
searchBtn.addEventListener('click', function(){
    city = searchField.value
})
const unit = ""
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`
const xhr = new XMLHttpRequest();
// xhr.open('GET', url);
let data
xhr.onreadystatechange = function(){
    console.log(xhr.readyState);
    if(xhr.readyState === 4){
        data = JSON.parse(this.responseText)
        document.querySelector(".city").innerHTML = data.name
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C"
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%"
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h"
        document.querySelector(".weather-icon").src = `./images/${data.weather[0].main}.png`
    }else{
        document.querySelector(".error").style.display = "block"
        document.querySelector(".weather").style.display = "none"
    }
}