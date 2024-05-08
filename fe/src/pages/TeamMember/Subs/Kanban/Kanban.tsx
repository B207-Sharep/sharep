import React, { useCallback, useRef, useState } from 'react';
import * as S from './KanbanStyle';
import * as T from '@types';
import * as API from '@apis';
import * as Comp from '@components';
import { useMutation } from '@tanstack/react-query';
import { useParams } from 'react-router';

export default function Kanban({
  state,
  issues,
  deleteAble,
  dragAble,
  dragEnterdState,
  setDragEnterdState,
  refetchKanvansResponse,
}: T.KanbanProps) {
  const issuesWrapperRef = useRef<HTMLDivElement>(null);
  const { projectId, accountId } = useParams();
  const [holdingIssueId, setHoldingIssueId] = useState<null | number>(null);
  const { mutate: changeIssueState } = useMutation({
    mutationFn: ({ issueId }: { issueId: number }) =>
      API.project.patchIssueAssigneesState({
        issueId: issueId,
        projectId: Number(projectId),
        accountId: Number(accountId),
        state: dragEnterdState as 'YET' | 'NOW' | 'DONE',
      }),
    onSuccess: res => {
      if (res.status === 200) refetchKanvansResponse();
    },
  });

  const filteringResponse = useCallback(
    ({ state }: { state: 'YET' | 'NOW' | 'DONE' }): T.API.GetKanvanListResponse[] => {
      return issues
        .map(issue => issue.state === state && issue)
        .filter((el: T.API.GetKanvanListResponse | false) => el) as T.API.GetKanvanListResponse[];
    },
    [issues],
  );

  const handleDragEnter = (e: React.DragEvent) => {
    const enterSection = e.currentTarget.id as 'YET' | 'NOW' | 'DONE';
    setDragEnterdState(() => enterSection);
  };

  const getDragAfterElement = ({ y }: { y: number }) => {
    const filteredIssues = filteringResponse({ state });

    return filteredIssues.reduce(
      (closest: { gapBetweenCursor: number; element: null | T.API.GetKanvanListResponse }, element, idx) => {
        const wrapperPositionY = (issuesWrapperRef.current?.getBoundingClientRect() as DOMRect).top;

        const { ISSUE_HEIGHT, GAP } = { ISSUE_HEIGHT: 116, GAP: 10 };

        const elementPositionY = ISSUE_HEIGHT * (idx + 1);
        const gapBetweenCursor = y - (wrapperPositionY + elementPositionY - ISSUE_HEIGHT / 2);

        if (gapBetweenCursor > 0 && gapBetweenCursor < closest.gapBetweenCursor) {
          return { gapBetweenCursor: gapBetweenCursor, element: element };
        } else {
          return closest;
        }
      },
      { gapBetweenCursor: Number.POSITIVE_INFINITY, element: null },
    );
  };

  const handleOnMouseEnter = (e: React.DragEvent) => {
    if (!deleteAble) return;

    e.preventDefault();
    getDragAfterElement({ y: e.clientY });
    // const draggingElement = getDragAfterElement({ y: e.clientY });
  };

  const handleOnDrop = (e: React.DragEvent) => {
    if (!deleteAble) return;

    e.preventDefault();
    changeIssueState({ issueId: Number(holdingIssueId) });
    setHoldingIssueId(() => null);
  };

  return (
    <S.IssuesWrapper>
      <S.KanbanTitle>
        <Comp.StatusBadge status={state} />
      </S.KanbanTitle>
      <S.IssuesContainer
        id={state}
        ref={issuesWrapperRef}
        onDragOver={handleOnMouseEnter}
        onDragEnter={handleDragEnter}
        onDragEnd={handleOnDrop}
      >
        {filteringResponse({ state })?.map((issue, idx) => (
          <Comp.Issue
            key={`${state}-${issue.id}-${idx}`}
            {...issue}
            dragAble={dragAble ? { setter: setHoldingIssueId, onDrop: handleOnDrop } : false}
            deleteAble={deleteAble}
          />
        ))}
      </S.IssuesContainer>
    </S.IssuesWrapper>
  );
}
