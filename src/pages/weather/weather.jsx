import React, {  useEffect,useState } from 'react'
import './weather.css'
const Weather = () => {
  const API_KEY = '679d71e4c9344cbcad394935232910';
  const [city,setCity] = useState("")
  const [weather,setWeather]  = useState({})
  const [isActive,setIsActive] = useState(false)
  const  [gradus,setGradus] =  useState("")
  const [humid , setHumid] = useState("")
  const [humidIcon,setHumidIcon] = useState("")
  const [wind,setWind] = useState("")
  const [windIcon,setWindIcon] = useState("")
  const [pressure,setPressure] = useState("")
  const [pressureIcon,setPressureIcon] = useState("")
  const [error,setError] = useState('')


  const getWeather = async () =>{
    
    const response =  await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`)
    
    const data = await response.json()

    try{
      if(response.status === 200){
        setIsActive (true)
    setWeather(data)
    setGradus("°C")
    setHumid("Humidity")
    setHumidIcon("%")
    setWind("Wind")
    setWindIcon("mph")
    setPressure("Pressure")
    setPressureIcon("hPA")
    console.log(data)
    setError('')
      } else if(response.status === 400){
        setError("Put the right name of the city")
     defaultWeather()
      } else if(response.status === 404){
        setError("Server isn't working")
        defaultWeather()
      }
    } catch(e){
      console.log(e)
    }
    
    
  }
  const defaultWeather = async()=>{
    const response =  await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=Bishkek&aqi=no`)
    const data2 = await response.json()
    setWeather(data2)
    setCity("")
   }
   const resetWeather = async ()  =>{
    const response =  await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=Bishkek&aqi=no`)
    const data2 = await response.json()
    setWeather(data2)
    setError("")
    setCity("")
    
  }
  useEffect(() => {
    (async () => {
      
      try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=Bishkek&aqi=no`)
        const data = await response.json()
        setWeather(data)
        setIsActive(true)
        setGradus("°C")
    setHumid("Humidity")
    setHumidIcon("%")
    setWind("Wind")
    setWindIcon("mph")
    setPressure("Pressure")
    setPressureIcon("hPA")
      } catch (e) {
        alert('Сервер недоступен или отключен')
      } 
    })()
  }, []);
  return (
    <div className='weather-div'>
      <h1>Weather App</h1>
      <div className='search-div'>
      <input id='search' type="text" placeholder='city' onChange={(e) => setCity(e.target.value)}
      value={city}
      />
    <input className='button' type="button" value="put the city" onClick={getWeather}/>
    <input className='button' type="button" value="reset" onClick={resetWeather} />
      </div>
      <div>
      <div className='resultOfErrors'>
          <p className='error'>{error}</p>
        </div>
        <div className='result-div'>
            <div className='left-content'>
            <span className='country' ><p>{isActive && weather.location.country}</p> </span>
            </div>
            <div className='right-content'>
            <span className='temp'><p>{isActive && weather.current.temp_c}{gradus}</p></span> 
            </div>
            <div className='bottom-content' >
              <div className='options-div'>
              {humid}
              <span><p>{isActive? weather.current.humidity:""}{humidIcon}</p></span>
              </div>
              <div className='options-div'>
              {wind}
              <span><p>{isActive? weather.current.wind_mph:""}{windIcon}</p></span>
              </div>
              <div className='options-div'>
              {pressure}
              <span><p>{isActive? weather.current.pressure_mb:""}{pressureIcon}</p></span>
              </div>
            </div>
            </div>
      </div>
    </div>
  )
}

export default Weather