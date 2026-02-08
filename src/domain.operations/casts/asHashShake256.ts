import { shake256 } from '@noble/hashes/sha3.js';
import { bytesToHex } from '@noble/hashes/utils.js';

import type { Hash } from '@src/domain.objects/Hash';

/**
 * .what = converts a string into a shake256 hash with variable output length
 * .why = flexible-length digest for compact cache keys or extended fingerprints
 */
export const asHashShake256 = (
  message: string,
  options: { bytes: number } = { bytes: 32 },
): Hash => {
  // encode as utf-8
  const msgBytes = new TextEncoder().encode(message);

  // hash the message with variable output length
  const hashBytes = shake256(msgBytes, { dkLen: options.bytes });

  // convert to hex string
  return bytesToHex(hashBytes) as Hash;
};
