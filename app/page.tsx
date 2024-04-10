import { Metadata } from 'next';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import {
	PageActions,
	PageHeader,
	PageHeaderDescription,
	PageHeaderHeading,
} from '@/components/pageHeader';
import { buttonVariants } from '@/components/ui/button';

export const metadata: Metadata = {
	title: 'Examples',
	description: 'Check out some examples app built using the components.',
};

interface HomePageProps {
	children: React.ReactNode;
}

export default function Home({ children }: HomePageProps) {
	return (
		<>
			<div className='container relative'>
				<PageHeader>
					<PageHeaderHeading className='hidden md:block'>
						Welcome to Resume Builder
					</PageHeaderHeading>
					<PageHeaderHeading className='md:hidden'>Examples</PageHeaderHeading>
					<PageHeaderDescription>
						Build a complete resume, fully adapted to the Applicant Tracking
						System (ATS) softwares, using the power of a custom trained
						generative AI that will enhance your experience. Save your resume
						into our talent pool and export your talent to partner companies all
						over the world.
					</PageHeaderDescription>
					<PageActions>
						<Link
							href='/login'
							className={cn(
								buttonVariants({ variant: 'secondary' }),
								'rounded-[6px]'
							)}
						>
							Get Started
						</Link>
					</PageActions>
				</PageHeader>
				<section>
					<div className='overflow-hidden rounded-[0.5rem] border bg-background shadow-md md:shadow-xl'>
						{children}
					</div>
				</section>
			</div>
		</>
	);
}
