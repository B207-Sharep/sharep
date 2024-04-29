import React from 'react';
import * as S from './ModalStyle';
import * as T from '@/types';
import { modalState } from '@/stores/atoms/modal';
import { useRecoilValue } from 'recoil';
import { useModal } from '@/customhooks';
import { X } from 'lucide-react';
import { PALETTE } from '@/styles';

export default function Modal({ modalId, title, subTitle, modalStyle, children }: T.ModalProps) {
  const { closeModal } = useModal();
  const modalStates = useRecoilValue(modalState);
  const isOpen = modalStates[modalId] || false;

  const handleModalClose = () => {
    closeModal(modalId);
  };

  return isOpen ? (
    <S.ModalBackdrop onClick={handleModalClose}>
      <S.ModalWrapper $modalStyle={modalStyle} onClick={e => e.stopPropagation()}>
        <S.ModalContent>
          {/* header */}
          <S.ModalHeader>
            <S.ModalHeaderContent>
              <S.ModalTitle>{title}</S.ModalTitle>
              <S.ModalSubTitle>{subTitle}</S.ModalSubTitle>
            </S.ModalHeaderContent>
            <S.CloseButton onClick={handleModalClose}>
              <X />
            </S.CloseButton>
          </S.ModalHeader>

          {/* body */}
          <S.ModalBody>{children}</S.ModalBody>

          {/* footer */}
          <S.ModalFooter>
            {/* TODO: buttons */}
            <button
              style={{
                display: 'flex',
                padding: '10px 18px',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '8px',
                flex: '1 0 0',
                borderRadius: '8px',
                border: `1px solid ${PALETTE.NO_GRASS}`,
                background: PALETTE.MAIN_WHITE,
                boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
                fontWeight: 700,
                cursor: 'pointer',
              }}
              onClick={handleModalClose}
            >
              취소
            </button>
            <button
              style={{
                display: 'flex',
                padding: '10px 18px',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '8px',
                flex: '1 0 0',
                borderRadius: '8px',
                border: `1px solid ${PALETTE.MAIN_COLOR}`,
                background: PALETTE.MAIN_COLOR,
                boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
                fontWeight: 700,
                cursor: 'pointer',
                color: PALETTE.MAIN_WHITE,
              }}
            >
              생성
            </button>
          </S.ModalFooter>
        </S.ModalContent>
      </S.ModalWrapper>
    </S.ModalBackdrop>
  ) : null;
}
