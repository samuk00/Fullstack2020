import React from 'react'
import CountryDetails from './CountryDetails'


const Filter = (props) => {

    const { countries, filter } = props

    const filtered = countries.filter(country => {
        return country.name.toLowerCase().includes(filter.toLowerCase())
    })

    if (filtered.length === 1) {
        return (
            <CountryDetails country={filtered[0]}/>
        )

    }
    else if (filtered.length <= 10) {
        return filtered.map(cntr => <p key={cntr.name}>{cntr.name}</p>)
    }
    else {
        return 'Too many matches, specify another filter'
    }
}

export default Filter