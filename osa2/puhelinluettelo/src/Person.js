import React from 'react'

const Person = (props) => {

    const { person } = props

    return (
            `${person.name} ${person.number} `
    )

}

export default Person
