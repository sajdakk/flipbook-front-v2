import { useEffect, useState } from 'react';
import { Book } from '../..';
import { API } from '../../utils/api';
import { message } from 'antd';

export const useTop = () => {
	const [books, setBooks] = useState<Book[] | undefined>(undefined);

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		try {
			const response = await API().books().top();

			setBooks(response.data);
		} catch (error) {
			console.trace(error);

			message.error('Failed to fetch books.');
		}
	};

	return { books };
};
