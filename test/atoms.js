import {expect} from 'chai'
import {alt, any, match, seq, str} from '../src/parser'

let atom

describe('Atoms', function() {
  describe(`alt(str('a'), str('b'), str('c'))`, function() {
    beforeEach(() => atom = alt(str('a'), str('b'), str('c')))

    it(`parses 'a'`, function() {
      expect(atom.parse('a')).to.equal('a')
    })

    it(`parses 'b'`, function() {
      expect(atom.parse('b')).to.equal('b')
    })

    it(`parses 'c'`, function() {
      expect(atom.parse('c')).to.equal('c')
    })

    it(`does not parse 'd'`, function() {
      expect(() => atom.parse('')).to.throw()
    })

    it(`does not parse '' (empty string)`, function() {
      expect(() => atom.parse('')).to.throw()
    })
  })

  describe(`any()`, function() {
    beforeEach(() => atom = any())

    it(`parses 'x'`, function() {
      expect(atom.parse('x')).to.equal('x')
    })

    it(`does not parse '' (empty string)`, function() {
      expect(() => atom.parse('')).to.throw()
    })

    it(`supports unicode`, function() {
      expect(atom.parse('✓')).to.equal('✓')
    })
  })

  describe(`match(/[ab]+/)`, function() {
    beforeEach(() => atom = match(/[ab]+/))

    it(`parses 'a'`, function() {
      expect(atom.parse('a')).to.equal('a')
    })

    it(`parses 'b'`, function() {
      expect(atom.parse('b')).to.equal('b')
    })

    it(`parses 'ab'`, function() {
      expect(atom.parse('ab')).to.equal('ab')
    })

    it(`parses 'aabbab'`, function() {
      expect(atom.parse('aabbab')).to.equal('aabbab')
    })

    it(`does not parse 'cab'`, function() {
      expect(() => atom.parse('cab')).to.throw()
    })

    it(`does not parse '' (empty string)`, function() {
      expect(() => atom.parse('')).to.throw()
    })
  })

  describe(`str('a')`, function() {
    beforeEach(() => atom = str('a'))

    it(`parses 'a'`, function() {
      expect(atom.parse('a')).to.equal('a')
    })

    it(`does not parse 'b'`, function() {
      expect(() => atom.parse('b')).to.throw()
    })

    it(`does not parse '' (empty string)`, function() {
      expect(() => atom.parse('')).to.throw()
    })

    it(`supports unicode`, function() {
      expect(str('✓').parse('✓')).to.equal('✓')
    })
  })

  describe(`seq(str('a'), str('b'), str('c'))`, function() {
    beforeEach(() => atom = seq(str('a'), str('b'), str('c')))

    it(`parses 'abc'`, function() {
      expect(atom.parse('abc')).to.equal('abc')
    })

    it(`does not parse 'abb'`, function() {
      expect(() => atom.parse('abb')).to.throw()
    })

    it(`does not parse 'cba'`, function() {
      expect(() => atom.parse('cba')).to.throw()
    })

    it(`does not parse '' (empty string)`, function() {
      expect(() => atom.parse('')).to.throw()
    })
  })

  describe(`seq(str('#'), match(/[0-9A-F]/i).times(3))`, function() {
    beforeEach(() => atom = seq(str('#'), match(/[0-9A-F]/i).times(3)))

    it(`parses '#f00'`, function() {
      expect(atom.parse('#f00')).to.equal('#f00')
    })
  })

  describe(`str('foo').as('bar')`, function() {
    beforeEach(() => atom = str('foo').as('bar'))

    it(`parses 'foo'`, function() {
      expect(atom.parse('foo')).to.eql({bar: 'foo'})
    })
  })

  describe(`seq(str('a').as('a'), str('b').as('b')).as('c')`, function() {
    beforeEach(() => atom = seq(str('a').as('a'), str('b').as('b')).as('c'))

    it(`parses 'ab'`, function() {
      expect(atom.parse('ab')).to.eql({c: {a: 'a', b: 'b'}})
    })
  })

  describe(`str('a').as('a').many()`, function() {
    beforeEach(() => atom = str('a').as('a').many())

    it(`parses 'aa'`, function() {
      expect(atom.parse('aa')).to.eql([{a: 'a'}, {a: 'a'}])
    })
  })
})

describe('Chaining', function() {
  describe(`any().maybe()`, function() {
    beforeEach(() => atom = any().maybe())

    it(`parses 'x'`, function() {
      expect(atom.parse('x')).to.equal('x')
    })

    it(`parses '' (empty string)`, function() {
      expect(atom.parse('')).to.equal('')
    })
  })

  describe(`any().many()`, function() {
    beforeEach(() => atom = any().many())

    it(`parses 'xxx…' (lots of 'x')`, function() {
      expect(atom.parse('x'.repeat(100))).to.have.length(100)
    })

    it(`parses '' (empty string)`, function() {
      expect(atom.parse('')).to.have.length(0)
    })
  })

  describe(`any().repeat(3)`, function() {
    beforeEach(() => atom = any().repeat(3))

    it(`parses 'xxx'`, function() {
      expect(atom.parse('xxx')).to.equal('xxx')
    })

    it(`parses 'xxx…' (lots of 'x')`, function() {
      expect(atom.parse('x'.repeat(100))).to.have.length(100)
    })

    it(`does not parse 'xx'`, function() {
      expect(() => atom.parse('xx')).to.throw()
    })
  })

  describe(`any().repeat(2, 3)`, function() {
    beforeEach(() => atom = any().repeat(2, 3))

    it(`parses 'xx'`, function() {
      expect(atom.parse('xx')).to.equal('xx')
    })

    it(`parses 'xxx'`, function() {
      expect(atom.parse('xxx')).to.equal('xxx')
    })

    it(`does not parse 'x'`, function() {
      expect(() => atom.parse('x')).to.throw()
    })
  })

  describe(`seq(str('a'), str('b')).many()`, function() {
    beforeEach(() => atom = seq(str('a'), str('b')).many())

    it(`parses 'abab'`, function() {
      expect(atom.parse('abab')).to.equal('abab')
    })

    it(`parses '' (empty string)`, function() {
      expect(atom.parse('')).to.have.length(0)
    })
  })
})
