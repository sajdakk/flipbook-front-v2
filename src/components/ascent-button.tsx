import React from "react";
import { styled } from "styled-components";
import { colors } from "../styles/colors";

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

    font-size: 14px;
    font-family: "Poppins";
    font-weight: 600;
    word-wrap: break-word;
    cursor: pointer;
    padding-left: 16px;
    padding-right: 16px;
    width: 100%;
  }
`;

interface Props {
  text: string;
  className?: string;
}

export const AscentButton: React.FC<Props> = ({ text, className }: Props) => {
  return (
    <Wrapper className={className}>
      <button>{text}</button>
    </Wrapper>
  );
};
