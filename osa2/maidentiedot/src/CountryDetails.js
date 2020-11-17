import React, {useState, useEffect} from 'react'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

const CountryDetails = (props) => {

    console.log(props)
    const country = props.country
    const [weather, setWeather] = useState({})

    useEffect(() => {
        axios.get(`http://api.weatherapi.com/v1/current.json?key=${api_key}&q='${country.capital}'`)
            .then(response => {
                console.log(response)
                setWeather(
                    {
                        temp: response.data.current.temp_c,
                        wind: response.data.current.wind_mph,
                        wind_dir: response.data.current.wind_dir
                    })
            })
    }, [])

    return (
        <div>
            <h2>{country.name}</h2>
            <p>capital: {country.capital}</p>
            <p>population: {country.population}</p>
            <h3>Languages</h3>
            <ul>
                {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
            </ul>
            <img alt='flag' src={country.flag} height={200} />
            <div>
                <h3>Weather in {country.capital}</h3>
                <p>Temperature: {weather.temp}</p>
                <p>Wind: {weather.wind} direction</p>
            </div>
        </div>
    )
}

export default CountryDetails