import * as crypto from 'crypto';

import { Hash } from '../../domain/Hash';

/**
 * a simple function which converts a string into an sha256 hash
 *
 * ref
 * - https://stackoverflow.com/a/48161723/3068233
 */
export const toHashSha256 = async (message: string): Promise<Hash> => {
  // encode as UTF-8
  const msgBuffer = new TextEncoder().encode(message);

  // hash the message
  const hashBuffer = await crypto
    .createHash('sha256')
    .update(msgBuffer)
    .digest();

  // convert ArrayBuffer to Array
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  // convert bytes to hex string
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
  return hashHex as Hash;
};
