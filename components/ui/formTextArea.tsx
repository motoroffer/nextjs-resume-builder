import { FormItem, FormLabel, FormControl, FormMessage } from './form';
import { FieldValues, RegisterOptions } from 'react-hook-form';
import { Textarea, TextareaProps } from './textarea';

interface FormTextAreaProps<T extends FieldValues> {
	field: RegisterOptions<T>;
	label: string;
	placeholder: string;
}

export default function FormTextArea<T extends FieldValues>({
	field,
	label,
	placeholder,
}: FormTextAreaProps<T>) {
	return (
		<FormItem>
			<FormLabel>{label}</FormLabel>
			<FormControl>
				<Textarea
					placeholder={placeholder}
					className='resize-none'
					{...(field as TextareaProps)}
				/>
			</FormControl>
			<FormMessage />
		</FormItem>
	);
}
