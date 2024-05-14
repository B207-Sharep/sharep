import React from 'react';
import * as T from '@types';
import * as S from './GanttChartStyle';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
dayjs.locale('ko'); // global로 한국어 locale 사용

export default function GantChart({ projectIssueList }: T.GanttChartProps) {
  const formatNow = (date: string) => {
    return dayjs(date).locale('ko').fromNow();
  };
  const test = projectIssueList
    .map(issue => {
      if (issue.startedAt !== null) {
        const { createdAt, startedAt, finishedAt, ...reset } = issue;
        const formatCreated = formatNow(createdAt);
        const formatStarted = formatNow(startedAt);
        const formatFinished = finishedAt !== null ? formatNow(finishedAt) : null;

        return { ...reset, createdAt: formatCreated, startedAt: formatStarted, finishedAt: formatFinished };
      }
    })
    .filter(issue => issue);

  console.log(`test :`, test);
  return (
    <S.Wrapper>
      <S.DaySection>
        <S.IssueBar></S.IssueBar>
      </S.DaySection>
    </S.Wrapper>
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
