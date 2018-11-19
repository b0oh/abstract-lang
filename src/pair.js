const { constant, nil } = require('./comb')

const make =
  first => second => pair =>
    pair(first)(second)

const first =
  pair =>
    pair(constant)

const second =
  pair =>
    pair(nil)

module.exports = { make, first, second }
