import { PALETTE } from '@/styles';
import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Header = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 20px;
`;

export const HeaderContainer = styled.div`
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  /* padding-bottom: 12px;
  border-bottom: 1px solid ${PALETTE.LIGHT_BLACK}; */
`;

export const StyledText = styled.span<{ color?: string; fontSize?: number; fontWeight?: number }>`
  color: ${({ color }) => color};
  font-size: ${({ fontSize }) => (fontSize ? `${fontSize}px` : '14px')};
  font-weight: ${({ fontWeight }) => (fontWeight ? `${fontWeight}` : '400')};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Divider = styled.div`
  width: 100%;
  height: 0;
  border: 1px #e3e3e3 solid;
`;

export const CommitWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  gap: 12px;
`;

export const IssueAssigneeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
`;

export const AssigneeBadge = styled.div`
  display: flex;
  background-color: ${PALETTE.MAIN_COLOR};
  border-radius: 6px;
  padding: 4px 6px;
`;

export const CommitUserInfo = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
`;

export const RoleBadgeList = styled.div`
  display: flex;
  gap: 4px;
`;

export const CommitImageDetail = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px 64px;
  border-radius: 10px;
  box-shadow: 0px 0px 0px 1px rgba(31, 35, 40, 0.15);
`;

export const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 10px 0px 30px;
`;

export const ContentItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
`;

export const ManualWrapper = styled.main`
  width: 100%;
  height: 100%;
  overflow-x: scroll;
  overflow-y: hidden;
`;
