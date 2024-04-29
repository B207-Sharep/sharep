import styled from 'styled-components';
import { PALETTE } from '@/styles';

export const OptionUlWrapper = styled.ul<{ $isEditingMode: boolean }>`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
  z-index: 1;
  background-color: white;
  position: absolute;
  top: 40.45px;
  left: 0px;
  visibility: hidden;
  border-radius: 0px 0px 6px 6px;
  box-shadow: ${({ $isEditingMode }) => $isEditingMode && '2px 16px 16px rgba(0, 0, 0, 0.36)'};
`;

export const OptionLi = styled.li`
  width: calc(100%);
  display: flex;
  justify-content: center;
  padding: 6px 0px;
`;

export const Wrapper = styled.button<{ $isEditingMode: boolean; $fixedWidth: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  width: ${({ $fixedWidth }) => $fixedWidth};
  min-width: 120px;
  min-height: fit-content;
  border-radius: ${({ $isEditingMode }) => $isEditingMode && '6px'};
  background-color: ${({ $isEditingMode }) => $isEditingMode && 'white !important'};
  box-shadow: ${({ $isEditingMode }) => $isEditingMode && '2px 2px 16px rgba(0, 0, 0, 0.36)'};
  color: ${PALETTE.TABLE_CONTENT};
  position: relative;

  * {
    cursor: ${({ $isEditingMode }) => !$isEditingMode && 'pointer'};
  }

  &:focus-within ${OptionUlWrapper} {
    visibility: visible;
  }
`;

export const Palceholder = styled.span``;
