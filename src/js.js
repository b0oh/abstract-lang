const { true_, false_ } = require('./logic')

const to_int =
  nat =>
    nat(num => num + 1)(0)

const to_bool =
  term =>
    term(true)(false)

const from_bool =
  bool => {
    if (bool) {
      return true_
    }
    else {
      return false_
    }
  }

const from_string =
  string =>
    string

module.exports = { to_bool, from_bool, to_int, from_string }
