const process = require('process')

const axios = require('axios')

// @ts-ignore
const handler = async function (event) {

  // TODO: customize your URL and API keys set in the Netlify Dashboard
  // this is secret too, your frontend won't see this
  const { REACT_APP_SEOUL_BIKE_API_KEY} = process.env
  const FIRST_URL = `http://openapi.seoul.go.kr:8088/${REACT_APP_SEOUL_BIKE_API_KEY}/json/bikeList/1/1000`
  const SECOND_URL = `http://openapi.seoul.go.kr:8088/${REACT_APP_SEOUL_BIKE_API_KEY}/json/bikeList/1001/2000`
  const THIRD_URL = `http://openapi.seoul.go.kr:8088/${REACT_APP_SEOUL_BIKE_API_KEY}/json/bikeList/2001/3000`


  try {
    const results = await Promise.all([
      axios.default.get(FIRST_URL).then(res => res.data),
      axios.default.get(SECOND_URL).then(res => res.data),
      axios.default.get(THIRD_URL).then(res => res.data),
    ]);

    return {
      statusCode: 200,
      body: JSON.stringify(results.reduce((acc, cur) => [...cur.rentBikeStatus.row, ...acc], []))
    }
  } catch (error) {
    console.log(error)
    return {
      statusCode: 502,
      body: JSON.stringify(error.response),
    }
  }
}

module.exports = { handler }
