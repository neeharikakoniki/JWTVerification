import { Base64 } from 'js-base64';

function base64url(input: string): string {
  return Base64.encode(input)
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

export const generateJWT = (payload: object, secret = 'mysecret') => {
  const header = { alg: 'HS256', typ: 'JWT' };

  const encodedHeader = base64url(JSON.stringify(header));
  const encodedPayload = base64url(JSON.stringify(payload));

  // Fake signature just for demo 
  const fakeSignature = base64url(`${encodedHeader}.${encodedPayload}.${secret}`);

  return `${encodedHeader}.${encodedPayload}.${fakeSignature}`;
};

export const decodeJWT = (token: string) => {
  try {
    const [_, payload] = token.split('.');
    return JSON.parse(Base64.decode(payload));
  } catch (error) {
    console.error('Decode error:', error);
    return null;
  }
};
