import { useState } from "react"

import "./App.css"

const Average = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  if (all === 0) return <p>average 0</p>
  const avg = (good * 1 + neutral * 0 + bad * -1) / all

  return (
    <>
      <StatisticLine text="average:" value={avg} />
    </>
  )
}

const Positive = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  const pos = (good / all) * 100

  if (all === 0) return <p>Positive: 0 %</p>

  return (
    <>
      <StatisticLine text="Positive:" value={pos + "%"} />
    </>
  )
}
const StatisticLine = ({ text, value }) => {
  return (
    <>
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    </>
  )
}
const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  if (all === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="All" value={all} />
          <Average good={good} neutral={neutral} bad={bad} />
          <Positive good={good} neutral={neutral} bad={bad} />
        </tbody>
      </table>
    </>
  )
}
const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    const update = good + 1
    setGood(update)
    console.log("good:", good)
  }

  const handleBadClick = () => {
    const update = bad + 1
    setBad(update)
    console.log("bad:", bad)
  }

  const handleNeutralClick = () => {
    const update = neutral + 1
    setNeutral(update)
    console.log("neutral:", neutral)
  }

  return (
    <>
      
          <h1>give feedback</h1>
          <button onClick={handleGoodClick}>good</button>
          <button onClick={handleNeutralClick}>neutral</button>
          <button onClick={handleBadClick}>bad</button>
          <h1>statistics</h1>

          <Statistics good={good} neutral={neutral} bad={bad} />
        
    </>
  )
}

export default App
