import styled from 'styled-components';
import { PALETTE } from '../../styles/globals';

export const CommitBox = styled.div`
  width: 100px;
  height: 84px;
  display: flex;
  flex-direction: column;
  /* align-items: flex-start;
  align-self: stretch; */
  border-radius: 6px;
  border: 1px solid rgba(208, 215, 222, 0.7);
  background: ${PALETTE.MAIN_WHITE};
`;

export const CommitUser = styled.div``;

export const Text = styled.p<{ color: string; fontSize: number }>`
  color: ${props => props.color};
  font-size: ${props => props.fontSize || ` font-size: 4`};
`;
