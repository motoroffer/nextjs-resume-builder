import { CheckCircleIcon } from '@heroicons/react/20/solid';

interface FormSuccessProps {
	message: string;
}

export default function FormSuccess({ message }: FormSuccessProps) {
	return (
		<div className='text-small flex items-center gap-x-2 rounded-md bg-emerald-500/15 p-3 text-emerald-500'>
			<CheckCircleIcon className='h-4 w-4' />
			<p>{message}</p>
		</div>
	);
}
