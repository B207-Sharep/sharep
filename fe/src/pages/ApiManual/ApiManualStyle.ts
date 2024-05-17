import styled from 'styled-components';

export const ManualWrapper = styled.main`
  width: 100%;
  height: fit-content;
  padding: 24px;
  overflow-x: scroll;
  overflow-y: hidden;
  border-radius: 12px;
`;

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Header = styled.div`
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
`;

export const StyledText = styled.span<{ color?: string; fontSize?: number; fontWeight?: number }>`
  color: ${({ color }) => color};
  font-size: ${({ fontSize }) => (fontSize ? `${fontSize}px` : '14px')};
  font-weight: ${({ fontWeight }) => (fontWeight ? `${fontWeight}` : '400')};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
