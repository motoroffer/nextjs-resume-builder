import NextAuth, { IdUser, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import axios from 'axios';
import qs from 'qs';
import { jwtDecode } from 'jwt-decode';

async function login(username: string, password: string) {
	try {
		const data = { username, password };
		const options = {
			method: 'POST',
			headers: { 'content-type': 'application/x-www-form-urlencoded' },
			data: qs.stringify(data),
			url: `${process.env.API_URL}/token`,
		};
		const res = await axios(options);
		const decoded: User = jwtDecode(res.data.access_token);
		decoded.accessToken = res.data.access_token;
		return decoded;
	} catch (error) {
		throw error;
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
					return null;
				}
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token['id-user'] = user['id-user'];
				token.name = user.name;
				token['system-admin'] = user['system-admin'];
				token.active = user.active;
				token.linkedin_url = user.linkedin_url;
				token.profile_name = user.profile_name;
				token.exp = user.exp;
				token.accessToken = user.accessToken;
			}
			return token;
		},
		async session({ session, token }) {
			if (token) {
				session.user.name = token.name as string;
				session.user['id-user'] = token['id-user'] as IdUser;
				session.user['system-admin'] = token['system-admin'] as boolean;
				session.user.active = token.active as boolean;
				session.user.linkedin_url = token.linkedin_url as string;
				session.user.profile_name = token.profile_name as string;
				session.user.exp = token.exp as number;
				session.user.accessToken = token.accessToken as string;
			}
			return session;
		},
	},
	session: {
		strategy: 'jwt',
		maxAge: 30 * 24 * 60 * 60, // 30 days
	},
});
