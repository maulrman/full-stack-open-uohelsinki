import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

function getAll(){
    return axios.get(baseUrl)
}

function create(newPersonObj){
    return axios.post(baseUrl, newPersonObj)
}

function update(id, updatePersonObj){
    return axios.put(`${baseUrl}/${id}`, updatePersonObj)
}

function remove(id){
    return axios.delete(`${baseUrl}/${id}`)
}

export default {
    getAll, create, update, remove
}