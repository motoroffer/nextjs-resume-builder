import { connect, connections, connection } from 'mongoose';
import Error from 'next/error';

export const connectToDB = async () => {
	const currentConnection: { isConnected: number } = { isConnected: 0 };
	try {
		if (currentConnection.isConnected) {
			return;
		}
		await connect(process.env.MONGODB_URL as string);
		currentConnection.isConnected = connections[0].readyState;
		console.log("sucessfully connected")
	} catch (error: any) {
		console.log('connection error: ', error.message);
	}
};
