import { given, then } from 'test-fns';

import { asHashMd5 } from './asHashMd5';

describe('asHashMd5', () => {
  given('a known input string', () => {
    const input = 'hello world';
    const expected = '5eb63bbbe01eeed093cb22bb8f5acdc3'; // verified MD5 of 'hello world'

    then('it should return the correct md5 hash', async () => {
      const result = await asHashMd5(input);
      expect(result).toBe(expected);
    });
  });

  given('an empty string', () => {
    const input = '';
    const expected = 'd41d8cd98f00b204e9800998ecf8427e'; // verified MD5 of ''

    then('it should return the md5 hash of an empty string', async () => {
      const result = await asHashMd5(input);
      expect(result).toBe(expected);
    });
  });

  given('a unicode string', () => {
    const input = '你好世界';
    const expected = '65396ee4aad0b4f17aacd1c6112ee364'; // verified MD5 of '你好世界'

    then('it should return the correct md5 hash', async () => {
      const result = await asHashMd5(input);
      expect(result).toBe(expected);
    });
  });
});
