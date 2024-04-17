import { useEffect, useState } from 'react';
import { API } from '../../utils/api';

export const useBookCard = (bookId: number) => {
	const [isFavorite, setIsFavorite] = useState(false);

	useEffect(() => {
		fetchData();
	}, []);

	const toggleFavorite = async () => {
		await API().favorites().toggle(bookId);
		fetchData();
	};

	const fetchData = async () => {
		try {
			const response = await API().books().favorites();

			setIsFavorite(response.data.some((book) => book.id === bookId));
		} catch (error) {
			console.trace(error);
		}
	};

	return { isFavorite, toggleFavorite };
};
