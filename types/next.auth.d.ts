import { UserModel } from '@/app/lib/models';
import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
	/**
	 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	interface Session {
		user: UserModel;
	}

	interface User extends UserModel {}
}
