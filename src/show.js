const { Abs, fold } = require('./term')
const JS = require('./js')

const show =
  term => {
    const show_abs_chain =
      term => {
        if (JS.to_bool(Abs.is(term))) {
          const id = Abs.get_id(term)
          const body = Abs.get_body(term)
          return `${id} ${show_abs_chain(body)}`
        }
        else {
          return `→ ${show(term)}`
        }
      }

    const var_folder =
      id =>
        id

    const abs_folder =
      _id => _body =>
        `(${show_abs_chain(term)})`

    const app_folder =
      abs => arg =>
        `(${show(abs)} ${show(arg)})`

    return fold(var_folder)(abs_folder)(app_folder)(term)
  }

const to_js =
  term => {
    const var_folder =
      id =>
        id

    const abs_folder =
      id => body =>
        `${id} => ${to_js(body)}`

    const app_folder =
      abs => arg =>
        `${to_js(abs)}(${to_js(arg)})`

    return fold(var_folder)(abs_folder)(app_folder)(term)
  }

module.exports = { show, to_js }
