// Node crypto & bufferFrom
import * as crypto from 'crypto'
import * as bufferFrom from 'buffer-from'
import type {TUtils, TB64UrlEncode, TIsVerified, IPayload} from './index.d'

// Utils
const atob: TUtils = (a = '') => bufferFrom(a, 'base64').toString('binary')
const base64UrlEncode: TB64UrlEncode = (buffer) => buffer.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '')


// is Verified and not expired
const isVerified: TIsVerified = (authorization: string, secret: string, cb?: Function ) => {
  // Early return for missing params
  if(!authorization || !secret) { 
    console.error('authorization or app secret missing')
    return false
  }
  // probably could be cleaned up this is dirty, straight string replace to remove the stragglers and split it. 
  const auth: string[] = authorization.replace('Bearer ', '').split('.')
  // will be passed to the optional call back
  const authObject: Record<('header' | 'payload' | 'signature'), string> = {
    header: atob(auth[0]),
    payload: atob(auth[1]),
    signature: auth[2],
  }
  
  const headerPayload: string = [auth[0], auth[1]].join('.')
  const signedBuffer: Buffer = crypto.createHmac('sha256', secret).update(headerPayload).digest()
  const isVerified: boolean = authObject.signature === base64UrlEncode(signedBuffer)
  
  if(!isVerified) {
    console.error('Token is invalid')
    return false
  }
  // validate not expired
  const payload: IPayload = JSON.parse(authObject.payload)
  const time = new Date().getTime() / 1000
  const isExpired: boolean = payload.exp <= time

  if(isExpired) {
    console.error('Token is expired')
    return false
  }
  // call the optional callback with the authObject
  if(cb) {
    cb(authObject)
  }
  // return valid
  return true
}
export default isVerified