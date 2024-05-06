import styled from 'styled-components';

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

export const CardText = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 10px;
  padding-right: 10px;
`;

export const CardDate = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
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

export const Img = styled.img`
  width: 100%;
  height: 100%;
  overflow: hidden;
  object-fit: cover;
  border-radius: 3px 3px 0px 0px;
`;

export const PreviewContent = styled.div`
  width: 100%;
  height: 100%;
  border: 2px solid green;
  border-radius: 3px 3px 0px 0px;
  padding: 10px;
  white-space: nowrap;
`;
