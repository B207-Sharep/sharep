import React from 'react';
import * as S from './ModalStyle';
import * as T from '@/types';
import * as Comp from '@/components';
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
            <S.BtnWrapper onClick={handleModalClose}>
              <Comp.MainColorBtn bgc={false} disabled={false}>
                취소
              </Comp.MainColorBtn>
            </S.BtnWrapper>
            <S.BtnWrapper>
              <Comp.MainColorBtn bgc={true} disabled={false}>
                생성
              </Comp.MainColorBtn>
            </S.BtnWrapper>
          </S.ModalFooter>
        </S.ModalContent>
      </S.ModalWrapper>
    </S.ModalBackdrop>
  ) : null;
}
