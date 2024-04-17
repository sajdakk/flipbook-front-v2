import { useState, useEffect } from 'react';
import { Book, User } from '../../types';
import { useSessionManager } from '../../utils/session_provider';
import { message } from 'antd';
import { API } from '../../utils/api';

export const useFavorites = () => {
	const [books, setBooks] = useState<Book[] | undefined>(undefined);
	const sessionManager = useSessionManager();

	useEffect(() => {
		fetchData();
	}, [sessionManager.currentUser]);

	const fetchData = async () => {
		if (!sessionManager.currentUser) {
			return;
		}

		try {
			const response = await API().books().favorites();

			setBooks(response.data);
		} catch (error) {
			console.trace(error);

			message.error('Failed to fetch books.');
		}
	};

	return { books, user: sessionManager.currentUser };
};
