import React from 'react';
import styled from 'styled-components';
import { Header } from '../../components/header/header';
import { BookCard } from '../../components/book-card';
import { useFavorites } from './use_favorites';

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	max-width: 850px;
	box-sizing: border-box;

	.header {
		color: #000;
		font-size: 24px;
		padding-bottom: 24px;
		align-self: center;
		padding-top: 24px;
	}

	@media screen and (max-width: 780px) {
		.header {
			font-size: 20px;
		}
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
	padding-left: 24px;
	padding-right: 24px;
	padding-bottom: 24px;
	box-sizing: border-box;
`;

export const Favorites: React.FC = () => {
	const { user } = useFavorites();

	if (!user) {
		return (
			<>
				<Header></Header>
				<main>
					<Wrapper>
						<div className="poppins-semibold header">You have to log in to see your favorites</div>
					</Wrapper>
				</main>
			</>
		);
	}

	return (
		<>
			<Header></Header>
			<main>
				<Wrapper>
					<div className="poppins-semibold header">Favorites</div>

					<BookList>
						{Array.from({ length: 5 }).map((_, index) => (
							<BookCard key={index}></BookCard>
						))}
					</BookList>
				</Wrapper>
			</main>
		</>
	);
};
