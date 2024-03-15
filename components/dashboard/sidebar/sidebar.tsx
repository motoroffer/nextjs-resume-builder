import { auth, signOut } from '@/app/auth';
import { menuItems } from './menuItems';
import MenuLink from './menuLink/menuLink';
import Image from 'next/image';
import { ArrowLeftStartOnRectangleIcon } from '@heroicons/react/20/solid';
import { UserModel } from '@/app/lib/models';

export default async function Sidebar() {
	const session = await auth();
	return (
		<div className='sticky top-8 flex h-screen w-full flex-col'>
			<div className='mb-5 flex h-12 w-12 items-center gap-5'>
				<Image
					className='rounded-full object-cover'
					src='/noavatar.png'
					alt=''
					width='50'
					height='50'
				/>
				<div className='flex flex-col'>
					<span className='weight text-xs font-medium'>
						{session?.user.username}
					</span>
					<span>{session?.user.isAdmin ? 'Administrator' : 'Analyst'}</span>
				</div>
			</div>
			<ul className='list-none'>
				{menuItems.map((item) => {
					return (
						<li key={item.title} className='flex w-full flex-col'>
							<span className='my-2 text-sm font-semibold'>{item.title}</span>
							{item.list.map((link) => {
								return (
									<MenuLink
										title={link.title}
										icon={link.icon}
										path={link.path}
										key={link.title}
									/>
								);
							})}
						</li>
					);
				})}
				<form
					action={async () => {
						'use server';
						await signOut();
					}}
				>
					<MenuLink
						title={'Logout'}
						icon={
							<ArrowLeftStartOnRectangleIcon className={'h-6 w-6 text-white'} />
						}
						path={'/dashboard/support'}
					/>
				</form>
			</ul>
		</div>
	);
}
