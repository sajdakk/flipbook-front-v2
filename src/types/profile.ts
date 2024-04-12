import { Book, ReviewForBook } from '.';
import { ReviewForProfile } from './review_for_profile';

export interface Profile {
	id: number;
	books: Book[];
	reviews: ReviewForProfile[];
}
