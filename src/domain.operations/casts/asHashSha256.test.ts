import { given, then } from 'test-fns';

import { asHashSha256 } from './asHashSha256';

describe('asHashSha256', () => {
  given('a known input "hello world"', () => {
    const message = 'hello world';
    const expected =
      'b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9';

    then('it returns the canonical sha256 hash', () => {
      const hash = asHashSha256(message);
      expect(hash).toBe(expected);
    });
  });

  given('an empty string', () => {
    const message = '';
    const expected =
      'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';

    then('it returns the known sha256 of empty string', () => {
      const hash = asHashSha256(message);
      expect(hash).toBe(expected);
    });
  });

  given('a unicode string', () => {
    const message = '你好世界';

    then('it returns a valid 64-character hex hash', () => {
      const hash = asHashSha256(message);
      expect(hash).toMatch(/^[a-f0-9]{64}$/);
    });
  });

  given('the same message twice', () => {
    const message = 'determinism check';

    then('both calls return the same hash', () => {
      const hash1 = asHashSha256(message);
      const hash2 = asHashSha256(message);
      expect(hash1).toBe(hash2);
    });
  });

  given('two different messages', () => {
    const a = 'message one';
    const b = 'message two';

    then('they produce different hashes', () => {
      const ha = asHashSha256(a);
      const hb = asHashSha256(b);
      expect(ha).not.toBe(hb);
    });
  });
});
