import styled from 'styled-components';
import * as G from '@/styles';

interface Option {
  $flag: boolean;
}

export const Wrapper = styled.div<Option>`
  width: fit-content;
  padding: 4px 10px;
  background-color: ${({ $flag }) => ($flag ? `${G.PALETTE.MAIN_COLOR}` : `white`)};
  border: solid 1px #d0d7de;
  column-gap: 6px;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ $flag }) => (!$flag ? `${G.PALETTE.MAIN_COLOR}` : `white`)};
  /* color: white; */
  font-weight: 500;
  cursor: pointer;
`;
