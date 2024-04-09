'use server';

import { AxiosError } from 'axios';
import { signIn } from '../auth';
import { AuthError, CredentialsSignin } from 'next-auth';

export const addUser = async (formData: FormData) => {
	const { username, email, password, phone, address, isAdmin, isActive } =
		Object.fromEntries(formData);

	try {
		//TODO: Add User Registration
	} catch (error) {
		console.log(error);
		throw new Error('Failed to create user');
	}
};

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
