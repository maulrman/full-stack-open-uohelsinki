import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/'

function getAll(){
    return axios.get(`${baseUrl}/api/all`)
}

function getCountry(name){
    return axios.get(`${baseUrl}/api/name/${name}`)
}

export default {
    getAll, getCountry
}