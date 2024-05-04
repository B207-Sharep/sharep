import { PALETTE } from '@/styles';
import styled from 'styled-components';

export const Grid = styled.div`
  width: 100%;
  background-color: ${PALETTE.MAIN_WHITE};
  border-radius: 24px;
  padding: 16px;
  gap: 20px;
`;

export const CardList = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  justify-items: center;
  gap: 30px;
  padding: 24px 16px;
`;

export const CardAddBtn = styled.div`
  width: 100%;
  height: 250px;
  aspect-ratio: 16/9;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  box-shadow: rgba(15, 15, 15, 0.1) 0px 0px 0px 1px, rgba(15, 15, 15, 0.1) 0px 2px 4px;
  cursor: pointer;
`;

export const StyledText = styled.span<{
  color?: string;
  fontSize?: number;
  fontWeight?: number;
}>`
  color: ${props => props.color};
  font-size: ${props => (props.fontSize ? `${props.fontSize}px` : '14px')};
  font-weight: ${props => (props.fontWeight ? `${props.fontWeight}` : '400')};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const TextContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: center;
`;
