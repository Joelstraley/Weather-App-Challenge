import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import WeatherDisplay from '../WeatherDisplay'
import './style.css'

const REACT_APP_APIKEY = process.env.REACT_APP_APIKEY

// clear out Weather Data
const makeEmptyWeatherData = () => ({
  Id: null,
  City: null,
  Weather: null,
  Icon: null,
  MainTemp: null,
  MinTemp: null,
  MaxTemp: null,
})

export default function SearchField() {
  const [search, setSearch] = useState(localStorage.getItem('zip'))
  const [message, setMessage] = useState()
  const [data, setData] = useState(makeEmptyWeatherData())

  const handleChange = (e) => {
    let zip = e.target.value
    setSearch(zip)
    localStorage.setItem('zip', zip)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    getWeather()
  }

  // if ENTER is hit run handleSubmit
  const handleKeypress = (e) => {
    if (e.keyCode === 13) {
      handleSubmit(e)
    }
  }

  // converts temperatures from Kelvin to Fahrenheit
  const kelvinToFahrenheit = (temp) => {
    return Math.round(((temp - 273.15) * 9) / 5 + 32)
  }

  const getWeather = async () => {
    if (search === undefined || search === null || search === '') {
      setMessage('Search your zip code for the local weather')
      return
    }

    return Axios.get(
      `https://api.openweathermap.org/data/2.5/weather?zip=${search},us&appid=${REACT_APP_APIKEY}`
    )
      .then((response) => {
        // API has Weather Description in lower case, below capitalizes each word
        let Weather = response.data.weather[0].description.replace(
          /^(.)|\s+(.)/g,
          (c) => c.toUpperCase()
        )

        setData({
          City: response.data.name,
          Weather: Weather,
          Icon:
            `http://openweathermap.org/img/w/` +
            response.data.weather[0].icon +
            `.png`,
          MainTemp: kelvinToFahrenheit(response.data.main.temp),
          MaxTemp: kelvinToFahrenheit(response.data.main.temp_max),
          MinTemp: kelvinToFahrenheit(response.data.main.temp_min),
          id: response.data.weather[0].id,
        })
        setMessage(null)
      })
      .catch((err) => {
        console.error(err)
        makeEmptyWeatherData()
        setMessage('Please enter a valid zip code')
      })
  }

  useEffect(() => {
    const initSearch = async () => {
      await getWeather()
    }
    initSearch()
  }, [])

  return (
    <main className='container'>
      {/* if error display error message: */}
      {message ? <h1 className='cityName'>{message}</h1> : null}

      {/* if no error display data: */}
      <WeatherDisplay
        key={data.id}
        City={data.City}
        Icon={data.Icon}
        Weather={data.Weather}
        MainTemp={data.MainTemp}
        MinTemp={data.MinTemp}
        MaxTemp={data.MaxTemp}
      />

      <hr />

      <form onClick={handleKeypress}>
        <p className='zipLabel'>
          <label>Zip Code:</label>
        </p>
        <input type='text' onChange={handleChange}></input>
        <button onClick={handleSubmit}>Update</button>
      </form>
    </main>
  )
}
