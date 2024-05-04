import React from 'react';
import * as L from '@/layouts';
import { Modal } from '@/components';
import { useModal } from '@/customhooks';
import { InfraTaskCreationForm } from '@/components/Modal/Subs';

export default function SeoJeong() {
  const infraTaskModal = useModal('infra-task');

  const handleModalOpen = (modalId: string) => {
    if (modalId === 'infra-task') {
      infraTaskModal.openModal({
        name: '',
        description: '',
        notiUsers: [],
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
        {/* 새 인프라 작업 생성 모달 */}
        <button style={{ border: '1px solid black', cursor: 'pointer' }} onClick={() => handleModalOpen('infra-task')}>
          새 인프라 작업 생성 모달
        </button>
        <Modal modalId="infra-task" title="인프라 명세서 > 이슈 제목">
          <InfraTaskCreationForm modalId="infra-task" />
        </Modal>
      </div>
    </L.SideBarLayout>
  );
}
