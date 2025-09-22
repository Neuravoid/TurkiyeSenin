import { cookies } from 'next/headers';
import { verifyToken, type AuthToken } from '@/lib/auth';

/**
 * A server-side utility to verify if the current request is from an authenticated admin user.
 * It reads the token from cookies, verifies it, and checks the user's role.
 *
 * @returns {Promise<AuthToken>} The user's token payload if they are a valid admin.
 * @throws {Error} Throws an error with a specific message if authentication or authorization fails.
 */
export async function verifyAdminRequest(): Promise<AuthToken> {
  const tokenCookie = cookies().get('token');
  if (!tokenCookie) {
    throw new Error('Authentication required. No token provided.');
  }

  const userPayload = verifyToken(tokenCookie.value);
  if (!userPayload) {
    throw new Error('Invalid or expired token.');
  }

  if (userPayload.role !== 'ADMIN') {
    throw new Error('Forbidden. Admin privileges required.');
  }

  return userPayload;
}