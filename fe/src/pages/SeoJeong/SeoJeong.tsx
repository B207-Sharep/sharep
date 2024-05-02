import React from 'react';
import * as L from '@/layouts';
import { Modal } from '@/components';
import { useModal } from '@/customhooks';
import ProjectCreationForm from '../../components/Modal/Subs/ProjectCreationForm/ProjectCreationForm';

export default function SeoJeong() {
  const projectModal = useModal('project');
  const taskModal = useModal('task');

  const handleModalOpen = (modalId: string) => {
    if (modalId === 'project') {
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
    } else if (modalId === 'task') {
      taskModal.openModal({
        imageUrl: '',
        description: '',
      });
    }
  };

  return (
    <L.SideBarLayout>
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#f7f7f7',
          padding: '25px',
        }}
      >
        {/* 새 프로젝트 생성 모달 */}
        <button style={{ border: '1px solid black', cursor: 'pointer' }} onClick={() => handleModalOpen('project')}>
          새 프로젝트 생성 모달
        </button>
        <Modal
          modalId="project"
          title="새 프로젝트 생성"
          subTitle="함께할 팀원들을 추가하고 새로운 프로젝트를 생성해보세요."
        >
          <ProjectCreationForm modalId="project" />
        </Modal>
      </div>
    </L.SideBarLayout>
  );
}
