const { Id, Var, Abs, App } = require('./term')
const JS = require('./js')

const succ_id =
  Id.make(JS.from_string('succ'))

const zero_id =
  Id.make(JS.from_string('zero'))

const num_id =
  Id.make(JS.from_string('num'))

const inc_id =
  Id.make(JS.from_string('inc'))

// zero = succ zero -> zero
const zero =
  Abs.make(succ_id)(
    Abs.make(zero_id)(
      Var.make(zero_id)))

// inc = num succ zero -> succ (num succ zero)
const inc =
  Abs.make(num_id)(
    Abs.make(succ_id)(
      Abs.make(zero_id)(
        App.make(
          Var.make(succ_id))(
          App.make(
            App.make(
              Var.make(num_id))(
              Var.make(succ_id)))(
            Var.make(zero_id))))))

const one =
  App.make(inc)(zero)

const two =
  App.make(inc)(one)

// another_two = (inc -> inc (inc zero)) inc
const another_two =
      App.make(
        Abs.make(inc_id)(
          App.make(
            Var.make(inc_id))(
            App.make(
              Var.make(inc_id))(
              zero))))(
        inc)

module.exports = { one, two, another_two }
