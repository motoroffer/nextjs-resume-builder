import Navbar from '@/components/dashboard/navbar/navbar';
import Sidebar from '@/components/dashboard/sidebar/sidebar';
import { ReactNode } from 'react';

interface LayoutProps {
	children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
	return (
		<div className='flex'>
			<div className='w-1/5 bg-slate-800 p-10'>
				<Sidebar />
			</div>
			<div className='w-4/5 p-10'>
				<Navbar />
				{children}
			</div>
		</div>
	);
}
