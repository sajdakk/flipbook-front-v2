import { useEffect, useState } from 'react';
import { Book } from '../..';
import { API, SearchDto } from '../../utils/api';
import { message } from 'antd';

export const useDashboard = () => {
	const [filteredBooks, setFilteredBooks] = useState<Book[] | undefined>(undefined);
	const [mayInterestYou, setMayInterestYou] = useState<Book[] | undefined>(undefined);
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		try {
			const response = await API().books().top(3);

			setMayInterestYou(response.data);
		} catch (error) {
			console.trace(error);

			message.error('Failed to fetch books.');
		}
	};

	const search = async (dto: SearchDto) => {
		dto = {
			name: !dto.name ? '' : dto.name.trim(),
			surname: !dto.surname ? '' : dto.surname.trim(),
			title: !dto.title ? '' : dto.title.trim(),
		};

		if (dto.name === '' && dto.surname === '' && dto.title === '') {
			setFilteredBooks(undefined);
			return;
		}

		try {
			setLoading(true);
			const response = await API().books().search(dto);

			setFilteredBooks(response.data);
			setLoading(false);
		} catch (error) {
			setLoading(false);

			message.error('Failed to fetch books.');
		}
	};

	return { filteredBooks, mayInterestYou, loading, search };
};
