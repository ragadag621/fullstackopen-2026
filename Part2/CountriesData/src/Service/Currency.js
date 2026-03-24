import axios from "axios"
const baseUrl = "https://open.er-api.com/v6/latest/"

const getExchangeRates = (base) =>
  axios.get(`${baseUrl}${base}`).then((response) => response.data)

export default { getExchangeRates }
