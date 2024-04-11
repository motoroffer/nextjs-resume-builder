import NextAuth, { NextAuthConfig } from 'next-auth';
import { authConfig } from './app/auth.config';

export default NextAuth(authConfig as NextAuthConfig).auth;

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
