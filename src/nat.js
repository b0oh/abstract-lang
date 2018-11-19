const { identity, constant, nil } = require('./comb')
const { and, is_nil } = require('./logic')

const zero =
  nil

const succ =
  num => succ => zero =>
    succ(num(succ)(zero))

const dec =
   num => succ => zero =>
     num(g => h => h(g(succ)))(
       constant(zero))(
       identity)

const minus =
  num1 => num2 =>
    num2(dec)(num1)

const is_zero =
  is_nil

const is_leq =
  num1 => num2 =>
    is_zero(minus(num1)(num2))

const equal =
  num1 => num2 =>
    and(
      is_leq(num1)(num2))(
      is_leq(num2)(num1))

module.exports = { zero, is_zero, succ, equal }
