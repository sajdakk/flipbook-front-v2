import axios from 'axios';
import { Book, User } from '../types';

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
		}),

		books: () => ({
			get: async () => {
				return client<Book[]>('/books', {
					method: 'GET',
				}).catch((error) => {
					throw error;
				});
			},

			top: async (limit?: number | undefined) => {
				return client<Book[]>('/books/top', {
					method: 'GET',
					params: {
						limit,
					},
				}).catch((error) => {
					throw error;
				});
			},

			search: async (data: SearchDto) => {
				return client<Book[]>('/books/search', {
					method: 'POST',
					data,
				}).catch((error) => {
					throw error;
				});
			},
		}),
	};
};
