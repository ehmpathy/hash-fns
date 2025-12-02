/**
 * isomorphic web crypto provider
 *
 * returns the Web Crypto API (`crypto.subtle`) for the current environment
 * - in Node.js: uses `node:crypto.webcrypto`
 * - in browser: uses `window.crypto`
 */

let cachedCrypto: Crypto | null = null;

/**
 * returns the Web Crypto API implementation for the current environment
 */
export const getWebCrypto = async (): Promise<Crypto> => {
  if (cachedCrypto) return cachedCrypto;

  // check if we're in a browser environment
  if (
    typeof window !== 'undefined' &&
    typeof window.crypto !== 'undefined' &&
    typeof window.crypto.subtle !== 'undefined'
  ) {
    cachedCrypto = window.crypto;
    return cachedCrypto;
  }

  // check for globalThis.crypto (available in Node.js 19+ and modern runtimes)
  if (
    typeof globalThis !== 'undefined' &&
    typeof globalThis.crypto !== 'undefined' &&
    typeof globalThis.crypto.subtle !== 'undefined'
  ) {
    cachedCrypto = globalThis.crypto;
    return cachedCrypto;
  }

  // fallback to node:crypto.webcrypto
  try {
    const nodeCrypto = await import('crypto');
    if (nodeCrypto.webcrypto) {
      cachedCrypto = nodeCrypto.webcrypto as Crypto;
      return cachedCrypto;
    }
  } catch {
    // ignore and throw below
  }

  throw new Error(
    'No Web Crypto API available. Ensure you are running in Node.js 16+ or a browser with Web Crypto API support.',
  );
};
