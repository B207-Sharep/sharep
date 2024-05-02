import React from 'react';
import * as S from './ProjectGridWrapperStyle';
import { ProjectGridWrapperProps } from '@/types';
import ProjectCard from '../ProjectCard/ProjectCard';
import UIMG from '@/assets/imgs/youjack.png';
import { Modal } from '..';
import { ProjectCreationForm } from '../Modal/Subs';
import { useModal } from '@/customhooks';

export default function ProjectGridWrapper({ issueList }: ProjectGridWrapperProps) {
  const projectModal = useModal('project');

  const handleModalOpen = (modalId: string) => {
    projectModal.openModal({
      title: '',
      bio: '',
      secretKey: '',
      members: [
        {
          accountId: 9,
          email: 'jack@ssafy.com',
          nickname: '유재건',
          jobs: {
            FRONT_END: false,
            BACK_END: false,
            INFRA: false,
            DESIGNER: false,
          },
        },
      ],
    });
  };

  return (
    <S.Grid>
      <S.CardList>
        <S.ProjectAddBtn onClick={() => handleModalOpen('project')}>
          <ProjectCard key={0} title={'new'} bio={'새로 만들기'} id={'0'} imgs={null} createdAt={null} add={true} />
        </S.ProjectAddBtn>
        <Modal
          modalId="project"
          title="새 프로젝트 생성"
          subTitle="함께할 팀원들을 추가하고 새로운 프로젝트를 생성해보세요."
        >
          <ProjectCreationForm modalId="project" />
        </Modal>
        {issueList.map((issue, index) => (
          <ProjectCard
            key={index}
            title={issue.title}
            bio={issue.bio}
            id={issue.id}
            imgs={issue.imgs}
            createdAt={issue.createdAt}
            add={issue.add}
          />
        ))}
      </S.CardList>
    </S.Grid>
  );
}
