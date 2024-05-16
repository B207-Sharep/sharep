import styled from 'styled-components';
import { PALETTE } from '@/styles';

export const GantChartScrollContainer = styled.div`
  width: 100%;
  height: calc(100% - (24px + 20px));
  overflow: auto;
  padding-top: 20px;
`;

export const Wrapper = styled.div`
  display: flex;
  width: fit-content;
  position: relative;
`;

export const OneDaySection = styled.section`
  width: 64px;
  border-left: 2px solid ${PALETTE.GANTT_CHART};
`;

export const IssueBar = styled.article<{ $idx: number; $bgColor: string; $width: string }>`
  width: ${({ $width }) => $width};
  height: 32px;
  position: absolute;
  top: ${({ $idx }) => ($idx - 1) * 32 + $idx * 4}px;
  left: ${({ $idx }) => ($idx - 1) * 64}px;
  background-color: ${({ $bgColor }) => $bgColor};
  border-radius: 12px;
  cursor: default;

  & > span {
    width: 100%;
    max-width: 128px;
    height: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    position: relative;
    font-weight: 700;
    line-height: 32px;
    padding-left: 16px;
  }

  & > div {
    position: relative;
    z-index: 1;
    &::after {
      white-space: nowrap;
      content: attr(aria-label);
      position: absolute;
      top: -8px;
      left: 0px;
      padding: 8px;
      background-color: ${PALETTE.LIGHT_BLACK};
      color: white;
      visibility: hidden;
      border-radius: 12px;
      font-size: 12px;
    }
  }

  & > span:hover + div::after {
    visibility: visible;
  }
`;
