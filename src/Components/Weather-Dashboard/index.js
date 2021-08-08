import React, { useState, useEffect } from 'react';
import Axios from 'axios';

export default function WeatherDashboard() {

    const REACT_APP_APIKEY = process.env.REACT_APP_APIKEY;  

    const [search, setSearch] = useState("")
    const [message, setMessage] = useState()
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
            
            let string = response.data.weather[0].description
            const capitalizeDescription = str => str.replace(/^(.)|\s+(.)/g, c => c.toUpperCase());
            let desc = capitalizeDescription(string); 

            let Main = Math.round((response.data.main.temp - 273.15) * 9/5 + 32)
            let Mix = Math.round((response.data.main.temp_min / 273.15) * 9/5 + 32)
            let Max = Math.round((response.data.main.temp_max / 273.15) * 9/5 + 32)
            
            setData({
                Name: response.data.name,
                Weather: desc,
                Icon: `http://openweathermap.org/img/w/` + response.data.weather[0].icon + `.png`,
                MainTemp: Main,
                MaxTemp: Max,  
                MinTem: Mix
            })
            setMessage(null)
        }).catch((error) => { 
            console.log(error); 
            setData({Name: null, Weather: null, Icon: null, MainTemp: null, MaxTemp: null, MinTemp: null});
            setMessage("Please enter a valid zip code"); 
            })
    }
     
    useEffect(() => {
        if(localStorage.getItem("zip")){
            let search = localStorage.getItem("zip")
            setSearch(search)
            getWeather()
        }
    },[])
     

    /* TODO: 
    - add Message if no zip code or error
    - CSS styling 
    -fill out README */

    return (
        <div>
            <h2>{message?message:null}</h2>
            {Data.Name ? <h1>{Data.Name}</h1> : <></> }
            {Data.Icon ? <img src={Data.Icon} alt="weather icon"/> : <></> }
            {Data.Weather ? <h2>{Data.Weather}</h2> : <></> }
            {Data.MainTemp ? <h3>{Data.MainTemp}°</h3> : <></> }
            {Data.MinTemp ? <h5>{Data.MinTemp}°</h5> : <></> }
            {Data.MaxTemp ? <h5>{Data.MaxTemp}°</h5> : <></> }

                <hr></hr>
                <input type="text" onChange={handleChange}></input>
                <button onClick={handleSubmit}>Update</button>
        </div>
    )
}
