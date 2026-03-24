/**
 * COMPONENT: Calculate
 * Purpose: Provides a UI for users to select their base currency 
 * and enter the amount they want to convert.
 */
const Calculate = ({ userCurrency, setuserCurrency, currencyOptions, setnumber }) => {
  return (
    <div className="calculation-controls">
      <div className="base-currency-group">
        <label htmlFor="currency-select" className="control-label">
          Base Currency:
        </label>
        <select
          id="currency-select"
          className="currency-dropdown"
          value={userCurrency}
          onChange={(e) => setuserCurrency(e.target.value)}
        >
          {currencyOptions.map((code) => (
            <option key={code} value={code}>
              {code}
            </option>
          ))}
        </select>
      </div>

      <div className="amount-input-group">
        <label htmlFor="amount-input" className="control-label">
          Amount to Convert:
        </label>
        <input
          id="amount-input"
          className="amount-field"
          type="number"
          min="0" // Prevents negative numbers
          placeholder="e.g. 100"
          onChange={(e) => setnumber(e.target.value)}
        />
      </div>
    </div>
  )
}

export default Calculate