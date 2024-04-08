import { Author, Genre, Language, ReviewForBook } from '.';

export interface Book {
	id: number;
	title: string;
	dateOfPublication: Date;
	pageCount: number;
	image: string;
	isbnNumber: string;
	description: string;
	uploadDate: Date;
	acceptDate: Date;
	createdBy: number;
	rejectDate: Date;
	genre: Genre;
	language: Language;
	authors: Author[];
	reviews: ReviewForBook[];
}
