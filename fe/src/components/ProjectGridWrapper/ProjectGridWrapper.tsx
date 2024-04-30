import React from 'react';
import * as S from './ProjectGridWrapperStyle';
import { ProjectGridWrapperProps } from '@/types';
import ProjectCard from '../ProjectCard/ProjectCard';
import UIMG from '@/assets/imgs/youjack.png';

export default function ProjectGridWrapper({ issueList }: ProjectGridWrapperProps) {
  return (
    <S.Grid>
      <S.CardList>
        {issueList.map((issue, index) => (
          <ProjectCard
            key={index}
            title={issue.title}
            bio={issue.bio}
            id={issue.id}
            imgs={issue.imgs}
            createdAt={issue.createdAt}
          />
        ))}
      </S.CardList>
    </S.Grid>
  );
}
