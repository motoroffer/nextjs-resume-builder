import { cn } from '@/lib/utils';
import { CalendarIcon } from '@heroicons/react/16/solid';
import { format } from 'date-fns';
import { Button } from './button';
import { Calendar } from './calendar';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { FieldValues, RegisterOptions } from 'react-hook-form';
import { isFunction } from 'lodash';

interface DatePickerProps<T extends FieldValues> {
	field: RegisterOptions<T>;
}

export default function DatePicker<T extends FieldValues>({
	field,
}: DatePickerProps<T>) {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant={'outline'}
					className={cn(
						'w-[150px] justify-start text-left font-normal',
						!field.value && 'text-muted-foreground'
					)}
				>
					<CalendarIcon className='mr-2 h-4 w-4' />
					{field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-auto p-0'>
				<Calendar
					mode='single'
					selected={field.value}
					onSelect={(date) => {
						if (field && isFunction(field.onChange)) field.onChange(date);
					}}
					initialFocus
				/>
			</PopoverContent>
		</Popover>
	);
}
