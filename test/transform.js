import {assert, expect} from 'chai'
import Transform, {simple, sequence, subtree} from '../src/transform'

function A(x) { this.$A_x = x }
function B(y) { this.$B_y = y }

function testTransform(rules, cases) {
  const transform = new Transform(rules)
  cases.forEach(([input, output]) => {
    it(`transforms ${JSON.stringify(input)} into ${JSON.stringify(output)}`, function() {
      expect(transform.run(input)).to.eql(output)
    })
  })
}

describe('Transforms', function() {
  describe('simple()', function() {
    it('matches numbers', () => assert(simple(1)))
    it('matches strings', () => assert(simple('a')))
    it('matches booleans', () => assert(simple(false)))
    it('does not match `null`', () => assert(!simple(null)))
    it('does not match `undefined`', () => assert(!simple(void 0)))
    it('does not match objects', () => assert(!simple({})))
    it('does not match arrays', () => assert(!simple([])))
  })

  describe('sequence()', function() {
    it('does not match numbers', () => assert(!sequence(1)))
    it('does not match strings', () => assert(!sequence('a')))
    it('does not match booleans', () => assert(!sequence(false)))
    it('does not match `null`', () => assert(!sequence(null)))
    it('does not match `undefined`', () => assert(!sequence(void 0)))
    it('does not match objects', () => assert(!sequence({})))
    it('matches arrays', () => assert(sequence([])))
  })

  describe('subtree()', function() {
    it('matches numbers', () => assert(subtree(1)))
    it('matches strings', () => assert(subtree('a')))
    it('matches booleans', () => assert(subtree(false)))
    it('does not match `null`', () => assert(!subtree(null)))
    it('does not match `undefined`', () => assert(!subtree(void 0)))
    it('matches objects', () => assert(subtree({})))
    it('matches arrays', () => assert(subtree([])))
  })

  context('given `simple(node)`', function() {
    testTransform(
      [
        [
          (node) => simple(node),
          (node) => new A(node),
        ],
      ], [
        [ 'a', new A('a') ],
        [ ['a', 'b'], [new A('a'), new A('b')] ],
      ]
    )
  })

  context('given `simple(node.a)` and `simple(node.b)`', function() {
    testTransform(
      [
        [
          (node) => simple(node.a),
          (node) => new A(node.a),
        ], [
          (node) => simple(node.b),
          (node) => new B(node.b),
        ],
      ], [
        [ {d: {b: 'c'}}, {d: new B('c')} ],
        [ {a: {b: 'c'}}, new A(new B('c')) ],
      ]
    )
  })
})
