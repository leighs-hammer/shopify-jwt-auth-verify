const mockCreds = require('./mockCreds')

const createMock = () => {

  const time = new Date().getTime() / 1000

  const mockPayload = {
    iss: "string",
    dest: "string",
    aud: "string",
    sub: "string",
    exp: time+60000,
    nbf: "number",
    iat: "number",
    jti: "string", 
  }

  console.log(mockPayload)
  const buildAuth = `Bearer  ${}.${}.${}`
}

module.exports['default'] = createMock