import { Hash } from '../../domain/Hash';
import { getWebCrypto } from '../infra/getWebCrypto';

/**
 * a simple function which converts a string into an sha256 hash
 *
 * isomorphic: works in both Node.js and browser environments
 *
 * ref
 * - https://stackoverflow.com/a/48161723/3068233
 */
export const asHashSha256 = async (message: string): Promise<Hash> => {
  // encode as UTF-8
  const msgBuffer = new TextEncoder().encode(message);

  // hash the message
  const crypto = await getWebCrypto();
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

  // convert ArrayBuffer to Array
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  // convert bytes to hex string
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
  return hashHex as Hash;
};
