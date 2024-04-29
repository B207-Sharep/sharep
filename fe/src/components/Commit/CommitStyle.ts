import { PALETTE } from '@/styles';
import styled from 'styled-components';

export const CommitWrapper = styled.div`
  width: 100%;
  background: ${PALETTE.MAIN_WHITE};
  border-radius: 6px;
  border: 1px solid rgba(208, 215, 222, 0.7);
`;

export const CommitInfo = styled.div<{ $isClickable?: boolean }>`
  width: 100%;
  height: 84px;
  padding: 24px 16px;
  display: flex;
  flex-direction: row;
  gap: 24px;
  align-items: center;
  border-radius: 6px;
  cursor: ${({ $isClickable }) => ($isClickable ? 'pointer' : 'default')};
`;

export const AccordionIconButton = styled.button`
  background: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
  width: 24px;
  height: 24px;
  &:focus {
    outline: none;
  }
`;

export const AccordionIcon = styled.div<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  transform: ${({ $isOpen }) => ($isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
  transition: transform 0.3s ease;
`;

export const CommitContent = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  gap: 10px;
  overflow: hidden;
`;

export const CommitMessage = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const CommitUserInfo = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
`;

export const Img = styled.img<{ width: number; height: number; radius: number }>`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  border-radius: ${props => props.radius}px;
  box-shadow: 0px 0px 0px 1px rgba(31, 35, 40, 0.15);
`;

export const JobBadgeList = styled.div`
  display: flex;
  gap: 4px;
`;

export const Text = styled.span<{ color?: string; fontSize?: number; fontWeight?: number }>`
  color: ${props => props.color};
  font-size: ${props => (props.fontSize ? `${props.fontSize}px` : '14px')};
  font-weight: ${props => (props.fontWeight ? `${props.fontWeight}` : '400')};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const CommitImageDetail = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px 64px;
`;
