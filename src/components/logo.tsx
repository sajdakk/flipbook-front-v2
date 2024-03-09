import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  color: #000;
  text-align: center;
  font-size: 50px;
`;

export const Logo: React.FC = () => {
  return <Wrapper className="poppins-medium">Flipbook</Wrapper>;
};
