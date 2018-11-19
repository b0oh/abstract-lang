const JS = require('./js')

const equal =
  str1 => str2 =>
    JS.from_bool(str1 === str2)

module.exports = { equal }
