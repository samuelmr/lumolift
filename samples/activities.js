/*

Fetch your own last 24 hours posture data.

Starts an Express server to handle authorization flow.
Displays the authorization URL in the console log. (Copy to your browser.)

Dumps the activity data as JSON into your broser after authorization.

*/
var lumolift = require('lumolift'),
  express = require('express'),
  url = require('url')

// these must match the info at
// https://dev.lumobodytech.com/dashboard/
var options = {
  clientId: 'YOUR_CLIENT_ID',
  clientSecret: 'YOUR_CLIENT_SECRET',
  redirectUri: 'http://localhost:5866/authcallback'
}

var d = new Date()
var endTime = Math.round(d.getTime() / 1000)
var startTime = (endTime - 24 * 60 * 60) // 3 hours

var authClient = lumolift.Auth(options)
var authUri = authClient.code.getUri()

var defaultUrl = url.parse(options.redirectUri)
var app = express()
var port = process.env.PORT || defaultUrl.port

app.get(defaultUrl.pathname, function (req, res) {
  return authClient.code.getToken(req.originalUrl).then(function(auth) {
    return auth.refresh().then(function(refreshed) {
      console.log(refreshed)
      var token = refreshed.accessToken
      console.log('Access token is ' + token)
      var client = new lumolift.Client(token)
      // client.activities(startTime, endTime, 'posture').then(function (data) {
      client.activities(startTime, endTime).then(function (data) {
        res.json(data)
        process.exit()
      }).catch(function(error){
        console.error(error)
        process.exit()
      })
    }).catch(function(error){
      console.error(error)
      process.exit()
    })
  }).catch(function(error){
    console.error(error)
    process.exit()
  })
})

server = app.listen(port, function () {
  console.log("Please, go to \n" + authUri)
})
