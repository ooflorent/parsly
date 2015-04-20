import {expect} from 'chai'
import flatten from '../src/flatten'

const tests = [
  // In absence of named subtrees
  // ----------------------------

  // Sequence or Repetition
  [ ['sequence', 'a', 'b'], 'ab' ],
  [ ['repetition', 'a', 'a'], 'aa' ],

  // Nested inside another node
  [ ['sequence', ['sequence', 'a', 'b']], 'ab' ],

  // Combined with lookahead (null)
  [ ['sequence', null, 'a'], 'a' ],

  // Including named subtrees
  // ------------------------

  // Named subtree
  [ {a: 'a'}, {a: 'a'} ],

  // Composition of subtrees
  [ ['sequence', {a: 'a'}, {b: 'b'}], {a: 'a', b: 'b'} ],

  // Mixed subtrees 'sequence' of 'repetition' yields []
  [ ['sequence', ['repetition', {a: 'a'}], {a: 'a'}], [{a: 'a'}, {a: 'a'}] ],
  [ ['sequence', {a: 'a'}, ['repetition', {a: 'a'}]], [{a: 'a'}, {a: 'a'}] ],
  [ ['sequence', ['repetition', {a: 'a'}], ['repetition', {a: 'a'}]], [{a: 'a'}, {a: 'a'}] ],

  // Repetition
  [ ['repetition', ['repetition', {a: 'a'}], ['repetition', {a: 'a'}]], [{a: 'a'}, {a: 'a'}] ],
  [ ['repetition', {a: 'a'}, 'a', {a: 'a'}], [{a: 'a'}, {a: 'a'}] ],
  [ ['repetition', {a: 'a'}, ['repetition', {b: 'b'}]], [{a: 'a'}] ],

  // Some random samples
  // --------------------

  [ ['sequence', {a: 'b', b: 'c'}], {a: 'b', b: 'c'} ],
  [ ['sequence', {a: 'b'}, 'a', {c: 'd'}], {a: 'b', c: 'd'} ],
  [ ['repetition', {a: 'b'}, 'a', {c: 'd'}], [{a: 'b'}, {c: 'd'}] ],
  [ ['sequence', {a: 'b'}, {a: 'd'}], {a: 'd'} ],
  [ ['sequence', {a: 'b'}, ['sequence', ['sequence', '\n', null]]], {a: 'b'} ],
  [ ['sequence', null, ' '], ' ' ],
]

describe('flatten', function() {
  tests.forEach(([input, output]) => {
    it(`transforms ${JSON.stringify(input)} to ${JSON.stringify(output)}`, function() {
      expect(flatten(input)).to.eql(output)
    })
  })
})
