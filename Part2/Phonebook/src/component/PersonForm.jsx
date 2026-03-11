const PersonForm = ({
  addPerson,
  newName,
  number,
  handleNameChange,
  handleNumberChange,
}) => {
  console.log("PersonForm rendered")
  return (
    <form onSubmit={addPerson}>
      <table>
        <tbody>
          <tr>
            <td>name:</td>
            <td>
              <input value={newName} onChange={handleNameChange} />
              <br />
            </td>
          </tr>
          <tr>
            <td>number:</td>
            <td>
              <input type="number" value={number} onChange={handleNumberChange} />
              <br />
            </td>
          </tr>
        </tbody>
      </table>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm