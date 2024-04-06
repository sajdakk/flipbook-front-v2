import axios from 'axios';
import { User } from '../types';

export interface AddProductGroupDto {
	name: string;
	cover: string;
	coverExtension: string;
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
			});
		},

		user: (id: number) => ({
			get: async () => {
				return client<User>(`/users/${id}`, {
					method: 'GET',
				});
			},
		}),
	};
};
