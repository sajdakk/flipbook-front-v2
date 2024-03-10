import React from 'react';
import styled from 'styled-components';
import { colors } from '../../styles/colors';
import { Logo, AscentButton } from '../../components';
import { Header } from '../../components/header';
import { Input } from 'antd';
import { useNavigate } from 'react-router-dom';

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	padding: 24px;
	box-sizing: border-box;
`;

export const RegisterContainer = styled.div`
	padding: 32px;
	background: ${() => colors.backgroundBG0};
	border-radius: 16px;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 32px;
	display: flex;
	border: 1px solid ${() => colors.primary};
	max-width: 420px;
	width: 100%;
	box-sizing: border-box;

	.sign-up {
		align-self: stretch;
		text-align: center;
		color: black;
		font-size: 30px;
		font-family: DMSans;
		font-weight: 600;
		word-wrap: break-word;
	}

	.inputs {
		display: flex;
		flex-direction: column;
		gap: 16px;
		width: 100%;
	}

	> .button {
		align-self: stretch;
	}

	> .question-row {
		display: flex;
		gap: 8px;
		align-items: center;
		justify-content: center;
	}

	.link {
		color: ${() => colors.primary};
		font-size: 16px;
		cursor: pointer;
	}

	@media screen and (max-width: 780px) {
		padding: 0px;
		border: none;

		> .logo {
			display: none;
		}
	}
`;

const QuestionRow = styled.div`
	display: flex;
	gap: 8px;
	align-items: center;
	justify-content: center;

	> .poppins-regular {
		font-size: 16px;
	}

	> .link {
		color: ${() => colors.primary};
		font-size: 16px;
		cursor: pointer;
    white-space: nowrap;
	}

	@media screen and (max-width: 780px) {
		.poppins-regular {
			font-size: 12px;
		}
	}
`;

export const Register: React.FC = () => {
	const navigate = useNavigate();

	return (
		<>
			<Header></Header>
			<main>
				<Wrapper>
					<RegisterContainer>
						<Logo className="logo"></Logo>
						<div className="poppins-medium" style={{ fontSize: '24px', color: 'black' }}>
							Sign up
						</div>
						<div className="inputs">
							<Input placeholder="E-mail" />

							<Input placeholder="Name" />
							<Input placeholder="Surname" />
							<Input.Password placeholder="Password" />
							<Input.Password placeholder="Repeat password" />
						</div>

						<AscentButton className="button" text="Sign in"></AscentButton>
						<QuestionRow>
							<div className="poppins-regular">Do you already have an account?</div>
							<div className="link poppins-regular" onClick={() => navigate('/login')}>
								Log in
							</div>
						</QuestionRow>
					</RegisterContainer>
				</Wrapper>
			</main>
		</>
	);
};
