import React, { useState } from 'react'
import cloud_icon from "../Assets/cloud.png";
import drizzle_icon from "../Assets/drizzle.png";
import snow_icon from "../Assets/snow.png";
import rain_icon from "../Assets/rain.png";
import sun from "../Assets/sun.png";

import { API_KEY } from '../Utility/Constant';

const Body = () => {
    const [query, setQuery] = useState("")
    const [temperature, setTemperature] = useState("24");
    const [WindSpeed ,setWindSpeed] = useState("2");
    const [Humidity , setHumidity] = useState("65");
    const [Location , setLocation] = useState("London");
    const [Weather_Icon , setWeather_Icon] =  useState(cloud_icon)

    async function search() {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&units=Metric&appid=${API_KEY}`);
        const data = await response.json();
        console.log(data);

        setTemperature(Math.floor(data.main.temp)) ;
        setHumidity(Math.floor(data.main.humidity)) ;
        setLocation(data.name);
        setWindSpeed(Math.floor(data.wind.speed));
        
        const Icon = data.weather[0].icon ;
        if(Icon==="01d" || Icon==="01n"){
          setWeather_Icon(sun)
        }
        else if(Icon==="02d" || Icon==="02n"){
          setWeather_Icon(cloud_icon)
        }
        else if(Icon==="03d" || Icon==="03n"){
          setWeather_Icon(drizzle_icon)
        }
        else if(Icon==="04d" || Icon==="04n"){
          setWeather_Icon(drizzle_icon)
        }
        else if(Icon==="09d" || Icon==="09n"){
          setWeather_Icon(rain_icon)
        }
        else if(Icon==="10d" || Icon==="10n"){
          setWeather_Icon(rain_icon)
        }
        else if(Icon==="13d" || Icon==="13n"){
          setWeather_Icon(snow_icon)
        }
        else{
          setWeather_Icon(sun)
        }
    }

    function handleInputChange(e) {
        setQuery(e.target.value);
    }

    function handleSearch() {
        search();
    }


  return (
       <div className=' flex justify-center items-center h-screen'>
         <div className='w-60 md:w-72 h-80 md:h-96 rounded-3xl bg-sky-700'>
           <div className='mt-4 flex justify-center'>
            <input
                type="text"
                placeholder="Search"
                onChange={handleInputChange}
                className='h-8 w-40 md:w-48 rounded-xl pl-3 '
                value={query}
            />
            <button onClick={handleSearch} className='ml-1 rounded-2xl p-1 pl-2 pr-2 bg-white'>🔍</button>
          </div>
          <div className='flex justify-center'>
            <img src={Weather_Icon} className='h-28' alt='cloud photo'/>
          </div>
          <div className='flex justify-center font-bold text-white text-5xl'>{temperature !== null ? `${temperature}°C` : ''}</div>
          <div className='flex justify-center text-2xl mb-2 font-bold text-white' >{Location}</div>
          <div className='flex justify-around md:mt-7'>
            <div>
             <div className='flex items-center'>
                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTNAr4JU2_Lcs1jeeDMZCXNvswKgYmfibOMixhnNnTzg&s'
                   className='h-8 w-8 rounded-lg'
                />
                <label className='font-bold text-white ml-1'>{WindSpeed}km/h</label>
              </div>
              <label className='text-sm'>Wind Speed</label>
            </div>
            <div>
             <div className='flex items-center'>
              <img src='https://cdn-icons-png.flaticon.com/512/4148/4148460.png'
                 className='h-8 w-8'
              />
              <label className='font-bold text-white ml-1'>{Humidity}%</label>
             </div>
              <label>Humidity</label>
            </div>
          </div>
         </div>
       </div>
  )
}

export default Body