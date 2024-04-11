import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
	/**
	 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */

	interface Token {
		'id-user': IdUser;
		name: string;
		'system-admin': boolean;
		active: boolean;
		linkedin_url: string;
		profile_name: string;
		exp: number;
	}

	export interface IdUser {
		$oid: string;
	}

	interface User extends Token {
		accessToken: string;
	}

	interface Session {
		user: User;
		accessToken: string;
	}
}
