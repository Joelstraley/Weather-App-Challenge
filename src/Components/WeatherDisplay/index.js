import React from 'react'
import './style.css'

export default function WeatherDisplay({
  City,
  Icon,
  Weather,
  MainTemp,
  MinTemp,
  MaxTemp,
}) {
  return (
    <>
      <section className='header'>
        <h1 className='cityName'>{City}</h1>
        {Icon ? <img src={Icon} alt='weather icon' className='icon' /> : <></>}
      </section>

      <section>
        <h4 className='weatherDescription'>{Weather}</h4>
      </section>

      <section>
        {MainTemp ? (
          <h3 className='mainTemp'>
            {MainTemp}
            <sup className='mainTemp degree'>&deg;</sup>
          </h3>
        ) : (
          <></>
        )}
      </section>

      <section className='maxMin'>
        {MinTemp ? (
          <h5 className='minTemp'>
            {MinTemp}
            <sup className='degree'>&deg;</sup>
          </h5>
        ) : (
          <></>
        )}
        {MaxTemp ? (
          <h5 className='maxTemp'>
            {MaxTemp}
            <sup className='degree'>&deg;</sup>
          </h5>
        ) : (
          <></>
        )}
      </section>
    </>
  )
}
