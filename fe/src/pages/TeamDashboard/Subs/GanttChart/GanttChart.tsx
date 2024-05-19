import React, { useRef } from 'react';
import * as T from '@types';
import * as S from './GanttChartStyle';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/ko';

export default function GanttChart({ projectIssueList }: T.GanttChartProps) {
  const issuesWrapperRef = useRef<HTMLDivElement>(null);

  const dateDiff = (bigger: string, smaller: string) => {
    return dayjs(bigger.slice(0, 10)).diff(smaller.slice(0, 10), 'day') + 1;
  };

  const filterIssues: FilterIssues[] = projectIssueList.reduce((basket: FilterIssues[], issue: T.API.SimpleIssue) => {
    if (issue.startedAt !== null) basket.push(issue as FilterIssues);
    return basket;
  }, []);
  const sortedStartedAt = filterIssues.sort(
    (x1, x2) => new Date(x1.startedAt).getTime() - new Date(x2.startedAt).getTime(),
  );
  const firstStartedAt = sortedStartedAt[0] ? sortedStartedAt[0].startedAt : '';

  return (
    <S.GantChartScrollContainer style={{ height: filterIssues.length * 44 + 20 }}>
      <S.DateRowWrapper $width={issuesWrapperRef.current?.scrollWidth || 0}>
        <S.StickyTitleWrapper $idx={0}>
          <div>기능명</div>
        </S.StickyTitleWrapper>
        {Array.from({ length: dateDiff(dayjs().format(), firstStartedAt) }).map((_, dateIdx) => (
          <S.DateSection key={`date-section-${dateIdx}`}>
            {`${dayjs(firstStartedAt).get('month') + 1}월 `}
            {`${dayjs(firstStartedAt).get('date') + dateIdx}일`}
          </S.DateSection>
        ))}
      </S.DateRowWrapper>
      <S.Wrapper ref={issuesWrapperRef}>
        {filterIssues.map((issue, issueIdx) => {
          const diffWithFirstStarted =
            issue.state === 'DONE'
              ? dateDiff(issue.startedAt, firstStartedAt) - 1
              : dateDiff(issue.startedAt, firstStartedAt) - 1;
          const costTime =
            issue.state === 'DONE'
              ? dateDiff(issue.finishedAt as string, issue.startedAt)
              : dateDiff(dayjs().format(), issue.startedAt);

          return (
            <S.RowWrapper $idx={issueIdx} key={`gantt-chart-${issue.id}-${issueIdx}`}>
              <S.StickyTitleWrapper $idx={issueIdx}>
                <S.IssueName $state={issue.state as 'DONE' | 'NOW'}>{issue.issueName}</S.IssueName>
                <S.AriaLabel aria-label={issue.issueName} />
              </S.StickyTitleWrapper>

              {Array.from({ length: dateDiff(dayjs().format(), firstStartedAt) }).map((_, dateIdx) => (
                <S.DateSection key={`date-section-${dateIdx}`} />
              ))}

              <S.IssueBar
                $diffFirstStarted={diffWithFirstStarted}
                $state={issue.state as 'DONE' | 'NOW'}
                $costTime={costTime}
              />
            </S.RowWrapper>
          );
        })}
      </S.Wrapper>
    </S.GantChartScrollContainer>
  );
}

interface FilterIssues extends T.API.SimpleIssue {
  startedAt: string;
}
