# app.json [![Build Status](https://travis-ci.org/app-json/app.json.png?branch=master)](https://travis-ci.org/app-json/app.json)

`app.json` is a manifest format for describing web apps. It's a file in the root
directory of your app that describes build requirements, environment variables, addons,
and other information.

This repository contains the source for an npm module called
[app.json](https://www.npmjs.org/package/app.json), which has many facets:

- A JavaScript interface for creating, validating, and producing app.json manifests.
- A module that is designed to work in browsers and Node.js.

For more info about `app.json`, see

- [Introducing the app.json Application Manifest](https://blog.heroku.com/archives/2014/5/22/introducing_the_app_json_application_manifest)
- [app.json Schema](https://devcenter.heroku.com/articles/app-json-schema)
- [Setting Up Apps using the Platform API](https://devcenter.heroku.com/articles/setting-up-apps-using-the-heroku-platform-api)

## Programmatic usage with Node.js or Browserify

Download the module from npm and save it to your package.json:

```sh
npm install app.json --save
```

Require it in your script:

```js
var App = require('app.json')
```

### Usage in the Browser (without Browserify)

If browserify isn't your thing, use the pre-compiled browser-ready bundle in
[dist/app.json.js](/dist/app.json.js). Include this file in your html page and it will create
`window.App` for you.

You can also use Bower if that's your thing:

```sh
bower install app.json
```

## Schema

The app.json schema is defined using the [JSON Schema](http://json-schema.org/)
specification and is validated with the
[revalidator](https://github.com/flatiron/revalidator#readme) node module. View
the [raw schema](/lib/schema.js) or the auto-generated [app.json
Schema Documentation](https://devcenter.heroku.com/articles/app-json-schema) on Heroku Dev Center.

## Class Methods

### App.new(payload)

Instantiate with a JSON filename:

```js
var app = App.new(__dirname + '/path/to/app.json')
```

Instantiate with a JSON string:

```js
var json =
  '{name: "small-sharp-tool", description: "This app does one little thing, and does it well."}'
var app = App.new(json)
```

Instantiate with a JavaScript object:

```js
var app = App.new({
  name: 'small-sharp-tool',
  description: 'This app does one little thing, and does it well.',
})
```

### App.fetch(url, callback)

You can fetch app manifests straight from GitHub or Bitbucket. The
[app-json-fetcher](https://github.com/app-json/app-json-fetcher) service is used
to make the `app.json` file downloadable from browsers.

`url` can be a fully qualified repository URL or a shorthand string in the form `github:user/repo` or `bitbucket:user/repo`

```js
App.fetch('github:zeke/slideshow', function (err, manifest) {
  console.log(err, manifest)
})
```

### App.example

Generates an example manifest from `example` properties in the [schema](/schema.js).

```js
App.example
```

## Instance Methods

### app.valid

A getter method that validates the app manifest and returns `true` or `false`

### app.errors

Returns an array of error objects:

```js
;[
  { property: 'name', message: 'is required' },
  { property: 'website', message: 'is not a valid url' },
]
```

If the manifest is valid, an empty array is returned.

### app.toJSON

Returns a pretty JSON string of the manifest, minus any undocumented properties.

### app.getAddonPrices(callback)

Fetch pricing data about the app's required addons by hitting the Heroku Platform API.

## Contributing

See [CONTRIBUTING.md](/CONTRIBUTING.md)

## License

MIT
