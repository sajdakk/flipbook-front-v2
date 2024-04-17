import { useState, useEffect } from 'react';
import { Genre, Language, User } from '../../types';
import { useSessionManager } from '../../utils/session_provider';
import { API, AddBookDto, AuthorDto } from '../../utils/api';

export const useCreate = () => {
	const sessionManager = useSessionManager();
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
		const response = await API().languages().get();
		setLanguages(response.data);
	};

	const fetchGenres = async () => {
		const response = await API().genres().get();
		setGenres(response.data);
	};

	const fetchAuthors = async () => {
		const response = await API().authors().get();
		setAuthors(response.data);
	}

	const addBook = async (book: AddBookDto) => {};

	return { user, languages, genres, authors, addBook };
};
