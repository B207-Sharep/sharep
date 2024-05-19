import styled from 'styled-components';
import { PALETTE } from '@/styles';

export const GantChartScrollContainer = styled.div`
  width: 100%;
  overflow: auto;
  position: relative;
  margin-top: 20px;
`;

export const DateRowWrapper = styled.div<{ $width: number }>`
  display: flex;
  width: ${({ $width }) => $width}px;
  height: 44px;
  background-color: ${PALETTE.MAIN_BACKGROUND};
  position: absolute;
  top: 0;

  & > div:nth-of-type(1) {
    min-width: 164px;
    width: 164px;
    height: 100%;
    background-color: ${PALETTE.MAIN_BACKGROUND};
    border-right: 1px solid ${PALETTE.LIGHT_BLACK};
    > div {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;

export const Wrapper = styled.div`
  height: fit-content;
  position: relative;
`;

export const RowWrapper = styled.div<{ $idx: number }>`
  display: flex;
  width: fit-content;
  height: 44px;
  position: absolute;
  top: ${({ $idx }) => 44 * ($idx + 1)}px;
  background-color: ${({ $idx }) => ($idx % 2 ? PALETTE.MAIN_BACKGROUND : 'white')};
`;

export const StickyTitleWrapper = styled.div<{ $idx: number }>`
  display: flex;
  position: sticky;
  left: 0px;
  z-index: 1;
  background-color: ${({ $idx }) => ($idx % 2 ? PALETTE.MAIN_BACKGROUND : 'white')};
`;

export const IssueName = styled.p<{ $state: 'DONE' | 'NOW' }>`
  min-width: 164px;
  width: 164px;
  height: 100%;
  padding: 12px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: default;
  line-height: 24px;
  font-size: 14px;
  font-weight: 600;
  color: ${({ $state }) => ($state === 'DONE' ? PALETTE.MAIN_BLACK : PALETTE.LIGHT_BLACK)};
  border-right: 1px solid ${PALETTE.LIGHT_BLACK};

  &:hover + div::after {
    visibility: visible;
  }
`;

export const AriaLabel = styled.div`
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
`;

export const DateSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 188px;
  height: 100%;
  border-right: 2px solid #dddddd;
  font-size: 18px;
  color: ${PALETTE.SUB_BLACK};
  position: relative;
  z-index: 0;
`;

export const IssueBar = styled.div<{ $costTime: number; $state: 'DONE' | 'NOW'; $diffFirstStarted: number }>`
  position: absolute;
  top: 20%;
  left: ${({ $diffFirstStarted }) => {
    return `${165 + $diffFirstStarted * 188}px`;
  }};
  min-width: ${({ $costTime, $state }) => {
    return $state === 'DONE' ? `${$costTime * 188 - 3}px` : `${$costTime * 188 - 3}px`;
  }};
  height: 22px;
  border-radius: 4px;
  background-color: ${({ $state }) => ($state === 'DONE' ? PALETTE.MAIN_COLOR : PALETTE.LIGHT_COLOR)};
  opacity: 0.8;
  z-index: 0;
`;
