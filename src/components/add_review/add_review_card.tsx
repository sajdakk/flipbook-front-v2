import { StarFilled, StarOutlined } from '@ant-design/icons';
import { Input, TimePicker, message } from 'antd';
import React from 'react';
import { styled } from 'styled-components';
import { AscentButton } from '../ascent-button';
import { colors } from '../../styles/colors';
import TextArea from 'antd/es/input/TextArea';
import moment, { now } from 'moment';
import { Book, User } from '../../types';
import { getFileUrl } from '../../utils/api';
import { time } from 'console';

const Wrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: stretch;
	background-color: white;
	border-radius: 16px;
	box-shadow: 0px 0px 10px 0px rgba(164, 180, 218, 0.4);
	width: 100%;
	padding: 16px;
	align-items: center;
	gap: 24px;
	box-sizing: border-box;
	text-overflow: ellipsis;

	> .placeholder-image {
		width: 120px;
		height: 120px;
		background-color: #ccc;
		border-radius: 50%;
	}

	> img {
		width: 120px;
		height: 120px;
		border-radius: 50%;
		object-fit: cover;
	}

	> .imagePreview {
		width: 120px;
		height: 120px;
		border-radius: 50%;
		object-fit: cover;
	}

	> .review-content {
		display: flex;
		flex-direction: column;
		justify-content: start;
		align-items: start;
		text-overflow: ellipsis;
		box-sizing: border-box;
		flex-grow: 1;
		gap: 12px;
		flex: 1; /* this will make it expand to fill remaining space */

	}

	.header {
		font-size: 14px;
	}

	@media screen and (max-width: 780px) {
		> img {
			width: 80px;
			height: 80px;
			border-radius: 50%;
			object-fit: cover;
		}

		> .imagePreview {
			width: 80px;
			height: 80px;
			border-radius: 50%;
			object-fit: cover;
		}

		> .placeholder-image {
			width: 80px;
			height: 80px;
		}

		gap: 12px;
		padding: 8px;
	}
`;

const ReviewForm = styled.form`
	align-self: stretch;
	flex-direction: row;
	justify-content: stretch;
	display: flex;
	gap: 16px;

	button {
		width: min-content;
	}

	> .review-inputs {
		display: flex;
		flex-direction: column;
		gap: 8px;
		width: 100%;
	}

	.review-stars {
		display: flex;
		flex-direction: row;
		justify-content: start;
		align-items: center;
		gap: 8px;
	}

	@media screen and (max-width: 780px) {
		flex-direction: column;
	}
`;

const ColoredStarFilled = styled(StarFilled)`
	color: ${() => colors.ascent};
`;
const ColoredStarOutlined = styled(StarOutlined)`
	color: ${() => colors.ascent};
`;

interface Props {
	user: User;
	book: Book;
	addReview: (review: string, rating: number) => Promise<void>;
}

export const AddReviewCard: React.FC<Props> = ({ user, book, addReview }) => {
	const [selectedStar, setSelectedStar] = React.useState(0);
	const [loading, setLoading] = React.useState(false);
	const [review, setReview] = React.useState('');

	const capitalize = (str: string) => {
		return str.charAt(0).toUpperCase() + str.slice(1);
	};

	const _submit = async () => {
		if (review === '') {
			message.error('Review cannot be empty.');
			return;
		}

		if (selectedStar === 0) {
			message.error('You must select a rating.');
			return;
		}

		setLoading(true);
		await addReview(review, selectedStar);
		setLoading(false);
	};

	const yourReview = book.reviews.find((review) => review.user.id === user.id);

	if (book.acceptDate === null) {
		return <></>;
	}

	if (yourReview !== undefined) {
		if (yourReview.acceptDate === null) {
			return (
				<div style={{ fontSize: '14px' }} className="poppins-regular">
					You have already reviewed this book. Waiting for acceptance.
				</div>
			);
		}

		return (
			<div style={{ fontSize: '14px' }} className="poppins-regular">
				You have already reviewed this book.
			</div>
		);
	}

	return (
		<Wrapper>
			{user.avatar === null ? (
				<div className="placeholder-image" />
			) : (
				<img className="imagePreview" src={getFileUrl(user.avatar)} alt="News Image 1" />
			)}
			<div className="review-content">
				<div className="inter-semibold header">
					{capitalize(user.name)} | {moment(now()).format('DD.MM.YYYY')} r.
				</div>
				<ReviewForm id="reviewForm">
					<div className="review-inputs">
						<TextArea
							style={{
								width: '100%',
							}}
							placeholder="Type something..."
							value={review}
							onChange={(e) => setReview(e.target.value)}
							required
						/>
						<div className="review-stars">
							{Array.from({ length: 5 }, (_, i) =>
								i + 1 <= selectedStar ? (
									<ColoredStarFilled key={i} onClick={() => setSelectedStar(i + 1)} />
								) : (
									<ColoredStarOutlined key={i} onClick={() => setSelectedStar(i + 1)} />
								)
							)}
						</div>
					</div>

					<AscentButton loading={loading} onClick={_submit}>
						Sent to review
					</AscentButton>
				</ReviewForm>
			</div>
		</Wrapper>
	);
};
