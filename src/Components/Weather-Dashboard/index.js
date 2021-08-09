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
            e.preventDefault();
            getWeather()
        }

    const handleKeypress = e => {
        /* if ENTER is hit run handleSubmit */
        if (e.keyCode === 13) {
        handleSubmit();
        }
    };

    const getWeather = () => {
        Axios.get(`https://api.openweathermap.org/data/2.5/weather?zip=${search},us&appid=${REACT_APP_APIKEY}`)
        .then((response) =>  {
            
            /* API has Weather Description in lower case, below capitalizes each word*/
            let string = response.data.weather[0].description
            const capitalizeDescription = str => str.replace(/^(.)|\s+(.)/g, c => c.toUpperCase());
            let desc = capitalizeDescription(string); 

            /* converts temperatures from Kelvin to Fahrenheit */
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
        if(search === null){
/*             let search = localStorage.getItem("zip")
            console.log(search) */
            let zip = JSON.parse(localStorage.getItem("zip"))
            setSearch(zip)
            console.log(search)
            getWeather()
        } console.log(search)
    },[])
     

    /* TODO: 
    - CSS styling 
    -fill out README */

    return (
       /*  <div className="container">
            <h2>{message ? message:null}</h2>
            {Data.Name ? <h1>{Data.Name}</h1> : <></> }
            {Data.Icon ? <img src={Data.Icon} alt="weather icon"/> : <></> }
            {Data.Weather ? <h2>{Data.Weather}</h2> : <></> }
            {Data.MainTemp ? <h3>{Data.MainTemp}°</h3> : <></> }
            {Data.MinTemp ? <h5>{Data.MinTemp}°</h5> : <></> }
            {Data.MaxTemp ? <h5>{Data.MaxTemp}°</h5> : <></> }

                <hr></hr>
            <form onClick={handleKeypress}>
                <label >Zip Code:</label><br />
                <input type="text"  onChange={handleChange}></input>
                <button onClick={handleSubmit}>Update</button>
            </form> 
        </div>*/
        <main className="container">
            <section className="header">
                <h1 className="cityName">New York</h1> 
                <img src="http://openweathermap.org/img/w/03d.png" alt="weather icon" className="icon"/>
            </section>

            <section>
                <h4 className="weatherDescription">Scattered Thundershowers</h4>
            </section> 

            <section>
                <h3 className="mainTemp">16<sup className="mainTemp degree">&deg;</sup></h3> 
            </section>

            <section className="maxMin">
                <h5 className="minTemp">52<sup className="degree">&deg;</sup></h5> 
                <h5 className="maxTemp">72<sup className="degree">&deg;</sup></h5> 
            </section>

            <form className="inputForm" onClick={handleKeypress}>
                <hr />
                <label class="zipLabel">Zip Code:</label><br />
                <input type="text"  onChange={handleChange}></input>
                <button onClick={handleSubmit}>Update</button>
            </form> 
        </main>
    )
}
