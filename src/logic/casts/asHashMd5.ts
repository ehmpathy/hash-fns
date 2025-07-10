import * as crypto from 'crypto';

import { Hash } from '../../domain/Hash';

/**
 * a simple function which converts a string into an md5 hash
 */
export const asHashMd5 = async (message: string): Promise<Hash> => {
  // encode as UTF-8
  const msgBuffer = new TextEncoder().encode(message);

  // hash the message
  const hashBuffer = crypto.createHash('md5').update(msgBuffer).digest();

  // convert ArrayBuffer to Array
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  // convert bytes to hex string
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
  return hashHex as Hash;
};
