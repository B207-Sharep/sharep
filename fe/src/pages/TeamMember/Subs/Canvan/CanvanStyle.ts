import styled from 'styled-components';
import { PALETTE } from '@/styles';

export const IssuesWrapper = styled.article`
  flex: 1;
  padding: 16px;
  width: 30%;
  height: 100%;
  border-radius: 12px;
  background-color: white;
`;

export const IssuesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  height: calc(100% - 36px);
  overflow-y: auto;
  padding-top: 12px;
`;

export const CanvanTitle = styled.h1`
  width: 100%;
  height: 36px;
  padding: 0px 8px 4px 8px;
  border-bottom: 1px solid ${PALETTE.MAIN_BACKGROUND};
`;
