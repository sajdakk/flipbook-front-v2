import { useEffect, useState } from 'react';
import { API } from '../../utils/api';
import { useSessionManager } from '../../utils/session_provider';
import { message } from 'antd';

export const useBookCard = (bookId: number) => {
	const [isFavorite, setIsFavorite] = useState(false);
	const session = useSessionManager();

	useEffect(() => {
		fetchData();
	}, []);

	const toggleFavorite = async () => {
		if (!session.currentUser) {
			message.error('You must be logged in to add a book to your favorites.');
			return;
		}

		await API().favorites().toggle(bookId);
		fetchData();
	};

	const fetchData = async () => {
		try {
			if (!session.currentUser) {
				return;
			}

			const response = await API().books().favorites();

			setIsFavorite(response.data.some((book) => book.id === bookId));
		} catch (error) {
			console.trace(error);
		}
	};

	return { isFavorite, toggleFavorite };
};
