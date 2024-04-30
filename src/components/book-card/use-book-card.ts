import { useEffect, useState } from 'react';
import { API } from '../../utils/api';
import { useSessionManager } from '../../utils/session_provider';

export const useBookCard = (bookId: number) => {
	const [isFavorite, setIsFavorite] = useState(false);
	const session = useSessionManager();

	useEffect(() => {
		fetchData();
	}, []);

	const toggleFavorite = async () => {
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
