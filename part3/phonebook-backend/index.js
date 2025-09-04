const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const Person = require('./models/person')

const app = express()
const PORT = process.env.PORT || 3001
const db_usr = process.env.MONGO_DB_USER
const db_pass = process.env.MONGO_DB_PASS
const db_uri = process.env.MONGO_CLUSTER_URI
const db_url = `mongodb+srv://${db_usr}:${db_pass}@${db_uri}`

app.use(express.json())
app.use(morgan('combined'))
app.use(cors())
app.use(express.static('dist'))

mongoose.set('strictQuery', false)
mongoose
    .connect(db_url)
    .then(res => console.log('connected to db'))
    .catch(error => console.log('error connecting to db: ', error.message))

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
    Person.findOne({ name: name})
        .then(res => {
            return res
        })
}

app.get('/info', (req, res) => {
    const now = new Date(Date.now())
    Person.countDocuments({})
        .then(result => {
            res.send(
                `<p>Phonebook has info for ${result}</p><p>${now.toString()}</p>`
            )
        })
})

app.get('/api/persons', (req, res, next) => {
   Person
    .find({})
    .then(result=>{
        res.json(result)
    })
    .catch(error=>{
        next(error)
    })
})

app.post('/api/persons',(req, res, next) => {
    let contact = req.body
    if (Object.hasOwn(contact, "name")
        && Object.hasOwn(contact, "number")
        && contact.name.length > 0
        && contact.number.length > 0){
            if (!is_in_phonebook(contact.name)){
                const new_person = new Person({
                    name: contact.name,
                    number:contact.number
                })

                new_person
                    .save()
                    .then(result => {
                        res.json(result)
                    })
                    .catch(error => {
                        next(error)
                    })
            } // TODO: add redirect to update if is in phonebook already
    } else {
        res.status(400).json({ error: 'bad request'})
    }
})

app.get('/api/persons/:id', (req, res, next) => {
    const person_id = req.params.id
    Person.findById(person_id)
        .then(result => res.json(result))
        .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndUpdate(req.params.id, { number: req.body.number }, { new: true})
        .then(person => res.status(200).json(person))
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res) => {
    const person_id = req.params.id
    Person
        .findByIdAndDelete(person_id)
        .then(result => {
            res.json(result)
        })
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

const errorHandler = (error, req, res) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted request paramaters.'})
    } else {
        return res.status(400).send({ error: 'bad request.'})
    }
}

app.use(errorHandler)