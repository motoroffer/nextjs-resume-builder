import { ExclamationTriangleIcon } from '@heroicons/react/20/solid';

interface FormErrorProps {
	message: string;
}

export default function FormError({ message }: FormErrorProps) {
	return (
		<div className='text-small flex items-center gap-x-2 rounded-md bg-destructive/15 p-3 text-destructive'>
			<ExclamationTriangleIcon className='h-4 w-4' />
			<p>{message}</p>
		</div>
	);
}
