import React, { useState, useEffect } from 'react';
import Axios from 'axios';

export default function WeatherDashboard() {

    const REACT_APP_APIKEY = process.env.REACT_APP_APIKEY;  

    const [search, setSearch]=useState("")
    const [Data, setData] = useState({
        Name:'',
        Weather:'',
        Icon: "",
        MainTemp:'',
        MinTemp:'',
        MaxTemp:''
    })

    const handleChange = e => {
        let zip = e.target.value
        setSearch(zip)
        localStorage.setItem("zip",zip)
    }

    const handleSubmit = e => {
            getWeather()
        }

    const getWeather = () => {
        Axios.get(`https://api.openweathermap.org/data/2.5/weather?zip=${search},us&appid=${REACT_APP_APIKEY}`)
        .then((response) =>  {
            console.log(response.data.name)
            let Main = Math.round((response.data.main.temp - 273.15) * 9/5 + 32)
            let Mix = Math.round((response.data.main.temp_min / 273.15) * 9/5 + 32)
            let Max = Math.round((response.data.main.temp_max / 273.15) * 9/5 + 32)
            setData({
                Name: response.data.name,
                Weather: response.data.weather[0].description,
                Icon: `http://openweathermap.org/img/w/` + response.data.weather[0].icon + `.png`,
                MainTemp: Main,
                MaxTemp: Max,
                MinTem: Mix
            })
        })
    }

    useEffect(() => {
        
        let search = localStorage.getItem("zip")
        console.log(search)
        setSearch(search)
        getWeather()
       
    },[])
     

    /* TODO: 
    - add Message if no zip code or error
    - CSS styling 
    -fill out README */

    return (
        <div>
            <h1>{Data.Name}</h1>
            {Data.Icon ? <img src={Data.Icon} alt="weather icon"/> : <></> }
            <h2>{Data.Weather}</h2>
            <h3>{Data.MainTemp}</h3>
            <h4>{Data.MinTemp}</h4>
            <h5>{Data.MaxTemp}</h5>
                <hr></hr>
                <input type="text" onChange={handleChange}></input>
                <button onClick={handleSubmit}>Update</button>
        </div>
    )
}
