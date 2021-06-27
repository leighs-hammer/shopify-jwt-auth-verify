import isVerified from '../src/index'
import createMock from '../utils/createMock'

const mockCallback = jest.fn(x => {})


test('Expect false when no params are parsed to the function', () => {
    // @ts-ignore
    const failed = isVerified()
    expect(failed).toBe(false)
})

test('a valid request both authenticity & not expired', () => {
  // @ts-ignore
  const {bearer, signature, secret, key, headerPayload} = createMock()
  const verified = isVerified(bearer, secret, key)
  expect(verified).toBe(true)
})

test('Test expired or incorrect tbf', () => {
  // @ts-ignore
  const {builtExpiredAuth, signature, secret, key,} = createMock()
  const verified = isVerified(builtExpiredAuth, secret, key)
  expect(verified).toBe(false)
})

test('a valid request with a token direct from the session token request ( EG : minus Bearer )', () => {
  // @ts-ignore
  const {secret, sessionToken, key} = createMock()
  const verified = isVerified(sessionToken, secret, key)
  expect(verified).toBe(true)
})

test('a fradulent request', () => {
  // @ts-ignore
  const {bearer, signature, secret, key, headerPayload} = createMock(60000, true)
  const verified = isVerified(bearer, secret, key)
  expect(verified).toBe(false)
})

test('a fradulent request where the expirey is correct but the hashes are invalid', () => {
  // @ts-ignore
  const {bearer, signature, secret, key, headerPayload} = createMock(null, true)
  const verified = isVerified(bearer, secret, key)
  expect(verified).toBe(false)
})

test('an expired token should fail the verification', () => {
  // @ts-ignore
  const {bearer, signature, secret, key, headerPayload} = createMock(-100)
  const verified = isVerified(bearer, secret, key)
  expect(verified).toBe(false)
})

test('The call back is called', () => {
  // @ts-ignore
  const {bearer, encodedSignature, secret, key, headerPayload, mockHeader, mockPayload} = createMock()
  const verified = isVerified(bearer, secret, key, mockCallback)
  expect(verified).toBe(true)
  expect(mockCallback.mock.calls.length).toBe(1)
  expect(JSON.parse(mockCallback.mock.calls[0][0].header)).toEqual(mockHeader)
  expect(JSON.parse(mockCallback.mock.calls[0][0].payload)).toEqual(mockPayload)
  expect(mockCallback.mock.calls[0][0].signature).toEqual(encodedSignature)

})

test('The callback results are returned', () => {
  const {bearer, encodedSignature, secret, key, headerPayload, mockHeader, mockPayload} = createMock()
  const iterableCallback = (...any) => Object.assign({}, {...any[0]}, {...any[1]}, {callback:true})
  const verified: any = isVerified(bearer, secret, key, iterableCallback, true)
  expect(verified.callback).toBe(true)
})