import { StarFilled, StarOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import React from 'react';
import { styled } from 'styled-components';
import { AscentButton } from './ascent-button';
import { colors } from '../styles/colors';
import TextArea from 'antd/es/input/TextArea';

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

export const AddReview: React.FC = () => {
	const [selectedStar, setSelectedStar] = React.useState(0);

	return (
		<Wrapper>
			<img
				className="imagePreview"
				src="https://w0.peakpx.com/wallpaper/660/478/HD-wallpaper-pride-and-joy-profile-colorful-black-art-rainbow-fantasy-phill314-girl-luminos.jpg"
				alt="News Image 1"
			/>

			<div className="review-content">
				<div className="inter-semibold header">Anita | 15.12.2023 r.</div>
				<ReviewForm id="reviewForm" action="addReview" method="post">
					<div className="review-inputs">
						<TextArea
							style={{
								width: '100%',
							}}
							placeholder="Type something..."
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

					<AscentButton text="Sent to review" />
				</ReviewForm>
			</div>
		</Wrapper>
	);
};
