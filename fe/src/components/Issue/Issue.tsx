import React from 'react';
import * as S from './IssueStyle';
import * as T from '@types';
import * as Comp from '@components';
import { MoreVertical, GitCommit } from 'lucide-react';
import { PALETTE } from '@/styles';

export default function Issue({ id, name, commit, assignees, priority, dragAble }: T.IssueProps) {
  return (
    <S.RelativeWrapper
      onDragStart={() => (dragAble !== false ? dragAble.setter(() => id) : undefined)}
      draggable={dragAble !== false ? true : false}
    >
      <S.DragAbleContainer>
        <S.TitleWrapper>
          <span aria-label={name}>{name}</span>
          <MoreVertical size={24} color={PALETTE.LIGHT_BLACK} />
        </S.TitleWrapper>
        <S.RecentlyCommit>
          {commit !== null && (
            <>
              <p>
                <GitCommit size={16} color={PALETTE.LIGHT_BLACK} />
                <span aria-label={commit.title}>{commit.title}</span>
              </p>
              <span>{commit.createAt}</span>
            </>
          )}
        </S.RecentlyCommit>
        <S.AboutEtcWrapper>
          <S.PriorityWrapper>
            <span>우선 순위</span>
            <Comp.PriorityBadge priority={priority} />
          </S.PriorityWrapper>
          <S.AssignessWrapper $assigneesNumber={assignees.length}>
            {assignees.map((user, idx) => (
              <S.UserImgWrapper key={`assignees-${user.name}-${idx}`} $idx={idx} aria-label={user.name}>
                <Comp.UserImg size="24px" path={user.imageUrl} />
              </S.UserImgWrapper>
            ))}
          </S.AssignessWrapper>
        </S.AboutEtcWrapper>
      </S.DragAbleContainer>
    </S.RelativeWrapper>
  );
}
