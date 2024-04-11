'use server';

import LinkedinForm from '@/components/resume-builder/linkedinForm';
import ProfileForm from '@/components/resume-builder/profileForm';
import { auth } from '@/app/auth';
import { getLinkedinProfile } from '@/app/actions/getLinkedinProfile';
import { Suspense } from 'react';
import { unstable_noStore } from 'next/cache';

async function ImportLinkedinProfile() {
	unstable_noStore();
	const result = await getLinkedinProfile();
	if (result?.error) {
		return <h1>{result.error}</h1>;
	}
	return <ProfileForm linkedinData={result.data} />;
}

export default async function ResumeBuilder() {
	const session = await auth();

	if (!session?.user.linkedin_url) {
		return <LinkedinForm />;
	}

	return (
		<Suspense fallback={'Importing linkeding profile...'}>
			<ImportLinkedinProfile />
		</Suspense>
	);
}
