import React, { useRef } from 'react';
import * as T from '@types';
import * as S from './GanttChartStyle';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/ko';
import { PALETTE } from '@/styles';

interface FilterIssues extends T.API.SimpleIssue {
  startedAt: string;
}

export default function GanttChart({ projectIssueList }: T.GanttChartProps) {
  const scrollBoxRef = useRef<HTMLDivElement>(null);
  const formatNow = (date: string) => {
    return dayjs(date).locale('ko').fromNow();
  };

  const dateDiff = (a: Dayjs | string, b: Dayjs | string) => {
    return dayjs(a).diff(b, 'day');
  };
  const filterIssues: FilterIssues[] = projectIssueList.reduce((basket: FilterIssues[], issue: T.API.SimpleIssue) => {
    if (issue.startedAt !== null) basket.push(issue as FilterIssues);
    return basket;
  }, []);
  const sortedStartedAt = filterIssues.sort((x1, x2) => (x1 > x2 ? -1 : 1));
  const firstStartedAt = sortedStartedAt[0] && sortedStartedAt[0].startedAt;

  sortedStartedAt.forEach((el, i) => {
    if (i === 0 || i === sortedStartedAt.length) console.log(`test :`, el.startedAt);
  });
  console.log(scrollBoxRef.current?.scrollHeight);

  return (
    <S.GantChartScrollContainer ref={scrollBoxRef}>
      <S.Wrapper style={{ height: `${scrollBoxRef.current?.scrollHeight}px` }}>
        {Array.from({ length: dateDiff(firstStartedAt, '2024-01-10') }).map((_, idx) => (
          <S.OneDaySection
            style={{ height: `${scrollBoxRef.current?.scrollHeight}px` }}
            key={`gantt-chart-date-section-${idx}`}
          />
        ))}
        {sortedStartedAt.map((issue, idx) => {
          let costToDo = null;
          if (issue.state === 'DONE') costToDo = dateDiff(issue.finishedAt as string, issue.startedAt) + 1;
          return (
            <S.IssueBar
              $width={costToDo !== null ? `${costToDo * 64}px` : `calc(100% - ${idx * 64}px)`}
              $bgColor={PALETTE[`ROLE_COLOR_${idx % 7}`]}
              key={`gantt-chart-bar-${issue.id}`}
              $idx={idx + 1}
            >
              <span>{issue.issueName}</span>
              <div aria-label={`${issue.issueName} \n시작일 : ${issue.startedAt}`} />
            </S.IssueBar>
          );
        })}
      </S.Wrapper>
    </S.GantChartScrollContainer>
  );
}

// assignees들의 state 표출시켜주기.
// A: ~~, B: ~~, C: ~~
// [
// {
// api: {id: 4, request: null, response: null, url: null, method: 'POST'}
// assignees: [{…}, {…}, {…}, {…}]
// connectionId: null
// createdAt: "2024-05-09T10:31:24.100456"
// description: "사용자 경험 추가해야 합니다."
// epic: "사용자 개선"
// finishedAt: "2024-05-12T15:38:37.344446"
// id: 4
// issueName: "화면 설계서 1"
// jobs: [{…}]
// priority: "HIGH"
// startedAt: "2024-05-10T12:45:50.492597"
// state: "NOW"
// type: "SCREEN"
// },
// {
// api: {id: 5, request: null, response: null, url: null, method: 'GET'}
// assignees: [{…}, {…}, {…}]
// connectionId: null
// createdAt: "2024-05-09T10:31:29.629897"
// description: "사용자 경험 추가해야 합니다."
// epic: "사용자 개선"
// finishedAt: "2024-05-11T20:39:18.325076"
// id: 5
// issueName: "화면 설계서 2"
// jobs: []
// priority: "HIGH"
// startedAt: "2024-05-11T20:39:18.325076"
// state: "NOW"
// type: "SCREEN"
// }
// ]
