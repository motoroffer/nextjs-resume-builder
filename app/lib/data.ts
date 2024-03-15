import { UserModel, User } from './models';
import { connectToDB } from './utils';

export const fetchUsers = async () => {
	try {
		await connectToDB();
		const users: UserModel[] = await User.find();
		return users;
	} catch (error) {
		console.log('err', error);
		throw new Error('Failed to fetch users');
	}
};
