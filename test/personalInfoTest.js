require('chai').should()
var nock = require('nock'),
  Client = require('../lib/client'),
  config = require('../config')

describe('Personal information ', function () {

    var client = new Client('token')
    var userData = {
      "data": {
        "dateOfBirth": "1964-08-06",
        "firstName": "Robert",
        "lastName": "Smith",
        "gender": "male",
        "height": 1.6002,
        "id": 7743,
        "owner": "robert@smith.com",
        "weight": 69.3996
      }
    }
    beforeEach(function (done) {
      nock(config.baseUrl, {
        reqheaders: {
          'authorization': 'Bearer token'
        }
      })
        .get('/users/me/')
        .reply(200, JSON.stringify(userData))
      done()
    })

    it('should get the user info', function (done) {

      client.personalInfo().then(function (response) {
        should.exist.response
        done()
      })
    })

  }
)
