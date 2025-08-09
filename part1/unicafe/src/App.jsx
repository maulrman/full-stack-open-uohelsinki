import { useState } from "react"

const Statistics = ({good, neutral, bad}) => {
  const all_votes = good + neutral + bad
  const average = (good - bad) / all_votes
  const positive_votes_pct = good / all_votes * 100

  if (all_votes === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticsLine text="good" value={good} />
          <StatisticsLine text="neutral" value={neutral} />
          <StatisticsLine text="bad" value={bad} />
          <StatisticsLine text="all" value={all_votes} />
          <StatisticsLine text="average" value={average} />
          <StatisticsLine text="positive" value={positive_votes_pct} />
        </tbody>
      </table>
    </div>
  )
}

const StatisticsLine = (props) => {
  if (props.text == "positive") {
    return (
      <>
      <tr>
        <td>{props.text}</td>
        <td>{props.value} %</td>
      </tr>
    </>
    )
  }

  return (
    <>
      <tr>
        <td>{props.text}</td>
        <td>{props.value}</td>
      </tr>
    </>
  )
}

const Button = (props) => {
  return (
    <>
      <button onClick={props.onClick}>{props.text}</button>
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" onClick={() => setGood(good + 1)} />
      <Button text="neutral" onClick={() => setNeutral(neutral + 1)} />
      <Button text="bad" onClick={() => setBad(bad + 1)}  />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
