const fs = require('fs')
const revalidator = require('revalidator')
const schema = require('./schema')
const yaml = require('js-yaml')

class App {
  constructor(raw) {
    if (typeof raw === 'string') {
      // Check if it's a JSON file
      if (/\.json$/i.test(raw)) {
        raw = fs.readFileSync(raw, 'utf8')
      }

      try {
        raw = yaml.load(raw)
      } catch (err) {
        throw new Error('Malformed JSON')
      }
    }

    Object.assign(this, raw)
  }

  get errors() {
    return revalidator.validate(this, schema).errors
  }

  get valid() {
    return revalidator.validate(this, schema).valid
  }

  get errorString() {
    return this.errors
      .map(error => `- ${error.property} ${error.message}`)
      .join('\n')
  }

  toJSON() {
    const validProps = new Set(Object.keys(schema.properties))
    const filteredProps = Object.keys(this)
      .filter(key => validProps.has(key))
      .reduce((acc, key) => {
        acc[key] = this[key]
        return acc
      }, {})

    return JSON.stringify(filteredProps, null, 2)
  }

  static new(raw) {
    return new App(raw)
  }
}

App.example = new App(schema.example)
App.schema = schema

module.exports = App
