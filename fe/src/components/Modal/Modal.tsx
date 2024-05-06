import React from 'react';
import * as S from './ModalStyle';
import * as T from '@/types';
import * as Comp from '@/components';
import { modalDataState } from '@/stores/atoms/modal';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { useModal } from '@/customhooks';
import { X } from 'lucide-react';

export default function Modal({ modalId, title, subTitle, children }: T.ModalProps) {
  const { closeModal } = useModal(modalId);

  const { isOpen } = useRecoilValue(modalDataState(modalId));

  const handleModalClose = () => {
    closeModal();
  };

  const handleCreateButtonClick = useRecoilCallback(({ snapshot, set }) => async () => {
    const modalData = await snapshot.getPromise(modalDataState(modalId));
    console.log(modalData.contents);
    console.log(set);
    try {
      // api call

      closeModal();
    } catch (error) {
      console.error(error);
    }
  });

  return isOpen ? (
    <S.ModalBackdrop onClick={handleModalClose}>
      <S.ModalWrapper onClick={e => e.stopPropagation()}>
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
            <S.BtnWrapper onClick={handleCreateButtonClick}>
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
