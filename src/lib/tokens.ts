import { randomBytes, randomInt } from 'crypto';

export const token = (bytes = 24) => randomBytes(bytes).toString('base64url');

/** Short code without look-alike characters, for the send link. */
export function inviteCode(len = 8) {
  const alphabet = 'abcdefghjkmnpqrstuvwxyz23456789';
  let out = '';
  for (let i = 0; i < len; i++) out += alphabet[randomInt(alphabet.length)];
  return out;
}
