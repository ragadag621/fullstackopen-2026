import { useState } from "react"
import Filter from "./component/Filter"
import PersonForm from "./component/PersonForm"
import Persons from "./component/Persons"
import "./App.css"
import { useEffect } from "react"
import personService from "./services/Persons"
import Notification from "./component/Notification"

const App = () => {
  console.log("App rendered")
  const [persons, setPersons] = useState([])
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState("success")
  const [filter, setfilter] = useState("")
  const [newName, setNewName] = useState("")
  const [number, setNewNumber] = useState("")

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons)
    })
  }, [])

  const deletePerson = (id) => {
    const person = persons.find((p) => p.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      console.log("deleting", person.name)
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== id))
          console.log("deleted", person.name)

          setMessageType("success")
          setMessage(`Deleted ${person.name}`)
          setTimeout(() => setMessage(null), 5000)

        })
        .catch((error) => {
          console.log(error)
          setMessageType("error")
          setMessage(
            `Information of ${person.name} has already been removed from server`,
          )

          setTimeout(() => setMessage(null), 5000)
          setPersons(persons.filter((p) => p.id !== id))
        })
    }
  }

  const addPerson = (event) => {
    event.preventDefault()

    if (newName.trim() === "" || number.trim() === "") {
      alert("Please check Your input, name and number cannot be empty")
      console.log("input is empty")
      return
    }

    const existingName = persons.find(
      (p) => p.name.toLowerCase() === newName.toLowerCase(),
    )
    const existingNum = persons.find((p) => p.number === number)

    if (existingName) {
      if (window.confirm(`${newName} is already added, replace number?`)) {
        console.log("updating", existingName.id, { ...existingName, number })
        updatePerson(existingName.id, { ...existingName, number: number })
      }
      return
    }

    if (existingNum) {
      if (
        window.confirm(`${number} is already used, replace name to ${newName}?`)) {
        console.log("updating", existingNum.id, { ...existingNum, name: newName })
        updatePerson(existingNum.id, { ...existingNum, name: newName })
      }
      return
    }

    personService
      .create({ name: newName, number: number })
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson))

        setNewName("")
        setNewNumber("")
        console.log("added", returnedPerson)
        setMessageType("success")
        setMessage(`Added ${returnedPerson.name}`)
        setTimeout(() => setMessage(null), 5000)

      })
  }

  const updatePerson = (id, changedPerson) => {
    personService
      .update(id, changedPerson)
      .then((returnedPerson) => {
        setPersons(persons.map((p) => (p.id !== id ? p : returnedPerson)))
        setMessageType("success")
        setMessage(`Updated ${changedPerson.name}`)
        setTimeout(() => setMessage(null), 5000)
        setNewName("")
        setNewNumber("")
      })
      .catch((error) => {
        console.log(error)
        setMessageType("error")
        setMessage(
          `Information of ${changedPerson.name} has already been removed from server`,
        )

        setTimeout(() => setMessage(null), 5000)
        setPersons(persons.filter((p) => p.id !== id))
      })
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlefilterChange = (event) => {
    setfilter(event.target.value)
  }

  const filteredPersons = persons.filter(
    (person) =>
      person.name.toLowerCase().includes(filter.toLowerCase()) ||
      person.number.includes(filter),
  )

  return (
    <div className="container">
      <h2>Phonebook</h2>

      <Filter filter={filter} handlefilterChange={handlefilterChange} />

      <h3>Add a new</h3>

      <PersonForm
        addPerson={addPerson}
        newName={newName}
        number={number}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <br />
      <br />
      <Notification message={message} messageType={messageType} />

      <h3>Numbers</h3>

      <Persons
        filteredPersons={filteredPersons}
        deletePerson={deletePerson}
        updatePerson={updatePerson}
      />
    </div>
  )
}

export default App
