const Persons = ({ filteredPersons, deletePerson }) => {
  console.log("Persons rendered")
  return (
    <>
      <table>
        <tbody>
          {filteredPersons.map((person) => (
            <tr key={person.id}>
              <td>{person.name}{" "}</td>
              <td>{person.number}</td>
              <td>
                <button onClick={() => deletePerson(person.id)}>delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
export default Persons
