const { to_js } = require('./../show')

const to =
  term =>
    eval(to_js(term))

// NOTE: Inspired by https://github.com/MaiaVictor/lambda-calculus/blob/c0880087ddc46957e66a691d2d296d4c7c7c5cef/lambda-calculus.js#L82
// TODO: MAKE IT WORK BLET
// TODO: think how to get rid of get_arg.is_app
// const from =
//       value => {
//         const normalize =
//               value => depth => {
//                 const app =
//                       variable => {
//                         const get_arg =
//                               arg => {
//                                 if (arg === null) {
//                                   return variable
//                                 }
//                                 else {
//                                   return app(depth =>
//                                     App.make(
//                                       variable(depth))(
//                                       normalize(arg)(depth)))
//                                 }
//                               }

//                         get_arg.is_app = true
//                         return get_arg
//                       }

//                 if (value.is_app) {
//                   return value(null)(depth)
//                 }
//                 else if (typeof value === 'function') {
//                   const qwe = app(shift => Var.make('x' + (shift - 1 - depth)))
//                   let body = normalize(value(qwe))(depth + 1)
//                   return Abs.make('yoba', body)
//                 }
//                 else {
//                   return value
//                 }
//               }

//         return normalize(value)(0)
//       }

module.exports = { to }
