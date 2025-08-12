import { useEffect, useState } from 'react'

import restcountries from './services/restcountries'

function FilterCountries({name, handleChange}){
  return(
    <div>
      find countries <input value={name} onChange={handleChange} />
    </div>
  )
}

function Country({ filtered_list, onClickShow }) {
  if (filtered_list.length > 10){
    return <p>Too many matches, specify another filter</p>
  }

  if (filtered_list.length > 1){
    return <CountryList filtered_list={filtered_list} onClickShow={onClickShow}/>
  } else {
    const country_details = filtered_list[0]
    return (
      <div>
        <h1>{country_details.name.common}</h1>
        <p>Capital: {country_details.capital}</p>
        <p>Area: {country_details.area}</p>
        <h3>Languages</h3>
        <ul>
        {
          Object.values(country_details.languages).map((lang) => {
            return <li key={lang}>{lang}</li>
          })
        }
        </ul>
        <img src={country_details.flags.png} alt={`flags of ${country_details.name.official}`} />
      </div>
    )
  }
}

function CountryList({ filtered_list, onClickShow }) {
  return (
    <div>
      {
        filtered_list.map((country) => {
          return (
            <p key={country.name.common}>{country.name.common} <button onClick={onClickShow(country)}>show</button></p>
          )
        })
      }
    </div>
  )
}

function App(){
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [name, setName] = useState('')

  function handleFilterChange(event){
    setName(event.target.value)
    filterCountries(event.target.value)
  }

  function handleShowButton(country){
    return () => {
      setName(country.name.common)
      filterCountries(country.name.common)
    }
  }

  function filterCountries(name){
    let filtered = countries.filter(
      (country) => country.name.common.toLowerCase().includes(name.toLowerCase())
    )
    setFilteredCountries(filtered)
  }

  useEffect(() => {
    restcountries
      .getAll()
      .then((res) => {
        setCountries(res.data)
      })
  },[])

  if (name.length > 0){
    return (
      <div>
        <FilterCountries name={name} handleChange={handleFilterChange} />
        <Country filtered_list={filteredCountries} onClickShow={handleShowButton}/>
      </div>
    )
  }
  return (
    <div>
      <FilterCountries name={name} handleChange={handleFilterChange} />
    </div>
  )
}

export default App