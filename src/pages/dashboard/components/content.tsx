import React from 'react';
import { Book } from '../../..';
import { styled } from 'styled-components';
import { BookCard } from '../../../components/book-card/book-card';

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
	box-sizing: border-box;
`;

const Wrapper = styled.div`
	padding-top: 24px;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

interface Props {
	mayInterestYou: Book[];
	filteredBooks: Book[] | undefined;
}

export const Content: React.FC<Props> = ({ mayInterestYou, filteredBooks }: Props) => {
	if (filteredBooks === undefined) {
		return (
			<Wrapper>
				<div className="poppins-semibold header">May interest you</div>
				<BookList>
					{mayInterestYou.map((book) => (
						<BookCard key={book.id} book={book} />
					))}
				</BookList>
			</Wrapper>
		);
	}
    
	return (
		<Wrapper>
            <BookList>
                {filteredBooks.map((book) => (
                    <BookCard key={book.id} book={book} />
                ))}
            </BookList>
        </Wrapper>
	);
};
