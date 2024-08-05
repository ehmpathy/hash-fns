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
