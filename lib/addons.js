'use strict'

const async = require('async')
const superagent = require('superagent')
const addons = (module.exports = {})

addons.getPrices = (slugs, cb) => {
  if (!slugs || (Array.isArray(slugs) && slugs.length === 0)) {
    return cb(null, {
      plans: [],
      totalPrice: 'Free',
      totalPriceInCents: 0,
    })
  }

  async.map(slugs, addons.getPlan, (err, plans) => {
    if (err) return cb(err)

    const totalPriceInCents = plans.reduce(
      (sum, plan) => plan.price.cents + sum,
      0,
    )
    cb(null, {
      totalPriceInCents,
      totalPrice: formatPrice(totalPriceInCents),
      plans,
    })
  })
}

addons.getPlan = (slug, cb) => {
  if (slug.includes(':')) {
    const [addon, plan] = slug.split(':')

    superagent
      .get(`https://api.heroku.com/addon-services/${addon}/plans/${plan}`)
      .set('Accept', 'application/vnd.heroku+json; version=3')
      .end((err, res) => {
        if (err) return cb(err)
        if (res.statusCode === 404) return cb(res.body)

        const planData = res.body
        planData.prettyPrice = formatPrice(planData.price.cents)
        planData.logo = `https://addons.heroku.com/addons/${addon}/icons/original.png`

        cb(null, planData)
      })
  } else {
    superagent
      .get(`https://api.heroku.com/addon-services/${slug}/plans`)
      .set('Accept', 'application/vnd.heroku+json; version=3')
      .end((err, res) => {
        if (err) return cb(err)
        if (res.statusCode === 404) return cb(res.body)

        const planData = res.body.find(plan => plan.default)
        planData.prettyPrice = formatPrice(planData.price.cents)
        planData.logo = `https://addons.heroku.com/addons/${slug}/icons/original.png`

        cb(null, planData)
      })
  }
}

const formatPrice = price => (price === 0 ? 'Free' : `$${price / 100}/mo`)
