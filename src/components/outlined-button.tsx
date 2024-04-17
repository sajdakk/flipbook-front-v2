import React from 'react';
import { styled } from 'styled-components';
import { colors } from '../styles/colors';
import { Button } from 'antd';

const Wrapper = styled.div`
	> button {
		align-self: stretch;
		height: 40px;

		border-radius: 12px;
		justify-content: center;
		align-items: center;
		gap: 10px;
		display: inline-flex;
		color: ${() => colors.text3};
		background-color: white;
		font-size: 16px;
		word-wrap: break-word;
		cursor: pointer;
		padding-left: 16px;
		padding-right: 16px;
		border: 1.5px solid ${() => colors.primary};
		white-space: nowrap;

		@media screen and (max-width: 780px) {
			font-size: 14px;
		}
	}
`;

interface Props {
	text: string;
	onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
	htmlType?: 'button' | 'submit' | 'reset' | undefined;

}

export const OutlinedButton: React.FC<Props> = ({ text, onClick,htmlType }: Props) => {
	return (
		<Wrapper>
			<Button className="poppins-medium" htmlType={htmlType} onClick={(event) => onClick?.call(event)}>
				{text}
			</Button>
		</Wrapper>
	);
};
