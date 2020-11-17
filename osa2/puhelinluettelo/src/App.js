import React, { useState, useEffect } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import personService from './services/persons'
import Notification from './Notifications'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')
    const [showAll, setshowAll] = useState(true)
    const [feedbackMessage, setFeedbackMessage] = useState({content: '', type: ''})

    useEffect(() => {
        personService
            .getAll()
            .then(response => {
                setPersons(response.data)
            })
            .catch(error => {
                console.log('fail')
            })
    }, [])

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleFilterChange = (event) => {
        setNewFilter(event.target.value)
        persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
            ? setshowAll(false)
            : setshowAll(true)

    }

    const addPerson = (event) => {
        event.preventDefault()

        const newPerson = {
            name: newName,
            number: newNumber
        }

        if (persons.some(person => person.name === newName)) {
            const existingPerson = persons.find(person => person.name === newName)
            const existingPersonId = existingPerson.id
            const changedPerson = { ...existingPerson, number: newNumber }

            // Replace number
            if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
                personService
                    .updateNumber(existingPersonId, changedPerson)
                    .then(response => {
                        setPersons(persons.map(person => person.id !== existingPersonId ? person : response.data))
                        setFeedbackMessage({ content: `Number of ${existingPerson.name} is changed`, type: 'success' })
                        setTimeout(() => {
                            setFeedbackMessage({content: '', type: ''})
                        }, 5000)
                        setNewName('')
                        setNewNumber('')
                    })
                    .catch(error => {
                        console.log(error)
                        setFeedbackMessage({ content: `${existingPerson.name} is already deleted`, type: "failure" })
                        setTimeout(() => {
                            setFeedbackMessage({ content: '', type: '' })
                        }, 5000)
                        setPersons(persons.filter(person => person.id !== existingPersonId))
                    })
            }

            //New person add
        } else {
            personService
                .create(newPerson)
                .then(response => {
                    console.log(response)
                    setPersons(persons.concat(response.data))
                    setFeedbackMessage({ content: `Added ${newPerson.name}`, type: 'success' })
                    setTimeout(() => {
                        setFeedbackMessage({ content: '', type: '' })
                    }, 5000)
                    setNewName('')
                    setNewNumber('')
                })
                .catch(error => {
                    console.log('fail')
                })
        }
    }


    const removePerson = (id) => {

        const changedPersons = persons.filter(person => {
            return person.id !== id
        })

        const personObj = persons.filter(person => {
            return person.id === id
        })

        if (window.confirm(`Delete ${personObj[0].name}?`)) {
            console.log(changedPersons)
            personService
                .remove(id)
                .then(response => {
                    setPersons(changedPersons)
                    setFeedbackMessage({ content: `${personObj[0].name} is removed`, type: 'success' })
                    setTimeout(() => {
                        setFeedbackMessage({ content: '', type: '' })
                    }, 5000)
                })
                .catch(error => {
                    console.log('fail')
                })
        }
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={feedbackMessage} />
            <Filter handleChange={handleFilterChange} />
            <h2>Add a new</h2>
            <PersonForm
                newName={newName}
                newNumber={newNumber}
                addPerson={addPerson}
                handleNameChange={handleNameChange}
                handleNumberChange={handleNumberChange}
            />
            <h2>Numbers</h2>
            <Persons
                persons={persons}
                removePerson={removePerson}
                newFilter={newFilter}
                showAll={showAll} />
        </div>
    )

}

export default App