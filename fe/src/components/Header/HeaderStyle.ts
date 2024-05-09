import styled from 'styled-components';
import * as G from '@/styles';

export const Header = styled.div`
  height: 50px;
  background-color: gray;
`;

export const MainWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100vw;
  height: 50px;
  background-color: ${G.PALETTE.MAIN_BACKGROUND};
  justify-content: space-between;
  align-items: center;
`;

export const LogoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100px;
  height: 100%;
  background-color: ${G.PALETTE.NO_GRASS};
`;

export const BtnWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: fit-content;
  height: fit-content;
  column-gap: 12px;
  margin-right: 20px;
  /* justify-content: center; */
  /* align-items: center; */
`;
