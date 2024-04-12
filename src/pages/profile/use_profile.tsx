import { useEffect, useState } from 'react';
import { useSessionManager } from '../../utils/session_provider';
import { Profile } from '../../types';
import { API } from '../../utils/api';
import { message } from 'antd';

export const useProfile = () => {
	const sessionManager = useSessionManager();
	const [profile, setProfile] = useState<Profile | undefined>(undefined);

	useEffect(() => {
		fetchData();
	}, [sessionManager.currentUser]);

	const fetchData = async () => {
		if (!sessionManager.currentUser) {
			return;
		}

		try {
			const response = await API().user(sessionManager.currentUser.id).profile.get();

			setProfile(response.data);
		} catch (error) {
			console.trace(error);

			message.error('Nie udało się pobrać danych.');
		}
	};

	const fetchUser = sessionManager.fetchUser;

	return { user: sessionManager.currentUser, profile, fetchUser };
};
