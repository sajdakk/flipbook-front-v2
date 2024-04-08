import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Dashboard, Login } from '.';
import { Register } from './pages/register/register';
import { Top } from './pages/top/top';
import { Favorites } from './pages/favorites/favorites';
import { Create } from './pages/create/create';
import { Profile } from './pages/profile/profile';
import { Details } from './pages/details/details';
import { Admin } from './pages/admin/admin';

export const AppRoutes: React.FC = () => {
	return (
		<Routes>
			<Route path="" element={<Dashboard />} />
			<Route path="login" element={<Login />} />
			<Route path="register" element={<Register />} />
			<Route path="top" element={<Top />} />
			<Route path="favorites" element={<Favorites />} />
			<Route path="create" element={<Create />} />
			<Route path="profile" element={<Profile />} />
			<Route path="admin" element={<Admin />} />
			<Route path="books/:id" element={<Details />} />
		</Routes>
	);
};
