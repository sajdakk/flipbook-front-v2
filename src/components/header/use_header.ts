import { useState, useEffect } from 'react';
import { User } from '../../types';
import { useSessionManager } from '../../utils/current_user_provider';

export const useHeader = () => {
	const [user, setUser] = useState<User | undefined>(undefined);
	const sessionManager = useSessionManager();

	useEffect(() => {
		fetchData();
	}, [user]);

	const fetchData = async () => {
		setUser(sessionManager.currentUser);
	};

    const logout = async () => {
    };

	return { user, logout };
};
