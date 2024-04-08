import { useState, useEffect } from 'react';
import { User } from '../../types';
import { useSessionManager } from '../../utils/session_provider';

export const useFavorites = () => {
	const [user, setUser] = useState<User | undefined>(undefined);
	const sessionManager = useSessionManager();

	useEffect(() => {
		fetchData();
	}, [user]);

	const fetchData = async () => {
		setUser(sessionManager.currentUser);
	};

	return { user };
};
