import React, { useState } from 'react';
import * as S from './TeamMemberStyle';
import * as T from '@types';
import * as Sub from './Subs';
import * as Comp from '@components';
import * as L from '@layouts';
import * as API from '@apis';
import { useQueries, useQuery } from '@tanstack/react-query';
import { useLocation, useParams } from 'react-router-dom';

export default function TeamMember() {
  const location = useLocation();
  const { projectId, memberId } = useParams();
  const [issues, setIssues] = useState(DUMMY);
  const [dragEnterdState, setDragEnterdState] = useState<null | 'YET' | 'NOW' | 'DONE'>(null);

  // const [
  //   { data: jobListResponse, isFetching: isJobListResponseFeting },
  // { data: contributionsResponse, isFetching: isContributionsResponseFeting },
  // { data: kanvanListResponse, isFetching: isKanvanListResponseFeting },
  // ] = useQueries({
  // queries: [
  //   {
  //     queryKey: [{ func: `get-job-list`, projectId, memberId }],
  //     queryFn: () =>
  //       API.project.getJobList({ projectId: Number(projectId), accountId: 1, issueId: null, roleType: null }),
  //   },
  // {
  //   queryKey: [{ func: `get-contributions`, projectId, accountId: 1 }],
  //   queryFn: () => API.project.getContributions({ projectId: Number(projectId), accountId: 1 }),
  // },
  // {
  //   queryKey: [{ func: `get-kanvan`, projectId, accountId: 1 }],
  //   queryFn: () => API.project.getKanvanList({ projectId: Number(projectId), accountId: 1 }),
  // },
  //   ],
  // });

  // console.log(`jobListResponse :`, jobListResponse?.data);
  // console.log(`contributionsResponse :`, contributionsResponse);
  // console.log(`kanvanListResponse :`, kanvanListResponse);

  return (
    <L.SideBarLayout>
      <S.RowWrapper>
        <S.WhiteBoxWrapper $direction="row">
          <S.MemberWrapper>
            <Comp.UserImg size="lg" path="/seung-min.png" />
            <p>
              <span>이승민</span>
              <span>@B-end</span>
            </p>
          </S.MemberWrapper>
          <S.WorksWrapper>
            <S.Title>
              <span>어제 한 일</span>
            </S.Title>
            <S.YesterdayWork>
              <p aria-label={DUMMY_YESTERDAY_WORK}>{DUMMY_YESTERDAY_WORK}</p>
            </S.YesterdayWork>
            <S.Title>
              <span>최근 작업들</span>
            </S.Title>
            <S.RecentlyCommitsScrollWrapper>
              {/* {jobListResponse?.data.map(job => (
                <Comp.Commit key={job.commitId} {...job} />
              ))} */}
            </S.RecentlyCommitsScrollWrapper>
          </S.WorksWrapper>
        </S.WhiteBoxWrapper>
        <S.WhiteBoxWrapper $direction="column">
          <S.Title>
            <span>이승민님의 기여도</span>
          </S.Title>
          {/* <S.ChartWrapper></S.ChartWrapper> */}
          <Sub.ContributionsChart dataList={DATA_LIST} />
        </S.WhiteBoxWrapper>
      </S.RowWrapper>
      <S.KanbansWrapper>
        {['YET', 'NOW', 'DONE'].map(state => (
          <Sub.Kanban
            key={`kanban-${state}`}
            state={state as 'YET' | 'NOW' | 'DONE'}
            dragEnterdState={dragEnterdState}
            setDragEnterdState={setDragEnterdState}
            issues={issues}
            setIssues={setIssues}
          />
        ))}
      </S.KanbansWrapper>
    </L.SideBarLayout>
  );
}

const DUMMY: Omit<T.IssueProps, 'dragAble'>[] = [
  {
    id: 0,
    name: '조성규의 색맹 치료',
    commit: null,
    assignees: [{ name: '조성규', imageUrl: '/sung-gu.png' }],
    priority: 'HIGH' as 'HIGH' | 'MEDIUM' | 'LOW',
    state: 'YET',
    type: 'SCREEN',
  },
  {
    id: 1,
    name: '이승민의 여자친구 구합니다',
    commit: null,
    assignees: [{ name: '이승민', imageUrl: '/seung-min.png' }],
    priority: 'HIGH' as 'HIGH' | 'MEDIUM' | 'LOW',
    state: 'YET',
    type: 'SCREEN',
  },
  {
    id: 9,
    name: '김성제 싸피 끝난 후 탑건 입과',
    commit: null,
    assignees: [{ name: '김성제', imageUrl: '/sung-je.png' }],
    priority: 'LOW' as 'HIGH' | 'MEDIUM' | 'LOW',
    state: 'YET',
    type: 'SCREEN',
  },
  {
    id: 2,
    name: '단독) 오상훈 ♥ 임서정, 결혼 발표 예식장까지 잡아 놓은 상태',
    commit: { title: '싸피 10기 대전 캠퍼스에 돌릴 청첩장 제작중', createAt: '4월 29일' },
    assignees: [
      { name: '오상훈', imageUrl: '/seo-jeong.png' },
      { name: '임서정', imageUrl: '/sang-hun.png' },
    ],
    priority: 'HIGH' as 'HIGH' | 'MEDIUM' | 'LOW',
    state: 'NOW',
    type: 'SCREEN',
  },
  {
    id: 10,
    name: '단독) 유재건 ♥ 이지영, 결혼 발표 예식장까지 잡아 놓은 상태',
    commit: { title: '싸피 10기 대전 캠퍼스에 돌릴 청첩장 제작중', createAt: '4월 29일' },
    assignees: [
      { name: '유재건', imageUrl: '/youjack.png' },
      { name: '이지영', imageUrl: '/easy.png' },
    ],
    priority: 'MEDIUM' as 'HIGH' | 'MEDIUM' | 'LOW',
    state: 'NOW',
    type: 'SCREEN',
  },
  {
    id: 3,
    name: '김성제 생일 국가 공휴일로 지정',
    commit: { title: '김성제 생일을 국가 공휴일로 지정하는 법안 통과', createAt: '2월 11일' },
    assignees: [
      { name: '이준석', imageUrl: '/lee-jun-seok.png' },
      { name: '윤석열', imageUrl: '/yoon-suk-yeol.png' },
      { name: '이재명', imageUrl: '/lee-jae-myung.png' },
    ],
    priority: 'HIGH' as 'HIGH' | 'MEDIUM' | 'LOW',
    state: 'DONE',
    type: 'SCREEN',
  },
  {
    id: 4,
    name: '유재건 군대 재입대 이슈',
    commit: { title: '입영 통지서 발송 완료 - 5월 24일날 재입대 예정', createAt: '4월 30일' },
    assignees: [{ name: '유재건', imageUrl: '/youjack.png' }],
    priority: 'HIGH' as 'HIGH' | 'MEDIUM' | 'LOW',
    state: 'DONE',
    type: 'SCREEN',
  },
];

const DUMMY_YESTERDAY_WORK = `달이 떴다고 전화를 주시다니요. 이 밤 너무 신나고 근사해요. `;

const DATA_LIST = {
  '2024-05-01': 5,
  '2024-05-03': 2,
  '2024-05-04': 1,
};
