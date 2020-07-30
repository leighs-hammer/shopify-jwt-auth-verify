const mockCreds = require('./mockCreds')
const bufferFrom = require('buffer-from')
const crypto = require('crypto')

const btoa = (v) => bufferFrom(v).toString('base64')
const base64UrlEncode = (buffer) => buffer.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '')

const createMock = (offset = 60000, invalid = false) => {

  const time = new Date().getTime() / 1000

  const mockHeader = {
    "alg": "HS256",
    "typ": "JWT",
  }
  
  const mockPayload = {
    iss: "string",
    dest: "string",
    aud: "string",
    sub: "string",
    exp: time+offset,
    nbf: "number",
    iat: "number",
    jti: "string", 
  }


  const headerPayload = [btoa(`${JSON.stringify(mockHeader)}`), btoa(JSON.stringify(mockPayload))].join('.')
  const signature = crypto.createHmac('sha256', mockCreds.secret).update(headerPayload).digest()
  const builtAuth = `Bearer ${invalid ? "dfghh": ""}${headerPayload}.${base64UrlEncode(signature)}`
  const sessionToken = `${headerPayload}.${base64UrlEncode(signature)}`

  return {
    secret: mockCreds.secret,
    bearer: builtAuth,
    signature,
    encodedSignature: base64UrlEncode(signature),
    headerPayload,
    mockHeader,
    mockPayload,
    sessionToken,
  }
  
}

module.exports['default'] = createMock