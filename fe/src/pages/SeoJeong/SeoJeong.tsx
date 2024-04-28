import React from 'react';
import GalleryGridWrapper from '@/components/GalleryGridWrapper/GalleryGridWrapper';
import CommitHistory from '../CommitHistory/CommitHistory';
import { SideBar } from '@/components';
import { useModal } from '@/customhooks';
import Modal from '@/components/Modal/Modal';
import ProjectCreationForm from '@/components/Modal/Subs/ProjectCreationForm/ProjectCreationForm';
import TaskCreationForm from '@/components/Modal/Subs/TaskCreationForm/TaskCreationForm';

export default function SeoJeong() {
  const { openModal } = useModal();

  const handleModalOpen = (modalId: string) => {
    openModal(modalId);
  };

  return (
    <div
      style={{
        margin: 'auto',
        width: '100%',
        height: '100%',
        display: 'flex',
        gap: 10,
      }}
    >
      <SideBar />
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#f7f7f7',
          padding: '25px',
        }}
      >
        {/* <GalleryGridWrapper /> */}
        {/* <CommitHistory /> */}

        {/* 새 프로젝트 생성 모달 */}
        <button style={{ border: '1px solid black', cursor: 'pointer' }} onClick={() => handleModalOpen('modal1')}>
          새 프로젝트 생성 모달
        </button>
        <Modal
          modalId="modal1"
          title="새 프로젝트 생성"
          subTitle="함께할 팀원들을 추가하고 새로운 프로젝트를 생성해보세요."
          modalStyle="basic"
        >
          <ProjectCreationForm />
        </Modal>

        {/* 새 작업 작성 모달 */}
        <button style={{ border: '1px solid black', cursor: 'pointer' }} onClick={() => handleModalOpen('modal2')}>
          새 작업 작성 모달
        </button>
        <Modal modalId="modal2" title="새 작업 작성" modalStyle="fadeInSlideUp">
          <TaskCreationForm />
        </Modal>
      </div>
    </div>
  );
}
