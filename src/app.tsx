import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './app_routes';

import './styles/app.scss';
import { SessionManagerProvider } from './utils/current_user_provider';

export const App: React.FC = () => {
	return (
		<BrowserRouter>
			<SessionManagerProvider>
				<AppRoutes />
			</SessionManagerProvider>
		</BrowserRouter>
	);
};
