var request = require('request')
var expect = require('chai').expect
var proxyURL = 'http://127.0.0.1:8000/api'

describe('Given we have REST API with users info', function () {
  describe('When GET users list', function () {
    it('it should return all users', function (done) {
      var options = {
        method: 'GET',
        url: proxyURL + '/users',
        headers: {},
        qs: {}
      }
      request(options, function (error, response, body) {
        if (error) {
          throw Error('Error calling API' + error)
        }
        expect(response.statusCode).to.equal(200)
        done()
      })
    })
  })
})
