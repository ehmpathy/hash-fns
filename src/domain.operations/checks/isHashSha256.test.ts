import { asUniDate } from '@ehmpathy/uni-time';
import { getError, given, then, when } from 'test-fns';

import { asHashSha256 } from '../casts/asHashSha256';
import { isHashSha256 } from './isHashSha256';

describe('isHashSha256', () => {
  given('a string', () => {
    const bestBirthday = asUniDate('2000-08-21');
    when('we hash it', () => {
      const hashed = asHashSha256(bestBirthday);
      then('it should be a sha256 hash', () => {
        expect(isHashSha256(hashed)).toBe(true);
      });
    });
  });

  given('a string that is not a sha256 hash', () => {
    const notAHash = 'not a hash';
    when('we assure that its a hash', () => {
      then('it should throw an error', () => {
        const error = getError(() => isHashSha256.assure(notAHash));
        console.log(error);
        expect(error.message).toContain(
          'assure.rejection: input does not satisfy type.check',
        );
      });
    });
  });
});
