import axios from 'axios';
import { User } from '../types';

export interface RegisterDto {
	email: String;
	name: String;
	surname: String;
	password: String;
}

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
			}).catch((error) => {
				throw error;
			});
		},

		register: async (data: RegisterDto) => {
			return client<User>('/register', {
				method: 'POST',
				data,
			}).catch((error) => {
				throw error;
			});
		},

		user: (id: number) => ({
			get: async () => {
				return client<User>(`/users/${id}`, {
					method: 'GET',
				}).catch((error) => {
					throw error;
				});
			},
		}),
	};
};
