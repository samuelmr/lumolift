# Lumo API client

[![Build Status](https://travis-ci.org/samuelmr/lumolift.svg?branch=master)](https://travis-ci.org/samuelmr/lumolift)

Unofficial [Lumo Lift](http://www.lumobodytech.com/lumo-lift/) [API](https://dev.lumobodytech.com/docs/) client for node.js

## Features

- [Authentication](https://dev.lumobodytech.com/docs/authentication.html)
- [Activities](https://dev.lumobodytech.com/docs/activities.html)
- [Users](https://dev.lumobodytech.com/docs/users.html) (read only)


## Usage

### Install

```
npm install lumolift
```

### Steps for last 24 hours

```js

var lumolift = require('lumolift')

// assume you have already gotten an OAuth2 access token and it's still valid
var accessToken = 'YOUR_ACCESS_TOKEN'
var d = new Date()
var endTime = Math.round(d.getTime() / 1000)
var startTime = (endTime - 24 * 60 * 60) // 24 hours
var client = new lumolift.Client(accessToken)
client.activities(startTime, endTime, 'steps').then(function (data) {
  console.log(JSON.stringify(data, null, 1))
}).catch(function(error){
  console.error(error)
})


```

Checkout the rest of the [samples](/samples)
