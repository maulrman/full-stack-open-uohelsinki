import { useEffect } from 'react'
import { useState } from 'react'

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

const Persons = ({ persons, onDelete }) => {
  return (
    <div>
      {
        persons.map((person) => {
          return (
            <div key={person.id}>
              <p>{person.name} {person.number} <button onClick={onDelete(person)}>delete</button></p>
            </div>
          )
        })
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

  const updateContact = (person) => {
    phoneService
      .update(person.id, person)
  }

  const addContact = (event) => {
    event.preventDefault()
    const personExist = persons.findIndex((person) => person.name === newName)
    if ( personExist >= 0){
      let confirm=window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if (confirm){
        let updatePersonObject = {...persons[personExist]}
        updatePersonObject.number = newNumber
        updateContact(updatePersonObject)
        let updatedPersons = [...persons]
        updatedPersons[personExist] = updatePersonObject
        setPersons(updatedPersons)
      }
      setNewName('')
      setNewNumber('')
      return
    }

    const newPersonObj = {
      name: newName,
      number: newNumber
    }

    phoneService
      .create(newPersonObj)
      .then(resp => {
        setPersons(persons.concat(resp.data))
      })

    setNewName('')
    setNewNumber('')
  }

  const handleDeleteContact = (person) => {
    const deleteContact = () => {
      let confirm = window.confirm(`Delete ${person.name}`)
      if (confirm){
        phoneService
          .remove(person.id)
          .then(setPersons(persons.filter(contact => contact.id !== person.id)))
      }
    }
    return deleteContact
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
      .getAll('http://localhost:3001/persons')
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
      <Persons persons={persons} onDelete={handleDeleteContact}/>
    </div>
  )
}

export default App