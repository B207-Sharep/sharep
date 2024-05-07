import React from 'react';
import * as S from './TeamMemberStyle';
import * as T from '@types';
import * as Comp from '@components';
import { useLocation } from 'react-router-dom';

export default function TeamMember({ id, nickname, roles, imageUrl }: T.TeamMemberProps) {
  const location = useLocation();

  return (
    <S.UserWrapper to={`${location.pathname}/members/${id}`} aria-label={`${nickname} 팀원 페이지로 가기`}>
      <Comp.UserImg size="56px" path={imageUrl} />
      <div>
        <p>{nickname}</p>
        <S.RoleBadgesWrapper>
          {roles.map((role, idx) => (
            <Comp.RoleBadge key={`${nickname}-${role}-${idx}`} role={role} selectAble={false} />
          ))}
        </S.RoleBadgesWrapper>
      </div>
    </S.UserWrapper>
  );
}
