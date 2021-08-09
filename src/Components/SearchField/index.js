import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import WeatherDisplay from '../WeatherDisplay';
import "./style.css"

export default function SearchField() {

    const REACT_APP_APIKEY = process.env.REACT_APP_APIKEY;  
   
    const [search, setSearch] = useState(localStorage.getItem("zip"))
    const [message, setMessage] = useState()
    const [data, setData] = useState({
        Id: '',
        City: '',
        Weather: '',
        Icon: '',
        MainTemp: '',
        MinTemp: '',
        MaxTemp: ''
    })

    const handleChange = e => {
        let zip = e.target.value
        setSearch(zip)
        localStorage.setItem("zip",zip)
    }

    const handleSubmit = e => {
        e.preventDefault()
        getWeather()
    }

    const handleKeypress = e => {
        /* if ENTER is hit run handleSubmit */
        if (e.keyCode === 13) {
        handleSubmit(e);
        }
    }


    /* seperate Kelvin convert function */

    const getWeather = () => {
        return Axios.get(`https://api.openweathermap.org/data/2.5/weather?zip=${search},us&appid=${REACT_APP_APIKEY}`)
        .then((response) =>  {
            
            /* API has Weather Description in lower case, below capitalizes each word*/
            let Weather = response.data.weather[0].description.replace(/^(.)|\s+(.)/g, c => c.toUpperCase())

            /* converts temperatures from Kelvin to Fahrenheit */
            let Main = Math.round((response.data.main.temp - 273.15) * 9/5 + 32)
            let Min = Math.round((response.data.main.temp_min - 273.15) * 9/5 + 32)
            let Max = Math.round((response.data.main.temp_max - 273.15) * 9/5 + 32)
            
            setData({
                City: response.data.name,
                Weather: Weather,
                Icon: `http://openweathermap.org/img/w/` + response.data.weather[0].icon + `.png`,
                MainTemp: Main, /* call Kelvin function here */
                MaxTemp: Max,  
                MinTemp: Min,
                id: response.data.weather[0].id
            })
            setMessage(null)
        }).catch((err) => { 
            console.error(err) 
            setData(/* {Name: null, Weather: null, Icon: null, MainTemp: null, MaxTemp: null, MinTemp: null} */);
            setMessage("Please enter a valid zip code"); 
            })
    }
          
  useEffect(() => {
        const initSearch =  async () =>{
            await getWeather() 
        }
        initSearch();
    }, [])  
     
    /* TODO: 
    -update API key
    put in an If local storage is empty check 
    */

    return (
        <main className="container">
            {/* if error display error message: */}
            {message ? <h1 className="cityName">{message}</h1> :null} 

            {/* if no error display data: */}
            <WeatherDisplay
                key={data.id} 
                City={data.City}
                Icon={data.Icon}
                Weather={data.Weather}
                MainTemp={data.MainTemp}
                MinTemp={data.MinTemp}
                MaxTemp={data.MaxTemp}  />  

            <hr/>

            <form onClick={handleKeypress}>
                <label className="zipLabel">Zip Code:</label><br />
                <input type="text" onChange={handleChange}></input>
                <button onClick={handleSubmit}>Update</button>
            </form> 
        </main>
    )
}
