import { useState, useEffect } from 'react';
import { User } from '../../types';
import { useSessionManager } from '../../utils/session_provider';
import { API } from '../../utils/api';

export const useHeader = () => {
	const sessionManager = useSessionManager();

	const logout = () => sessionManager.logout();

	return { user: sessionManager.currentUser, logout };
};
