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
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { FormLabel } from '@/components/ui/form';
import { TrashIcon } from '@heroicons/react/20/solid';
import { Checkbox } from '@/components/ui/checkbox';

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
				startDate: z.date().nullable(),
				endDate: z.date().optional().nullable(),
				description: z.string().optional(),
				currentJob: z.boolean().optional(),
			})
		)
		.optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

interface ProfileFormProps {
	linkedinData: any;
}

export default function ProfileForm({ linkedinData = {} }: ProfileFormProps) {
	const form = useForm<ProfileFormValues>({
		resolver: zodResolver(profileFormSchema),
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
				currentJob: false,
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
				<Accordion type='single' collapsible>
					<AccordionItem value='item-1'>
						<AccordionTrigger className='h-20 rounded border border-slate-500 p-4'>
							Professional Experience
						</AccordionTrigger>
						<AccordionContent>
							<ul className='experience-list'>
								{experiences.map((experience, index) => (
									<li
										key={index}
										className='mt-6 border-b border-b-slate-500 pb-6'
									>
										<div className='mb-2 flex w-full flex-row items-center justify-end'>
											<div className='flex w-full items-center justify-between self-end'>
												<Controller
													control={control}
													name={`experiences.${index}.currentJob`}
													render={({ field }) => {
														return (
															<div className='items-top flex space-x-2'>
																<Checkbox id='terms1' />
																<div className='grid gap-1.5 leading-none'>
																	<label
																		htmlFor='terms1'
																		className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
																	>
																		This is my current job
																	</label>
																</div>
															</div>
														);
													}}
												/>
												<Controller
													control={control}
													name={`experiences.${index}.startDate`}
													render={({ field }) => {
														return (
															<div className='flex flex-row items-center justify-end gap-4'>
																<FormLabel>Start Date:</FormLabel>
																<DatePicker field={field} />
															</div>
														);
													}}
												/>
												<Controller
													control={control}
													name={`experiences.${index}.endDate`}
													render={({ field }) => {
														return (
															<div className='flex flex-row items-center justify-end gap-4'>
																<FormLabel>End Date:</FormLabel>
																<DatePicker field={field} />
															</div>
														);
													}}
												/>
											</div>
										</div>

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
										<FormField
											control={form.control}
											name={`experiences.${index}.description`}
											render={({ field }) => (
												<FormTextArea
													field={field}
													label='Description'
													placeholder='Describe how you applied your skills at this specific position...'
												/>
											)}
										/>

										<div className='mt-4 flex w-full flex-row items-center justify-end'>
											<Button
												type='button'
												onClick={() => removeExperience(index)}
												variant={'outline'}
											>
												<div className='flex flex-row items-center justify-center gap-4'>
													<TrashIcon className='h-4 w-4' />
													Remove
												</div>
											</Button>
										</div>
									</li>
								))}
							</ul>
							<Button
								className='mt-7'
								type='button'
								variant={'outline'}
								onClick={() => {
									addExperience();
								}}
							>
								+ Add Experience
							</Button>
						</AccordionContent>
					</AccordionItem>
				</Accordion>

				<Button type='submit'>Update profile</Button>
			</form>
		</Form>
	);
}
