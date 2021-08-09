import React from 'react'
import SearchField from '../SearchField'

export default function WeatherDisplay({message, City, Icon, Weather, MainTemp, MinTemp, MaxTemp}) {

  return (
      <div>
          <h2>{message ? message:null}</h2>
              {City ? <h1>{City}</h1> : <></> }
      </div>
  )
}
