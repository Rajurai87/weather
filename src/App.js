import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const apiKey = "1083f71ae92db309f5a1e72c2ace28df";
  const [inputCity, setInputCity] = useState("");
  const [data, setData] = useState({main: {}, wind: {}});

  const getWeatherDetails = (cityName) =>{
    if(!cityName) return ;
    const apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName +" &appid="  + apiKey
    axios.get(apiURL).then((res)=>{
      console.log("response", res.data);
      setData(res.data);

    }).catch((err)=>{
      console.log("err", err)
    })
}

const handleChangeInput = (e) =>{
  setInputCity(e.target.value);
}

  const handleSearch = (e) =>{
    e.preventDefault();
    getWeatherDetails(inputCity);
  }

  useEffect(()=>{
    getWeatherDetails("Delhi");
  }, [])

  
  return (
    <>
      <div className="weatherBg">
        <h1 className="heading">Weather App</h1>
        <form className="searching" onSubmit={handleSearch}>
          <input type="text" className="form-control" onChange={handleChangeInput} placeholder="City Name" required/>
          <button className="btn" type="submit"><i class="fas fa-search"></i></button>
        </form>
      </div>

      <div className="weather-result-box">
        <img className="weather-icon"
        src="https://i.pinimg.com/originals/f4/9e/00/f49e00480e09ab96c545b1ac5babe443.jpg" alt="" />
        
        <h1 className="city">{data.name}</h1>
        <h1 className="report"><i class="fa-solid fa-temperature-three-quarters"></i> {((data.main.temp) - 273.15).toFixed(2)}°C</h1> 
        <div className="additional-report">
          <p><i class="fa-solid fa-wind"></i> {data.wind.speed} </p>
        </div>
      </div>
    </>
  );
}

export default App;