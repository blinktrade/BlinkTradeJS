/* eslint-disable no-var */
/* eslint-disable no-bitwise */
/* eslint-disable no-param-reassign */
/* eslint-disable no-fallthrough */
/* eslint-disable no-underscore-dangle */
/* eslint-disable default-case */
/*
 * ByteArray enconding from google-closure-library
 */

const SEED32 = 314159265;
const CONSTANT32 = -1640531527;

/**
 * Performs an inplace mix of an object with the integer properties (a, b, c)
 * and returns the final value of c.
 * @param {Object} mix Object with properties, a, b, and c.
 * @return {number} The end c-value for the mixing.
 * @private
 */
const mix32_ = (mix) => {
  var a = mix.a;
  var b = mix.b;
  var c = mix.c;
  a -= b;
  a -= c;
  a ^= c >>> 13;
  b -= c;
  b -= a;
  b ^= a << 8;
  c -= a;
  c -= b;
  c ^= b >>> 13;
  a -= b;
  a -= c;
  a ^= c >>> 12;
  b -= c;
  b -= a;
  b ^= a << 16;
  c -= a;
  c -= b;
  c ^= b >>> 5;
  a -= b;
  a -= c;
  a ^= c >>> 3;
  b -= c;
  b -= a;
  b ^= a << 10;
  c -= a;
  c -= b;
  c ^= b >>> 15;
  mix.a = a;
  mix.b = b;
  mix.c = c;
  return c;
};

/**
 * Converts an unsigned "byte" to signed, that is, convert a value in the range
 * (0, 2^8-1) to (-2^7, 2^7-1) in order to be compatible with Java's byte type.
 * @param {number} n Unsigned "byte" value.
 * @return {number} Signed "byte" value.
 * @private
 */
const toSigned_ = (n) => {
  return n > 127 ? n - 256 : n;
};

const wordAt_ = (bytes, offset) => {
  var a = toSigned_(bytes[offset + 0]);
  var b = toSigned_(bytes[offset + 1]);
  var c = toSigned_(bytes[offset + 2]);
  var d = toSigned_(bytes[offset + 3]);
  return a + (b << 8) + (c << 16) + (d << 24);
};

/**
 * Hashes a "byte" array to a 32-bit value using the supplied seed.
 */
export function encodeByteArray(bytes) {
  var offset = 0;
  var length = bytes.length;
  var seed = SEED32;

  var mix = {
    a: CONSTANT32,
    b: CONSTANT32,
    c: seed,
  };

  var keylen;
  for (keylen = length; keylen >= 12; keylen -= 12, offset += 12) {
    mix.a += wordAt_(bytes, offset);
    mix.b += wordAt_(bytes, offset + 4);
    mix.c += wordAt_(bytes, offset + 8);
    mix32_(mix);
  }
  // Hash any remaining bytes
  mix.c += length;
  switch (keylen) {  // deal with rest.  Some cases fall through
    case 11:
      mix.c += (bytes[offset + 10]) << 24;
    case 10:
      mix.c += (bytes[offset + 9] & 0xff) << 16;
    case 9:
      mix.c += (bytes[offset + 8] & 0xff) << 8;
    // the first byte of c is reserved for the length
    case 8:
      mix.b += wordAt_(bytes, offset + 4);
      mix.a += wordAt_(bytes, offset);
      break;
    case 7:
      mix.b += (bytes[offset + 6] & 0xff) << 16;
    case 6:
      mix.b += (bytes[offset + 5] & 0xff) << 8;
    case 5:
      mix.b += (bytes[offset + 4] & 0xff);
    case 4:
      mix.a += wordAt_(bytes, offset);
      break;
    case 3:
      mix.a += (bytes[offset + 2] & 0xff) << 16;
    case 2:
      mix.a += (bytes[offset + 1] & 0xff) << 8;
    case 1:
      mix.a += (bytes[offset + 0] & 0xff);
      // case 0 : nothing left to add
  }
  return mix32_(mix);
}
