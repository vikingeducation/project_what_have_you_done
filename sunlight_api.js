const request = require('request')
const baseUri = 'https://congress.api.sunlightfoundation.com'

class SL {
  constructor (apiKey) {
    this.apiKey = apiKey
  }

  legByZip (callback) {
    this._sendRequest('legByZip', callback)
  }

  legRecord (callback) {
    this._sendRequest('legRecord', callback)
  }
}
