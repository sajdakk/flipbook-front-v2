import { StarOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import React from 'react';
import { styled } from 'styled-components';
import { colors } from '../styles/colors';
import { ReviewForBook } from '../types';
import { get } from 'http';
import { getFileUrl } from '../utils/api';
import moment from 'moment';

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


	> .card-content {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	> .stars {
		display: flex;
		flex-direction: row;
		justify-content: center;
		gap: 8px;
		align-items: center;
	}

	> .mobile-left-side-card {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 8px;

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


	> .placeholder-image {
		width: 120px;
		height: 120px;
		background-color: #ccc;
		border-radius: 50%;
	}

		> .mobile-stars {
			display: none;
		}
	}

	.header {
		font-size: 14px;
	}

	.text-content {
		font-size: 14px;
		color: ${colors.text3};
	}

	.rate-text {
		font-size: 14px;
	}

	@media screen and (max-width: 780px) {
		> .mobile-left-side-card {
			> .mobile-stars {
				display: flex;
				flex-direction: row;
			}

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
		}

		> .stars {
			display: none;
		}

		.text-content {
			font-size: 12px;
			color: ${colors.text3};
		}

		gap: 12px;
		padding: 8px;
	}
`;

interface Props {
	review: ReviewForBook;
}

export const ReviewCard: React.FC<Props> = ({ review }) => {
	const capitalize = (str: string) => {
		return str.charAt(0).toUpperCase() + str.slice(1);
	};

	return (
		<Wrapper>
			<div className="mobile-left-side-card">
				{review.user.avatar ? (
					<img src={getFileUrl(review.user.avatar)} alt="avatar" />
				) : (
					<div className="placeholder-image" />
				)}

				<Space className="mobile-stars" size={8}>
					<StarOutlined className="rate" style={{ color: colors.ascent }} />
					<div
						className="inter-light rate-text"
						style={{
							color: colors.text3,
						}}
					>
						{review.rate}/5
					</div>
				</Space>
			</div>
			<div className="card-content">
				<div className="inter-semibold header">{`${capitalize(review.user.name)} | ${moment(review.uploadDate).format('DD.MM.YYYY')}r.`}</div>
				<div className="dm-sans-regular text-content">{review.content}</div>
			</div>
			<Space className="stars" size={8}>
				<StarOutlined className="rate" style={{ color: colors.ascent }} />
				<div
					className="inter-light rate-text"
					style={{
						color: colors.text3,
					}}
				>
					{review.rate}/5
				</div>
			</Space>
		</Wrapper>
	);
};
