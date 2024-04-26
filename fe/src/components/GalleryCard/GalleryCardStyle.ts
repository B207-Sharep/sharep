import { PALETTE } from '@/styles';
import styled from 'styled-components';

export const Card = styled.div`
  width: 300px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 3px;
  box-shadow: rgba(15, 15, 15, 0.1) 0px 0px 0px 1px, rgba(15, 15, 15, 0.1) 0px 2px 4px;
  cursor: pointer;
`;

export const CardContent = styled.div`
  height: 160px;
  overflow: hidden;
`;

export const CardText = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 10px;
  padding-right: 10px;
`;

export const CardDate = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const Text = styled.span<{ color?: string; fontSize?: number; fontWeight?: number }>`
  color: ${props => props.color};
  font-size: ${props => (props.fontSize ? `${props.fontSize}px` : '14px')};
  font-weight: ${props => (props.fontWeight ? `${props.fontWeight}` : '400')};
`;

export const Img = styled.img`
  width: 100%;
  height: 100%;
  overflow: hidden;
  object-fit: cover;
  border-radius: 3px 3px 0px 0px;
`;
