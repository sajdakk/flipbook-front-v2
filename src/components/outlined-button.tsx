import React from 'react';
import { styled } from 'styled-components';
import { colors } from '../styles/colors';

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
	onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const OutlinedButton: React.FC<Props> = ({ text, onClick }: Props) => {
	return (
		<Wrapper>
			<button className="poppins-medium" onClick={(event) => onClick?.call(event)}>
				{text}
			</button>
		</Wrapper>
	);
};
