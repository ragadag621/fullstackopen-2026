const Filter = ({ filter, handlefilterChange }) => {
  console.log("Filter rendered")
  return (
    <>
    
      <ul>
        <li>
          filter shown with{" "}
          <input value={filter} onChange={handlefilterChange} />
        </li>
      </ul>
    </>
  )
}

export default Filter
