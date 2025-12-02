# hash-fns

![test](https://github.com/ehmpathy/hash-fns/workflows/test/badge.svg)
![publish](https://github.com/ehmpathy/hash-fns/workflows/publish/badge.svg)

easily create, assess, and assure hashes within a pit-of-success

# install

```sh
npm install hash-fns
```

# use

for example

```ts
import { Hash, toHashSha256, isHashSha256 } from 'hash-fns';

// create a hash
const versionHash: Hash = await toHashSha256('some data');

// verify that a given value is a valid hash
const foundHash: Hash = isHashSha256.assure('__hash__');

// typeguard against random strings being passed as hashes
const expectHash: Hash = 'some string'; // 🛑 typescript will throw an error, since string is not assignable to Hash

// use a hash within functions that expect strings
const expectWords: string = await toHashSha256('some data'); // ✅ passes, as Hash is assignable to strings
```


## 🔧 mechs

### isomorphic

These operations work in both Node.js and browser environments via the Web Crypto API.

#### `asHashSha256(message: string): Promise<Hash>`

- **.what**: creates a 256-bit SHA-256 hash from a UTF-8 string
- **.why**: cryptographically secure hash for versioning, signatures, and data integrity

**example:**
```ts
const versionTag = await asHashSha256(JSON.stringify(configObject));
```

---

#### `isHashSha256(input: string): input is Hash`

- **.what**: typeguard that checks if a string is a valid SHA-256 hash (64 hex characters)
- **.why**: validate and narrow types for hash strings at runtime

**example:**
```ts
if (isHashSha256(userInput)) {
  // userInput is now typed as Hash
}

// or use .assure() to throw if invalid
const hash = isHashSha256.assure(userInput);
```

---

### node-only

These operations use Node.js-specific crypto APIs and are not available in browsers.

#### `asHashMd5(message: string): Promise<Hash>`

- **.what**: creates a 128-bit MD5 hash from a UTF-8 string
- **.why**: fast and compact for non-secure use cases like fingerprinting, deduplication, or cache busting

**example:**
```ts
const cacheKey = await asHashMd5('GET /api/resource?id=123');
```

---

#### `asHashShake256(message: string, options?: { bytes: number }): Promise<Hash>`

- **.what**: creates a variable-length cryptographic hash using SHAKE256 (Keccak sponge function)
- **.why**: ideal when you need a specific hash length, such as for compact tokens, extended fingerprints, or key material

**example:**
```ts
const customHash = await asHashShake256('some secret', { bytes: 64 }); // 512-bit output
```

---

#### `asHashSha256Sync(data: string): Hash`

- **.what**: synchronously creates a 256-bit SHA-256 hash from a string
- **.why**: when async is not suitable and you're in a Node.js environment

**example:**
```ts
const hash = asHashSha256Sync('some data');
```
