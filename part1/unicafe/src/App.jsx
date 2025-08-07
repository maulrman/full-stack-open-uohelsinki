import { useState } from "react"

const Statistics = ({good, neutral, bad}) => {
  const all_votes = good + neutral + bad
  const average = (good - bad) / all_votes
  const positive_votes_pct = good / all_votes * 100
  return (
    <div>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {all_votes}</p>
      <p>average {average}</p>
      <p>positive {positive_votes_pct}</p>
    </div>
  )
}


const App = () => {
  const [good, setGood] = useState(6)
  const [neutral, setNeutral] = useState(2)
  const [bad, setBad] = useState(1)

  return (
    <div>
      <h1>give feedback</h1>
      <button>good</button>
      <button>neutral</button>
      <button>bad</button>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
