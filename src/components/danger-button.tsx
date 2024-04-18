import React, { ReactNode } from 'react';
import { styled } from 'styled-components';
import { colors } from '../styles/colors';
import { Button } from 'antd';

const Wrapper = styled.div`
	> button {
		align-self: stretch;
		height: 40px;
		background: ${() => colors.statusDanger};
		border-radius: 12px;
		justify-content: center;
		align-items: center;
		gap: 10px;
		display: inline-flex;
		border: 0px solid #ccc;
		color: white;

		font-size: 16px;
		font-family: 'Poppins';
		font-weight: 600;
		word-wrap: break-word;
		cursor: pointer;
		padding-left: 16px;
		padding-right: 16px;

		@media screen and (max-width: 780px) {
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

export const DangerButton: React.FC<Props> = ({ children, onClick, loading, className, htmlType }: Props) => {
	const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (onClick) {
            onClick(event);
        }
    };


	return (
		<Wrapper className={className}>
			<Button loading={loading} htmlType={htmlType} onClick={handleClick}>
				{children}
			</Button>
		</Wrapper>
	);
};
