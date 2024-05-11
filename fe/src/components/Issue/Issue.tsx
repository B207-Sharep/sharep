import React from 'react';
import * as S from './IssueStyle';
import * as T from '@types';
import * as API from '@apis';
import * as Comp from '@components';
import { MoreVertical, GitCommit, Trash2Icon } from 'lucide-react';
import { PALETTE } from '@/styles';
import { useMutation } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

export default function Issue({ id, issueName, jobs, assignees, priority, dragAble, deleteAble }: T.IssueProps) {
  const { projectId, accountId } = useParams();
  const { mutate: deleteIssue } = useMutation({
    mutationFn: ({ issueId }: { issueId: number }) =>
      API.project.deleteIssueAssignees({
        issueId: issueId,
        projectId: Number(projectId),
        accountId: Number(accountId),
      }),
    onSuccess: response => {
      console.log(`response :`, response);
    },
  });

  const handleDelete = () => {
    if (!deleteAble) return;
    deleteIssue({ issueId: id });
  };

  return (
    <S.RelativeWrapper
      onDragStart={() => (dragAble !== false ? dragAble.setter(() => id) : undefined)}
      draggable={dragAble !== false ? true : false}
    >
      <S.DragAbleContainer>
        <S.TitleWrapper>
          <span aria-label={issueName}>{issueName}</span>
          {deleteAble && (
            <>
              <S.MoreButton>
                <MoreVertical size={24} color={PALETTE.LIGHT_BLACK} />
              </S.MoreButton>
              <S.DeleteDropBox onClick={handleDelete}>
                <Trash2Icon size={16} color={PALETTE.MAIN_RED} />
                삭제하기
              </S.DeleteDropBox>
            </>
          )}
        </S.TitleWrapper>
        <S.RecentlyCommit>
          {jobs !== null && jobs.length > 0 && (
            <>
              <p>
                <GitCommit size={16} color={PALETTE.LIGHT_BLACK} />
                <span aria-label={jobs[0].name}>{jobs[0].name}</span>
              </p>
              <span>{dayjs(jobs[0].createdAt).locale('ko').fromNow()}</span>
            </>
          )}
        </S.RecentlyCommit>
        <S.AboutEtcWrapper>
          <S.PriorityWrapper>
            <span>우선 순위</span>
            {priority !== null && <Comp.PriorityBadge priority={priority} />}
          </S.PriorityWrapper>
          {assignees !== null && (
            <S.AssignessWrapper $assigneesNumber={assignees.length}>
              {assignees.map((user, idx) => (
                <S.UserImgWrapper key={`assignees-${user.name}-${idx}`} $idx={idx} aria-label={user.name}>
                  <Comp.UserImg size="24px" path={user.imageUrl} />
                </S.UserImgWrapper>
              ))}
            </S.AssignessWrapper>
          )}
        </S.AboutEtcWrapper>
      </S.DragAbleContainer>
    </S.RelativeWrapper>
  );
}
