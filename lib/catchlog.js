import endent from 'endent'

export const catchLog = (error) => {
  if (error.response) {
    // Request made and server responded
    console.log(endent`
    Data: ${JSON.stringify(error.response.data)}
    HTTP status: ${error.response.status}
    Headers: ${JSON.stringify(error.response.headers)}
    `)
  } else if (error.request) {
    // The request was made but no response was received
    console.log(`No response received: ${error.request}`)
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log(`Error: ${error.message}`)
  }
}
