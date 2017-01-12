var lumolift = require('lumolift')

// assume you have already gotten an OAuth2 access token and it's still valid
var accessToken = 'YOUR_ACCESS_TOKEN'
var d = new Date()
var endTime = Math.round(d.getTime() / 1000)
var startTime = (endTime - 24 * 60 * 60) // 24 hours
var client = new lumolift.Client(accessToken)
client.personalInfo().then(function (data) {
  console.log(JSON.stringify(data, null, 1))
}).catch(function(error){
  console.error(error)
})
