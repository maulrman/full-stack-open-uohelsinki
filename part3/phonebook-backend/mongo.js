const mongoose = require('mongoose')

const mongo_user = process.env.MONGO_DB_USER
const mongo_pass = process.env.MONGO_DB_PASS
const mongo_cluster_uri = process.env.MONGO_CLUSTER_URI
const mongo_url = `mongodb+srv://${mongo_user}:${mongo_pass}@${mongo_cluster_uri}`

mongoose.set('strictQuery', false)
mongoose.connect(mongo_url)
    .then(res => console.log('connected to db'))
    .catch(error => console.log('error: ', error.message))

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

// For part 3.12
if (process.argv.length <= 2){
    Person
        .find({})
        .then(res => {
            if (res.length <= 0) {
                console.log('phonebook is empty')
            } else {
                console.log('phonebook:')
                res.forEach(person => {
                    console.log(`${person.name} ${person.number}`)
                })
            }
            mongoose.connection.close()
        })
} else {
    const new_person = new Person({
        name: process.argv[2],
        number: process.argv[3]
    })
    new_person
        .save()
        .then(res => {
            console.log('person saved.')
            mongoose.connection.close()
        })
}