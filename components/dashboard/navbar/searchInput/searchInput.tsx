import { cn } from '@/lib/utils';
import React from 'react';
import { Input, InputProps } from '../../../ui/input';
import { MagnifyingGlassIcon } from '@heroicons/react/16/solid';

export interface SearchInputProps extends InputProps {}

export default function SearchInput({ className, ...props }: SearchInputProps) {
	return (
		<label className='relative h-10 w-full'>
			<MagnifyingGlassIcon className='absolute left-3 top-1/2 z-10 h-6 w-6 -translate-y-1/2 transform text-gray-500' />
			<Input
				{...props}
				type='search'
				className='text-md w-full rounded border py-2 pl-10 pr-3 shadow-sm'
				placeholder='Search...'
			/>
		</label>
	);
}
