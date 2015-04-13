import {expect} from 'chai'
import {alt, any, match, seq, str} from '../src'

let atom

describe("Chaining", function() {
  describe("any().maybe()", function() {
    beforeEach(() => atom = any().maybe())

    it("parses 'x'", function() {
      expect(atom.parse('x')).to.equal('x')
    })

    it("parses '' (empty string)", function() {
      expect(atom.parse('')).to.equal('')
    })
  })

  describe("any().many()", function() {
    beforeEach(() => atom = any().many())

    it("parses 'xxx…' (lots of 'x')", function() {
      expect(atom.parse('x'.repeat(100))).to.have.length(100)
    })

    it("parses '' (empty string)", function() {
      expect(atom.parse('')).to.have.length(0)
    })
  })

  describe("any().repeat(3)", function() {
    beforeEach(() => atom = any().repeat(3))

    it("parses 'xxx'", function() {
      expect(atom.parse('xxx')).to.equal('xxx')
    })

    it("parses 'xxx…' (lots of 'x')", function() {
      expect(atom.parse('x'.repeat(100))).to.have.length(100)
    })

    it("does not parse 'xx'", function() {
      expect(() => atom.parse('xx')).to.throw()
    })
  })

  describe("any().repeat(2, 3)", function() {
    beforeEach(() => atom = any().repeat(2, 3))

    it("parses 'xx'", function() {
      expect(atom.parse('xx')).to.equal('xx')
    })

    it("parses 'xxx'", function() {
      expect(atom.parse('xxx')).to.equal('xxx')
    })

    it("does not parse 'x'", function() {
      expect(() => atom.parse('x')).to.throw()
    })
  })

  describe("seq(str('a'), str('b')).many()", function() {
    beforeEach(() => atom = seq(str('a'), str('b')).many())

    it("parses 'abab'", function() {
      expect(atom.parse('abab')).to.equal('abab')
    })

    it("parses '' (empty string)", function() {
      expect(atom.parse('')).to.have.length(0)
    })
  })
})
