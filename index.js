const Term = require('./src/term')
const { one, two, another_two } = require('./src/sample')
const JS = require('./src/js')
const Function = require('./src/js/function')
const { Reductions, reduce_once, normalise } = require('./src/naive')
const { show, to_js } = require('./src/show')

console.log('< ' + show(one))

// let reduced = term
// for (let ix = 0; ix < 4; ix++) {
//   reduced = reduce_once(reduced)
//   console.log(show(reduced))
// }
// console.log('Reds: ' + Reductions.get())

// Reductions.reset()
// reduced = term
// while (!Codec.decode_bool(Term.is_normal(reduced))) {
//   reduced = reduce_once(reduced)
//   console.log(show(reduced))
// }
// console.log('Reds: ' + Reductions.get())

Reductions.reset()
const reduced0 = normalise(one)
console.log('> ' + show(reduced0))
console.log('Reductions: ' + Reductions.get())

const nat0 = Function.to(reduced0)
const num0 = JS.to_int(nat0)
console.log('Decoded: ' + num0)

console.log('-------')
console.log('< ' + show(two))

Reductions.reset()
const reduced1 = normalise(two)
console.log('> ' + show(reduced1))
console.log('Reductions: ' + Reductions.get())

const nat1 = Function.to(reduced1)
const num1 = JS.to_int(nat1)
console.log('Decoded: ' + num1)

console.log('-------')
console.log('< ' + show(another_two))

Reductions.reset()
const reduced2 = normalise(another_two)
console.log('> ' + show(reduced2))
console.log('Reductions: ' + Reductions.get())

const nat2 = Function.to(reduced2)
const num2 = JS.to_int(nat2)
console.log('Decoded: ' + num2)
