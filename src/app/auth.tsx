import Credentials from 'next-auth/providers/credentials';
import { getUser } from './db';
import bcrypt from 'bcryptjs';
import { authConfig } from './auth.config';
import NextAuth from 'next-auth';

/**
 * Handles attempts for the user to login and any checks for credentials
 * during the current session
 */
export const {
	auth,
	handlers,
	signIn,
	signOut,
} = NextAuth({
	...authConfig,
	providers: [
		Credentials({
			name: 'credentials',
			credentials: {
				email: { label: 'email', type: 'text' },
				password: { label: 'password', type: 'password' },
			},
			async authorize(credentials) {
				const { email, password } = credentials;

				try {
					const user = await getUser(email as string);
					if (!user) return null;

					const passwordsMatch = await bcrypt.compare(
						password as string, user['password']
					);
					if (passwordsMatch) {
						return user;
					} else {
						return null;
					}
				} catch (error) {
					return null;
				}
			},
		}),
	],
});