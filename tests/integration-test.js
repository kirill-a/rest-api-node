/* eslint-env mocha */

var request = require('request')
var expect = require('chai').expect
var proxyURL = 'http://127.0.0.1:8000/api/users/'
var userId
var user = { 'firstName': 'Mike', 'lastName': 'Doug', 'jobTitle': 'Tester', 'isFulltime': false }
describe('Given we have REST API with users info', function () {
  describe('When POST new user', function () {
    it('it should return all users', function (done) {
      var options = {
        method: 'POST',
        url: proxyURL,
        headers: { 'Content-Type': 'application/json' },
        form: user
      }
      request(options, function (error, response, body) {
        if (error) {
          throw Error('Error calling API' + error)
        }
        expect(response.statusCode).to.equal(201)
        userId = JSON.parse(body)._id
        console.log(user)
        done()
      })
    })
  })
  describe('When GET users list', function () {
    it('it should return all users', function (done) {
      var options = {
        method: 'GET',
        url: proxyURL
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
  describe('When PUT user data with new first name', function () {
    it('it should update user with name Paul', function (done) {
      user.firstName = 'Paul'
      var options = {
        method: 'PUT',
        url: proxyURL + userId,
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
  describe('When PATCH user data with new last name', function () {
    it('it should update user with last name Smith', function (done) {
      var options = {
        method: 'PATCH',
        url: proxyURL + userId,
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
  describe('When GET specific user by ID', function () {
    it('it should return user info', function (done) {
      var options = {
        method: 'GET',
        url: proxyURL + userId
      }
      request(options, function (error, response, body) {
        if (error) {
          throw Error('Error calling API' + error)
        }
        expect(response.statusCode).to.equal(200)
        console.log(body)
        expect(JSON.parse(response.body).firstName).to.equal('Paul')
        expect(JSON.parse(response.body).lastName).to.equal('Smith')
        done()
      })
    })
  })
  describe('When DELETE new user', function () {
    it('it should delete specific user', function (done) {
      var options = {
        method: 'DELETE',
        url: proxyURL + userId
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
