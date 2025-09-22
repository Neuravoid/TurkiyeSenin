import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET;

// This check is crucial. It ensures the application won't even start
// without the secret, preventing silent authentication failures.
if (!JWT_SECRET) {
  console.error("FATAL ERROR: JWT_SECRET environment variable is not defined.");
  throw new Error('JWT_SECRET environment variable must be set');
}

export type AuthToken = {
  sub: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
};

export function signToken(payload: { sub: string; email: string; role: string }, expiresIn: string = '7d') {
  return jwt.sign(payload, JWT_SECRET!, { expiresIn });
}

export function verifyToken(token: string): AuthToken | null {
  try {
    // Explicitly type the decoded payload to our AuthToken type
    const decoded = jwt.verify(token, JWT_SECRET!) as jwt.JwtPayload & AuthToken;
    return decoded;
  } catch (error) {
    // Log the specific error for easier debugging in your server logs
    console.error('JWT Verification Failed:', error instanceof Error ? error.message : 'Unknown error');
    return null;
  }
}

export async function authenticate(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return null;

  const passwordMatch = await bcrypt.compare(password, user.passwordHash);
  if (!passwordMatch) return null;

  return { id: user.id, email: user.email, role: user.role };
}
