'use strict'

const fs = require('fs')
const hogan = require('hogan.js')
const addons = require('./lib/addons')

const App = (module.exports = require('./lib/app'))

App.prototype.getAddonPrices = function (cb) {
  App.addons.getPrices(this.addons, (err, prices) => {
    if (err) return cb(err)
    this.prices = prices
    cb(null, prices)
  })
}

// Hogan Templates FTW
App.templates = {}
if (module.parent) {
  App.templates.app = hogan.compile(
    fs.readFileSync(`${__dirname}/templates/app.mustache.html`, 'utf8'),
  )
  App.templates.build = hogan.compile(
    fs.readFileSync(`${__dirname}/templates/build.mustache.html`, 'utf8'),
  )
  App.templates.schema = hogan.compile(
    fs.readFileSync(`${__dirname}/templates/schema.mustache.md`, 'utf8'),
  )
} else {
  App.templates.app = require('./templates/app.mustache.html')
  App.templates.build = require('./templates/build.mustache.html')
  App.templates.schema = require('./templates/schema.mustache.md')
}

App.addons = addons
