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
  display: wrap;
  align-items: flex-start;
  flex: 1;
  gap: 20px;
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 10px;
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
  flex: 0 1 auto;
  justify-content: center;
  align-items: flex-end;
  align-self: stretch;
  gap: 12px;
`;

export const IssueAssigneeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  /* background-color: ${PALETTE.MAIN_WHITE}; */
  padding: 6px 8px;
  border-radius: 6px;
`;

export const AssigneeBadge = styled.div`
  display: flex;
  align-self: flex-start;
  background-color: ${PALETTE.MAIN_COLOR};
  border-radius: 6px;
  padding: 4px 6px;
  margin-top: 4px;
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

export const BtnWrapper = styled.div`
  div {
    border: 1px solid ${PALETTE.MAIN_COLOR};
    background-color: ${PALETTE.MAIN_WHITE};
    color: ${PALETTE.MAIN_COLOR};
  }
  svg {
    stroke: ${PALETTE.MAIN_COLOR};
  }
`;

export const AssigneeContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
`;

export const DeleteBtn = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 3px;
  cursor: pointer;
  position: absolute;
  right: -5%;
  top: -20%;
  display: none;
`;

export const AssigneeUser = styled.div`
  display: inline-flex;
  border-radius: 4px;
  background-color: ${PALETTE.MAIN_WHITE};
  align-items: center;
  justify-content: flex-start;
  padding: 4px 6px;
  gap: 12px;
  position: relative;
  &:hover {
    ${DeleteBtn} {
      display: block;
    }
  }
`;

export const AddUserBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-top: 4px;
`;

export const Dropdown = styled.div`
  display: flex;
  position: absolute;
  top: -100%;
  left: 100%;
  margin-top: 4px;
  padding-top: 8px;
  padding-bottom: 8px;
  background: ${PALETTE.MAIN_WHITE};
  box-shadow: 0px 30px 150px rgba(139, 139, 139, 0.1);
  border: 1px solid rgba(139, 139, 139, 0.1);
  border-radius: 8px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
  z-index: 1;
  overflow-y: auto;
  max-height: 30vh;
`;

export const DropdowntItem = styled.div`
  align-self: stretch;
  padding: 8px;
  align-items: center;
  justify-content: center;
  display: flex;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

export const UserInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  width: 100%;
`;

export const UserProfile = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
`;
export const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${PALETTE.MAIN_WHITE};
  border-radius: 45px;
  width: 20px;
  height: 20px;
  cursor: pointer;
  box-shadow: 0px 0px 0px 1px rgba(31, 35, 40, 0.15);
  &:hover {
    background-color: ${PALETTE.MAIN_BACKGROUND};
  }
`;
