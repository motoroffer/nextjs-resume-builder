'use server';

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
