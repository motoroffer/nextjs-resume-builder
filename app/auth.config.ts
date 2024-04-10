import { NextApiRequest, NextApiResponse } from 'next';
import { NextAuthConfig, Session, User } from 'next-auth';
import { NextRequest } from 'next/server'; // Import NextRequest

export type AuthCallbackFunction = (
	req: NextRequest,
	res: NextApiResponse
) => Promise<boolean | Response> | boolean | Response;

export const authConfig = {
	providers: [],
	pages: {
		signIn: '/login',
	},
	callbacks: {
		authorized({ auth, request }: { auth: Session; request: NextRequest }) {
			const isLoggedIn = auth?.user;
			const isOnDashboard = request.nextUrl.pathname.startsWith('/dashboard');
			if (isOnDashboard) {
				if (isLoggedIn) return true;
				return false;
			} else if (isLoggedIn) {
				return Response.redirect(new URL('/dashboard', request.nextUrl));
			}
			return true;
		},
	},
};
