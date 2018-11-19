const { constant, nil } = require('./comb')

const true_ =
  constant

const false_ =
  nil

const and =
  pred1 => pred2 =>
    pred1(pred2)(pred1)

const or =
  pred1 => pred2 =>
    pred1(pred1)(pred2)

const not =
  pred =>
    pred(false_)(true_)

const is_nil =
  term =>
    term(constant(false_))(true_)

module.exports = { true_, false_, and, or, not, is_nil }
