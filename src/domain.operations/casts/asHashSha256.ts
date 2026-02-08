import { sha256 } from '@noble/hashes/sha2.js';
import { bytesToHex } from '@noble/hashes/utils.js';

import type { Hash } from '@src/domain.objects/Hash';

/**
 * .what = converts a string into a sha256 hash
 * .why = deterministic content fingerprint for dedup, integrity, and cache keys
 */
export const asHashSha256 = (message: string): Hash => {
  // encode as utf-8
  const msgBytes = new TextEncoder().encode(message);

  // hash the message
  const hashBytes = sha256(msgBytes);

  // convert to hex string
  return bytesToHex(hashBytes) as Hash;
};
