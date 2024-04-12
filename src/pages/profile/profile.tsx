import React, { useState } from 'react';
import styled from 'styled-components';
import { Header } from '../../components/header/header';
import { AvatarInput } from '../../components/avatar_input';
import { EditOutlined, ReadOutlined } from '@ant-design/icons';
import { colors } from '../../styles/colors';
import { ProfileReviewCard } from '../../components/profile-review-card';
import { useSessionManager } from '../../utils/session_provider';
import { useProfile } from './use_profile';
import { Skeleton, UploadFile } from 'antd';
import { ProfileBookCard } from '../../components';

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	max-width: 850px;
	box-sizing: border-box;
	padding-top: 24px;

	.header {
		color: #000;
		font-size: 24px;
		padding-bottom: 24px;
		align-self: center;
		padding-top: 24px;
	}

	@media screen and (max-width: 780px) {
		.header {
			font-size: 20px;
		}
	}
`;

const ItemList = styled.div`
	display: flex;
	flex-direction: column;
	gap: 24px;
	align-items: stretch;
	width: 100vw;
	padding: 24px;
	box-sizing: border-box;
`;

const MenuSelector = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
	align-items: center;
`;

const Menu = styled.div`
	display: flex;
	flex-direction: row;
	gap: 8px;
	justify-content: space-between;
	max-width: 350px;
	width: 100%;
	box-sizing: border-box;
	padding-left: 24px;
	padding-right: 24px;
	padding-bottom: 46px;
	box-sizing: border-box;
`;

const RoundedIcon = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 40px;
	height: 40px;
	border-radius: 50%;
	background-color: white;
	box-shadow: 0px 0px 10px 0px rgba(218, 223, 225, 0.4);
	border: 1px solid ${() => colors.ascentShade};
`;

export const Profile: React.FC = () => {
	const [selectedMenu, setSelectedMenu] = useState<number>(0);
	const { user, profile, fetchUser } = useProfile();

	if (!user) {
		return (
			<>
				<Header></Header>
				<main>
					<Wrapper>
						<div className="poppins-semibold header">You have to log in to see your profile</div>
					</Wrapper>
				</main>
			</>
		);
	}

	if (!profile) {
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

	const _onAvatarChange = () => {
		fetchUser(user.id);
	};

	return (
		<>
			<Header></Header>
			<main>
				<Wrapper>
					<AvatarInput initialValue={user.avatar} onChange={_onAvatarChange} user={user} />

					<div className="poppins-semibold header">Hello, {user.name}</div>
					<Menu>
						<MenuSelector id="review-menu" onClick={(_) => setSelectedMenu(0)}>
							<RoundedIcon
								style={
									selectedMenu === 0
										? {
												color: `${colors.ascent}`,
											}
										: {
												color: `${colors.primaryShade2}`,
											}
								}
							>
								<ReadOutlined />
							</RoundedIcon>
							<div
								className={selectedMenu === 0 ? 'poppins-semibold' : 'poppins-regular'}
								style={{
									fontSize: '12px',
								}}
							>
								Your reviews
							</div>
						</MenuSelector>

						<MenuSelector id="book-menu" onClick={(_) => setSelectedMenu(1)}>
							<RoundedIcon
								style={
									selectedMenu === 1
										? {
												color: `${colors.ascent}`,
											}
										: {
												color: `${colors.primaryShade2}`,
											}
								}
							>
								<EditOutlined />
							</RoundedIcon>
							<div
								className={selectedMenu === 1 ? 'poppins-semibold' : 'poppins-regular'}
								style={{
									fontSize: '12px',
								}}
							>
								Your books
							</div>
						</MenuSelector>
					</Menu>

					<ItemList
						style={
							selectedMenu === 0
								? {
										display: 'flex',
									}
								: {
										display: 'none',
									}
						}
					>
						{profile.reviews !== undefined
							? profile.reviews.map((review, index) => (
									<ProfileReviewCard key={index} review={review}></ProfileReviewCard>
								))
							: null}
					</ItemList>
					<ItemList
						style={
							selectedMenu === 1
								? {
										display: 'flex',
									}
								: {
										display: 'none',
									}
						}
					>
						{profile.books !== undefined
							? profile.books.map((book, index) => <ProfileBookCard key={index} book={book}></ProfileBookCard>)
							: null}
					</ItemList>
				</Wrapper>
			</main>
		</>
	);
};
