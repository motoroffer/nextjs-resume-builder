'use client';

import { useForm } from 'react-hook-form';
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
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const linkedinFormSchema = z.object({
	linkedinUrl: z.string().url({ message: 'Please enter a valid URL.' }),
});
type LinkedinFormValues = z.infer<typeof linkedinFormSchema>;

export default function LinkedinForm() {
	const linkedinForm = useForm<LinkedinFormValues>({
		resolver: zodResolver(linkedinFormSchema),
		mode: 'onChange',
	});

	return (
		<Form {...linkedinForm}>
			<form onSubmit={() => {}} className='space-y-8'>
				<FormField
					control={linkedinForm.control}
					name='linkedinUrl'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Linkedin URL</FormLabel>
							<FormControl>
								<Input placeholder='shadcn' {...field} />
							</FormControl>
							<FormDescription>
								You must input your linkedin URL here if you have not done it
								previously in registration so we can grab and enhance your
								experiences.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
			</form>
		</Form>
	);
}
