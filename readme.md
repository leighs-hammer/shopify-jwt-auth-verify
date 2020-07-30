# Shopify App JWT Verification
[![Known Vulnerabilities](https://snyk.io/test/github/leighs-hammer/shopify-jwt-auth-verify/badge.svg?targetFile=package.json)](https://snyk.io/test/github/leighs-hammer/shopify-jwt-auth-verify?targetFile=package.json)
![Builds](https://github.com/leighs-hammer/shopify-jwt-auth-verify/workflows/Builds/badge.svg)
![Test & Cover](https://github.com/leighs-hammer/shopify-jwt-auth-verify/workflows/Test%20&%20Cover/badge.svg)
[![jest](https://jestjs.io/img/jest-badge.svg)](https://github.com/facebook/jest)

This function simply verifies the authenticity and expirey time on an app bridge created JWT header. This is used to verify cookieless sessions between abstracted app frontend and backend. 

Primary use cases would be in a custom middle ware for your backend routes. Built and tested for usage along side NextJS Api routes, however should translate to all use cases. 

It will simply return a boolean: `true` let other stuff happen or `false` stop stuff from happening. 


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





