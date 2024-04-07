import React from 'react';
import { styled } from 'styled-components';
import { colors } from '../styles/colors';
import { Button } from 'antd';

const Wrapper = styled.div`
	> button {
		height: 40px;
		background: ${() => colors.ascent};
		border-radius: 12px;
		justify-content: center;
		align-items: center;
		align-self: center;
		display: inline-flex;
		border: 0px solid #ccc;
		color: white;
		font-size: 16px;
		word-wrap: break-word;
		cursor: pointer;
		padding-left: 16px;
		padding-right: 16px;
		width: 100%;
		white-space: nowrap;
	}

	@media screen and (max-width: 780px) {
		> button {
			font-size: 14px;
		}
	}
`;

interface Props {
	children: string;
	className?: string;
	onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
	loading?: boolean;
	htmlType?: 'button' | 'submit' | 'reset' | undefined;
}

export const AscentButton: React.FC<Props> = ({ children, className, loading, htmlType, onClick }: Props) => {
	return (
		<Wrapper className={className}>
			<Button className="poppins-regular" loading={loading} onClick={onClick} htmlType={htmlType}>
				{children}
			</Button>
		</Wrapper>
	);
};
