import { useState } from "react"


const MustBeUsed = ({ votes, anecdotes }) => {
  let mostVotesIndex = votes.indexOf(Math.max(...votes))
  
  if (votes[mostVotesIndex] === 0)
   {
    return (
      <>
        <p>No votes yet</p>
      </>
    )
  }
  return (
    <>
      <PrintedAnecdote text="Anecdote with most votes" value={anecdotes[mostVotesIndex]} />
      <PrintedAnecdote text="Votes" value={votes[mostVotesIndex]} />
    </>
  )
  
}

const Button = ({ text, handleClick }) => {
  return (
    <>
      <button onClick={handleClick}>{text}</button>
    </>
  )
}

const PrintedAnecdote = ({ text, value }) => {
  return (
    <>
      <p>
        {text}: {value}
      </p>
    </>
  )
}

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  const handleNext = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomIndex)
  }
  const handleVote = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
    console.log("Anecdote:", selected, "votes:", newVotes[selected])
  }

  return (
    <>
      <PrintedAnecdote text="Anecdote of the day" value={anecdotes[selected]} />
      <Button text="next anecdote" handleClick={handleNext} />
      <PrintedAnecdote text="Votes" value={votes[selected]} />
      <PrintedAnecdote text="Anecdote" value={selected} />
      <Button text="vote" handleClick={handleVote} />
      <hr />

      <MustBeUsed votes={votes} anecdotes={anecdotes} />
    </>
  )
}

export default App
