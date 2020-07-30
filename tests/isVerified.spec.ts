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
  const {bearer, signature, secret, headerPayload} = createMock()
  const verified = isVerified(bearer, secret)
  expect(verified).toBe(true)
})

test('a fradulent request', () => {
  // @ts-ignore
  const {bearer, signature, secret, headerPayload} = createMock(60000, true)
  const verified = isVerified(bearer, secret)
  expect(verified).toBe(false)
})

test('a fradulent request where the expirey is correct but the hashes are invalid', () => {
  // @ts-ignore
  const {bearer, signature, secret, headerPayload} = createMock(null, true)
  const verified = isVerified(bearer, secret)
  expect(verified).toBe(false)
})

test('an expired token should fail the verification', () => {
  // @ts-ignore
  const {bearer, signature, secret, headerPayload} = createMock(-100)
  const verified = isVerified(bearer, secret)
  expect(verified).toBe(false)
})

test('The call back is called', () => {
  // @ts-ignore
  const {bearer, encodedSignature, secret, headerPayload, mockHeader, mockPayload} = createMock()
  const verified = isVerified(bearer, secret, mockCallback)
  expect(verified).toBe(true)
  expect(mockCallback.mock.calls.length).toBe(1)
  expect(JSON.parse(mockCallback.mock.calls[0][0].header)).toEqual(mockHeader)
  expect(JSON.parse(mockCallback.mock.calls[0][0].payload)).toEqual(mockPayload)
  expect(mockCallback.mock.calls[0][0].signature).toEqual(encodedSignature)

})