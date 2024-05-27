import { useEffect, useMemo, useState } from 'react';
import { useSessionManager } from '../../utils/session_provider';
import { Book, Profile } from '../../types';
import { API } from '../../utils/api';
import { message } from 'antd';
import { useParams } from 'react-router-dom';

export const useDetails = () => {
	const [book, setBook] = useState<Book | undefined>(undefined);
	const sessionManager = useSessionManager();

	const { id: rawId } = useParams();
	const id = useMemo(() => {
		if (!rawId) {
			return null;
		}

		const parsed = parseInt(rawId);
		if (isNaN(parsed)) {
			message.error('Nie znaleziono typu produktów.');

			return null;
		}

		return parsed;
	}, [rawId]);

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		if (!id) {
			return;
		}

		try {
			const response = await API().book(id).get();

			setBook(response.data);
		} catch (error) {
			console.trace(error);

			message.error('Could not fetch data.');
		}
	};

	const addReview = async (content: string, rate: number) => {
		if (!book) {
			return;
		}

		try {
			await API().reviews().add(book.id, content, rate);
			await fetchData();
		} catch (error) {
			console.trace(error);
		}
	};

	return { user: sessionManager.currentUser, book, addReview };
};
