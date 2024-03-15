import { Schema, model, models } from 'mongoose';

export interface UserModel {
	username: string;
	email: string;
	password: string;
	img?: string;
	avatar?: string;
	isAdmin?: boolean;
	isActive?: boolean;
	phone?: string;
	address?: string;
	createdAt?: Date;
	updatedAt?: Date;
}

const userSchema = new Schema<UserModel>(
	{
		username: {
			type: String,
			required: true,
			unique: true,
			min: 3,
			max: 20,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		img: {
			type: String,
		},
		isAdmin: {
			type: Boolean,
			default: false,
		},
		isActive: {
			type: Boolean,
			default: true,
		},
		phone: {
			type: String,
		},
		address: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

export const User = models.User || model('User', userSchema);
