import { fetchUsers } from '@/app/lib/data';
import { UserModel } from '@/app/lib/models';

export default async function UsersPage() {
	const users: Array<UserModel> = await fetchUsers();
	return (
		<div>
			<h1>
				{users?.map((user) => {
					return (
						<div key={user.email}>
							{user.username} - {user.email}
						</div>
					);
				})}
			</h1>
		</div>
	);
}
