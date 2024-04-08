import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { API } from '../../utils/api';
import { useSessionManager } from '../../utils/session_provider';
import { message } from 'antd';

export const useLogin = () => {
	const navigate = useNavigate();
	const sessionManager = useSessionManager();

	const [loading, setLoading] = useState<boolean>(false);
	const [searchParams, _] = useSearchParams();
	const rawLogoutParam = searchParams.get('logout');
	const logoutParam = useMemo(() => {
		if (!rawLogoutParam) {
			return null;
		}

		const parsed = parseInt(rawLogoutParam);
		if (isNaN(parsed)) {
			return null;
		}

		return parsed;
	}, [rawLogoutParam]);

	useEffect(() => {
		if (logoutParam === 1) {
			message.info('You have been logged out');
		}
	}, [logoutParam]);

	const loginWithPassword = async (email: string, password: string) => {
		try {
			setLoading(true);
			const response = await API().login(email, password);
			setLoading(false);

			sessionManager.setCurrentUser(response.data);
			navigate('/');
		} catch (error) {
			setLoading(false);
			message.error(error.response.data.message);
		}
	};

	return { loading, loginWithPassword };
};
