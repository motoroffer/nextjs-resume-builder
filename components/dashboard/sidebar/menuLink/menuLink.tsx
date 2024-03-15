'use client';

import { Button } from '@/components/ui/button';
import { MenuItem } from '../menuItems';
import { usePathname, useRouter } from 'next/navigation';
import {} from 'next/router';
import React from 'react';

export default function MenuLink({ title, icon, path }: MenuItem) {
	const pathname = usePathname();
	const router = useRouter();

	const isActive = pathname === path;

	return (
		<Button
			variant={isActive ? 'secondary' : 'default'}
			className='mb-1 flex w-full flex-row items-center justify-start gap-2'
			onClick={() => router.push(path)}
		>
			<span className='mr-2'>
				{React.cloneElement(icon, {
					className:
						icon.props.className +
						(isActive ? 'text-slate-800 ' : 'text-white '),
				})}
			</span>
			{title}
		</Button>
	);
}
