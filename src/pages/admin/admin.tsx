import React, { useState } from 'react';
import styled from 'styled-components';
import { Header } from '../../components/header/header';
import { EditOutlined, ReadOutlined, UserOutlined } from '@ant-design/icons';
import { colors } from '../../styles/colors';
import { useAdmin } from './use_admin';
import { AdminReviewCard } from '../../components/admin-review-card';
import { Skeleton } from 'antd';
import { AdminBookCard } from '../../components/admin-book-card';
import { AdminUserCard } from '../../components/admin-user-card';

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

export const Admin: React.FC = () => {
	const [selectedMenu, setSelectedMenu] = useState<number>(0);

	const { user, reviews, books,users, acceptReview, rejectReview, acceptBook, rejectBook, removeUser, toggleAdmin } = useAdmin();

	if (!user || user.role.id !== 3) {
		return (
			<>
				<Header></Header>
				<main>
					<Wrapper>
						<div className="poppins-semibold header">You have to be admin to see this page</div>
					</Wrapper>
				</main>
			</>
		);
	}

	if (books === undefined || reviews === undefined) {
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

	return (
		<>
			<Header></Header>
			<main>
				<Wrapper>
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
								Awaiting reviews
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
								Awaiting books
							</div>
						</MenuSelector>

						<MenuSelector id="user-menu" onClick={(_) => setSelectedMenu(2)}>
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
								<UserOutlined />
							</RoundedIcon>
							<div
								className={selectedMenu === 2 ? 'poppins-semibold' : 'poppins-regular'}
								style={{
									fontSize: '12px',
								}}
							>
								Users
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
						{reviews.map((review) => (
							<AdminReviewCard
								key={review.id}
								review={review}
								acceptReview={acceptReview}
								rejectReview={rejectReview}
							></AdminReviewCard>
						))}
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
						{books.map((book) => (
							<AdminBookCard key={book.id} book={book} acceptBook={acceptBook} rejectBook={rejectBook}></AdminBookCard>
						))}
					</ItemList>
					<ItemList
						style={
							selectedMenu === 2
								? {
										display: 'flex',
									}
								: {
										display: 'none',
									}
						}
					>
						{users.map((user) => (
							<AdminUserCard key={user.id} user={user} toggleAdmin={toggleAdmin} removeUser={removeUser}></AdminUserCard>
						))}
					</ItemList>
				</Wrapper>
			</main>
		</>
	);
};
