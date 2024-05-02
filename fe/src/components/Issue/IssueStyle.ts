import styled from 'styled-components';
import { PALETTE } from '@/styles';

export const RelativeWrapper = styled.button`
  width: 100%;
  height: 116px;
  border-radius: 12px;
  background-color: white;
  box-shadow: 0px 6px 24px rgba(0, 0, 0, 0.05);
  position: relative;

  span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  *::after {
    z-index: 1;
  }
`;

export const DragAbleContainer = styled.div<{ $isHolding: boolean; $position: { x: number; y: number } }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px;
  width: 100%;
  height: 116px;
  background-color: white;
  border-radius: 12px;
  position: ${({ $isHolding }) => ($isHolding ? 'fixed' : 'relative')};
  top: ${({ $isHolding, $position }) => $isHolding && $position.y}%;
  left: ${({ $isHolding, $position }) => $isHolding && $position.x}%;
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  position: relative;

  span {
    max-width: 218px;
    padding-top: 4px;
    vertical-align: bottom;
    font-size: 14px;
    font-weight: 700;
  }

  span:hover::after {
    content: attr(aria-label);
    position: absolute;
    top: 26px;
    left: 0;
    color: white;
    padding: 8px;
    border-radius: 4px;
    background-color: ${PALETTE.LIGHT_BLACK};
  }

  svg {
    cursor: pointer;
    padding: 4px;

    &:hover {
      background-color: ${PALETTE.MAIN_BACKGROUND};
      border-radius: 50%;
    }
  }
`;

export const RecentlyCommit = styled.p`
  display: flex;
  align-items: center;
  gap: 4px;
  height: 18px;
  position: relative;

  * {
    color: ${PALETTE.LIGHT_BLACK};
  }

  span:nth-of-type(1) {
    max-width: 200px;
    font-size: 12px;
  }

  span:nth-of-type(1):hover::after {
    content: attr(aria-label);
    position: absolute;
    top: 20px;
    left: 0;
    color: white;
    padding: 8px;
    border-radius: 4px;
    background-color: ${PALETTE.LIGHT_BLACK};
  }

  span:nth-of-type(2) {
    font-size: 10px;
    padding-left: 4px;
  }
`;

export const AboutEtcWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const PriorityWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  height: 32px;

  span {
    color: ${PALETTE.SUB_BLACK};
    font-weight: 700;
  }
`;

export const AssignessWrapper = styled.div<{ $assigneesNumber: number }>`
  width: ${({ $assigneesNumber }) => 24 * $assigneesNumber}px;
  position: relative;
`;

export const UserImgWrapper = styled.div<{ $idx: number }>`
  position: absolute;
  top: 0;
  left: ${({ $idx }) => 18 * $idx}px;
`;
