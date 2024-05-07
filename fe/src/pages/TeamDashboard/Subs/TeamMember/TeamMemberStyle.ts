import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { PALETTE } from '@/styles';

export const UserWrapper = styled(Link)`
  display: flex;
  align-items: center;
  gap: 16px;
  width: fit-content;
  padding-bottom: 10px;
  cursor: pointer;
  position: relative;

  p {
    font-size: 14px;
    padding-bottom: 4px;
  }

  &:hover::after {
    content: attr(aria-label);
    width: fit-content;
    padding: 4px 8px;
    font-size: 12px;
    position: absolute;
    top: -20px;
    right: -32px;
    white-space: nowrap;
    color: white;
    border-radius: 6px;
    background-color: ${PALETTE.LIGHT_BLACK};
    z-index: 1;
  }
`;

export const RoleBadgesWrapper = styled.div`
  display: flex;
  gap: 6px;
`;
