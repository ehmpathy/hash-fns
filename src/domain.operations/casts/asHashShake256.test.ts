import { given, then } from 'test-fns';

import { asHashShake256 } from './asHashShake256';

describe('asHashShake256', () => {
  given('a basic message and default byte length', () => {
    const message = 'hello world';

    then('it returns a 64-character hex string (32 bytes)', async () => {
      const hash = await asHashShake256(message);
      expect(hash).toMatch(/^[a-f0-9]{64}$/);
    });
  });

  given('a message and custom output length', () => {
    const message = 'hello world';

    then('it returns a hex string of the correct length', async () => {
      const hash16 = await asHashShake256(message, { bytes: 16 });
      expect(hash16).toMatch(/^[a-f0-9]{32}$/); // 16 bytes * 2 hex chars

      const hash64 = await asHashShake256(message, { bytes: 64 });
      expect(hash64).toMatch(/^[a-f0-9]{128}$/); // 64 bytes * 2 hex chars
    });
  });

  given('two different messages', () => {
    const a = 'message one';
    const b = 'message two';

    then('they produce different hashes', async () => {
      const ha = await asHashShake256(a);
      const hb = await asHashShake256(b);
      expect(ha).not.toBe(hb);
    });
  });
});
