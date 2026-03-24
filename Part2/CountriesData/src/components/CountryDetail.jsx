import Calculate from "./Calculate"

const CountryDetail = ({
  country,
  weather,
  rates,
  userCurrency,
  amount,
  setuserCurrency,
  currencyOptions,
  setnumber,
}) => {
  // Extracting the currency code (e.g., 'USD') from the nested country object
  const currencyCode = country.currencies
    ? Object.keys(country.currencies)[0]
    : null

  // Formatting currencies into a readable string
  const currenciesDisplay = country.currencies
    ? Object.values(country.currencies)
        .map((c) => `${c.name} (${c.symbol})`)
        .join(", ")
    : "Not available"

  /** * LOGIC: To get the value of the foreign currency in your base currency,
   * we calculate the inverse of the API rate (1 / rate).
   */
  const rateFromApi = rates && currencyCode ? rates[currencyCode] : null
  const inverseRate = rateFromApi ? 1 / rateFromApi : null
  const result = amount && inverseRate ? (amount * inverseRate).toFixed(2) : 0

  return (
    <div className="country-card">
      <header className="country-header">
        <img
          src={country.flags.png}
          alt={`${country.name.common} flag`}
          className="flag-img"
        />
        <h1 className="country-title">{country.name.common}</h1>
      </header>

      <section className="info-section">
        <div className="info-grid">
          <p className="info-item">
            <strong>Capital:</strong> {country.capital?.[0]}
          </p>
          <p className="info-item">
            <strong>Area:</strong> {country.area.toLocaleString()} km²
          </p>
          <p className="info-item">
            <strong>Population:</strong> {country.population.toLocaleString()}
          </p>
          <p className="info-item">
            <strong>Currencies:</strong> {currenciesDisplay}
          </p>
        </div>
      </section>

      <section className="converter-section">
        <div className="converter-wrapper">
          <Calculate
            userCurrency={userCurrency}
            setuserCurrency={setuserCurrency}
            currencyOptions={currencyOptions}
            setnumber={setnumber}
          />

          <div className="conversion-result-container">
            <h3 className="result-title">
              {" "}
              <span>
                <img
                  id="icon"
                  src="https://cdn-icons-png.flaticon.com/128/1244/1244633.png"
                  alt="search icon"
                />
              </span>
              Conversion Result
            </h3>
            {rateFromApi ? (
              <div className="result-content">
                <p className="result-main-text">
                  <strong>
                    {amount}  {userCurrency}
                  </strong>{" "}
                  ={" "}
                  <span>
                    {result}{"  "}{currencyCode}
                  </span>
                </p>
                <small className="rate-hint">
                  Exchange Rate: 1  {userCurrency}= {inverseRate?.toFixed(4)}{"  "}
                    {currencyCode}
                 
                </small>
              </div>
            ) : (
              <p className="error-text">
                Rates currently unavailable for this currency.
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="languages-section">
        <h3>Languages</h3>
        <ul className="languages-list">
          {Object.values(country.languages || {}).map((lang) => (
            <li key={lang} className="language-tag">
              {lang}
            </li>
          ))}
        </ul>
      </section>

      {/* Conditionally rendering weather only if data is fetched */}
      {weather && (
        <section className="weather-section">
          <WeatherView weather={weather} city={country.capital[0]} />
        </section>
      )}

      <footer className="country-footer">
        <a
          href={country.maps.googleMaps}
          target="_blank"
          rel="noreferrer"
          className="map-link-btn"
        >
          <span>
            <img
              id="icon"
              src="https://cdn-icons-png.flaticon.com/128/14453/14453595.png"
              alt="search icon"
            />
          </span>
          View on Google Maps
        </a>
      </footer>
    </div>
  )
}

const WeatherView = ({ weather, city }) => (
  <div className="weather-card">
    <h3 className="weather-title">Weather in {city}</h3>
    <div className="weather-details">
      <p className="temperature">{weather.main.temp} °C</p>
      <img
        className="weather-icon"
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={weather.weather[0].description}
      />
      <p className="wind-speed">Wind: {weather.wind.speed} m/s</p>
    </div>
  </div>
)

export default CountryDetail
