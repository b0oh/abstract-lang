const { identity, constant, compose } = require('./comb')
const { true_, false_, and } = require('./logic')
const Pair = require('./pair')
const Nat = require('./nat')
const List = require('./list')
const String = require('./string')
const JS = require('./js')

const Tag = (() => {
  const init =
    Nat.succ(Nat.zero)

  const next =
    tag =>
      Nat.succ(tag)

  const equal =
    Nat.equal

  return { init, next, equal }
})()

const tag_with =
  tag => term =>
    Pair.make(tag)(term)

const untag =
  Pair.second

const is_tagged_with =
  tag => tagged =>
    Tag.equal(tag)(Pair.first(tagged))

const Id = (() => {
  const equal =
    String.equal

  const make =
    identity

  return { equal, make }
})()

const Var = (() => {
  const tag =
    Tag.init

  const is =
    is_tagged_with(tag)

  const make =
    id =>
      tag_with(tag)(id)

  const get_id = untag

  return { tag, is, make, get_id }
})()

const Abs = (() => {
  const tag =
    Tag.next(Var.tag)

  const is =
    is_tagged_with(tag)

  const make =
    id => body =>
      tag_with(tag)(Pair.make(id)(body))

  const make_chain =
    args => body => {
      const step =
        args => acc => {
          if (JS.to_bool(List.is_empty(args))) {
            return acc
          }
          else {
            const id = List.head(args)
            const rest = List.tail(args)
            return step(rest)(Abs.make(id)(acc))
          }
        }

      return step(List.reverse(args))(body)
    }

  const get_id =
    compose(Pair.first)(untag)

  const get_body =
    compose(Pair.second)(untag)

  return { tag, is, make, make_chain, get_id, get_body }
})()

const App = (() => {
  const tag =
    Tag.next(Abs.tag)

  const is =
    is_tagged_with(tag)

  const make =
    abs => arg =>
      tag_with(tag)(Pair.make(abs)(arg))

  const get_abs =
    compose(Pair.first)(untag)

  const get_arg =
    compose(Pair.second)(untag)

  return { tag, is, make, get_abs, get_arg }
})()

const fold =
  var_folder => abs_folder => app_folder => term => {
    if (JS.to_bool(Var.is(term))) {
      return var_folder(Var.get_id(term))
    }
    else if (JS.to_bool(Abs.is(term))) {
      return abs_folder(Abs.get_id(term))(Abs.get_body(term))
    }
    else if (JS.to_bool(App.is(term))) {
      return app_folder(App.get_abs(term))(App.get_arg(term))
    }
    else {
      console.log(term.toString())
      throw Error('absurd')
    }
  }

const is_normal =
  term => {
    const var_folder =
      constant(true_)

    const abs_folder =
      _id => body =>
        is_normal(body)

    const app_folder =
      abs => arg => {
        if (JS.to_bool(Abs.is(abs))) {
          return false_
        }
        else {
          return and(
            is_normal(abs))(
            is_normal(arg))
        }
      }

    return fold(var_folder)(abs_folder)(app_folder)(term)
  }

module.exports = {
  Id, Var, Abs, App, fold, is_normal
}
