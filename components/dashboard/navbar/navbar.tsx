'use client';

import { usePathname } from 'next/navigation';
import SearchInput from '@/components/dashboard/navbar/searchInput/searchInput';
import {
	BellIcon,
	ChatBubbleBottomCenterTextIcon,
	QuestionMarkCircleIcon
} from '@heroicons/react/20/solid';

export default function Navbar() {
	const pathname = usePathname();
	return (
		<div className='mb-3 flex flex-row items-center justify-between rounded bg-slate-800 p-4'>
			<div className='title'>{pathname.split('/').pop()}</div>
			<div className='flex flex-row items-center gap-4'>
				<div className='search'>
					<SearchInput />
				</div>
				<div className='flex flex-row items-center gap-3'>
					<ChatBubbleBottomCenterTextIcon className='h-5 w-5 text-white hover:cursor-pointer' />
					<BellIcon className='h-5  w-5 text-white hover:cursor-pointer' />
					<QuestionMarkCircleIcon className='h-5  w-5 text-white hover:cursor-pointer' />
				</div>
			</div>
		</div>
	);
}
