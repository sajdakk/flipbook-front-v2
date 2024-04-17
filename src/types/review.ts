import { Book, User } from '.';

export interface Review {
	id: number;
	user: User;
	book: Book;
	content: string;
	rate: number;
	uploadDate: Date;
	acceptDate: Date;
	rejectDate: Date;
}
