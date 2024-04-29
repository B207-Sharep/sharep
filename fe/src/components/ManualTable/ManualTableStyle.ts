import styled from 'styled-components';
import { PALETTE } from '@/styles';

export const TableWrapper = styled.ul`
  width: 100%;
  height: fit-content;
  padding: 20px;
  overflow-x: scroll;
`;

export const TitleRowWrapper = styled.li`
  display: flex;
  width: 100%;
  height: fit-content;
`;

export const Title = styled.p`
  width: 100%;
  border-top: 1px solid ${PALETTE.TABLE_BORDER};
  border-bottom: 1px solid ${PALETTE.TABLE_BORDER};
  padding: 16px 16px;
  color: ${PALETTE.TABLE_TITLE};
`;

export const RowWrapper = styled.li`
  display: flex;
  width: 100%;
  height: fit-content;
  min-height: fit-content;
  border-bottom: 1px solid ${PALETTE.TABLE_BORDER};
`;
