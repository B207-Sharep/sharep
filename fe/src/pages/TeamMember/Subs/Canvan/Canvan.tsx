import React, { useRef, useState } from 'react';
import * as S from './CanvanStyle';
import * as T from '@types';
import * as Comp from '@components';

export default function Canvan({ state, issues, setIssues }: T.CananProps) {
  const issuesContainerRef = useRef<HTMLElement>(null);
  const issuesWrapperRef = useRef<HTMLDivElement>(null);
  const [holdingIssueIndex, setHoldingIssueIndex] = useState(0);

  const filteringResponse = ({ state }: { state: 'YET' | 'NOW' | 'DONE' }): Omit<T.IssueProps, 'dragAble'>[] => {
    return issues.map(issue => issue.state === state && issue).filter(el => el) as Omit<T.IssueProps, 'dragAble'>[];
  };

  const handleOnDrop = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  const getDragAfterElement = ({ y }: { y: number }) => {
    const filteredIssues = filteringResponse({ state });
    const size = filteredIssues.length;

    const beforeHoldingIdx = filteredIssues.slice(0, holdingIssueIndex);
    const afterHoldingIdx = filteredIssues.slice(holdingIssueIndex + 1, size);

    const draggableElements = [beforeHoldingIdx, afterHoldingIdx];

    return draggableElements.reduce(
      (closest, child, idx) => {
        const box = child.getBoundingClientRect(); //해당 엘리먼트에 top값, height값 담겨져 있는 메소드를 호출해 box변수에 할당
        const offset = y - (116 + 10) - 116 / 2; //수직 좌표 - top값 - height값 / 2의 연산을 통해서 offset변수에 할당
        if (offset < 0 && offset > closest.offset) {
          // (예외 처리) 0 이하 와, 음의 무한대 사이에 조건
          return { offset: offset, element: child }; // Element를 리턴
        } else {
          return closest;
        }
      },
      { offset: Number.NEGATIVE_INFINITY },
    ).element;
  };

  const handleOnMouseEnter = (e: React.MouseEvent) => {
    e.preventDefault();
    const afterElement = getDragAfterElement({ y: e.clientY });
    const draggable = document.querySelector('.dragging') as Node;
    issuesWrapperRef.current?.insertBefore(draggable, afterElement);
  };

  return (
    <S.IssuesWrapper ref={issuesContainerRef}>
      <S.CanvanTitle>
        <Comp.StatusBadge status={state} />
      </S.CanvanTitle>
      <S.IssuesContainer
        className="issue-container"
        ref={issuesWrapperRef}
        onMouseEnter={handleOnMouseEnter}
        onDrop={handleOnDrop}
      >
        {filteringResponse({ state }).map((issue, idx) => (
          <Comp.Issue key={`${state}-${issue.name}-${idx}`} {...issue} dragAble={{ setter: setHoldingIssueIndex }} />
        ))}
      </S.IssuesContainer>
    </S.IssuesWrapper>
  );
}

// const draggingItemIndex = useRef(null);
// const draggingOverItemIndex = useRef(null);

// const onDragStart = (e, index, id) => {
//   draggingItemIndex.current = index;
//   e.target.classList.add('grabbing');
// };

// const onDragEnd = e => {
//   e.target.classList.remove('grabbing');
// };

// const onAvailableItemDragEnter = (e, index) => {
//   draggingOverItemIndex.current = index;
//   const copyListItems = [...availableOptionsArr]; // 1
//   const dragItemContent = copyListItems[draggingItemIndex.current]; //2
//   copyListItems.splice(draggingItemIndex.current, 1); //3
//   copyListItems.splice(draggingOverItemIndex.current, 0, dragItemContent); // 4
//   draggingItemIndex.current = draggingOverItemIndex.current;
//   draggingOverItemIndex.current = null; //5
//   setAvailableOptionsArr(copyListItems);
// }; //6

// const onDragOver = e => {
//   e.preventDefault();
// };
