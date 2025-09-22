import crypto from 'crypto';

const QR_SECRET = process.env.QR_SECRET || 'dev-qr-secret-change-me';

export type QRPayload = {
  type: 'event_registration';
  registration_id: string;
  event_id: string;
  user_id: string;
  expires_at: string; // ISO
};

export function signQR(payload: QRPayload): string {
  const json = JSON.stringify(payload);
  const hmac = crypto.createHmac('sha256', QR_SECRET).update(json).digest('hex');
  const pack = { p: payload, s: hmac };
  return Buffer.from(JSON.stringify(pack)).toString('base64');
}

export function verifyQR(token: string): { valid: boolean; payload?: QRPayload; error?: string } {
  try {
    const decoded = JSON.parse(Buffer.from(token, 'base64').toString('utf8')) as { p: QRPayload; s: string };
    const json = JSON.stringify(decoded.p);
    const expected = crypto.createHmac('sha256', QR_SECRET).update(json).digest('hex');
    if (expected !== decoded.s) return { valid: false, error: 'invalid_signature' };

    if (Date.now() > new Date(decoded.p.expires_at).getTime()) return { valid: false, error: 'expired' };
    return { valid: true, payload: decoded.p };
  } catch (e) {
    return { valid: false, error: 'invalid_token' };
  }
}
