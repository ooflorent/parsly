# Parslet

> A small PEG based parser library.  
> An opinionated JavaScript port of [Parslet][parslet-gh] using [Parsimmon][parsimmon-gh].

[parslet-gh]: https://github.com/kschiess/parslet/
[parsimmon-gh]: https://github.com/jneen/parsimmon/

## API

### Atoms

- `alt(...parsers)`
- `seq(...parsers)`
- `match(expr)`
- `str(string)`
- `dynamic(fn)`
- `any()`
- `lazy(fn)`

### Chain

- `as(name)`
- `many()`
- `repeat(min, max)`
