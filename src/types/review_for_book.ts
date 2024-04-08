export interface ReviewForBook {
	id: number;
	user: UserForBookView;
	content: string;
	rate: number;
	uploadDate: Date;
	acceptDate: Date;
	rejectDate: Date;
}

interface UserForBookView {
	id: number;
	email: string;
	name: string;
	surname: string;
	avatar: string;
}
