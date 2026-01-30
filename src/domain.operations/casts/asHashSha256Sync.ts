import crypto from 'crypto';

import type { Hash } from '@src/domain.objects/Hash';

/**
 * hashes a string w/ sha256
 *
 * note
 * - sync version is only available in node env
 *
 * ref
 * - https://stackoverflow.com/a/27970509/3068233
 */
export const asHashSha256Sync = (data: string): Hash =>
  crypto.createHash('sha256').update(data).digest('hex') as Hash;
