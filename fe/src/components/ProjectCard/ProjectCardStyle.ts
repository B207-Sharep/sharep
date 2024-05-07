import { PALETTE } from '@/styles';
import styled from 'styled-components';

export const Card = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  background-color: #fff;
  flex-direction: column;
  padding: 24px 24px;
  row-gap: 36px;
  border-radius: 3px;
  box-shadow: rgba(15, 15, 15, 0.1) 0px 0px 0px 1px, rgba(15, 15, 15, 0.1) 0px 2px 4px;
  cursor: pointer;
`;

export const CardTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 12px;
`;
export const ImgWrapper = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 12px;
  position: relative;
`;

export const AddWrapper = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 12px;
  justify-content: center;
  align-items: center;
`;

export const Tooltip = styled.div`
  position: absolute;
  top: -40px;
  /* left: -10px; */
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 4px;
  border-radius: 4px;
  font-size: 8px;
  display: flex;
  flex-direction: row;
  width: fit-content;
  z-index: 2;
`;

export const StyledText = styled.span<{
  color?: string;
  fontSize?: number;
  fontWeight?: number;
  $add?: boolean;
}>`
  color: ${props => props.color};
  font-size: ${props => (props.fontSize ? `${props.fontSize}px` : '14px')};
  font-weight: ${props => (props.fontWeight ? `${props.fontWeight}` : '400')};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  visibility: ${props => (props.$add ? 'hidden' : 'visible')};
`;
