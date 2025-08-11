import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'

import phoneService from './services/phonebook'

const Filter = ({ value, onChange }) => {
  return (
    <div>
          filter shown with <input value={value} onChange={onChange} />
    </div>
  )
}

const PersonForm = ({ onSubmit, name_val, num_val, onNameChange, onNumChange}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={name_val} onChange={onNameChange} />
      </div>
      <div>
        number: <input value={num_val} onChange={onNumChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({ persons }) => {
  return (
    <div>
      {
        persons.map((person) => <p key={person.name}>{person.name} {person.number}</p>)
      }
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [filterPersons, setFilterPersons] = useState([])

  const addContact = (event) => {
    event.preventDefault()
    if (persons.find((person) => person.name === newName)){
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
      return
    }

    const newPersonObj = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(newPersonObj))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    let name = event.target.value
    setFilterName(name)
    filterContacts(name)
  }

  function filterContacts(name) {
    let contacts = persons.filter(
      (person) => person.name.toLowerCase().includes(name)
    )
    setFilterPersons(contacts)
  }

  useEffect(() => {
    phoneService
      .getAll()
      .then(resp => {
        setPersons(resp.data)
      })
  },[])

  if (filterName !== ''){
    return (
      <div>
      <h2>Phonebook</h2>
      <Filter value={filterName} onChange={handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm
        onSubmit={addContact}
        name_val={newName}
        num_val={newNumber}
        onNameChange={handleNameChange}
        onNumChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={filterPersons} />
    </div>
    )
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filterName} onChange={handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm
        onSubmit={addContact}
        name_val={newName}
        num_val={newNumber}
        onNameChange={handleNameChange}
        onNumChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} />
    </div>
  )
}

export default App