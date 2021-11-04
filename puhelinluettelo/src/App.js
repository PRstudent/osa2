import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Notification from './components/Notification'
import Persons from './components/Persons'
import PersonNew from './components/PersonNew'
import Filter from './components/Filter'
import personService from './services/persondata'

const App = () => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(true)
  const [persons, setPersons] = useState([])
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialNames => {
        setPersons(initialNames)
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
    } 
  

    const person = persons.find(person => person.name.toLowerCase() === nameObject.name.toLowerCase())
    const changedNumber = { ...person, number: nameObject.number }
  
    if (persons.some(person => person.name.toLowerCase() === nameObject.name.toLowerCase())) { 
        (window.confirm(`${newName} has already been added to phonebook. Replace old number with new one??`))
        personService
        .update(person.id, changedNumber)
        .then(updatedNumber => {
        setPersons(persons.map(person => person.name !== changedNumber.name ? person : updatedNumber))
        setMessage(
          `${newName} number has been updated`
        )
        setErrorMessage(false)
        setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch (error => {
          setMessage(
            `${newName} number not updated`
          )
          setErrorMessage(true)
          setTimeout(() => {
              setMessage(null)
            }, 5000)
         console.error('failed', error);
        })
    } else {personService
      .create(nameObject)
      .then(returnedName => {
        setPersons(persons.concat(returnedName)) 
        setMessage(
          `person ${newName} added to phonebook`
        ) 
        setErrorMessage(false)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
      .catch (error => {
        setMessage(
          `person ${newName} is not in the phonebook`
        ) 
        setErrorMessage(true)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        console.error('failed', error);
      })
    }
    setNewName(' ')
    setNewNumber(' ')
  }

    const handleDelete = (id, name) => {
      if (window.confirm(`delete ${name} ?`)) {
        personService
        .remove(id)
        .then(deletedName => {
          setPersons(persons.filter(person => person.id !== id ? person : !deletedName))
          setMessage(`person ${newName} has been added to phonebook`) 
          setErrorMessage(false)
          console.log (`name has been deleted ${name}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
      })
      .catch(error => {
        setMessage(
          `person ${newName} has been deleted from phonebook`
        )
        setErrorMessage(true)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      console.error('failed', error);
      setPersons(persons.filter(p => p.id !== id))
      })
    }
  }

  
  /*

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
  
*/


  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const filteredNames = filterName === " "
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} errorMessage={errorMessage} />
      <Filter filterName={filterName} handleFilterChange={handleFilterChange} />
      <PersonNew addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h1>Numbers</h1>
      <Persons filteredNames={filteredNames} handleDelete={handleDelete} />
      </div>
  )
}

export default App