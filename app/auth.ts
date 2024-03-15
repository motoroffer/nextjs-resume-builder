import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { authConfig } from './authConfig';
import { connectToDB } from './lib/utils';
import { User, UserModel } from './lib/models';
import bcrypt from 'bcrypt';

interface Credentials {
	username: string;
	password: string;
}

async function login(username: string, password: string) {
	try {
		await connectToDB();
		const user = await User.findOne({ username });

		if (!user) {
			throw new Error("Can't log in, wrong credentials");
		}

		const isPasswordCorrect = await bcrypt.compare(password, user.password);

		if (!isPasswordCorrect) {
			throw new Error("Can't log in, wrong credentials");
		}

		return user;
	} catch (error) {
		console.log(error);
		throw new Error('Fail to authenticate');
	}
}

export const { signIn, signOut, auth } = NextAuth({
	...authConfig,
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			async authorize(credentials) {
				try {
					const user = await login(
						credentials.username as string,
						credentials.password as string
					);
					return user;
				} catch (error) {
					throw error;
				}
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.username = user.username;
				token.email = user.email;
				token.isAdmin = user.isAdmin;
			}
			return token;
		},
		async session({ session, token }) {
			if (token) {
				session.user.username = token.username as string;
				session.user.email = token.email as string;
				session.user.isAdmin = token.isAdmin as boolean;
			}
			return session;
		},
	},
});
