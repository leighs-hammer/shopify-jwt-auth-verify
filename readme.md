# Shopify App JWT Verification
[![Known Vulnerabilities](https://snyk.io/test/github/leighs-hammer/shopify-jwt-auth-verify/badge.svg?targetFile=package.json)](https://snyk.io/test/github/leighs-hammer/shopify-jwt-auth-verify?targetFile=package.json)
![Builds](https://github.com/leighs-hammer/shopify-jwt-auth-verify/workflows/Builds/badge.svg)
![Test & Cover](https://github.com/leighs-hammer/shopify-jwt-auth-verify/workflows/Test%20&%20Cover/badge.svg)
[![jest](https://jestjs.io/img/jest-badge.svg)](https://github.com/facebook/jest)


This function simply verifies the authenticity and expirey time on an app bridge created JWT header. This is used to verify cookieless sessions between abstracted app frontend and backend. It does not require external dependencies but does require the the node version covers crypto and bufferFrom. We have suggested 10+ and tested as such.

Primary use cases would be in a custom middle ware for your backend routes. Built and tested for usage along side NextJS Api routes, however should translate to all use cases. 

It will simply return a boolean: `true` let other stuff happen or `false` stop stuff from happening. 

## NOTE THIS IS IN NO WAY SUPPORTED OR BUILT BY SHOPIFY
This was built as tooling for my implementations of the cookieless authentication, which is awesome and such a step forward. 
If you have any issues please raise them on github or ping me ont he partners slack or twitter. 

## Shopify Documentation

find out more about [Shopify session token authentication](https://shopify.dev/tools/app-bridge/authentication)

## TL;DR Example

```

// Require or Import
const isVerified = require('shopify-jwt-auth-verify')

// OR

import isVerified from 'shopify-jwt-auth-verify'


// use it by passing it the session token from the header ( or getSessionToken) and App secret
const valid = isVerified(headerBearer, appSecret)
```

## Typescript

This function has types supplied and was written in typescript if that is of interest to any one. 

## Notes: 

*Requirements:* Node 10+

## Tested Node Versions

- 10+
- 12+
- 14+


# API

## isVerified

`const isVerified = (authorization: string, secret: string, cb?: Function ) => boolean`

### IsVerified takes three arguments:

1. **authorization** - REQUIRED - the jwt passed into the header on the request 
2. **secret** - REQUIRED -app secret ( partners.shopify.com)
3. **callback** - OPTIONAL - callback called if is verified and passed an object of the header, payload and signature. 

The call back is there if needed, but serves little purpose unless you need to extend or assert agains the function. 

### Returns

1. *Boolean*  - `true` = valid / `false` = set fire to the ships and back out of the request. 


# Example as a NextJS Api route middleware

Below is an example of usage in next js api routes to act as the core function in the middleware protecting your backend routes.

```
// Middle Ware : /pages/api/_middleware/jwtVerified 


import { NextApiRequest, NextApiResponse } from 'next';
import isVerified from 'shopify-jwt-auth-verify'

const jwtVerifiedConnection = (handler) => { 

  return async(req: NextApiRequest, res: NextApiResponse) => {

    // The authorization header is required for all requests to the api. 
    if(!req.headers.authorization) {
      res.status(403).json({message: 'No bearer supplied, are you using the correct fetch method'})
    }
    
    const verified = isVerified(req.headers.authorization, process.env.SHOPIFY_APP_SECRET)
    
    if(!verified) {
      res.status(401).json({message: 'JWT is invalid.'})
    }
    
    // continue on to the route requested. 
    return handler(req, res)
  }
}

export default jwtVerifiedConnection


// Api Route : /pages/api/logme.ts

import { NextApiRequest, NextApiResponse } from 'next';
import jwtVerifiedConnection from '../../_middleware/jwtVerified';

const logme =  async (req: NextApiRequest, res: NextApiResponse) => {

  return res.status(200).json({
    body: req.body,
  })
}


export default jwtVerifiedConnection(logme)

```


# Share it forward!
If you found this useful please drop a message on github or twitter would love to hear from any one in the community!
