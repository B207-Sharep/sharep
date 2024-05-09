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
  height: 110vh;
  position: relative;
  /* justify-content: center; */
  /* align-items: center; */
  background-color: ${G.PALETTE.MAIN_COLOR};
  /* background: linear-gradient(to bottom, ${G.PALETTE.MAIN_COLOR}, ${G.PALETTE.MAIN_WHITE}); */
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
  font-size: 24px;
  font-weight: 700;
  padding: 30px 0px;
`;

export const MonitorWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  /* position: relative; */
`;
export const Monitor = styled.div`
  display: flex;

  width: 80%;
  height: 65%;
  background-color: #000;
  border: 4px solid #707070;
  bottom: 2px;
  border-bottom: 0;
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
  box-shadow: 0 0 40px 2px rgba(28, 31, 47, 0.1);
  font-size: 1.5rem;
  padding: 0px 20px;
  padding-top: 20px;
  /* margin: 0px 15px; */
  position: absolute;
`;

export const MonitorScreen = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  border-bottom: 0;
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
  padding: 0px 20px;
  /* margin: 0px 15px; */
  background: url('/sang-hun.png');
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
