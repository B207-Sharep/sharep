import React, { useCallback, useRef, useState } from 'react';
import * as S from './KanbanStyle';
import * as T from '@types';
import * as Comp from '@components';

export default function Kanban({ state, issues, setIssues, dragEnterdState, setDragEnterdState }: T.CananProps) {
  const issuesContainerRef = useRef<HTMLElement>(null);
  const issuesWrapperRef = useRef<HTMLDivElement>(null);
  const [holdingIssueId, setHoldingIssueId] = useState<null | number>(null);

  const filteringResponse = useCallback(
    ({ state }: { state: 'YET' | 'NOW' | 'DONE' }): Omit<T.IssueProps, 'dragAble'>[] => {
      return issues.map(issue => issue.state === state && issue).filter(el => el) as Omit<T.IssueProps, 'dragAble'>[];
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
      (closest: { gapBetweenCursor: number; element: null | Omit<T.IssueProps, 'dragAble'> }, element, idx) => {
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
    e.preventDefault();
    getDragAfterElement({ y: e.clientY });
    // const draggingElement = getDragAfterElement({ y: e.clientY });
  };

  const handleOnDrop = (e: React.DragEvent) => {
    e.preventDefault();

    const newIssues = issues.map(issue =>
      issue.id === holdingIssueId ? { ...issue, state: dragEnterdState as 'YET' | 'NOW' | 'DONE' } : issue,
    );

    setIssues(newIssues);
    setHoldingIssueId(() => null);
  };

  return (
    <S.IssuesWrapper ref={issuesContainerRef}>
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
        {filteringResponse({ state }).map((issue, idx) => (
          <Comp.Issue
            key={`${state}-${issue.name}-${idx}`}
            {...issue}
            dragAble={{ setter: setHoldingIssueId, onDrop: handleOnDrop }}
          />
        ))}
      </S.IssuesContainer>
    </S.IssuesWrapper>
  );
}
