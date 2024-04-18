import axios from 'axios';
import { Book, Genre, Language, Profile, Review, User } from '../types';
import { Favorites } from '../pages/favorites/favorites';

export interface RegisterDto {
	email: string;
	name: string;
	surname: string;
	password: string;
}

export interface SearchDto {
	title: string;
	name: string;
	surname: string;
}

export interface AuthorDto {
	id: number | undefined;
	name: string;
	surname: string;
}

export interface AddBookDto {
	title: string;
	genre_id: number;
	language_id: number;
	date_of_publication: string;
	page_count: number;
	image: string;
	imageExtension: string;
	isbn_number: string;
	description: string;
	created_by: number;
	authors: AuthorDto[];
}

export const getFileUrl = (file: string) => {
	return `${process.env['API']}/uploads/${file}`;
};

export const API = () => {
	const url = process.env['API']!;

	const client = axios.create({
		baseURL: url,
		paramsSerializer: {
			// No brackets in query params
			indexes: null,
		},
		withCredentials: true,
	});

	return {
		login: async (email: string, password: string) => {
			return client<User>('/login', {
				method: 'POST',
				data: {
					email,
					password,
				},
			});
		},

		register: async (data: RegisterDto) => {
			return client<User>('/register', {
				method: 'POST',
				data,
			});
		},

		logout: async () => {
			return client('/logout', {
				method: 'POST',
			});
		},

		users: () => ({
			get: async () => {
				return client<User[]>('/users', {
					method: 'GET',
				});
			},
		}),

		user: (id: number) => ({
			get: async () => {
				return client<User>(`/users/${id}`, {
					method: 'GET',
				});
			},
			avatar: {
				delete: async () => {
					return client(`/users/${id}/avatar`, {
						method: 'DELETE',
					});
				},
			},
			profile: {
				get: async () => {
					return client<Profile>(`/users/${id}/profile`, {
						method: 'GET',
					});
				},
			},
			toggleAdmin: async () => {
				return client(`/users/${id}/toggle-admin`, {
					method: 'POST',
				});
			},
			delete: async () => {
				return client(`/users/${id}`, {
					method: 'DELETE',
				});
			},
		}),

		books: () => ({
			get: async () => {
				return client<Book[]>('/books', {
					method: 'GET',
				});
			},

			add: async (data: AddBookDto) => {
				return client<void>('/books/add', {
					method: 'POST',
					data,
				});
			},

			admin: async () => {
				return client<Book[]>('/books/admin', {
					method: 'GET',
				});
			},

			top: async (limit?: number | undefined) => {
				return client<Book[]>('/books/top', {
					method: 'GET',
					params: {
						limit,
					},
				});
			},

			favorites: async () => {
				return client<Book[]>('/books/favorites', {
					method: 'GET',
				});
			},

			search: async (data: SearchDto) => {
				return client<Book[]>('/books/search', {
					method: 'POST',
					data,
				});
			},
		}),

		book: (id: number) => ({
			get: async () => {
				return client<Book>(`/books/${id}`, {
					method: 'GET',
				});
			},
			accept: async () => {
				return client(`/books/${id}/accept`, {
					method: 'POST',
				});
			},
			reject: async () => {
				return client(`/books/${id}/reject`, {
					method: 'POST',
				});
			},
		}),

		favorites: () => ({
			toggle: async (bookId: number) => {
				return client<Book>(`/favorites/toggle`, {
					method: 'POST',
					data: {
						bookId,
					},
				});
			},
		}),

		reviews: () => ({
			admin: async () => {
				return client<Review[]>('/reviews/admin', {
					method: 'GET',
				});
			},
			add: async (bookId: number, content: string, rate: number) => {
				return client(`/reviews/add`, {
					method: 'POST',
					data: {
						bookId,
						content,
						rate,
					},
				});
			},
		}),
		review: (id: number) => ({
			accept: async () => {
				return client(`/reviews/${id}/accept`, {
					method: 'POST',
				});
			},
			reject: async () => {
				return client(`/reviews/${id}/reject`, {
					method: 'POST',
				});
			},
		}),
		languages: () => ({
			get: async () => {
				return client<Language[]>('/languages', {
					method: 'GET',
				});
			},
		}),
		genres: () => ({
			get: async () => {
				return client<Genre[]>('/genres', {
					method: 'GET',
				});
			},
		}),
		authors: () => ({
			get: async () => {
				return client<AuthorDto[]>('/authors', {
					method: 'GET',
				});
			},
		}),
	};
};
