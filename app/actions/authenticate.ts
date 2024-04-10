'use server';

import { AuthError } from 'next-auth';
import { signIn } from '../auth';

export const authenticate = async (formData: FormData) => {
	const { username, password } = Object.fromEntries(formData);
	try {
		await signIn('credentials', { username, password });
		return { success: true };
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case 'CredentialsSignin':
					return { error: 'Invalid credentials!' };

				default:
					return { error: 'Something went wrong!' };
			}
		}
		throw error;
	}
};
