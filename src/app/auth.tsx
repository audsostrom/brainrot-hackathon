import Credentials from 'next-auth/providers/credentials';
import { getUser } from './db';
import bcrypt from 'bcrypt';
import { authConfig } from './auth.config';
import NextAuth from 'next-auth';

/**
 * Handles attempts for the user to login and any checks for credentials
 * during the current session
 */
export const {
	handlers: {GET, POST},
	auth,
	signIn,
	signOut,
} = NextAuth({
	...authConfig,
	providers: [
		Credentials({
			async authorize({ email, password }: any) {
				try {
					const user = await getUser(email);
					if (!user) return null;
					const passwordsMatch = await bcrypt.compare(
						password, user['password']
					);
					if (passwordsMatch) {
						return {
							email: email,
							id: user['id'],
						};
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