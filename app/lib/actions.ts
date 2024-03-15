'use server';

import { signIn } from '../auth';
import { User } from './models';
import { connectToDB } from './utils';
import bcrypt from 'bcrypt';

export const addUser = async (formData: FormData) => {
	const { username, email, password, phone, address, isAdmin, isActive } =
		Object.fromEntries(formData);

	try {
		await connectToDB();

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password as string, salt);
		const newUser = new User({
			username,
			email,
			password: hashedPassword,
			phone,
			address,
			isAdmin,
			isActive,
		});
		await newUser.save();
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
