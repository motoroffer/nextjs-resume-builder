'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormDescription,
	FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const profileFormSchema = z.object({
	username: z
		.string()
		.min(2, {
			message: 'Username must be at least 2 characters.',
		})
		.max(30, {
			message: 'Username must not be longer than 30 characters.',
		}),
	email: z
		.string({
			required_error: 'Please select an email to display.',
		})
		.email(),
	bio: z.string().max(160).min(4),
	urls: z
		.array(
			z.object({
				value: z.string().url({ message: 'Please enter a valid URL.' }),
			})
		)
		.optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
	bio: 'I own a computer.',
	urls: [
		{ value: 'https://shadcn.com' },
		{ value: 'http://twitter.com/shadcn' },
	],
};

interface ProfileFormProps {
	linkedinData: any;
}

export default function ProfileForm({ linkedinData }: ProfileFormProps) {
	const form = useForm<ProfileFormValues>({
		resolver: zodResolver(profileFormSchema),
		defaultValues,
		mode: 'onChange',
	});

	function onSubmit(data: ProfileFormValues) {}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
				<FormField
					control={form.control}
					name='username'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Username</FormLabel>
							<FormControl>
								<Input placeholder='shadcn' {...field} />
							</FormControl>
							<FormDescription>
								This is your public display name. It can be your real name or a
								pseudonym. You can only change this once every 30 days.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input placeholder='shadcn' {...field} />
							</FormControl>
							<FormDescription>
								You can manage verified email addresses in your{' '}
								<Link href='/examples/forms'>email settings</Link>.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='bio'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Bio</FormLabel>
							<FormControl>
								<Textarea
									placeholder='Tell us a little bit about yourself'
									className='resize-none'
									{...field}
								/>
							</FormControl>
							<FormDescription>
								You can <span>@mention</span> other users and organizations to
								link to them.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type='submit'>Update profile</Button>
			</form>
		</Form>
	);
}
