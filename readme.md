# Shopify App JWT Verification
![Builds](https://github.com/leighs-hammer/shopify-jwt-auth-verify/workflows/Node.js%20CI/badge.svg?branch=master)


This function simply verifies the authenticity and expirey time on an app bridge created JWT header. This is used to verify cookieless sessions between abstracted app frontend and backend. 

Primary use cases would be in a custom middle ware for your backend routes. Built and tested for usage along side NextJS Api routes, however should translate to all use cases. 

It will simply return a boolean of `true` let other stuff happen or `false` stop the request. 


## TL;DR Excamples 
```
const isVerified = require('')

// OR

import isVerified from ''

const valid = isVerified(headerBearer, appSecret)
```




