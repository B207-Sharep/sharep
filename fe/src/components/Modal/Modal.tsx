import React from 'react';
import * as S from './ModalStyle';
import * as T from '@/types';
import * as Comp from '@/components';
import { modalDataState } from '@/stores/atoms/modal';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { useModal } from '@/customhooks';
import { X } from 'lucide-react';
import * as API from '@/apis/projects';
import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function Modal({ modalId, title, subTitle, children, btnText }: T.ModalProps) {
  const queryClient = useQueryClient();
  const { closeModal } = useModal(modalId);
  const { projectId } = useParams();
  const { isOpen, isValid } = useRecoilValue(modalDataState(modalId));

  const createProjectMutation = useMutation({
    mutationKey: [{ func: `createProject` }],
    mutationFn: API.createNewProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [{ projectList: `projectList` }] });
    },
  });

  const handleCreateButtonClick = useRecoilCallback(({ snapshot, set }) => async () => {
    const contents = (await snapshot.getPromise(modalDataState(modalId))).contents;
    try {
      // api call
      if (contents) {
        switch (modalId) {
          case 'project':
            {
              const result = processProjectData(contents as T.ProjectCreationFormProps);
              if (result) {
                await createProjectMutation.mutateAsync(result);
              } else throw Error;
            }
            break;
          case 'job':
            console.log('projectId', projectId);
            // TODO: issueId 어떻게 가지고 오나? props에 추가?
            // createNewJob(projectId,);
            break;
          case 'infra-job':
            break;
          case 'project-secretKey':
            break;
          default:
            break;
        }
      }
      console.log(contents);
      console.log(set);

      closeModal();
    } catch (error) {
      console.error(error);
    }
  });

  const handleModalClose = () => {
    closeModal();
  };

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
            <S.BtnWrapper onClick={handleModalClose} $isValid={true}>
              <Comp.MainColorBtn bgc={false} disabled={false}>
                취소
              </Comp.MainColorBtn>
            </S.BtnWrapper>
            <S.BtnWrapper onClick={() => isValid && handleCreateButtonClick()} $isValid={isValid}>
              <Comp.MainColorBtn bgc={isValid} disabled={isValid}>
                {btnText ? btnText : '생성'}
              </Comp.MainColorBtn>
            </S.BtnWrapper>
          </S.ModalFooter>
        </S.ModalContent>
      </S.ModalWrapper>
    </S.ModalBackdrop>
  ) : null;
}

function processProjectData(contents: T.ProjectCreationFormProps) {
  const hasMemberWithoutRole = contents.members.some(member => Object.values(member.roles).every(hasRole => !hasRole));

  if (hasMemberWithoutRole) {
    alert('담당 역할이 선택되지 않은 팀원이 있습니다.');
    return null;
  }

  return {
    title: contents.title,
    bio: contents.bio,
    members: contents.members.map(member => ({
      id: member.id,
      roles: Object.entries(member.roles)
        .filter(([_, hasRole]) => hasRole)
        .map(([role, _]) => role) as T.RoleBadgeProps['role'][],
    })),
  };
}
