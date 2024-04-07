import React, { useEffect } from 'react';
import styled from 'styled-components';
import { colors } from '../../styles/colors';
import { Logo, AscentButton } from '../../components';
import { Header } from '../../components/header/header';
import { Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useLogin } from './use_login';

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	padding: 24px;
	box-sizing: border-box;
`;

export const LoginContainer = styled.div`
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
		width: 100%;

		> p.error {
			height: 21px;
			margin: 0px;

			color: ${() => colors.statusDanger};
		}
	}

	> .button {
		align-self: stretch;
	}

	> .ant-form-item {
		width: 100%;
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

export const Login: React.FC = () => {
	const navigate = useNavigate();
	const [form] = Form.useForm();

	const { loading, loginWithPassword } = useLogin();

	const _onSubmit = (e: any) => {
		form
			.validateFields()
			.then((value) => {
				loginWithPassword(value.email, value.password);
			})
			.catch((_) => {});
	};

	useEffect(() => {
		const emailInput = document.querySelector('#email');
		emailInput?.setAttribute('placeholder', 'E-mail');

		const passwordInput = document.querySelector('#password');
		passwordInput?.setAttribute('placeholder', 'Password');
	});

	return (
		<>
			<Form onFinish={_onSubmit} scrollToFirstError form={form}>
				<Header></Header>
				<main>
					<Wrapper>
						<LoginContainer>
							<Logo className="logo"></Logo>
							<div className="poppins-medium" style={{ fontSize: '24px', color: 'black' }}>
								Log in
							</div>
							<div className="inputs">
								<Form.Item
									name="email"
									rules={[
										{
											type: 'email',
											message: 'The input is not valid E-mail!',
										},
										{
											required: true,
											message: 'Please input your E-mail!',
										},
									]}
								>
									<Input />
								</Form.Item>
								<Form.Item
									name="password"
									rules={[
										{
											required: true,
											message: 'Please input your password!',
										},
									]}
								>
									<Input.Password />
								</Form.Item>
							</div>
							<Form.Item>
								<AscentButton className="button" loading={loading} htmlType="submit">
									Log in
								</AscentButton>
							</Form.Item>
							<QuestionRow>
								<div className="poppins-regular">You don't have an account?</div>
								<div className="link poppins-regular" onClick={() => navigate('/register')}>
									Sign Up
								</div>
							</QuestionRow>
						</LoginContainer>
					</Wrapper>
				</main>
			</Form>
		</>
	);
};
