import { useEffect, useState } from 'react';
import { Book, Review, User } from '../../types';
import { useSessionManager } from '../../utils/session_provider';
import { API } from '../../utils/api';

export const useAdmin = () => {
	const sessionManager = useSessionManager();
	const [reviews, setReviews] = useState<Review[]>([]);
	const [books, setBooks] = useState<Book[]>([]);

	useEffect(() => {
		if (!sessionManager.currentUser || sessionManager.currentUser.role.id !== 3) {
			return;
		}
		
		fetchReviews();
		fetchBooks();
	}, []);

	const fetchReviews = async () => {
		const response = await API().reviews().admin();
		setReviews(response.data);
	};

	const fetchBooks = async () => {
		const response = await API().books().admin();
		setBooks(response.data);
	};

	const acceptReview = async (id: number) => {
		await API().review(id).accept();
		await fetchReviews();
	};

	const rejectReview = async (id: number) => {
		await API().review(id).reject();
		await fetchReviews();
	};

	const acceptBook = async (id: number) => {
		await API().book(id).accept();
		await fetchBooks();
	};

	const rejectBook = async (id: number) => {
		await API().book(id).reject();
		await fetchBooks();
	};

	return { user: sessionManager.currentUser, reviews, books, acceptReview, rejectReview, acceptBook, rejectBook };
};
