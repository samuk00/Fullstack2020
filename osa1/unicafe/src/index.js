import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Statistics = (props) => {

  const good = props.good
  const neutral = props.neutral
  const bad = props.bad

  const all = good + neutral + bad
  const average = (good + bad * -1) / all
  const positive = good / all * 100 + " %"

  if (all === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <table>
      <tbody>
        <StatisticsLine text="good" value={good} />
        <StatisticsLine text="neutral" value={neutral} />
        <StatisticsLine text="bad" value={bad} />
        <StatisticsLine text="all" value={all} />
        <StatisticsLine text="average" value={average} />
        <StatisticsLine text="positive" value={positive} />
      </tbody>
    </table>
  )
}

const StatisticsLine = (props) => {

  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>



  )
}

const Button = (props) => {
  return (
    <button
      onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h2>give feedback</h2>
      <Button text="good" handleClick={() => setGood(good + 1)} />
      <Button text="neutral" handleClick={() => setNeutral(neutral + 1)} />
      <Button text="bad" handleClick={() => setBad(bad + 1)} />
      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)
