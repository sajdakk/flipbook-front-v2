import React from 'react';
import styled from 'styled-components';
import { FormOutlined, HeartFilled } from '@ant-design/icons';
import { SmallLogo, PrimaryButton, SecondaryButton } from '.';
import { colors } from '../styles/colors';
import { MobileHeader } from './mobile_header';
import { useNavigate } from 'react-router-dom';
import { Space } from 'antd';

const Menu = styled.nav`
	background-color: white;
	width: 100%;
	height: 70px;
	font-size: 1.5rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 1rem;
	position: fixed;
	top: 0;
	left: 0;
	box-sizing: border-box;
	box-shadow: 0px 0px 10px 0px rgba(218, 223, 225, 0.4);
	opacity: 1;
	z-index: 1000;

	> div {
		display: flex;
		align-items: center;
		gap: 32px;
	}

	ul {
		display: flex;
		list-style: none;
		margin: 0;
		padding: 0;
		gap: 16px;
	}

	a {
		text-decoration: none;
		color: #252c32;
		font-size: 15px;
		border-radius: 5px;
		display: flex;
	}

	a.selected {
		color: #252c32;
		text-decoration: underline;
		text-decoration-color: ${() => colors.primary};
		text-underline-offset: 4px;
	}

	> :first-child {
		display: none;
	}

	> :nth-child(2) {
		display: none;
	}

	@media (max-width: 780px) {
		> :first-child {
			display: flex;
			align-items: center;
			margin-right: 24px;
		}

		> :nth-child(2) {
			display: initial;
		}

		> .ant-space {
			display: none;
		}

		justify-content: left;
		gap: 24px;
	}
`;

const TextButton = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
	font-family: Inter;
	font-size: 15px;
	font-style: normal;
	font-weight: 600;
	line-height: 20.211px;
	letter-spacing: -0.09px;
	color: #252c32;
	cursor: pointer;
`;

export const Header: React.FC = () => {
	const navigate = useNavigate();

	return (
		<Menu>
			<MobileHeader />
			<SmallLogo />

			<Space size={16}>
				<SmallLogo />
				<ul>
					<li>
						<a
							className={`${window.location.href.endsWith('/') ? `inter-regular selected` : `inter-regular `}`}
							href="/"
						>
							Home
						</a>
					</li>
					<li>
						<a
							className={`${window.location.href.endsWith('/top') ? `inter-regular selected` : `inter-regular `}`}
							href="/top"
						>
							Top
						</a>
					</li>
					<li>
						<a
							className={`${window.location.href.endsWith('/profile') ? `inter-regular selected` : `inter-regular `}`}
							href="/profile"
						>
							Profile
						</a>
					</li>
					<li>
						<a
							className={`${window.location.href.endsWith('/admin') ? `inter-regular selected` : `inter-regular `}`}
							href="/"
						>
							Admin
						</a>
					</li>
				</ul>
			</Space>
			<Space size={16}>
				<TextButton>
					<FormOutlined style={{ color: colors.primary }} />
					<a className="inter-regular" href="/create">
						Create book
					</a>
				</TextButton>
				<TextButton>
					<HeartFilled style={{ color: colors.primary }} />
					<a className="inter-regular" href="/favorites">
						Favorites
					</a>
				</TextButton>
				<PrimaryButton onClick={() => navigate('/login')} text="Log in" />
				<SecondaryButton onClick={() => navigate('/register')} text="Sign up" />
			</Space>
		</Menu>
	);
};
