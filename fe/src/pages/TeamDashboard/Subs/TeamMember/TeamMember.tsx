import React from 'react';
import * as S from './TeamMemberStyle';
import * as T from '@types';
import * as Comp from '@components';
import { useLocation } from 'react-router-dom';

export default function TeamMember({ id, name, roles, imageUrl }: T.TeamMemberProps) {
  const location = useLocation();

  return (
    <S.UserWrapper to={`${location.pathname}/members/${id}`}>
      <Comp.UserImg size="56px" path={imageUrl} />
      <div>
        <p>{name}</p>
        <S.RoleBadgesWrapper>
          {roles.map((role, idx) => (
            <Comp.RoleBadge key={`${name}-${role}-${idx}`} role={role} selectAble={false} />
          ))}
        </S.RoleBadgesWrapper>
      </div>
    </S.UserWrapper>
  );
}
