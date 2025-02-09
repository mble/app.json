"use strict";

var fs = require("fs");
var hogan = require("hogan.js");
var addons = require("./lib/addons");

var App = (module.exports = require("./lib/app"));

App.prototype.getAddonPrices = function (cb) {
  var _this = this;
  App.addons.getPrices(this.addons, function (err, prices) {
    if (err) return cb(err);
    _this.prices = prices;
    cb(null, prices);
  });
};

// Hogan Templates FTW
App.templates = {};
if (module.parent) {
  App.templates.app = hogan.compile(
    fs.readFileSync(__dirname + "/templates/app.mustache.html").toString(),
  );
  App.templates.build = hogan.compile(
    fs.readFileSync(__dirname + "/templates/build.mustache.html").toString(),
  );
  App.templates.schema = hogan.compile(
    fs.readFileSync(__dirname + "/templates/schema.mustache.md").toString(),
  );
} else {
  App.templates.app = require("./templates/app.mustache.html");
  App.templates.build = require("./templates/build.mustache.html");
  App.templates.schema = require("./templates/schema.mustache.md");
}

App.addons = addons;
