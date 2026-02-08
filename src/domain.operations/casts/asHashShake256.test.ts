import { given, then } from 'test-fns';

import { asHashShake256 } from './asHashShake256';

describe('asHashShake256', () => {
  given('a basic message and default byte length', () => {
    const message = 'hello world';

    then('it returns a 64-character hex string (32 bytes)', () => {
      const hash = asHashShake256(message);
      expect(hash).toMatch(/^[a-f0-9]{64}$/);
    });
  });

  given('a message and custom output length', () => {
    const message = 'hello world';

    then('it returns a hex string of the correct length', () => {
      const hash16 = asHashShake256(message, { bytes: 16 });
      expect(hash16).toMatch(/^[a-f0-9]{32}$/); // 16 bytes * 2 hex chars

      const hash64 = asHashShake256(message, { bytes: 64 });
      expect(hash64).toMatch(/^[a-f0-9]{128}$/); // 64 bytes * 2 hex chars
    });
  });

  given('the same message twice', () => {
    const message = 'determinism check';

    then('both calls return the same hash', () => {
      const hash1 = asHashShake256(message);
      const hash2 = asHashShake256(message);
      expect(hash1).toBe(hash2);
    });
  });

  given('two different messages', () => {
    const a = 'message one';
    const b = 'message two';

    then('they produce different hashes', () => {
      const ha = asHashShake256(a);
      const hb = asHashShake256(b);
      expect(ha).not.toBe(hb);
    });
  });
});
