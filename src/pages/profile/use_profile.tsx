import { useEffect, useState } from 'react';
import { useSessionManager } from '../../utils/session_provider';

export const useProfile = () => {
	const sessionManager = useSessionManager();

	useEffect(() => {
		fetchData();
	}, [sessionManager.currentUser]);

	const fetchData = async () => {};

	const fetchUser = sessionManager.fetchUser;

	return { user: sessionManager.currentUser, fetchUser };
};
