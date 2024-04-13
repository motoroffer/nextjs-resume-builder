import { Input, InputProps } from './input';
import { FormItem, FormLabel, FormControl, FormMessage } from './form';
import { FieldValues, RegisterOptions } from 'react-hook-form';

interface FormInputProps<T extends FieldValues> {
	field: RegisterOptions<T>;
	label: string;
	placeholder: string;
}

export default function FormInput<T extends FieldValues>({
	field,
	label,
	placeholder,
}: FormInputProps<T>) {
	return (
		<FormItem className='mb-4'>
			<FormLabel>{label}</FormLabel>
			<FormControl>
				<Input placeholder={placeholder} {...(field as InputProps)} />
			</FormControl>
			<FormMessage />
		</FormItem>
	);
}
