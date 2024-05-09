import styled from 'styled-components';
import * as G from '@/styles';

export const Header = styled.div`
  height: 50px;
  background-color: gray;
`;

export const RootLayout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100vw;
  overflow: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  padding: 0px 200px;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  /* height: 100%; */
  /* background-color: blue; */
  margin-left: -200px;
  margin-right: -200px;
`;

export const SloganWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 90vh;
  /* justify-content: center; */
  /* align-items: center; */
  background-color: ${G.PALETTE.MAIN_COLOR};
`;

export const Slogan = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 10%;
  justify-content: center;
  align-items: center;
`;

export const SubSlogan = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 190px;
  justify-content: center;
  align-items: center;
  background-color: ${G.PALETTE.NO_GRASS};
`;

export const tw = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const CardSection = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100px;
  background-color: greenyellow;
`;
