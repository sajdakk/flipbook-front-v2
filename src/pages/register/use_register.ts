import { useNavigate } from 'react-router-dom';
import { API, RegisterDto } from '../../utils/api';
import { useSessionManager } from '../../utils/current_user_provider';
import { useState } from 'react';
import { message } from 'antd';

export const useRegister = () => {
	const navigate = useNavigate();
	const sessionManager = useSessionManager();

	const [loading, setLoading] = useState<boolean>(false);

	const register = async (dto: RegisterDto) => {
		try {
			setLoading(true);
			const response = await API().register(dto);
			setLoading(false);
			sessionManager.setCurrentUserId(response.data.id);
			navigate('/');
		} catch (error) {
			setLoading(false);
			message.error(error.response.data.message);
		}
	};

	return { loading, register };
};
