# Parslet

> A small PEG based parser library.  
> An opinionated JavaScript port of [Parslet][parslet-gh].

[parslet-gh]: https://github.com/kschiess/parslet/

## Install

```sh
npm install --save parslet
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
