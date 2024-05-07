import { PALETTE } from '@/styles';
import styled from 'styled-components';

export const RowWrapper = styled.section`
  display: flex;
  gap: 24px;
`;

export const WhiteBoxWrapper = styled.article<{ $direction: 'row' | 'column' }>`
  display: flex;
  flex-direction: ${({ $direction }) => $direction};
  width: calc(50% - 12px);
  height: 244px;
  padding: 16px;
  border-radius: 12px;
  background-color: white;
  margin-bottom: 16px;
  box-shadow: 2px 2px 16px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h2`
  display: flex;
  gap: 10px;
  width: 100%;
  padding: 12px 0px 6px 0px;

  span {
    font-size: 20px;
    font-weight: 700;
  }
`;

export const MemberWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  width: fit-content;
  height: 100%;

  span {
    width: 100%;
    text-align: center;
  }

  span:nth-of-type(1) {
    font-size: 16px;
    font-weight: 700;
  }

  span:nth-of-type(2) {
    font-size: 14px;
    color: ${PALETTE.LIGHT_BLACK};
  }
`;

export const WorksWrapper = styled.div`
  width: calc(100% - 126px);
  padding-left: 24px;
`;

export const YesterdayWork = styled.div`
  width: 100%;
  height: calc(56px + 10px + 14px);
  height: fit-content;

  & > p {
    width: 100%;
    height: fit-content;
    font-size: 12px;
  }
`;

export const RecentlyCommitsScrollWrapper = styled.div`
  width: 100%;
  height: calc(100% - (42px * 2 + 16px));
  overflow: auto;
  border: 1px solid black;
`;

// export const ChartWrapper = styled.div`
//   width: 100%;
//   height: calc(100% - 42px);
//   padding-top: 10px;
//   border: 1px solid black;
// `;

export const KanbansWrapper = styled.section`
  display: flex;
  gap: 24px;
  justify-content: space-between;
  width: 100%;
  height: 630px;
`;
