require('chai').should()
var nock = require('nock'),
  config = require('../config'),
  Client = require('../lib/client')

describe('Activity ', function () {

  it('should get activity data', function (done) {
    var activityData = {
      "data": [
        { "dataSource": "LUMO_LIFT", "dataType": "TOTAL_DISTANCE", "localTime": 1391689500, "value": 6 },
        { "dataSource": "LUMO_LIFT", "dataType": "RUNNING_DISTANCE", "localTime": 1391690400, "value": 24 },
      ],
      "metadata": {
        "next": 0
      }
    }
    var endpoint = defaultNockEndpoint()
      .get('/users/me/activities?start_time=1391689500&end_time=1391690400')
      .reply(200, JSON.stringify(activityData))

    var client = new Client('token')

    client.activities(1391689500, 1391690400).then(function (response) {
      should.exist.response
      endpoint.done()
      done()
    })
  })

  it('should get only posture data', function (done) {
    var postureData = {
      "data": [
        { "dataSource": "LUMO_LIFT", "dataType": "TIME_IN_GOOD_POSTURE", "value": 111, "localTime": 1391689500 },
        { "dataSource": "LUMO_LIFT", "dataType": "TIME_IN_BAD_POSTURE", "value": 289, "localTime": 1391689500 }
      ],
      "metadata": {
        "next": 0
      }
    }
    var endpoint = defaultNockEndpoint()
      .get('/users/me/activities/posture?start_time=1391689500&end_time=1391690400')
      .reply(200, JSON.stringify(postureData))

    var client = new Client('token')

    client.activities(1391689500, 1391690400, 'posture').then(function (response) {
      should.exist.response
      endpoint.done()
      done()
    })
  })

})

function defaultNockEndpoint(){
  return nock(config.baseUrl, {
    reqheaders: {
      'authorization': 'Bearer token'
    }
  })
}
