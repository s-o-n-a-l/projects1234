const apiKey = "2d2f9d2a7ba1d7867d19ad7c515a1754"
const weatherDataEle = document.querySelector(".weather-data")
const cityNameEle = document.querySelector("#city-name")
const formEle = document.querySelector("form")
const imgIcon = document.querySelector(".icon")

formEle.addEventListener("submit", (e) => {
    /*console.log(cityNameEle.value);*/
    e.preventDefault()
    const cityValue = cityNameEle.value
    getWeatherData(cityValue)
})

async function getWeatherData(cityValue){
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`)
        if(!response.ok){
            throw new Error("Network response is not ok!")
        }

        const data = await response.json()
        //console.log(data);

        const temperature = Math.floor(data.main.temp)
        const description = data.weather[0].description
        const windspeed = Math.floor(data.weather[0].windspeed)
        //const windspeed = data.wind.speed
        const icon = data.weather[0].icon

        const details = [
            `wind speed: ${data.wind.speed} m/s`,
            `humidity: ${data.main.humidity}%`,
            `pressure: ${data.main.pressure} hPa`,
            `sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}`,
            `sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}`
            
        ]

        weatherDataEle.querySelector(".temp").textContent = `${temperature}°C`
        weatherDataEle.querySelector(".desc").textContent = `${description}`

        weatherDataEle.querySelector(".details").innerHTML = details.map((detail)=>{
            return `<div>${detail}</div>`
        }).join("")

    }catch(err){
        weatherDataEle.querySelector(".temp").textContent = ""
        weatherDataEle.querySelector(".temp").textContent = "An error occurred!"

    }
    
}
