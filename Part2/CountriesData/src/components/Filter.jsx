const Filter = ({ value, onChange }) => (
  <div className="search-box">
    <span><img id="search-img" src="https://cdn-icons-png.flaticon.com/128/49/49116.png" alt="search icon"  /></span>
    <input
      type="text"
      value={value}
      placeholder="Search for a country..."
      onChange={onChange}
    />
  </div>
)

export default Filter