const process = require('process')

const axios = require('axios')

// @ts-ignore
const handler = async function (event) {

  // TODO: customize your URL and API keys set in the Netlify Dashboard
  // this is secret too, your frontend won't see this
  const { REACT_APP_SEOUL_BIKE_API_KEY} = process.env
  const FIRST_URL = `http://http://openapi.seoul.go.kr:8088/${REACT_APP_SEOUL_BIKE_API_KEY}/json/bikeList/1/1000`
  // @ts-ignore
  const SECOND_URL = `http://http://openapi.seoul.go.kr:8088/${REACT_APP_SEOUL_BIKE_API_KEY}/json/bikeList/1001/2000`


  try {
    const results = await Promise.all([
      axios.default.get(FIRST_URL).then(res => res.data),
      axios.default.get(SECOND_URL).then(res => res.data),
    ]);

    return {
      statusCode: 200,
      body: JSON.stringify(results.reduce((acc, cur) => [...cur.rentBikeStatus.row, ...acc], []))
    }
  } catch (error) {
    const { status, statusText, headers, data } = error.response
    return {
      statusCode: error.response.status,
      body: JSON.stringify({ status, statusText, headers, data }),
    }
  }
}

module.exports = { handler }
