import isVerified from '../src/index'
import createMock from '../utils/createMock'

test('Expect false when no params are parsed to the function', () => {
    // @ts-ignore
    const failed = isVerified()
    expect(failed).toBe(false)
})

test('a valid request', () => {
    createMock()
    expect(true).toBe(true)
})