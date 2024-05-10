import React, { useEffect } from 'react';
import styled from 'styled-components';
import { colors } from '../../styles/colors';
import { Logo, AscentButton } from '../../components';
import { Header } from '../../components/header';
import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useRegister } from './use_register';

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

export const Register: React.FC = () => {
	const navigate = useNavigate();
	const [form] = Form.useForm();
	const { loading, register } = useRegister();

	const _onSubmit = (_: any) => {
		form
			.validateFields()
			.then((value) => {
				register({
					email: value.email,
					password: value.password,
					name: value.name.trim(),
					surname: value.surname.trim(),
				});
			})
			.catch((_) => {});
	};

	return (
		<>
			<Form onFinish={_onSubmit} scrollToFirstError form={form}>
				<Header></Header>
				<main>
					<Wrapper>
						<RegisterContainer>
							<Logo className="logo"></Logo>
							<div className="poppins-medium" style={{ fontSize: '24px', color: 'black' }}>
								Sign up
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
									<Input placeholder="E-mail" />
								</Form.Item>
								<Form.Item
									name="name"
									validateFirst={true}
									rules={[
										{
											required: true,
											message: 'Please input your name!',
										},
										() => ({
											validator(_, value) {
												const trimmed = value?.trim();
												if (trimmed && trimmed?.length > 0) {
													return Promise.resolve();
												}
												return Promise.reject(new Error('The name that you entered is not valid!'));
											},
										}),
									]}
								>
									<Input placeholder="Name" />
								</Form.Item>
								<Form.Item
									name="surname"
									rules={[
										{
											required: true,
											message: 'Please input your surname!',
										},
										() => ({
											validator(_, value) {
												const trimmed = value?.trim();
												if (trimmed && trimmed?.length > 0) {
													return Promise.resolve();
												}
												return Promise.reject(new Error('The surname that you entered is not valid!'));
											},
										}),
									]}
								>
									<Input placeholder="Surname" />
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
									<Input.Password placeholder="Password" />
								</Form.Item>
								<Form.Item
									name="repeatPassword"
									dependencies={['password']}
									rules={[
										{
											required: true,
											message: 'Please input your password!',
										},
										({ getFieldValue }) => ({
											validator(_, value) {
												if (!value || getFieldValue('password') === value) {
													return Promise.resolve();
												}
												return Promise.reject(new Error('The new password that you entered do not match!'));
											},
										}),
									]}
								>
									<Input.Password placeholder="Repeat password" />
								</Form.Item>
							</div>

							<Form.Item>
								<AscentButton className="button" loading={loading} htmlType="submit">
									Sign in
								</AscentButton>
							</Form.Item>

							<QuestionRow>
								<div className="poppins-regular">Do you already have an account?</div>
								<div className="link poppins-regular" onClick={() => navigate('/login')}>
									Log in
								</div>
							</QuestionRow>
						</RegisterContainer>
					</Wrapper>
				</main>
			</Form>
		</>
	);
};
