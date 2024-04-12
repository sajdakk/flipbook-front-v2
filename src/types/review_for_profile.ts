import { Book } from "./book";

export interface ReviewForProfile {
	id: number;
	content: string;
	rate: number;
	uploadDate: Date;
	acceptDate: Date;
	rejectDate: Date;
    book: Book;
}