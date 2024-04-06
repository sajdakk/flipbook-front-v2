export interface User {
	id: number;
	email: string;
	name: string;
	surname: string;
	avatar: string;
	role: {
		id: number;
		name: string;
	};
}
