import * as crypto from 'crypto';

import { Hash } from '../../domain/Hash';

/**
 * a simple function which converts a string into a shake256 hash
 *
 * shake256 supports arbitrary output length (in bytes)
 *
 * ref:
 * - https://nodejs.org/api/crypto.html#crypto-createthehashalgorithm-options
 */
export const asHashShake256 = async (
  message: string,
  options: { bytes: number } = { bytes: 32 }, // default to 32 bytes (256 bits)
): Promise<Hash> => {
  // encode as UTF-8
  const msgBuffer = new TextEncoder().encode(message);

  // hash the message using shake256
  const hashBuffer = await crypto
    .createHash('shake256', { outputLength: options.bytes })
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
