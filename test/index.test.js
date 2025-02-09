'use strict'
var fs = require('fs')
var assert = require('assert')
var cheerio = require('cheerio')
const { marked } = require('marked')
var App = require('..')
var app
var payload

describe('App', function () {
  beforeEach(function () {
    app = null
    payload = JSON.parse(
      fs.readFileSync(__dirname + '/fixtures/valid/app.json'),
    )
  })

  describe('.getAddonPrices()', function () {
    it('fetches a remote list of addons and their total price', function (done) {
      payload.addons = [
        'heroku-postgresql:essential-0',
        'heroku-postgresql:essential-1',
      ]
      app = App.new(payload)
      assert(app.valid)
      app.getAddonPrices(function (err, prices) {
        assert(prices)
        assert(prices.totalPrice)
        assert(prices.totalPriceInCents)
        done()
      })
    })

    it('attaches a prices property to the app object', function (done) {
      payload.addons = [
        'heroku-postgresql:essential-0',
        'heroku-postgresql:essential-1',
      ]
      app = App.new(payload)
      assert(app.valid)
      app.getAddonPrices(function (err, prices) {
        assert(app.prices)
        done()
      })
    })

    it("returns a mocked response for apps that don't have addons", function (done) {
      delete payload.addons
      app = App.new(payload)
      assert(app.valid)
      app.getAddonPrices(function (err, prices) {
        assert(prices)
        assert.equal(prices.totalPrice, 'Free')
        assert.equal(prices.totalPriceInCents, 0)
        assert(Array.isArray(prices.plans))
        assert.equal(prices.plans.length, 0)
        done()
      })
    })
  })

  describe('App.templates', function () {
    it('is an object', function () {
      assert(App.templates)
      assert.equal(typeof App.templates, 'object')
    })

    describe('app', function () {
      it('exists', function () {
        assert(App.templates.app)
      })

      it('renders app name in an H2 tag', function () {
        const rendered = App.templates.app.render(App.example)
        const $ = cheerio.load(rendered)
        assert.equal($('h2').text().trim(), App.example.name)
      })
    })

    describe('build', function () {
      it('exists', function () {
        assert(App.templates.build)
      })
    })

    describe('schema', function () {
      it('exists', function () {
        assert(App.templates.schema)
      })

      it('produces github-formatted markdown instead of HTML', function () {
        const templ = App.templates.schema.render(App.schema)
        const html = marked.parse(templ)
        var $ = cheerio.load(html)
        assert.equal($('h2').first().text(), 'Example app.json')
        assert.equal($('h2').last().text(), 'Schema Reference')
      })
    })
  })
})
