import React from 'react';
import styled from 'styled-components';
import { colors } from '../../styles/colors';
import { PrimaryButton, SecondaryButton, Logo, AscentButton } from '../../components';
import { Header } from '../../components/header';
import { Input } from 'antd';
import { BookCard } from '../../components/book-card';

export const Wrapper = styled.div`
	padding-left: 200px;
	padding-right: 200px;
	padding-bottom: 24px;
	display: flex;
	flex-direction: column;
	gap: 24px;
	justify-content: stretch;
	align-items: stretch;
	width: 100%;
	box-sizing: border-box;

	.header {
		color: #000;
		font-size: 24px;
		padding-bottom: 24px;
		align-items: center;
		padding-top: 24px;
	}

	> :first-child {
		align-items: start;
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
`;

const BookList = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 1rem;
	justify-content: center;
	flex-direction: row;
	align-self: center;
	width: 100%;
`;

const Content = styled.div`
	padding-top: 24px;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const Top: React.FC = () => {
	return (
		<>
			<Header></Header>
			<main>
				<Wrapper>
					<div>
						<div className="poppins-semibold header">What can I find for you?</div>

						<HeaderForm>
							<Input className="title-input" placeholder="Title" />

							<Input className="name-input" placeholder="Author's name" />
							<Input className="surname-input" placeholder="Author's surname" />
							<AscentButton text="Search" />
						</HeaderForm>
					</div>

					<Content>
						<div className="poppins-semibold header">May interest you</div>
						<BookList>
							{Array.from({ length: 5 }).map((_, index) => (
								<BookCard key={index}></BookCard>
							))}
						</BookList>
					</Content>
				</Wrapper>
			</main>
		</>
	);
};
