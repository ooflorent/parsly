# Parsly

> A small PEG based parser library.  
> An opinionated JavaScript port of [Parslet][parslet-gh].

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]

## Install

```sh
npm install --save parsly
```

## API

### Atoms

- `alt(...parsers)`
- `seq(...parsers)`
- `match(expr)`
- `str(string)`
- `any()`
- `custom(fn)`
- `lazy(fn)`

### Chain

- `as(name)`
- `maybe()`
- `many()`
- `times(n)`
- `repeat(min, max)`

[parslet-gh]: https://github.com/kschiess/parslet/

[npm-url]: https://npmjs.org/package/parsly
[npm-image]: http://img.shields.io/npm/v/parsly.svg

[travis-url]: https://travis-ci.org/ooflorent/parsly
[travis-image]: http://img.shields.io/travis/ooflorent/parsly.svg
