import React from 'react';
import { styled } from 'styled-components';
import { colors } from '../styles/colors';
import { HeartFilled, StarOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Book, ReviewForBook } from '..';
import { API, getFileUrl } from '../utils/api';

const Wrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: start;
	background-color: white;
	border-radius: 16px;
	box-shadow: 0px 0px 10px 0px rgba(218, 223, 225, 0.4);
	max-width: 350px;
	height: 150px;
	width: 100%;

	> .news-image {
		width: 112.5px;
		height: 150px;
		object-fit: cover;
		border-radius: 16px 0px 0px 16px;
	}

	> .news-description {
		display: flex;
		padding: 8px;
		flex-direction: column;
		justify-content: space-between;
		width: 100%;
	}

	> .news-description > .card-header {
		display: flex;
		flex-direction: column;
		gap: 0px;
		padding: 0px;
	}

	> .news-description .title {
		display: flex;
		flex-direction: row;
		gap: 6px;
		justify-content: space-between;
	}

	> .news-description .extra-info {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
`;

const Score = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: start;
	gap: 8px;
	align-items: center;
	height: 20px;
`;
const CardHeader = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0px;
	padding: 0px;

	> .title {
		:first-child {
			font-size: 14px;
		}
	}

	.heart {
		font-size: 16px;
	}

	@media screen and (max-width: 780px) {
		> .title {
			:first-child {
				font-size: 12px;
			}
		}
	}
`;

interface Props {
	book: Book;
}

export const BookCard: React.FC<Props> = ({ book }: Props) => {
	const navigate = useNavigate();

	const _getRate = (reviews: ReviewForBook[]) => {
		if (reviews.length === 0) {
			return 0;
		}
		let sum = 0;
		reviews.forEach((review) => (sum += review.rate));
		return (sum / reviews.length).toPrecision(2);
	};

	return (
		<Wrapper onClick={() => navigate(`/books/${book.id}`)}>
			<img className="news-image" src={getFileUrl(book.image)} />
			<div className="news-description">
				<CardHeader>
					<div className="title">
						<div className="inter-semibold" style={{ color: colors.text2 }}>
							{book.title}
						</div>
						<HeartFilled className="heart" style={{ color: colors.ascent, cursor: 'pointer' }} />
					</div>
					<div className="inter-regular" style={{ fontSize: '10px', color: colors.text3 }}>
						{book.authors.map((author) => `${author.name} ${author.surname}`).join(', ')}
					</div>
				</CardHeader>
				<div className="extra-info">
					<Score>
						<StarOutlined style={{ color: colors.ascent }} />

						<div className="inter-light" style={{ fontSize: '12px', color: colors.text3 }}>
							{_getRate(book.reviews)} / 5
						</div>
					</Score>
					<div className="inter-extralight" style={{ fontSize: '12px', color: colors.text3 }}>
						{book.reviews.length} {book.reviews.length == 1 ? 'review' : 'reviews'}
					</div>
				</div>
			</div>
		</Wrapper>
	);
};
