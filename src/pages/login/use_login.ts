import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../../utils/api';
import { useSessionManager } from '../../utils/current_user_provider';

export const useLogin = () => {
	const navigate = useNavigate();
	const sessionManager = useSessionManager();

	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>();

	const loginWithPassword = async (email: string, password: string) => {
		if (!email.trim()) return setError('Podaj login');
		if (!password.trim()) return setError('Podaj hasło');

		try {
			setLoading(true);
			const response = await API().login(email, password);
			setLoading(false);

			sessionManager.setCurrentUserId(response.data.id);
			navigate('/dashboard');
		} catch (error) {
			setLoading(false);
			console.trace(error);

			setError('Niepoprawne dane logowania');
		}
	};

	return { loading, error, loginWithPassword };
};
