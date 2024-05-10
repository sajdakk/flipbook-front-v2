import { useState, useEffect } from 'react';
import { Genre, Language, User } from '../../types';
import { useSessionManager } from '../../utils/session_provider';
import { API, AddBookDto, AuthorDto } from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';

export const useCreate = () => {
	const sessionManager = useSessionManager();
	const navigate = useNavigate();
	const [languages, setLanguages] = useState<Language[] | undefined>(undefined);
	const [genres, setGenres] = useState<Genre[] | undefined>(undefined);
	const [authors, setAuthors] = useState<AuthorDto[] | undefined>(undefined);
	const user = sessionManager.currentUser;

	useEffect(() => {
		if (!user) {
			return;
		}

		fetchLanguages();
		fetchGenres();
		fetchAuthors();
	}, [user]);

	const fetchLanguages = async () => {
		try {
			const response = await API().languages().get();
			setLanguages(response.data);
		} catch (e) {
			message.error('Error fetching languages');
			if (e.response.status === 401) {
				sessionManager.logout();
			}
		}
	};

	const fetchGenres = async () => {
		try {
			const response = await API().genres().get();
			setGenres(response.data);
		} catch (e) {
			message.error('Error fetching genres');
			if (e.response.status === 401) {
				sessionManager.logout();
			}
		}
	};

	const fetchAuthors = async () => {
		try {
			const response = await API().authors().get();
			setAuthors(response.data);
		} catch (e) {
			message.error('Error fetching authors');
			if (e.response.status === 401) {
				sessionManager.logout();
			}
		}
	};

	const addBook = async (book: AddBookDto) => {
		try {
			await API().books().add(book);
			message.success('Book sent to review!');
			navigate(`/`);
		} catch (e) {
			message.error('Error sending book to review');
		}
	};

	return { user, languages, genres, authors, addBook };
};
