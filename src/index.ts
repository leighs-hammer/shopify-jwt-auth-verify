// Node crypto & bufferFrom
import {Buffer} from 'buffer'
import {URL} from 'url'
import * as crypto from 'crypto'
import type {TUtils, TB64UrlEncode, TIsVerified, IPayload} from './index.types'

// Utils
const atob: TUtils = (a = '') => Buffer.from(a, 'base64').toString('binary')
const base64UrlEncode: TB64UrlEncode = (buffer) => buffer.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '')


// is Verified and not expired
const isVerified: TIsVerified = (authorization: string, secret: string, key: string,  cb?: Function, returnCallback?: boolean ) => {
  // Early return for missing params
  if(!authorization || !secret || !key) { 
    console.error('authorization or app secret or app key missing')
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
  const isValidAfter: boolean = payload.nbf <= time
  const iss = new URL(payload.iss).hostname;
  const dest = new URL(payload.dest).hostname;

  // still valid
  if(isExpired) {
    console.error('Token is expired')
    return false
  }

  // valid from
  if(!isValidAfter) {
    console.error('Token is not yet valid');
    return false
  }

  if(iss != dest) {
    console.error(`Token issuer ${iss} does not match the destination ${dest}`);
    return false
  }

  if(payload.aud != key) {
      console.error('Token does not match the Shopify API Key');
      return false
  }

  // call the optional callback with the authObject
  if(cb && !returnCallback) {
    // in chain call back, 
    cb(authObject, payload)
  }
  // return valid or a callback if specified by returnCallback
  return !returnCallback ? true : cb(authObject, payload)
}
export default isVerified