import { useState } from 'react'

const App = (props) => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const [selected, setSelected] = useState(0)

  function next_anecdotes(){
    let next_index = selected + 1
    if (next_index >= anecdotes.length){
      next_index = 0
    }
    setSelected(next_index)
  }

  function vote_anecdote(){
    let votes_copy = [...votes]
    votes_copy[selected] = votes[selected] + 1
    setVotes(votes_copy)
  }

  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick={vote_anecdote}>vote</button>
      <button onClick={next_anecdotes}>next</button>
    </div>
  )
}

export default App