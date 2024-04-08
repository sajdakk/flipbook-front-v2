import React, { useState } from 'react';
import styled from 'styled-components';
import { Header } from '../../components/header';
import { colors } from '../../styles/colors';
import { StarOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import { AddReview } from '../../components/add_review';
import { ReviewCard } from '../../components/review-card';

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: start;
	gap: 24px;
	padding: 24px;
	width: 100%;
	box-sizing: border-box;

	>.header {
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

	}

	@media screen and (max-width: 780px) {
		.header {
			font-size: 20px;
			align-self: flex-start;
		}

		.subtitle {
			font-size: 14px;
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
	return (
		<>
			<Header></Header>
			<main>
				<Wrapper>
					<MobileWrapper>
						<BookDetails>
							<img
								className="book-image"
								src="https://i.guim.co.uk/img/media/423d3ddf306e98864c1d887c1dcf290421cd21a7/0_169_4912_6140/master/4912.jpg?width=700&quality=85&auto=format&fit=max&s=864393ed1c322fc5ddcb2766c3c945e6"
								alt="News Image 2"
							/>
							<div className="info">
								<div className="poppins-semibold header">Pan Tadeusz</div>
								<div className="poppins-regular subtitle">Adam Mickiewicz</div>
								<div className="poppins-regular subtitle">Language: polski</div>
								<div className="poppins-regular subtitle">Date of publication: 20.11.2023 r.</div>
								<div className="poppins-regular subtitle">Page count: 306</div>
								<div className="poppins-regular subtitle">ISBN number: 400-12-407-1234-5</div>
								<div className="poppins-regular subtitle">Genre: epopeja</div>
							</div>
							<Space size={8}>
								<StarOutlined className="rate" style={{ color: colors.ascent }} />
								<div
									className="inter-light rate"
									style={{
										color: colors.text3,
									}}
								>
									4.5/5
								</div>
							</Space>
						</BookDetails>
						<div className="mobile-info">
							<div className="poppins-semibold header">Pan Tadeusz</div>
							<div className="poppins-regular subtitle">Adam Mickiewicz</div>
							<div className="poppins-regular subtitle">Language: polski</div>
							<div className="poppins-regular subtitle">Date of publication: 20.11.2023 r.</div>
							<div className="poppins-regular subtitle">Page count: 306</div>
							<div className="poppins-regular subtitle">ISBN number: 400-12-407-1234-5</div>
							<div className="poppins-regular subtitle">Genre: epopeja</div>
						</div>
					</MobileWrapper>
					<div id="description" className="dm-sans-regular">
						Lorem Ipsum jest tekstem stosowanym jako przykładowy wypełniacz w przemyśle poligraficznym. Został po raz
						pierwszy użyty w XV w. przez nieznanego drukarza do wypełnienia tekstem próbnej książki. Pięć wieków później
						zaczął być używany przemyśle elektronicznym, pozostając praktycznie niezmienionym. Spopularyzował się w
						latach 60. XX w. wraz z publikacją. Lorem Ipsum jest tekstem stosowanym jako przykładowy wypełniacz w
						przemyśle poligraficznym. Został po raz pierwszy użyty w XV w. przez nieznanego drukarza do wypełnienia
						tekstem próbnej książki. Pięć wieków później zaczął być używany przemyśle elektronicznym, pozostając
						praktycznie niezmienionym. Spopularyzował się w latach 60. XX w. wraz z publikacją
					</div>
					<div className="poppins-semibold header">Add your review</div>
					<AddReview />
					<div className="poppins-semibold header">What people are saying?</div>
					{Array.from({ length: 5 }).map((_, index) => (
						<ReviewCard key={index}></ReviewCard>
					))}
				</Wrapper>
			</main>
		</>
	);
};
