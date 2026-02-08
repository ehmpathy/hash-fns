# hash-fns

![test](https://github.com/ehmpathy/hash-fns/workflows/test/badge.svg)
![publish](https://github.com/ehmpathy/hash-fns/workflows/publish/badge.svg)

easily create, assess, and assure hashes within a pit-of-success

isomorphic — works on node, bun, deno, browsers, cloudflare workers, and react native. powered by [@noble/hashes](https://github.com/paulmillr/noble-hashes).

# install

```sh
npm install hash-fns
```

# use

for example

```ts
import { Hash, asHashSha256, isHashSha256 } from 'hash-fns';

// create a hash
const versionHash: Hash = asHashSha256('some data');

// verify that a given value is a valid hash
const foundHash: Hash = isHashSha256.assure('__hash__');

// typeguard against random strings passed as hashes
const expectHash: Hash = 'some string'; // 🛑 typescript will throw an error, since string is not assignable to Hash

// use a hash within functions that expect strings
const expectWords: string = asHashSha256('some data'); // ✅ passes, as Hash is assignable to strings
```


## 🔧 mechs

### `asHashSha256(message: string): Hash`

- **.what**: creates a 256-bit sha-256 hash from a utf-8 string
- **.why**: cryptographically secure hash for dedup, version tags, signatures, and data integrity

**example:**
```ts
const versionTag = asHashSha256(JSON.stringify(configObject));
```

---

### `asHashShake256(message: string, options?: { bytes: number }): Hash`

- **.what**: creates a variable-length cryptographic hash via shake256 (keccak sponge function)
- **.why**: ideal when you need a specific hash length, such as for compact cache keys or extended fingerprints

**example:**
```ts
const cacheKey = asHashShake256('some content', { bytes: 16 }); // 32-char hex (16 bytes)
const extended = asHashShake256('some content', { bytes: 64 }); // 128-char hex (64 bytes)
```

---

### `isHashSha256(input: string): input is Hash`

- **.what**: type guard that checks if a string is a valid 64-character hex sha-256 hash
- **.why**: validate hash format at runtime with compile-time type narrow

**example:**
```ts
if (isHashSha256(value)) {
  // value is now typed as Hash
}

// or fail fast
isHashSha256.assure(value); // throws if not a valid sha-256 hash
```
