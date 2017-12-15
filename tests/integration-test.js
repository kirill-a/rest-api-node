/* eslint-env mocha */

var request = require('request')
var expect = require('chai').expect
var proxyURL = 'http://127.0.0.1:8000/api'
var userId
var user = { 'firstName': 'Mike 2', 'lastName': 'Doug', 'jobTitle': 'Tester', 'isFulltime': false }
describe('Given we have REST API with users info', function () {
  describe('When POST new user', function () {
    it('it should return all users', function (done) {
      var options = {
        method: 'POST',
        url: proxyURL + '/users',
        headers: { 'Content-Type': 'application/json' },
        form: user
      }
      request(options, function (error, response, body) {
        if (error) {
          throw Error('Error calling API' + error)
        }
        expect(response.statusCode).to.equal(201)
        userId = JSON.parse(body)._id
        console.log(userId)
        done()
      })
    })
  })
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
  describe('When PUT user with new data', function () {
    it('it should return all users', function (done) {
      user.firstName = 'Mike 9'
      var options = {
        method: 'PUT',
        url: proxyURL + '/users/' + userId,
        headers: {},
        form: user
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
  describe('When PATCH user with new data', function () {
    it('it should return all users', function (done) {
      var options = {
        method: 'PUT',
        url: proxyURL + '/users/' + userId,
        headers: {},
        form: { 'lastName': 'Smith' }
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
  describe('When DELETE new user', function () {
    it('it should delete specific user', function (done) {
      var options = {
        method: 'DELETE',
        url: proxyURL + '/users/' + userId
      }
      request(options, function (error, response, body) {
        if (error) {
          throw Error('Error calling API' + error)
        }
        expect(response.statusCode).to.equal(204)
        done()
      })
    })
  })
})