[![CI](https://img.shields.io/github/actions/workflow/status/Tox1469/pipe-kit/ci.yml?style=flat-square&label=ci)](https://github.com/Tox1469/pipe-kit/actions)
[![License](https://img.shields.io/github/license/Tox1469/pipe-kit?style=flat-square)](LICENSE)
[![Release](https://img.shields.io/github/v/release/Tox1469/pipe-kit?style=flat-square)](https://github.com/Tox1469/pipe-kit/releases)
[![Stars](https://img.shields.io/github/stars/Tox1469/pipe-kit?style=flat-square)](https://github.com/Tox1469/pipe-kit/stargazers)

---

# pipe-kit

Builder fluente e type-safe de pipelines assíncronos.

## Instalação

```bash
npm install pipe-kit
```

## Uso

```ts
import { pipeline } from "pipe-kit";

const run = pipeline<string>()
  .pipe((s) => s.trim())
  .pipe(async (s) => JSON.parse(s))
  .tap((obj) => console.log(obj))
  .catch(() => ({}))
  .build();

const result = await run('  {"ok":true}  ');
```

## API

- `pipeline<T>()` cria um pipeline vazio
- `.pipe(step)` adiciona uma etapa
- `.tap(side)` efeito colateral
- `.filter(pred, fallback)`
- `.catch(handler)`
- `.build()` / `.execute(input)`

## Licença

MIT