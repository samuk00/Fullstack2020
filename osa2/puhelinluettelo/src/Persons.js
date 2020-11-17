import React from 'react'
import Person from './Person'


const Persons = (props) => {

    const { persons, removePerson, newFilter, showAll } = props


    const filteredPersons = persons.filter(person => {
        return person.name.toLowerCase().includes(newFilter.toLowerCase())
    })

    const personsToShow = showAll
        ? persons.map(person => {
            return (
                <p key={person.id}>
                    <Person person={person} />
                    <button onClick={() => removePerson(person.id)}>delete</button>
                </p>

            )
        })
        : filteredPersons.map(person => {
            return (
                <p key={person.id}>
                    <Person person={person} />
                    <button onClick={() => removePerson(person.id)}>delete</button>
                </p>
            )
        })

    return (
        <div>
            {personsToShow}
        </div>
    )
}

export default Persons
