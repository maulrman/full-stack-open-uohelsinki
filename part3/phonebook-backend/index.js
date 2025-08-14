const express = require('express')

const app = express()
const PORT = 3001

let phonebook_data = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (req, res) => {
    res.json(phonebook_data)
})

app.get('/info', (req, res) => {
    const now = new Date(Date.now())
    res.send(
        `<p>Phonebook has info for ${phonebook_data.length}</p>
        <p>${now.toString()}</p>`
    )
})

app.get('/api/persons/:id', (req, res) => {
    const person_id = req.params.id
    const person = phonebook_data.find((person) => person.id === person_id)
    if(person){
        res.json(person)
    } else {
        res.status(404).json({'message': "404"})
    }
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})