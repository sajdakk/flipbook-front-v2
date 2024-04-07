import { useEffect, useState } from 'react';
import { User } from '../../types';
import { useSessionManager } from '../../utils/current_user_provider';

export const useProfile = () => {
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
