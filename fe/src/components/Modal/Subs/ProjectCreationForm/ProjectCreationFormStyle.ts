import BaseLabelWithInput from '@/components/InputWithLabel/InputWithLabel';
import { PALETTE } from '@/styles';
import styled from 'styled-components';

export const ProjectCreationFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  align-self: stretch;
  /* border: 1px solid blue; */
`;

export const StyledBaseInput = styled(BaseLabelWithInput)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  font-size: 14px;
  font-weight: 500;
`;
export const StyledLabel = styled(BaseLabelWithInput.Label)`
  width: 100%;
  position: relative;
`;
export const StyledInput = styled(BaseLabelWithInput.Input)<{ $icon?: boolean }>`
  display: flex;
  padding: 10px 14px;
  padding-left: ${({ $icon }) => ($icon ? '34px' : '10px')};
  align-items: center;
  gap: 8px;
  align-self: stretch;
  border-radius: 8px;
  border: 1px solid ${PALETTE.NO_GRASS};
  background: ${PALETTE.MAIN_WHITE};
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  font-size: 12px;
  font-family: 'Pretendard';
  /* input:focus {
    box-shadow: rgba(46, 184, 114, 0.05) 0px 6px 24px 0px, rgba(46, 184, 114, 0.08) 0px 0px 0px 3px;
  } */
`;

export const Icon = styled.div<{ $fillColor?: string; $strokeColor?: string }>`
  width: 12px;
  height: 12px;
  & > svg {
    fill: ${props => (props.$fillColor ? props.$fillColor : 'none')};
    stroke: ${props => (props.$strokeColor ? props.$strokeColor : 'none')};
  }
`;

export const InputIconContainer = styled.div`
  width: 20px;
  height: 20px;
  position: absolute;
  top: 36px;
  left: 10px;
  pointer-events: none;
  & > svg {
    fill: ${PALETTE.LIGHT_BLACK};
    width: 20px;
  }
`;

export const Text = styled.span<{ color?: string; fontSize?: number; fontWeight?: number }>`
  color: ${props => props.color || 'inherit'};
  font-size: ${props => (props.fontSize ? `${props.fontSize}px` : '14px')};
  font-weight: ${props => (props.fontWeight ? props.fontWeight : '400')};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Label = styled(Text)`
  display: flex;
  gap: 12px;
  font-weight: 500;
`;

export const SearchResultsDropdown = styled.div`
  position: absolute;
  width: 100%;
  padding-top: 156;
  background: white;
  box-shadow: 0px 30px 150px rgba(139, 139, 139, 0.1);
  border-radius: 60;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  display: flex;
  gap: 10px;
  border: 1px solid #000000;
`;

export const SearchResultItem = styled.div`
  align-self: stretch;
  padding: 60;
  justify-content: flex-start;
  align-items: center;
  display: flex;
  border: 1px solid blue;
`;
