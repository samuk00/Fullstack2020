import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import Filter from './Filter'

const App = () => {

  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log(response.status)
        setCountries(response.data)
      })
  }, [])

  const handleChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <form>
        find countries <input onChange={handleChange} />
      </form>
      <div>
        <Filter countries={countries} filter={filter} />
      </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))