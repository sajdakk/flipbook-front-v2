import { StarOutlined } from '@ant-design/icons';
import React from 'react';
import { colors } from '../styles/colors';
import { styled } from 'styled-components';
import { ReviewForProfile } from '../types';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: stretch;
	background-color: white;
	border-radius: 16px;
	box-shadow: 0px 0px 10px 0px rgba(218, 223, 225, 0.4);
	width: 100%;
	padding: 16px;
	align-items: center;
	gap: 24px;
	box-sizing: border-box;
	text-overflow: ellipsis;

	> .card-content {
		display: flex;
		flex-direction: column;
		justify-content: start;
		align-items: start;
		text-overflow: ellipsis;
		overflow: hidden;
		box-sizing: border-box;
		width: 100%;
	}

	> .card-info {
		display: flex;
		flex-direction: column;
		gap: 0px;
		padding: 0px;
	}

	> .profile-card-right-side {
		display: flex;
		flex-direction: row;
		justify-content: start;
		align-items: center;
		gap: 24px;
		height: 100%;
	}

	.status-rejected {
		color: ${() => colors.statusDanger};
		font-family: Inter;
		font-size: 14px;
		font-style: normal;
		font-weight: 400;
		line-height: 32px;
		text-align: center;
	}

	.status-accepted {
		color: ${() => colors.statusSuccess};
		font-family: Inter;
		font-size: 14px;
		font-style: normal;
		font-weight: 400;
		line-height: 32px;
		text-align: center;
	}

	.status-awaiting {
		color: ${() => colors.statusInfo};
		font-family: Inter;
		font-size: 14px;
		font-style: normal;
		font-weight: 400;
		line-height: 32px;
		text-align: center;
	}

	.extra-info {
		display: flex;
		flex-direction: row;
		justify-content: center;
		gap: 8px;
		align-items: center;
	}

	@media screen and (max-width: 780px) {
		padding: 8px;
		gap: 12px;

		> .profile-card-right-side {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			gap: 8px;
			height: 100%;

			> .extra-info {
				flex-direction: column;
			}
		}
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

interface Props {
	review: ReviewForProfile;
}

export const ProfileReviewCard: React.FC<Props> = ({ review }) => {
	const navigate = useNavigate();

	const _getStatus = (): string => {
		if (review.acceptDate) {
			return 'accepted';
		}

		if (review.rejectDate) {
			return 'rejected';
		}

		return 'awaiting';
	};

	return (
		<Wrapper onClick={() => navigate(`/books/${review.id}`)}>
			<div className="card-content">
				<div className="card-info">
					<div
						className="inter-semibold"
						style={{
							fontSize: '14px',
						}}
					>
						{review.book.title}
					</div>
					<div
						className="inter-regular"
						style={{
							fontSize: '10px',
							color: colors.text3,
						}}
					>
						{review.book.authors.map((author) => `${author.name} ${author.surname}`).join(', ')}
					</div>
					<div
						className="dm-sans-regular"
						style={{
							fontSize: '12px',
							color: colors.text4,
						}}
					>
						{review.content}
					</div>
				</div>
			</div>
			<div className="profile-card-right-side">
				<div className="extra-info">
					<Score>
						<StarOutlined style={{ color: colors.ascent }} />

						<div className="inter-light" style={{ fontSize: '12px', color: colors.text3, whiteSpace: 'nowrap' }}>
							{review.rate} / 5
						</div>
					</Score>
					<div style={{ textTransform: 'capitalize' }} className={`status-${_getStatus()}`}>
						{_getStatus()}
					</div>
				</div>
			</div>
		</Wrapper>
	);
};
