import {
	HomeIcon,
	UserIcon,
	ChatBubbleLeftRightIcon,
	CalendarIcon,
	ClipboardDocumentIcon,
	WrenchScrewdriverIcon,
	QuestionMarkCircleIcon,
} from '@heroicons/react/16/solid';
import { ArrowLeftStartOnRectangleIcon } from '@heroicons/react/20/solid';
import { ReactElement, ReactNode } from 'react';

export type MenuItem = {
	title: string;
	path: string;
	icon: ReactElement;
};

export type MenuItems = {
	title: string;
	list: MenuItem[];
};

const defaultIconStyle = 'w-6 h-6 text-white';

export const menuItems = [
	{
		title: 'Pages',
		list: [
			{
				title: 'Dashboard',
				path: '/dashboard',
				icon: <HomeIcon className={`${defaultIconStyle}`} />,
			},
			{
				title: 'Build your resume',
				path: '/dashboard/resume-builder',
				icon: <UserIcon className={`${defaultIconStyle}`} />,
			},
		],
	},
	{
		title: 'User',
		list: [
			{
				title: 'Settings',
				path: '/dashboard/settings',
				icon: <WrenchScrewdriverIcon className={`${defaultIconStyle}`} />,
			},
			{
				title: 'Support',
				path: '/dashboard/support',
				icon: <QuestionMarkCircleIcon className={`${defaultIconStyle}`} />,
			},
		],
	},
];
