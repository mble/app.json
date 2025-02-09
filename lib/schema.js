'use strict'

const schema = {
  properties: {
    name: {
      description:
        'A clean and simple name to identify the template (30 characters max).',
      type: 'string',
      minLength: 3,
      maxLength: 30,
      allowEmpty: false,
      example: 'Small Sharp Tool',
    },
    description: {
      description:
        "A brief summary of the app: what it does, who it's for, why it exists, etc.",
      type: 'string',
      example: 'This app does one little thing, and does it well.',
      maxLength: 140,
    },
    keywords: {
      description: 'An array of strings describing the app.',
      type: 'array',
      example: ['productivity', 'HTML5', 'scalpel'],
    },
    website: {
      description: "The project's website.",
      type: 'string',
      format: 'url',
      allowEmpty: false,
      example: 'https://small-sharp-tool.com/',
    },
    repository: {
      description: "The location of the application's source code.",
      type: 'string',
      format: 'url',
      allowEmpty: false,
      example: 'https://github.com/jane-doe/small-sharp-tool',
    },
    logo: {
      description: "The URL of the application's logo image.",
      type: 'string',
      format: 'url',
      allowEmpty: false,
      example: 'https://small-sharp-tool.com/logo.svg',
    },
    success_url: {
      description:
        'A URL specifying where to redirect the user once their new app is deployed.',
      type: 'string',
      allowEmpty: false,
      example: '/welcome',
    },
    scripts: {
      description:
        'A key-value object specifying scripts or shell commands to execute.',
      type: 'object',
      example: { postdeploy: 'bundle exec rake bootstrap' },
    },
    env: {
      description: 'A key-value object for environment variables.',
      type: 'object',
      example: {
        BUILDPACK_URL: 'https://github.com/stomita/heroku-buildpack-phantomjs',
        SECRET_TOKEN: {
          description:
            'A secret key for verifying the integrity of signed cookies.',
          generator: 'secret',
        },
        WEB_CONCURRENCY: {
          description: 'The number of processes to run.',
          value: '5',
        },
      },
    },
    addons: {
      description:
        'An array of strings specifying Heroku addons to provision on the app before deploying.',
      type: 'array',
      example: ['openredis', 'mongolab:shared-single-small'],
    },
    formation: {
      description:
        'An array of objects specifying dynos to scale on the app before deploying.',
      type: 'array',
      example: [
        { process: 'web', quantity: 1, size: 'standard-2X' },
        { process: 'worker', quantity: 1, size: 'standard-2X' },
      ],
    },
    buildpacks: {
      description:
        'An ordered array of objects specifying the buildpacks to be applied to this app',
      type: 'array',
      example: [
        { url: 'https://github.com/herkou/heroku-buildpack-ruby' },
        { url: 'https://github.com/herkou/heroku-buildpack-node-js' },
      ],
    },
  },
}

// Assemble an example schema
schema.example = Object.fromEntries(
  Object.entries(schema.properties).map(([key, value]) => [key, value.example]),
)

// Assemble a template-ready stringified version of the schema
schema.exampleJSON = JSON.stringify(schema.example, null, 2)

// Coerce schema properties into a template-friendly format
schema.propertiesArray = Object.entries(schema.properties).map(
  ([name, prop]) => {
    return {
      ...prop,
      name,
      requiredOrOptional: prop.required ? 'required' : 'optional',
      exampleJSON: JSON.stringify({ [name]: prop.example }, null, 2),
    }
  },
)

module.exports = schema
