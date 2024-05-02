import React from 'react';
import * as S from './TeamMemberStyle';
import * as T from '@types';
import * as Comp from '@components';
import { useLocation } from 'react-router-dom';

export default function TeamMember({ id, name, jobs, imageUrl }: T.TeamMemberProps) {
  const location = useLocation();

  return (
    <S.UserWrapper to={`${location.pathname}/members/${id}`}>
      <Comp.UserImg size="56px" path={imageUrl} />
      <div>
        <p>{name}</p>
        <S.JobBadgesWrapper>
          {jobs.map((job, idx) => (
            <Comp.JobBadge key={`${name}-${job}-${idx}`} job={job} selectAble={false} />
          ))}
        </S.JobBadgesWrapper>
      </div>
    </S.UserWrapper>
  );
}
