const identity =
  same =>
    same

const constant =
  always => _never =>
    always

const nil =
  _always => never =>
    never

const compose =
  fun1 => fun2 => arg =>
    fun1(fun2(arg))

module.exports = { identity, constant, nil, compose }
