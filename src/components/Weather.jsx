import  axios  from 'axios'
import React, { useEffect, useState } from 'react'
import clear from '../assets/clear.jpg'
import cloudy from '../assets/cloudy.jpg'
import mist from '../assets/mist.jpg'
import snow from '../assets/snow.jpg'

const Weather = () => {

    const [city,setCity] = useState('delhi')
    const [weather,setWeather] = useState({})
    const [image,setImage] = useState('')

    useEffect(()=>{
        setWeather({...weather,date:formatDate(new Date())})
        setWeatherHandle()
    },[])

    const getWeather = async(e)=>{
        e.preventDefault()
        try {
           setWeatherHandle()
        } catch (error) {
            console.log(error)
        }
    }

    const setWeatherHandle = async()=>{
        const res =  await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=18f8ed9769c1b8ef31af7a3bf6e7ebc8&units=metric`)
        console.log(res.data.wind)
        let code = res.data.weather[0].id
        if(code > 800){
            setImage(cloudy)
        }
        else if(code == 800){
            setImage(clear)
        }
        else if(code < 800 && code > 700){
            setImage(mist)
        }
        else if(code >= 600 && code < 700){
            setImage(snow)
        }


        setWeather({...weather,
            temperature:res.data.main.temp,
            maxTemp : res.data.main.temp_max,
            minTemp : res.data.main.temp_min,
            humidity : res.data.main.humidity,
            wind: res.data.wind.speed,
            visibility : res.data.visibility / 1000,
            location : res.data.name,
            weather : res.data.weather[0].main
        })
    }


    function formatDate(date) {
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        
        const dayOfWeek = daysOfWeek[date.getDay()];
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        
        return `${dayOfWeek} ${day} ${month} ${year}`;
      }



    return (
        <div className="min-h-screen flex items-center justify-center" style={{backgroundImage: `url(${image})`,backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'}}>
            <div className="flex flex-col bg-white bg-opacity-10 backdrop-blur-sm rounded p-4 w-full max-w-xs shadow-lg">
                <form className='mb-2 rounded border border-gray-400' onSubmit={(e)=>getWeather(e)}>
                    <input type="text" className='w-3/4 bg-transparent  outline-none p-2' value={city} onChange={(e)=>setCity(e.target.value)}/>
                    <button className='w-1/4  p-2 text-white'>Search</button>
                </form>
                <div className="font-bold text-3xl">{weather.location}</div>
                <div className="text-sm text-gray-800">{weather.date}</div>
                {/* <div className="mt-6 text-6xl self-center inline-flex items-center justify-center rounded-lg text-indigo-400 h-24 w-24">
                    <svg
                        className="w-32 h-32"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                        />
                    </svg>
                </div> */}
                <div className="flex flex-row items-center justify-center mt-6">
                    <div className="font-medium text-6xl my-2">{weather.temperature}°</div>
                    <div className="flex flex-col items-center ml-6">
                        <div>{weather.weather}</div>
                        <div className="mt-1">
                            <span className="text-sm">
                                <i className="far fa-long-arrow-up" />
                            </span>
                            <span className="text-sm  text-gray-800">{weather.maxTemp}°C</span>
                        </div>
                        <div>
                            <span className="text-sm">
                                <i className="far fa-long-arrow-down" />
                            </span>
                            <span className="text-sm text-gray-800">{weather.minTemp}°C</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row justify-between mt-6">
                    <div className="flex flex-col items-center">
                        <div className="font-medium text-base">Wind</div>
                        <div className="text-sm text-gray-800">{weather.wind}k/h</div>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="font-medium text-base">Humidity</div>
                        <div className="text-sm text-gray-800">{weather.humidity}%</div>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="font-medium text-base">Visibility</div>
                        <div className="text-sm text-gray-800">{weather.visibility}km</div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Weather
