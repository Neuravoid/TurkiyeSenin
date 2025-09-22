import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-jwt-secret-change-me';

// Test token oluştur
const testPayload = {
  sub: 'test-user-id',
  email: 'admin@example.com',
  role: 'ADMIN'
};

const token = jwt.sign(testPayload, JWT_SECRET, { expiresIn: '7d' });
console.log('Generated token:', token);

// Token'ı doğrula
try {
  const verified = jwt.verify(token, JWT_SECRET);
  console.log('Verified payload:', verified);
} catch (error) {
  console.error('Token verification failed:', error);
}

// verifyToken fonksiyonunu test et
function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

const result = verifyToken(token);
console.log('verifyToken result:', result);