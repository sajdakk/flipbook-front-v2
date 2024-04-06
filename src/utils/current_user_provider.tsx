import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../types';
import { API } from './api';

interface SessionManager {
	currentUser: User | undefined;
	setCurrentUserId: (userId: number | undefined) => void;
}

const SessionManagerContext = createContext<SessionManager>({
	currentUser: undefined,
	setCurrentUserId: () => {},
});

export const useSessionManager = () => useContext(SessionManagerContext);

interface Props {
	children: ReactNode;
}

export const SessionManagerProvider: React.FC<Props> = ({ children }: Props) => {
	const navigate = useNavigate();

	const [currentUserId, setCurrentUserId] = useState<number>();
	const [user, setUser] = useState<User>();

	useEffect(() => {
		const currentUserIdRaw = sessionStorage.getItem('current_user_id');
		if (!currentUserIdRaw) {
			setCurrentUserId(undefined);

			return;
		}

		const currentUserId = parseInt(currentUserIdRaw, 10);
		if (isNaN(currentUserId)) {
			sessionStorage.removeItem('current_user_id');
			setCurrentUserId(undefined);

			return;
		}

		setCurrentUserId(currentUserId);
	}, []);

	useEffect(() => {
		if (!currentUserId) {
			setUser(undefined);

			return;
		}

		API()
			.user(currentUserId)
			.get()
			.then((response) => {
				setUser(response.data);
			})
			.catch(() => {
				sessionStorage.removeItem('current_user_id');

				navigate('/login?logout=1');
			});
	}, [currentUserId]);

	const setCurrentUserIdHandler = (userId: number | undefined) => {
		if (userId === undefined) {
			sessionStorage.removeItem('current_user_id');
			setCurrentUserId(undefined);

			navigate('/login?logout=1');
			return;
		}

		sessionStorage.setItem('current_user_id', userId.toString());
		setCurrentUserId(userId);
	};

	const sessionManager: SessionManager = {
		currentUser: user,
		setCurrentUserId: setCurrentUserIdHandler,
	};

	return <SessionManagerContext.Provider value={sessionManager}>{children}</SessionManagerContext.Provider>;
};
