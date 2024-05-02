import { PALETTE } from '@/styles';
import styled from 'styled-components';

export const CanvansWrapper = styled.section`
  display: flex;
  gap: 24px;
  justify-content: space-between;
  width: 100%;
  height: 630px;
`;

export const IssuesWrapper = styled.article`
  padding: 16px;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  background-color: white;
`;

export const IssuesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  height: 100%;
`;

export const CanvanTitle = styled.h1`
  width: 100%;
  height: 36px;
  padding: 0px 8px 4px 8px;
  margin-bottom: 12px;
  border-bottom: 1px solid ${PALETTE.MAIN_BACKGROUND};
`;
