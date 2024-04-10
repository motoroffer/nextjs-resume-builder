'use server';

import LinkedinForm from '@/components/resume-builder/linkedinForm';
import ProfileForm from '@/components/resume-builder/profileForm';
import { auth } from '@/app/auth';

export default async function ResumeBuilder() {
	const session = await auth();

	console.log('session', session);

	if (!session?.user.linkedin_url) {
		return <LinkedinForm />;
	}

	return <ProfileForm />;
}
