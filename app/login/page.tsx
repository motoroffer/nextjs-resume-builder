'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { authenticate } from '../lib/actions';
import Link from 'next/link';

const formSchema = z.object({
	username: z.string().min(2, {
		message: 'Username must be at least 2 characters.',
	}),
	password: z.string().min(1, { message: 'Field is required' }),
});

export default function LoginPage() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: '',
			password: '',
		},
	});

	return (
		<div className='flex h-screen flex-col items-center justify-center gap-2'>
			<h4 className='font-bold'>Resume Builder Login</h4>
			<div className='w-[40%] space-y-8 rounded-md border-4 border-slate-800 border-opacity-35 bg-slate-900 p-4 pb-7 shadow-md shadow-slate-900'>
				<Form {...form}>
					<form
						className='flex flex-col gap-3'
						action={async (formData) => {
							const formReturn = await form.trigger();
							if (!formReturn) return;
							authenticate(formData);
							form.reset();
							return true; // prevent default form submission behavior
						}}
					>
						<FormField
							control={form.control}
							name='username'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Username</FormLabel>
									<FormControl>
										<Input
											placeholder='Type your username'
											{...form.register('username')}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='password'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input
											placeholder='Type your password'
											type='password'
											{...form.register('password')}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button
							type='submit'
							className='mt-1 w-[20%]'
							variant={'secondary'}
						>
							Login
						</Button>
					</form>
				</Form>
				<div className='mt-8 flex items-center justify-center text-xs'>
					<span>
						Don&apos;t have an account yet? <Link href={'/register'} className='underline'>Register instead</Link>
					</span>
				</div>
			</div>
		</div>
	);
}
