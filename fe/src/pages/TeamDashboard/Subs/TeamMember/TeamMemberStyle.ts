import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const UserWrapper = styled(Link)`
  display: flex;
  align-items: center;
  gap: 16px;
  width: fit-content;
  padding-bottom: 10px;
  cursor: pointer;

  p {
    font-size: 14px;
    padding-bottom: 4px;
  }
`;

export const RoleBadgesWrapper = styled.div`
  display: flex;
  gap: 6px;
`;