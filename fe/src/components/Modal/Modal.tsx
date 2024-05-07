import React from 'react';
import * as S from './ModalStyle';
import * as T from '@/types';
import * as Comp from '@/components';
import { modalDataState } from '@/stores/atoms/modal';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { useModal } from '@/customhooks';
import { X } from 'lucide-react';

export default function Modal({ modalId, title, subTitle, children, btnText }: T.ModalProps) {
  const { closeModal } = useModal(modalId);

  const { isOpen } = useRecoilValue(modalDataState(modalId));

  const handleModalClose = () => {
    closeModal();
  };

  const handleCreateButtonClick = useRecoilCallback(({ snapshot, set }) => async () => {
    const modalData = await snapshot.getPromise(modalDataState(modalId));
    try {
      // api call
      const { contents } = modalData;
      if (contents) {
        if (modalId === 'project') {
          const processedData = {
            title: contents.title,
            bio: contents.bio,
            members: contents.members.map((member: T.ProjectCreationFormProps['members'][number]) => {
              return {
                id: member.accountId,
                roles: Object.entries(member.roles)
                  .filter(([_, hasRole]) => hasRole)
                  .map(([role, _]) => role),
              };
            }),
          };
          // console.log(processedData);
        }
      }

      console.log(modalData.contents);
      console.log(set);
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
                {btnText ? btnText : '생성'}
              </Comp.MainColorBtn>
            </S.BtnWrapper>
          </S.ModalFooter>
        </S.ModalContent>
      </S.ModalWrapper>
    </S.ModalBackdrop>
  ) : null;
}
