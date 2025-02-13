`app.json` is a manifest format for describing web apps. It declares environment
variables, addons, and other information required to run an app on Heroku. This
document describes the schema in detail.

## Example app.json

```json
{
  "name": "Small Sharp Tool",
  "description": "This app does one little thing, and does it well.",
  "keywords": [
    "productivity",
    "HTML5",
    "scalpel"
  ],
  "website": "https://small-sharp-tool.com/",
  "repository": "https://github.com/jane-doe/small-sharp-tool",
  "logo": "https://small-sharp-tool.com/logo.svg",
  "success_url": "/welcome",
  "scripts": {
    "postdeploy": "bundle exec rake bootstrap"
  },
  "env": {
    "BUILDPACK_URL": "https://github.com/stomita/heroku-buildpack-phantomjs",
    "SECRET_TOKEN": {
      "description": "A secret key for verifying the integrity of signed cookies.",
      "generator": "secret"
    },
    "WEB_CONCURRENCY": {
      "description": "The number of processes to run.",
      "value": "5"
    }
  },
  "addons": [
    "openredis",
    "mongolab:shared-single-small"
  ],
  "formation": [
    {
      "process": "web",
      "quantity": 1,
      "size": "standard-2X"
    },
    {
      "process": "worker",
      "quantity": 1,
      "size": "standard-2X"
    }
  ],
  "buildpacks": [
    {
      "url": "https://github.com/herkou/heroku-buildpack-ruby"
    },
    {
      "url": "https://github.com/herkou/heroku-buildpack-node-js"
    }
  ]
}
```

## Schema Reference


### name

_(string, optional)_ A clean and simple name to identify the template (30 characters max).

```json
{
  "name": "Small Sharp Tool"
}
```


### description

_(string, optional)_ A brief summary of the app: what it does, who it&#39;s for, why it exists, etc.

```json
{
  "description": "This app does one little thing, and does it well."
}
```


### keywords

_(array, optional)_ An array of strings describing the app.

```json
{
  "keywords": [
    "productivity",
    "HTML5",
    "scalpel"
  ]
}
```


### website

_(string, optional)_ The project&#39;s website.

```json
{
  "website": "https://small-sharp-tool.com/"
}
```


### repository

_(string, optional)_ The location of the application&#39;s source code.

```json
{
  "repository": "https://github.com/jane-doe/small-sharp-tool"
}
```


### logo

_(string, optional)_ The URL of the application&#39;s logo image.

```json
{
  "logo": "https://small-sharp-tool.com/logo.svg"
}
```


### success_url

_(string, optional)_ A URL specifying where to redirect the user once their new app is deployed.

```json
{
  "success_url": "/welcome"
}
```


### scripts

_(object, optional)_ A key-value object specifying scripts or shell commands to execute.

```json
{
  "scripts": {
    "postdeploy": "bundle exec rake bootstrap"
  }
}
```


### env

_(object, optional)_ A key-value object for environment variables.

```json
{
  "env": {
    "BUILDPACK_URL": "https://github.com/stomita/heroku-buildpack-phantomjs",
    "SECRET_TOKEN": {
      "description": "A secret key for verifying the integrity of signed cookies.",
      "generator": "secret"
    },
    "WEB_CONCURRENCY": {
      "description": "The number of processes to run.",
      "value": "5"
    }
  }
}
```


### addons

_(array, optional)_ An array of strings specifying Heroku addons to provision on the app before deploying.

```json
{
  "addons": [
    "openredis",
    "mongolab:shared-single-small"
  ]
}
```


### formation

_(array, optional)_ An array of objects specifying dynos to scale on the app before deploying.

```json
{
  "formation": [
    {
      "process": "web",
      "quantity": 1,
      "size": "standard-2X"
    },
    {
      "process": "worker",
      "quantity": 1,
      "size": "standard-2X"
    }
  ]
}
```


### buildpacks

_(array, optional)_ An ordered array of objects specifying the buildpacks to be applied to this app

```json
{
  "buildpacks": [
    {
      "url": "https://github.com/herkou/heroku-buildpack-ruby"
    },
    {
      "url": "https://github.com/herkou/heroku-buildpack-node-js"
    }
  ]
}
```

