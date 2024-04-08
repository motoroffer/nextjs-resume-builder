'use server';

import { signIn } from '../auth';

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
	} catch (error) {
		console.log("Error authenticating: ", error.message);
		throw error;
	}
};
