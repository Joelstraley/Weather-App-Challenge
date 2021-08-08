import React, { useState } from 'react';
import Axios from 'axios';

export default function WeatherDashboard() {

    const REACT_APP_APIKEY = process.env.REACT_APP_APIKEY;  
    console.log(REACT_APP_APIKEY)

    const [search, setSearch]=useState("")
    const [Data, setData] = useState()

    const handleChange = e => {
        let zip = e.target.value
        setSearch(zip)
    }

    const handleSubmit = e => {
            getWeather()
        }

    const getWeather = () => {
        Axios.get(`https://api.openweathermap.org/data/2.5/weather?zip=${search},us&appid=${REACT_APP_APIKEY}`)
        .then((response) =>  {
            console.log(response.data.name)
            setData(response.data.name)
        })
    }


    return (
        <div>
            <h1>{Data}</h1>
                <hr></hr>
                <input type="text" onChange={handleChange}></input>
                <button onClick={handleSubmit}>Update</button>
        </div>
    )
}
