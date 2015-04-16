// Atoms
// -----

import Custom from './atoms/custom'
import Lazy from './atoms/lazy'
import Alternative from './atoms/alternative'
import Sequence from './atoms/sequence'
import ExprAny from './atoms/expr_any'
import ExprRe from './atoms/expr_re'
import ExprStr from './atoms/expr_str'

// Export Atom API
export const alt = (...parsers) => new Alternative(parsers)
export const seq = (...parsers) => new Sequence(parsers)
export const custom = (fn) => new Custom(fn)
export const lazy = (fn) => new Lazy(fn)
export const any = () => new ExprAny()
export const str = (string) => new ExprStr(string)
export const match = (regex) => new ExprRe(regex)

// Chains
// ------

import Atom from './atoms/base'
import methods from './atoms/dsl'

// Export Chain API
export const _ = Atom.prototype

// Install chainable methods
for (let name in methods) {
  _[name] = methods[name]
}
