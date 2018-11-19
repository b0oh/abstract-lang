const { Id, Abs, App, fold, is_normal } = require('./term')
const JS = require('./js')

const Reductions = (() => {
  let reductions = 0

  const reset =
    () => {
      reductions = 0
      return undefined
    }

  const inc =
    () => {
      reductions = reductions + 1
      return undefined
    }

  const get =
    () =>
      reductions

  return { reset, inc, get }
})()

const beta =
  name => subst => term => {
    const is_id_eq =
      id1 => id2 =>
        JS.to_bool(Id.equal(id1)(id2))

    const var_folder =
      id => {
        if (is_id_eq(id)(name)) {
          Reductions.inc()
          return subst
        }
        else {
          return term
        }
      }

    const abs_folder =
      id => body => {
        if (is_id_eq(id)(name)) {
          return term
        }
        else {
          return Abs.make(id)(beta(name)(subst)(body))
        }
      }

    const app_folder =
      abs => arg =>
        App.make(
          beta(name)(subst)(abs))(
          beta(name)(subst)(arg))

    return fold(var_folder)(abs_folder)(app_folder)(term)
  }

const reduce_once =
  term => {
    const var_folder =
      _id =>
        term

    const abs_folder =
      id => body =>
        Abs.make(id)(reduce_once(body))

    const app_folder =
      abs => arg => {
        if (JS.to_bool(Abs.is(abs))) {
          const id = Abs.get_id(abs)
          const body = Abs.get_body(abs)
          return beta(id)(arg)(body)
        }
        else {
          return App.make(
            reduce_once(abs))(
            reduce_once(arg))
        }
      }

    return fold(var_folder)(abs_folder)(app_folder)(term)
  }

const normalise =
  term => {
    const reduced = reduce_once(term)

    if (JS.to_bool(is_normal(reduced))) {
      return reduced
    }
    else {
      return normalise(reduced)
    }
  }

module.exports = { Reductions, reduce_once, normalise }
