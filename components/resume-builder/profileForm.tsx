'use client';

import FormInput from '@/components/ui/formInput';
import FormTextArea from '@/components/ui/formTextArea';
import { Experience } from '@/types/experience';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../ui/button';
import DatePicker from '../ui/datepicker';
import { Form, FormField } from '../ui/form';

const profileFormSchema = z.object({
	fullName: z.string().min(4, {
		message: 'Your full name must contain at least 4 characters.',
	}),
	headline: z.string().optional(),
	bio: z.string().optional(),
	urls: z
		.array(
			z.object({
				value: z.string().url({ message: 'Please enter a valid URL.' }),
			})
		)
		.optional(),
	experiences: z
		.array(
			z.object({
				company: z
					.string()
					.min(2, 'Company name must be at least 2 characters'),
				title: z.string().min(2, 'Title must be at least 2 characters'),
				startDate: z.date().optional().nullable(),
				endDate: z.date().optional().nullable(),
				description: z.string().optional(),
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

export default function ProfileForm({ linkedinData = {} }: ProfileFormProps) {
	const form = useForm<ProfileFormValues>({
		resolver: zodResolver(profileFormSchema),
		defaultValues,
		mode: 'onChange',
	});

	const {
		control,
		register,
		watch,
		formState: { errors },
	} = form;
	const experiences = watch('experiences', []) as Experience[]; // Get initial experiences or empty array

	function addExperience() {
		form.setValue('experiences', [
			...experiences,
			{
				company: '',
				title: '',
				startDate: null,
				endDate: null,
				description: '',
			},
		]);
	}

	function removeExperience(index: number) {
		form.setValue(
			'experiences',
			experiences.filter((_, i) => i !== index)
		);
	}

	function onSubmit(data: ProfileFormValues) {}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
				<FormField
					control={form.control}
					name='fullName'
					render={({ field }) => (
						<FormInput
							field={field}
							label='Full Name'
							placeholder='Insert your full name...'
						/>
					)}
				/>
				<FormField
					control={form.control}
					name='headline'
					render={({ field }) => (
						<FormInput
							field={field}
							label='Headline'
							placeholder='Insert your headline...'
						/>
					)}
				/>
				<FormField
					control={form.control}
					name='bio'
					render={({ field }) => (
						<FormTextArea
							field={field}
							label='Bio'
							placeholder='Insert a brief biography/description about you and your skills'
						/>
					)}
				/>
				<Button
					type='button'
					variant={'outline'}
					onClick={() => {
						addExperience();
					}}
				>
					+ Add Experience
				</Button>
				<ul className='experience-list'>
					{experiences.map((experience, index) => (
						<li key={index} className='mt-4'>
							<FormField
								control={form.control}
								name={`experiences.${index}.company`}
								render={({ field }) => (
									<FormInput
										field={field}
										label='Company'
										placeholder='Insert your company...'
									/>
								)}
							/>
							<FormField
								control={form.control}
								name={`experiences.${index}.title`}
								render={({ field }) => (
									<FormInput
										field={field}
										label='Title'
										placeholder='Insert your job title...'
									/>
								)}
							/>
							<Controller
								control={control}
								name={`experiences.${index}.startDate`}
								render={({ field }) => <DatePicker field={field} />}
							/>

							{/* Add similar FormItems for startDate, endDate, and description if needed */}
							<button type='button' onClick={() => removeExperience(index)}>
								Remove
							</button>
						</li>
					))}
				</ul>
				<Button type='submit'>Update profile</Button>
			</form>
		</Form>
	);
}
