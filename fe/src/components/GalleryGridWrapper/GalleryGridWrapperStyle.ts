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
  color: ${({ color }) => color};
  font-size: ${({ fontSize }) => (fontSize ? `${fontSize}px` : '14px')};
  font-weight: ${({ fontWeight }) => (fontWeight ? `${fontWeight}` : '400')};
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

export const Card = styled.div`
  width: 100%;
  aspect-ratio: 16/9;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 3px;
  box-shadow: rgba(15, 15, 15, 0.1) 0px 0px 0px 1px, rgba(15, 15, 15, 0.1) 0px 2px 4px;
  cursor: pointer;
`;

export const CardContent = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
`;

export const PreviewContent = styled.div`
  width: 100%;
  height: 100%;
  border-bottom: 1px solid #e3e3e3;
  border-radius: 3px 3px 0px 0px;
  padding: 10px;
  white-space: nowrap;
`;

export const CardText = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 10px;
  padding-right: 10px;
`;

export const NewCardInput = styled.input`
  width: 100%;
  height: 100%;
  border: 0;
  color: ${PALETTE.SUB_BLACK};
  font-weight: 700;
`;

export const DefaultImage = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${PALETTE.MAIN_BACKGROUND};
`;
