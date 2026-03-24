import axios from "axios";
const baseUrl='https://ipapi.co/json/'
const getUserCurrency=()=>axios.get(baseUrl).then(response=>response.data.currency)
export default {getUserCurrency}