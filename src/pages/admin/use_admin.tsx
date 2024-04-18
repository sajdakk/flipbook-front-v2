import { useEffect, useState } from 'react';
import { Book, Review, User } from '../../types';
import { useSessionManager } from '../../utils/session_provider';
import { API } from '../../utils/api';
import { message } from 'antd';

export const useAdmin = () => {
	const sessionManager = useSessionManager();
	const [reviews, setReviews] = useState<Review[]>([]);
	const [books, setBooks] = useState<Book[]>([]);
	const [users, setUsers] = useState<User[]>([]);

	useEffect(() => {
		if (!sessionManager.currentUser || sessionManager.currentUser.role.id !== 3) {
			return;
		}

		fetchReviews();
		fetchBooks();
		fetchUsers();
	}, []);

	const fetchReviews = async () => {
		const response = await API().reviews().admin();
		setReviews(response.data);
	};

	const fetchBooks = async () => {
		const response = await API().books().admin();
		setBooks(response.data);
	};

	const fetchUsers = async () => {
		const response = await API().users().get();
		setUsers(response.data);
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

	const removeUser = async (id: number) => {
		if (sessionManager.currentUser?.id === id) {
			message.error('You cannot remove yourself');
			return;
		}

		await API().user(id).delete();
		await fetchUsers();
	};

	const toggleAdmin = async (id: number) => {
		if (sessionManager.currentUser?.id === id) {
			message.error('You cannot change your own role');
			return;
		}

		await API().user(id).toggleAdmin();
		await fetchUsers();
	};

	return {
		user: sessionManager.currentUser,
		reviews,
		books,
		users,
		acceptReview,
		rejectReview,
		acceptBook,
		rejectBook,
		removeUser,
		toggleAdmin,
	};
};
