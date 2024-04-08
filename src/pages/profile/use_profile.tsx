import { useEffect, useState } from 'react';
import { useSessionManager } from '../../utils/session_provider';

export const useProfile = () => {
	const sessionManager = useSessionManager();

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {};

	return { user: sessionManager.currentUser};

};
