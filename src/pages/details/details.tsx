import React, { useState } from 'react';
import styled from 'styled-components';
import { Header } from '../../components/header';
import { colors } from '../../styles/colors';
import { StarOutlined } from '@ant-design/icons';
import { Skeleton, Space } from 'antd';
import { AddReviewCard } from '../../components/add_review/add_review_card';
import { ReviewCard } from '../../components/review-card';
import { useDetails } from './use_details';
import { getFileUrl } from '../../utils/api';
import moment from 'moment';
import { ReviewForBook } from '../../types';

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: start;
	gap: 24px;
	padding: 24px;
	width: 100%;
	box-sizing: border-box;

	> .header {
		color: #000;
		font-size: 24px;
		padding: 0px;
	}

	.subtitle {
		font-size: 14px;
	}

	> #description {
		color: ${() => colors.text4};
		text-align: center;
		font-size: 14px;
		max-width: 800px;
	}

	@media screen and (max-width: 780px) {
		.header {
			font-size: 20px;
			align-self: flex-start;
		}

		> #description {
			text-align: start;
			font-size: 14px;
		}
	}
`;

export const MobileWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: start;
	justify-content: start;
	gap: 24px;

	> .mobile-info {
		display: none;
	}

	@media screen and (max-width: 780px) {
		width: 100%;

		> .mobile-info {
			display: flex;
			flex-direction: column;
			gap: 4px;
			align-items: start;
			justify-content: start;
		}
	}
`;

const BookDetails = styled.div`
	display: flex;
	flex-direction: row;
	gap: 64px;
	justify-content: center;
	align-items: center;

	> .book-image {
		width: 252px;
		height: 361.07px;
		object-fit: cover;
		border-radius: 16px;
	}

	> .info {
		display: flex;
		flex-direction: column;
		gap: 4px;
		align-items: start;
		justify-content: start;
	}

	.rate {
		font-size: 22px;
	}

	@media screen and (max-width: 780px) {
		> .book-image {
			width: 140px;
			height: 186px;
		}

		> .info {
			display: none;
		}
	}
`;

export const Details: React.FC = () => {
	const { book, user, addReview } = useDetails();

	const _getRate = (reviews: ReviewForBook[]) => {
		if (reviews.length === 0) {
			return 0;
		}
		let sum = 0;
		reviews.forEach((review) => (sum += review.rate));
		return (sum / reviews.length).toPrecision(2);
	};

	if (!book) {
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

	const dateOfPub = new Date(book.dateOfPublication);
	const acceptedReviews = book.reviews.filter((review) => review.acceptDate !== null);

	return (
		<>
			<Header></Header>
			<main>
				<Wrapper>
					<MobileWrapper>
						<BookDetails>
							<img className="book-image" src={getFileUrl(book.image)} alt="News Image 2" />
							<div className="info">
								<div className="poppins-semibold header">{book.title}</div>
								<div className="poppins-regular subtitle">
									{book.authors.map((author) => `${author.name} ${author.surname}`).join(', ')}
								</div>
								<div className="poppins-regular subtitle">Language: {book.language.language}</div>
								<div className="poppins-regular subtitle">
									Date of publication: {moment(dateOfPub).format('DD-MM-YYYY')}r.
								</div>
								<div className="poppins-regular subtitle">Page count: {book.pageCount}</div>
								<div className="poppins-regular subtitle">ISBN number: {book.isbnNumber}</div>
								<div className="poppins-regular subtitle">Genre: {book.genre.title}</div>
							</div>
							<Space size={8}>
								<StarOutlined className="rate" style={{ color: colors.ascent }} />
								<div
									className="inter-light rate"
									style={{
										color: colors.text3,
									}}
								>
									{_getRate(book.reviews)}/5
								</div>
							</Space>
						</BookDetails>
						<div className="mobile-info">
							<div className="poppins-semibold header">{book.title}</div>
							<div className="poppins-regular subtitle">
								{book.authors.map((author) => `${author.name} ${author.surname}`).join(', ')}
							</div>
							<div className="poppins-regular subtitle">Language: {book.language.language}</div>
							<div className="poppins-regular subtitle">
								Date of publication: {moment(dateOfPub).format('DD.MM.YYYY')}r.
							</div>
							<div className="poppins-regular subtitle">Page count: {book.pageCount}</div>
							<div className="poppins-regular subtitle">ISBN number: {book.isbnNumber}</div>
							<div className="poppins-regular subtitle">Genre: {book.genre.title}</div>
						</div>
					</MobileWrapper>
					<div id="description" className="dm-sans-regular">
						{book.description}
					</div>
					{book.acceptDate != null ?? <div className="poppins-semibold header">Add your review</div>}

					{user == undefined ? (
						<div className="poppins-regular subtitle">Log in to add a review</div>
					) : (
						<AddReviewCard user={user} book={book} addReview={addReview} />
					)}
					<div className="poppins-semibold header">What people are saying?</div>
					{acceptedReviews.length === 0 ? (
						<div className="poppins-regular subtitle">There is no reviews yet</div>
					) : (
						acceptedReviews.map((review) => <ReviewCard key={review.id} review={review} />)
					)}
				</Wrapper>
			</main>
		</>
	);
};
