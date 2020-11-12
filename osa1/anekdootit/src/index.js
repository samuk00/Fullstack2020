import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(6).fill(0))
  const [mostvoted, setMostVoted] = useState(0)

  const setToValue = newValue => {
    setSelected(newValue)
  }

  const increaseVotes = index => {
    const copy = [...votes]
    copy[index] += 1
    setVotes(copy)

    let max = copy[0]
    for(let i = 1; i < votes.length; i++){
      if(copy[i] > max){
        max = copy[i]
      }
    }
    setMostVoted(copy.indexOf(max))
  }

  return (
    <div>
    <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}<br />has {votes[selected]} votes</p>
      <button
        onClick={() => increaseVotes(selected)}
      >
        vote
      </button>
      <button
        onClick={() => setToValue(Math.floor(Math.random() * Math.floor(6)))}>
        next anecdote
      </button>
      <h2>Anecdote with most votes</h2>
      <p>{anecdotes[mostvoted]}<br/>has {votes[mostvoted]} votes</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)