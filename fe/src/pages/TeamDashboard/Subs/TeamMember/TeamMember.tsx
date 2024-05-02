import React from 'react';
import * as S from './TeamMemberStyle';
import * as T from '@types';
import * as Comp from '@components';

export default function TeamMember({ name, jobs, image }: T.TeamMemberProps) {
  return (
    <S.UserWrapper>
      <Comp.UserImg size="56px" path={image} />
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
