import { StarOutlined } from '@ant-design/icons';
import React from 'react';
import { styled } from 'styled-components';
import { colors } from '../styles/colors';
import { AscentButton } from './ascent-button';
import { DangerButton } from '.';
import { User } from '../types';
import { useNavigate } from 'react-router-dom';
import { Popconfirm } from 'antd';

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

		> .buttons {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			gap: 8px;
		}
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

interface Props {
	user: User;
	toggleAdmin: (id: number) => void;
	removeUser: (id: number) => void;
}

export const AdminUserCard: React.FC<Props> = ({ user, toggleAdmin, removeUser }: Props) => {
	const [acceptLoading, setToggleAdminLoading] = React.useState(false);
	const [rejectLoading, setRemoveLoading] = React.useState(false);
	const navigate = useNavigate();

	const handleToggleAdmin = async () => {
		setToggleAdminLoading(true);
		await toggleAdmin(user.id);
		setToggleAdminLoading(false);
	};

	const handleRemove = async () => {
		setRemoveLoading(true);
		await removeUser(user.id);
		setRemoveLoading(false);
	};

	return (
		<Wrapper>
			<div className="card-content">
				<div className="card-info">
					<div
						className="inter-semibold"
						style={{
							fontSize: '14px',
						}}
					>
						{user.email}
					</div>
					<div
						className="inter-regular"
						style={{
							fontSize: '10px',
							color: colors.text3,
						}}
					>
						{user.name + ' ' + user.surname}
					</div>
					<div
						className="dm-sans-regular"
						style={{
							fontSize: '12px',
							color: colors.text4,
						}}
					>
						{user.role.id === 3 ? 'Admin' : 'User'}
					</div>
				</div>
			</div>
			<div className="profile-card-right-side">
				<div className="extra-info">
					<div className="buttons">
						<AscentButton
							loading={acceptLoading}
							onClick={(e) => {
								e.stopPropagation();
								handleToggleAdmin();
							}}
						>
							{user.role.id === 3 ? 'Remove admin' : 'Make admin'}
						</AscentButton>
						<Popconfirm
							title="Delete the user"
							description="Are you sure to delete this user?"
							onConfirm={(e)=>{
								e?.stopPropagation();
								handleRemove();
							}}
							okText="Yes"
							cancelText="No"
						>
							<DangerButton loading={rejectLoading}>Remove user</DangerButton>
						</Popconfirm>
					</div>
				</div>
			</div>
		</Wrapper>
	);
};
