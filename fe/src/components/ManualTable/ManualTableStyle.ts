import styled from 'styled-components';
import { PALETTE } from '@/styles';

export const TableWrapper = styled.ul`
  width: 100%;
  min-width: fit-content;
  height: 100%;
  min-height: fit-content;
  padding: 20px;
  overflow-x: scroll;
  background-color: white;
`;

export const TitleRowWrapper = styled.li`
  display: flex;
  width: 100%;
  min-width: fit-content;
  height: fit-content;
  min-height: fit-content;
`;

export const Title = styled.div<{ $fixedWidth: string }>`
  display: flex;
  gap: 12px;
  width: ${({ $fixedWidth }) => $fixedWidth};
  min-width: fit-content;
  border-top: 1px solid ${PALETTE.TABLE_BORDER};
  border-bottom: 1px solid ${PALETTE.TABLE_BORDER};
  padding: 16px 16px;
  font-weight: 700;
  cursor: default;

  & > p {
    color: ${PALETTE.TABLE_TITLE};
  }
`;

export const RowWrapper = styled.li`
  display: flex;
  width: 100%;
  min-width: fit-content;
  height: fit-content;
  min-height: fit-content;
  border-bottom: 1px solid ${PALETTE.TABLE_BORDER};

  & > div:nth-of-type(1) {
    font-weight: 700;
  }
`;
