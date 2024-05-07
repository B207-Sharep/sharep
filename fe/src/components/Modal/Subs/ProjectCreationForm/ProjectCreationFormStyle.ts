import BaseLabelWithInput from '@/components/InputWithLabel/InputWithLabel';
import { PALETTE } from '@/styles';
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  align-self: stretch;
`;

export const FormItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  width: 100%;
`;

export const StyledInput = styled(BaseLabelWithInput.Input)<{ $icon?: boolean }>`
  display: flex;
  padding: 10px 14px;
  padding-left: ${({ $icon }) => ($icon ? '30px' : '10px')};
  align-items: center;
  gap: 8px;
  align-self: stretch;
  border-radius: 8px;
  border: 1px solid ${PALETTE.NO_GRASS};
  background: ${PALETTE.MAIN_WHITE};
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  font-size: 12px;
  width: 100%;
  &:focus {
    box-shadow: rgba(46, 184, 114, 0.05) 0px 6px 24px 0px, rgba(46, 184, 114, 0.08) 0px 0px 0px 3px;
  }
`;

export const InputContainer = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
`;

export const Icon = styled.div<{ $position?: string; $fillColor?: string; $strokeColor?: string }>`
  width: 12px;
  height: 12px;
  display: flex;
  align-items: center;
  position: ${({ $position }) => ($position ? $position : 'static')};
  left: 10px;
  & > svg {
    fill: ${({ $fillColor }) => ($fillColor ? $fillColor : 'none')};
    stroke: ${({ $strokeColor }) => ($strokeColor ? $strokeColor : 'none')};
  }
`;

export const StyledText = styled.span<{ color?: string; fontSize?: number; fontWeight?: number }>`
  color: ${({ color }) => color};
  font-size: ${({ fontSize }) => (fontSize ? `${fontSize}px` : '14px')};
  font-weight: ${({ fontWeight }) => (fontWeight ? fontWeight : '400')};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const StyledLabel = styled(StyledText)`
  display: flex;
  gap: 12px;
  font-weight: 500;
`;
export const SearchResultsDropdown = styled.div`
  position: absolute;
  top: 100%;
  width: 100%;
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
  display: flex;
  gap: 10px;
  z-index: 1;
  overflow-y: auto;
  max-height: 20vh;
`;

export const SearchResultItem = styled.div`
  align-self: stretch;
  padding: 8px;
  align-items: center;
  display: flex;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

export const RoleBadgeList = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  gap: 12px;
`;

export const Row = styled.div`
  align-self: stretch;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  display: flex;
`;

export const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: flex-start;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const MemberList = styled.div`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  justify-content: flex-start;
  gap: 12px;
`;

export const Content = styled.div`
  width: 100%;
  min-height: 30vh;
  padding: 10px;
  border: 1px solid rgba(139, 139, 139, 0.1);
  border-radius: 6px;
`;

export const RowContent = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

export const DeleteBtn = styled.div<{ $cursor: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 32px;
  cursor: ${({ $cursor }) => ($cursor ? 'pointer' : 'default')};
`;

export const LeaderBadge = styled.div`
  display: flex;
  background-color: ${PALETTE.MAIN_COLOR};
  border-radius: 6px;
  padding: 2px 6px;
`;

export const RoleBadgeBtn = styled.div<{ $state: boolean }>`
  :hover {
    opacity: 0.6;
  }
`;

export const TokenInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;
