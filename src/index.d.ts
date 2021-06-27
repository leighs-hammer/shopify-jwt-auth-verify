export type TIsVerified = (authorization: string, secret: string, key: string, callback?: Function, returnCallback?: boolean) => boolean
export type TUtils = (a: string) => string
export type TB64UrlEncode = (a: Buffer) => string
export interface IPayload{
  iss: string;
  dest: string;
  aud: string;
  sub: string;
  exp: number;
  nbf: number;
  iat: number;
  jti: string; 
}