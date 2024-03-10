import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
	color: #000;
	text-align: center;
	font-size: 50px;
`;

interface Props {
	className?: string;
}

export const Logo: React.FC<Props> = ({ className }: Props) => {
	return <Wrapper className={`poppins-medium ${className}`}>Flipbook</Wrapper>;
};
