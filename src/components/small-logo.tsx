import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  color: #000;
  text-align: center;
`;

export const SmallLogo: React.FC = () => {
  return <Wrapper className="poppins-medium">Flipbook</Wrapper>;
};
