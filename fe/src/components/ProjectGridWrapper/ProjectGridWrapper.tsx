import React from 'react';
import * as S from './ProjectGridWrapperStyle';
import { ProjectGridWrapperProps } from '@/types';
import ProjectCard from '../ProjectCard/ProjectCard';
import UIMG from '@/assets/imgs/youjack.png';

export default function ProjectGridWrapper({ issueList }: ProjectGridWrapperProps) {
  console.log(issueList, 'PSDFIOPSJDOFIJK');
  return (
    <S.Grid>
      <S.CardList>
        {/* <ProjectCard key={0} title={'new'} bio={'새로 만들기'} id={'0'} accounts={null} createdAt={null} add={true} /> */}
        {issueList.map((issue, index) => (
          <ProjectCard
            key={index}
            title={issue.title}
            bio={issue.bio}
            id={issue.id}
            accounts={issue.accounts}
            createdAt={issue.createdAt}
            add={false}
          />
        ))}
      </S.CardList>
    </S.Grid>
  );
}
