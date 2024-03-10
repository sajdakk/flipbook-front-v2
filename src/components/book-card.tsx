import React from 'react';
import { styled } from 'styled-components';
import { colors } from '../styles/colors';
import { HeartFilled, StarOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

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

export const BookCard: React.FC = () => {
	const navigate = useNavigate();
	return (
		<Wrapper onClick={() => navigate('/books/4')}>
			<img
				className="news-image"
				src="https://i.guim.co.uk/img/media/423d3ddf306e98864c1d887c1dcf290421cd21a7/0_169_4912_6140/master/4912.jpg?width=700&quality=85&auto=format&fit=max&s=864393ed1c322fc5ddcb2766c3c945e6"
			/>
			<div className="news-description">
				<CardHeader>
					<div className="title">
						<div className="inter-semibold" style={{ color: colors.text2 }}>
							Harry Potter and the philosopher's stone
						</div>
						<HeartFilled className="heart" style={{ color: colors.ascent, cursor: 'pointer' }} />
					</div>
					<div className="inter-regular" style={{ fontSize: '10px', color: colors.text3 }}>
						Rowling, J. K.
					</div>
				</CardHeader>
				<div className="extra-info">
					<Score>
						<StarOutlined style={{ color: colors.ascent }} />

						<div className="inter-light" style={{ fontSize: '12px', color: colors.text3 }}>
							4.5 / 5
						</div>
					</Score>
					<div className="inter-extralight" style={{ fontSize: '12px', color: colors.text3 }}>
						104 reviews
					</div>
				</div>
			</div>
		</Wrapper>
	);
};
