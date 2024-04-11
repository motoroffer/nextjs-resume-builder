'use server';

import { User } from 'next-auth';
import { axiosAuth } from '../lib/axios';
import { auth } from '@/app/auth';
import axios, { AxiosError } from 'axios';

export async function getLinkedinProfile() {
	console.log('got here');
	const session = await auth();
	try {
		const { accessToken } = session?.user as User;
		const options = {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				Authorization: `Bearer ${accessToken}`,
			},
			url: `${process.env.API_URL}/profile`,
		};
		const res = await axios(options);
		console.log('res', res);
		return { data: res.data };
	} catch (error) {
		const axiosError = error as AxiosError;
		console.log('error', axiosError.message);
		console.log('headers', axiosError.config);
		return { error: 'Could not fetch linkedin profile!' };
	}
}
