import React from "react";
import { styled } from "styled-components";
import { colors } from "../styles/colors";

const Wrapper = styled.div`
  > button {
    align-self: stretch;
    height: 40px;
    background: ${() => colors.statusInfo};
    border-radius: 12px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    display: inline-flex;
    border: 0px solid #ccc;
    color: white;

    font-size: 16px;
    font-family: "Poppins";
    font-weight: 600;
    word-wrap: break-word;
    cursor: pointer;
    padding-left: 16px;
    padding-right: 16px;
  }
`;

interface Props {
  text: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const SecondaryButton: React.FC<Props> = ({ text, onClick }: Props) => {
  return (
    <Wrapper>
      <button onClick={(event) => onClick?.call(event)}>{text}</button>
    </Wrapper>
  );
};
