import { useEffect, useState } from 'react';
import { User } from '../../types';
import { useSessionManager } from '../../utils/session_provider';

export const useAdmin = () => {
	const sessionManager = useSessionManager();

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		
	};

	return { user:sessionManager.currentUser };
};
