const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(morgan('combined'))
app.use(cors())

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

function is_in_phonebook(name){
    return phonebook_data.find((person) => person.name === name)
}

app.get('/info', (req, res) => {
    const now = new Date(Date.now())
    res.send(
        `<p>Phonebook has info for ${phonebook_data.length}</p>
        <p>${now.toString()}</p>`
    )
})

app.get('/api/persons', (req, res) => {
    res.json(phonebook_data)
})

app.post('/api/persons',(req, res) => {
    // console.log(req.body)
    let contact = req.body
    if (Object.hasOwn(contact, "name") 
        && Object.hasOwn(contact, "number")
        && contact['name'].length > 0
        && contact['number'].length > 0
        && !(is_in_phonebook(contact['name']))){
            contact = {...contact, "id": crypto.randomUUID()}
            phonebook_data.push(contact)
            // console.log(phonebook_data)
            res.json({...contact, 'status': 'Added'})
    } else {
        res.status(400).json({'status': 'error'})
    }
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

app.delete('/api/persons/:id', (req, res) => {
    const person_id = req.params.id
    phonebook_data = phonebook_data.filter((person) => person.id !== person_id)
    res.status(204).end()
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
