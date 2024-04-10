export const formFields: {
	label: string;
	name: 'username' | 'phone' | 'address' | 'password';
	type: 'text' | 'email' | 'password';
	placeholder: string;
	flexAmount: string;
}[] = [
	{
		label: 'Username',
		name: 'username',
		type: 'text',
		placeholder: 'Create a username',
		flexAmount: '1',
	},
	{
		label: 'Password',
		name: 'password',
		type: 'password',
		placeholder: 'Create a password',
		flexAmount: '1',
	},
	// {
	// 	label: 'Email',
	// 	name: 'email',
	// 	type: 'email',
	// 	placeholder: 'Insert your email',
	// 	flexAmount: '1',
	// },
	{
		label: 'Phone',
		name: 'phone',
		type: 'text',
		placeholder: 'Insert your phone number',
		flexAmount: '1',
	},
	{
		label: 'Address',
		name: 'address',
		type: 'text',
		placeholder: 'Inform your address',
		flexAmount: '1',
	},
];
