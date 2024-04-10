'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { addUser } from '../actions/addUser';

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
import Link from 'next/link';
import { formFields } from './formFields';
import validator from 'validator';

const formSchema = z.object({
	username: z.string().min(4, {
		message: 'Username must be at least 4 characters.',
	}),
	// email: z
	// 	.string()
	// 	.min(1, { message: 'Field is required' })
	// 	.email({ message: 'Must be a valid email' }),
	phone: z.string().refine(validator.isMobilePhone, {
		message: 'Please insert a valid mobile phone number',
	}),
	address: z.string().min(1, { message: 'Field is required' }),
	password: z.string().min(1, { message: 'Field is required' }),
});

export default function RegisterPage() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: '',
			password: '',
			// email: '',
			phone: '',
			address: '',
		},
	});

	function resetForm() {
		form.reset();
		form.clearErrors();
		form.setFocus('username');
	}

	return (
		<div className='flex h-screen flex-col items-center justify-center gap-2'>
			<h4 className='font-bold'>Resume Builder Registration</h4>
			<div className='w-[40%] space-y-8 rounded-md border-4 border-slate-800 border-opacity-35 bg-slate-900 p-4 pb-7 shadow-md shadow-slate-900'>
				<Form {...form}>
					<form
						className='flex flex-col gap-3'
						action={async (formData) => {
							const formReturn = await form.trigger();
							if (!formReturn) return;
							addUser(formData);
							resetForm();
							return true; // prevent default form submission behavior
						}}
					>
						{formFields.map((formField) => {
							return (
								<FormField
									key={formField.name}
									control={form.control}
									name={formField.name}
									render={({ field }) => (
										<FormItem>
											<FormLabel>{formField.label}</FormLabel>
											<FormControl>
												<Input
													placeholder={formField.placeholder}
													type={formField.type}
													{...form.register(formField.name)}
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							);
						})}
						<div className='flex flex-row items-center justify-start gap-3'>
							<Button
								type='submit'
								className='mt-4 rounded px-4 py-2 font-bold transition-all ease-in'
								variant={'secondary'}
							>
								Register
							</Button>
							<Button
								type='reset'
								className='font-boldtransition-all mt-4 rounded px-4 py-2 ease-in'
								onClick={resetForm}
								variant='destructive'
							>
								Cancel
							</Button>
						</div>
					</form>
				</Form>
				<div className='mt-8 flex items-center justify-center text-xs'>
					<span>
						Already have an account?{' '}
						<Link href={'/login'} className='underline'>
							Login instead
						</Link>
					</span>
				</div>
			</div>
		</div>
	);
}
