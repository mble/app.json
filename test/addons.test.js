"use strict";
var assert = require("assert");
var addons = require("../lib/addons");

describe("addons.getPlan()", function () {
  describe("with an addon:plan argument", function () {
    it("accepts an addon:plan string", function (done) {
      addons.getPlan("heroku-postgresql:essential-0", function (err, plan) {
        assert.equal(plan.name, "heroku-postgresql:essential-0");
        done();
      });
    });
  });

  describe("without a plan", function () {
    var plan = null;

    before(function (done) {
      addons.getPlan("heroku-postgresql", function (err, p) {
        plan = p;
        done();
      });
    });

    it("figures out the default plan", function () {
      assert.equal(plan.name, "heroku-postgresql:essential-0");
    });

    it("returns a pretty price", function () {
      assert.equal(plan.prettyPrice, "$5/mo");
    });

    it("returns a logo URL when given an addon:plan slug", function () {
      assert.equal(
        plan.logo,
        "https://addons.heroku.com/addons/heroku-postgresql/icons/original.png",
      );
    });

    it("returns a logo URL given a plan-free slug", function () {
      assert.equal(
        plan.logo,
        "https://addons.heroku.com/addons/heroku-postgresql/icons/original.png",
      );
    });
  });
});

describe("addons.getPrices()", function () {
  this.timeout(3000);

  describe("heroku-postgresql:essential-0", function () {
    var prices = null;

    before(function (done) {
      addons.getPrices(["heroku-postgresql:essential-0"], function (err, p) {
        prices = p;
        done();
      });
    });

    it("accepts an array and returns an object", function () {
      assert(typeof prices === "object");
      assert(!Array.isArray(prices));
      assert(Array.isArray(prices.plans));
    });

    it("returns an array of plans in the prices object", function () {
      assert(Array.isArray(prices.plans));
    });

    it("handles addon:plan formatted slugs", function () {
      assert.equal(prices.plans[0].name, "heroku-postgresql:essential-0");
      assert.equal(prices.plans[0].price.cents, 500);
      assert.equal(prices.plans[0].price.unit, "month");
    });

    it("returns a totalPrice in the prices object", function () {
      assert.equal(prices.plans[0].price.cents, 500);
      assert.equal(prices.totalPriceInCents, 500);
    });

    it("returns a human-friendly dollar amount total", function () {
      assert.equal(prices.totalPrice, "$5/mo");
    });
  });

  it("accepts an empty array", function (done) {
    addons.getPrices([], function (err, prices) {
      assert(Array.isArray(prices.plans));
      assert.equal(prices.totalPriceInCents, 0);
      assert.equal(prices.totalPrice, "Free");
      done();
    });
  });

  it("propagates errors for nonexistent addons", function (done) {
    addons.getPrices(["nonexistent-addon"], function (err, prices) {
      assert(err);
      done();
    });
  });

  it("propagates errors for nonexistent plans", function (done) {
    addons.getPrices(["heroku-postgresql:bad-plan"], function (err, res) {
      assert(err);
      assert.equal(err.status, 404);
      done();
    });
  });

  it("handles a long list of addons", function (done) {
    var slugs = ["heroku-redis", "heroku-postgresql", "heroku-kafka"];

    addons.getPrices(slugs, function (err, prices) {
      assert(!err);
      assert(prices.plans);
      assert(prices.totalPrice);
      assert.equal(typeof prices.totalPriceInCents, "number");
      done();
    });
  });

  it("returns a mocked response for a null slugs array", function (done) {
    addons.getPrices(null, function (err, prices) {
      assert(prices);
      assert.equal(prices.totalPrice, "Free");
      assert.equal(prices.totalPriceInCents, 0);
      assert(Array.isArray(prices.plans));
      assert.equal(prices.plans.length, 0);
      done();
    });
  });

  it("returns a mocked response for an empty slugs array", function (done) {
    addons.getPrices([], function (err, prices) {
      assert(prices);
      assert.equal(prices.totalPrice, "Free");
      assert.equal(prices.totalPriceInCents, 0);
      assert(Array.isArray(prices.plans));
      assert.equal(prices.plans.length, 0);
      done();
    });
  });
});
