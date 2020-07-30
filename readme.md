# Shopify App JWT Verification
[![Known Vulnerabilities](https://snyk.io/test/github/leighs-hammer/shopify-jwt-auth-verify/badge.svg?targetFile=package.json)](https://snyk.io/test/github/leighs-hammer/shopify-jwt-auth-verify?targetFile=package.json)
![Builds](https://github.com/leighs-hammer/shopify-jwt-auth-verify/workflows/Builds/badge.svg)
![Test & Cover](https://github.com/leighs-hammer/shopify-jwt-auth-verify/workflows/Test%20&%20Cover/badge.svg)
[![jest](https://jestjs.io/img/jest-badge.svg)](https://github.com/facebook/jest)


This function simply verifies the authenticity and expirey time on an app bridge created JWT header. This is used to verify cookieless sessions between abstracted app frontend and backend. It does not require external dependencies but does require the the node version covers crypto and bufferFrom. We have suggested 10+ and tested as such.

Primary use cases would be in a custom middle ware for your backend routes. Built and tested for usage along side NextJS Api routes, however should translate to all use cases. 

It will simply return a boolean: `true` let other stuff happen or `false` stop stuff from happening. 

## Notes: 

*Requirements:* Node 10+


## TL;DR Example

```

// Import /Require
const isVerified = require('')

// OR

import isVerified from ''


// use it
const valid = isVerified(headerBearer, appSecret)
```


# API

## isVerified

`const isVerified = (authorization: string, secret: string, cb?: Function ) => boolean`

### Is verified takes three arguments:

1. *authorization* - REQUIRED - the jwt passed into the header on the request 
`Bearer b64encObject.b64encObject.hashHmac256`
2. *secret* - REQUIRED -app secret ( partners.shopify.com)
3. *callback* - OPTIONAL - callback called if is verified and passed an object of the header, payload and signature. 

The call back is there if needed, but serves little purpose unless you need to extend or assert agains the function. 

### Returns

1. *Boolean*  - `true` = valid / `false` = set fire to the ships and back out of the request. 







