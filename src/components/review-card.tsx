import { StarOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import React from 'react';
import { styled } from 'styled-components';
import { colors } from '../styles/colors';

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

export const ReviewCard: React.FC = () => {
	return (
		<Wrapper>
			<div className="mobile-left-side-card">
				<img
					className="imagePreview"
					src="https://w0.peakpx.com/wallpaper/660/478/HD-wallpaper-pride-and-joy-profile-colorful-black-art-rainbow-fantasy-phill314-girl-luminos.jpg"
					alt="avatar"
				/>

				<Space className="mobile-stars" size={8}>
					<StarOutlined className="rate" style={{ color: colors.ascent }} />
					<div
						className="inter-light rate-text"
						style={{
							color: colors.text3,
						}}
					>
						4.5/5
					</div>
				</Space>
			</div>
			<div className="card-content">
				<div className="inter-semibold header">Anna | 10.10.2010 r.</div>
				<div className="dm-sans-regular text-content">
					Bardzo zgrabne fabularne połączenie faktów okołochopinowych. Czysta przyjemność czytania :) Doceniam
					przygotowanie merytoryczne autorki i pasję, jaką włożyła w przybliżenie czytelnikom kobiet kochających i
					kochanych przez Chopina. Jednakże moim zdaniem to książka "przegadana". Bohaterki opowiadają niezwykle
					rozwlekle, a poza tym, niestety, autorka próbuje ukształtować je na ofiary męskiej dominacji w świecie,
					męskiego myślenia itd. itp.
				</div>
			</div>
			<Space className="stars" size={8}>
				<StarOutlined className="rate" style={{ color: colors.ascent }} />
				<div
					className="inter-light rate-text"
					style={{
						color: colors.text3,
					}}
				>
					4.5/5
				</div>
			</Space>
		</Wrapper>
	);
};
