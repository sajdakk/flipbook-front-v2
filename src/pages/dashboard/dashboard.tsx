import React, { useState } from 'react';
import styled from 'styled-components';
import { Header } from '../../components/header/header';
import { Input, Skeleton } from 'antd';
import { AscentButton } from '../../components';
import { useDashboard } from './use_dashboard';
import { Content } from './components/content';

export const Wrapper = styled.div`
	padding-bottom: 24px;
	display: flex;
	flex-direction: column;
	gap: 24px;
	justify-content: stretch;
	align-items: stretch;
	width: 100%;
	max-width: 850px;
	box-sizing: border-box;

	.header {
		color: #000;
		font-size: 24px;
		padding-bottom: 24px;
		padding-top: 24px;
		align-self: center;
	}

	> :first-child {
		align-items: start;
		display: flex;
		flex-direction: column;
		padding-left: 24px;
		padding-right: 24px;
		box-sizing: border-box;
	}

	@media screen and (max-width: 780px) {
		.header {
			font-size: 20px;
		}

		main {
			padding-top: 0px;
		}
	}
`;

const HeaderForm = styled.form`
	align-self: stretch;
	flex-direction: row;
	justify-content: stretch;
	display: flex;
	gap: 16px;

	> .title-input {
		flex: 2;
	}

	> .name-input {
		flex: 1;
	}

	> .surname-input {
		flex: 1;
	}

	@media screen and (max-width: 780px) {
		flex-direction: column;
	}
`;

export const Dashboard: React.FC = () => {
	const { mayInterestYou, filteredBooks, loading, search } = useDashboard();
	const [title, setTitle] = useState('');
	const [name, setName] = useState('');
	const [surname, setSurname] = useState('');

	if (mayInterestYou === undefined || loading) {
		return (
			<>
				<Header></Header>
				<main>
					<Wrapper>
						<Skeleton active />
					</Wrapper>
				</main>
			</>
		);
	}

	const _submit = (e: any) => {
		e.preventDefault();
		e.stopPropagation();

		search({ title, name, surname });
	};

	return (
		<>
			<Header></Header>
			<main>
				<Wrapper>
					<div>
						<div className="poppins-semibold header">What can I find for you?</div>

						<HeaderForm>
							<Input
								className="title-input"
								placeholder="Title"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
							/>

							<Input
								className="name-input"
								placeholder="Author's name"
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
							<Input
								className="surname-input"
								placeholder="Author's surname"
								value={surname}
								onChange={(e) => setSurname(e.target.value)}
							/>
							<AscentButton onClick={_submit}>Search</AscentButton>
						</HeaderForm>
					</div>

					<Content mayInterestYou={mayInterestYou} filteredBooks={filteredBooks}></Content>
				</Wrapper>
			</main>
		</>
	);
};
