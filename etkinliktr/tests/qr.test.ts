import { describe, it, expect } from 'vitest';
import { signQR, verifyQR, type QRPayload } from '@/lib/qr';

describe('QR sign/verify', () => {
  it('verifies a valid token', () => {
    const payload: QRPayload = {
      type: 'event_registration',
      registration_id: 'r1',
      event_id: 'e1',
      user_id: 'u1',
      expires_at: new Date(Date.now() + 60_000).toISOString()
    };
    const token = signQR(payload);
    const res = verifyQR(token);
    expect(res.valid).toBe(true);
    expect(res.payload).toBeDefined();
    expect(res.payload?.event_id).toBe('e1');
  });

  it('fails on expiry', () => {
    const payload: QRPayload = {
      type: 'event_registration',
      registration_id: 'r1',
      event_id: 'e1',
      user_id: 'u1',
      expires_at: new Date(Date.now() - 1_000).toISOString()
    };
    const token = signQR(payload);
    const res = verifyQR(token);
    expect(res.valid).toBe(false);
    expect(res.error).toBe('expired');
  });
});
