import { useState, useEffect } from "react"
// Services for API calls
import CountriesService from "./Service/countries"
import weatherService from "./Service/weather"
import IpService from "./Service/UserCurrency"
import CurrencyService from "./Service/Currency"
// Components
import Filter from "./components/Filter"
import CountryDetail from "./components/CountryDetail"
import CountryList from "./components/CountryList"
import "./App.css"

function App() {
  // ---------------- STATE MANAGEMENT ----------------
  const [value, setvalue] = useState("") // Search input value
  const [allCountries, setAllCountries] = useState([]) // Full list from API
  const [weather, setWeather] = useState(null) // Weather data for selected country
  const [userCurrency, setuserCurrency] = useState("ILS") // Base currency for conversion
  const [rates, setRates] = useState(null) // Exchange rates table
  const [number, setnumber] = useState(0) // Amount entered by user

  // ---------------- DERIVED STATE ----------------
  // Filtering happens on every render based on the 'value' state
  const countriesToShow = allCountries.filter((c) =>
    c.name.common.toLowerCase().includes(value.toLowerCase()),
  )

  // ---------------- SIDE EFFECTS ----------------

  /**
   * Effect 1: Fetch initial list of all countries.
   * Runs only once when the component mounts.
   */
  useEffect(() => {
    CountriesService.getAll().then((data) => setAllCountries(data))
  }, [])

  /**
   * Effect 2: Detect user's local currency based on IP address.
   */
  useEffect(() => {
    IpService.getUserCurrency()
      .then((currency) => setuserCurrency(currency))
      .catch((err) => console.error("IP Currency detection failed:", err))
  }, [])

  /**
   * Effect 3: Fetch exchange rates whenever the base currency changes.
   */
  useEffect(() => {
    CurrencyService.getExchangeRates(userCurrency).then((data) => {
      setRates(data.rates)
      console.log("Rates updated for:", userCurrency)
    })
  }, [userCurrency])

  /**
   * Effect 4: Fetch weather data only when exactly one country is found.
   * Dependencies: countriesToShow (triggers when filter narrows down to 1)
   */
  useEffect(() => {
    if (countriesToShow.length === 1) {
      const country = countriesToShow[0]
      const capital = country.capital?.[0]

      if (capital) {
        weatherService
          .getWeather(capital)
          .then((response) => setWeather(response))
          .catch((error) => console.error("Weather fetch failed:", error))
      }
    }
  }, [countriesToShow])

  // Get list of currency codes for the dropdown (e.g., ["USD", "ILS", "EUR"])
  const currencyOptions = rates ? Object.keys(rates) : []

  // ---------------- RENDER ----------------
  return (
    <div className="app-main-container">
      <header className="app-header">
        <h1>Countries Explorer</h1>
        <Filter value={value} onChange={(e) => setvalue(e.target.value)} />
      </header>

      <main className="app-content">
        <div className="results-wrapper">
          {countriesToShow.length > 10 ? (
            <p className="status-msg warning">
              Too many matches, please specify another filter
            </p>
          ) : countriesToShow.length === 0 ? (
            <div className="status-msg error">
              <p>
                No results found, try another search...
                <span>
                  <img
                    id="search-img"
                    src="https://cdn-icons-png.flaticon.com/128/49/49116.png"
                    alt="search icon"
                  />
                </span>
              </p>
            </div>
          ) : countriesToShow.length === 1 ? (
            <CountryDetail
              country={countriesToShow[0]}
              weather={weather}
              rates={rates}
              userCurrency={userCurrency}
              amount={number}
              setuserCurrency={setuserCurrency}
              currencyOptions={currencyOptions}
              setnumber={setnumber}
            />
          ) : (
            <CountryList countries={countriesToShow} onShow={setvalue} />
          )}
        </div>
      </main>
    </div>
  )
}

export default App
