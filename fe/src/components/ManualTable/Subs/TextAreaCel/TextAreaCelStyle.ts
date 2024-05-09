import styled from 'styled-components';
import { PALETTE } from '@/styles';

export const TextAreaCel = styled.textarea<{ $fixedWidth: string; $isEditingMode: boolean }>`
  max-width: 100%;
  width: ${({ $fixedWidth }) => $fixedWidth};
  min-height: 100%;
  min-width: fit-content;
  border-radius: ${({ $isEditingMode }) => $isEditingMode && '6px'};
  border: ${({ $isEditingMode }) => ($isEditingMode ? `1px solid ${PALETTE.MAIN_BACKGROUND}` : 'none')};
  box-shadow: ${({ $isEditingMode }) => $isEditingMode && '2px 2px 16px rgba(0, 0, 0, 0.36)'};
  color: ${PALETTE.TABLE_CONTENT};
  resize: none;
  outline: none;
  overflow: hidden;

  &:focus {
    border: none;
  }
`;
