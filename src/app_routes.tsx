import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Dashboard, Login } from '.';
import { Register } from './pages/register/register';
import { Top } from './pages/top/top';

export const AppRoutes: React.FC = () => {
	return (
		<Routes>
			<Route path="" element={<Dashboard />} />
			<Route path="login" element={<Login />} />
			<Route path="register" element={<Register />} />
			<Route path="top" element={<Top />} />
		</Routes>
	);
};
