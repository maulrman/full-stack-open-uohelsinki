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
            <div key={person._id}>
              <p>{person.name} {person.number} <button onClick={onDelete(person)}>delete</button></p>
            </div>
          )
        })
      }
    </div>
  )
}

const NotifyAlert = ({ message }) => {
  if (message == null){
    return null
  } else {
    return (
      <div className={message.type}>
        <p>{message.value}</p>
      </div>
    )
  }
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [filterPersons, setFilterPersons] = useState([])
  const [notification, setNotification] = useState({})
  const [refreshKey, setRefreshKey] = useState(0)

  const updateContact = (person) => {
    phoneService
      .update(person.id, person)
      .then(()=> true)
      .catch(e => {
        setNotification({ type: "error", value: `Information of ${person.name} has already been removed from server`})
        setTimeout(()=>{
          setNotification(null)
        }, 5000)
        return false
      })
  }

  const addContact = (event) => {
    event.preventDefault()
    const personExist = persons.findIndex((person) => person.name === newName)
    if ( personExist >= 0){
      let confirm=window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if (confirm){
        let updatePersonObject = {...persons[personExist]}
        updatePersonObject.number = newNumber
        let succeed = updateContact(updatePersonObject)
        if (succeed){
          let updatedPersons = [...persons]
          updatedPersons[personExist] = updatePersonObject
          setPersons(updatedPersons)
        } else {
          setRefreshKey(refreshKey + 1)
        }
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
        // console.log(resp)
        setPersons(persons.concat(resp.data))
      })

    setNotification({
      type: "success",
      value: `Added ${newPersonObj.name}`
    })
    setTimeout(() => setNotification(null), 5000)

    setNewName('')
    setNewNumber('')
  }

  const handleDeleteContact = (person) => {
    const deleteContact = () => {
      let confirm = window.confirm(`Delete ${person.name}`)
      if (confirm){
        phoneService
          .remove(person._id)
          .then(res => {
            if (res.data){
              setPersons(persons.filter(contact => contact._id !== res.data._id))
            }
          })
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
  },[refreshKey])

  if (filterName !== ''){
    return (
      <div>
      <h2>Phonebook</h2>
      <NotifyAlert message={notification} />
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
      <NotifyAlert message={notification} />
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