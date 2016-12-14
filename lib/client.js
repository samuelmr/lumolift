var defaults = require('./defaults'),
  config = require('../config')
function Client(token) {
  this.token = token
  this.request = defaults(token)
}

Client.prototype.personalInfo = function () {
  return this.request.get('/users/me/')
}

Client.prototype.activities = function (start, end, type, page) {
  // pagination (offset parameter) not supported - use start and end to limit
  var only = '';
  if ((type === 'calories') || (type === 'distance') || (type === 'posture') || (type === 'steps')) {
    only = '/' + type
  }
  var query = 'start_time=' + start + '&end_time=' + end
  if (page) {
    query += '&offset=' + page
  }
  return this.request.get('/users/me/activities' + only + '?' + query)
}

module.exports = Client
