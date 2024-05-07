import React from 'react';
import * as S from './TeamDashboardStyle';
import * as T from '@types';
import * as L from '@layouts';
import * as Sub from './Subs';
import * as API from '@apis';
import * as Comp from '@components';
import * as Icon from '@assets';
import { useQueries } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export default function TeamDashboard() {
  const { projectId, accountId } = useParams();
  const [
    { data: nowIssuesResponse, isFetching: isNowIssuesResponseFetching },
    // { data: featureIssuesResponse, isFetching: isFeatureIssuesResponseFetching },
  ] = useQueries({
    queries: [
      {
        queryKey: [{ func: `get-now-issues`, projectId }],
        queryFn: () => API.project.getNowIssueAboutTeamMembers({ projectId: Number(projectId) }),
      },
      // {
      //   queryKey: [{ func: `get-now-issues`, projectId }],
      //   queryFn: () => API.project.getNowIssueAboutTeamMembers({ projectId: Number(projectId) }),
      // },
    ],
  });
  console.log(`issuesResponse :`, nowIssuesResponse?.data);

  return (
    <L.SideBarLayout>
      <S.Container>
        <div className="row-wrapper">
          <S.WhiteBoxWrapper $flex="1.5" $height="302px">
            <S.Title>
              <Icon.YesterdayWork />
              <span>어제 업무 요약</span>
            </S.Title>
            <S.YesterdayWorksScrollContainer>
              {Array.from({ length: 6 }).map((res, i) => (
                <Sub.YesterdayWork key={`yesterday-work-${i}`} {...DUMMY_USER[0]} />
              ))}
            </S.YesterdayWorksScrollContainer>
          </S.WhiteBoxWrapper>
          <S.WhiteBoxWrapper $flex="2" $height="302px">
            <S.Title>
              <Icon.CurrentWork />
              <span>가장 최근 작업 중인 이슈</span>
            </S.Title>
            <S.CurrentWorksScrollContainer>
              {Array.from({ length: 6 }).map((res, i) => (
                <S.CurrentWork key={`current-work-${i}`}>
                  <Sub.TeamMember {...DUMMY_USER[0]} />
                  <Comp.Issue {...DUMMY_ISSUE.NOW[0]} dragAble={false} />
                </S.CurrentWork>
              ))}
            </S.CurrentWorksScrollContainer>
          </S.WhiteBoxWrapper>
        </div>
        <S.WhiteBoxWrapper $flex="1" $height="420px">
          <S.Title>
            <Icon.GantChart />
            <span>간트 차트</span>
          </S.Title>
          <S.GantChartScrollContainer>
            <Sub.GanttChart />
          </S.GantChartScrollContainer>
        </S.WhiteBoxWrapper>
        <S.WhiteBoxWrapper $flex="1" $height="fit-content">
          <S.Title>
            <Icon.GantChart />
            <span>화면 갤러리</span>
          </S.Title>
          <Comp.GalleryGridWrapper issueList={DUMMY_SCREEN_LIST} type="SCREEN" />
        </S.WhiteBoxWrapper>
      </S.Container>
    </L.SideBarLayout>
  );
}

// interface Test {
//   account: {
//     email: string;
//     id: number;
//     imageUrl: string;
//     nickname: string;
//   };

//   issue: {
//     description: string;
//     epic: string;
//     id: number;
//     issueName: string;
//     priorityType: 'HIGH' | 'MEDIUM' | 'LOW',
//     type: 'FEATURE';
//   };
// }
const DUMMY_USER: T.YesterdayWorkProps[] = [
  {
    id: 1,
    nickname: '쨰용이행님',
    imageUrl: '/lee-jae-yong.png',
    roles: ['FRONT_END', 'DESIGNER'] as Extract<T.RoleBadgeProps, 'role'>[],
  },
];

const DUMMY_SCREEN_LIST = [
  ...Array.from({ length: 7 }, (_, index) => ({
    id: index + 1,
    issueName: `화면 이슈 ${index + 1}`,
    createdAt: '2024.04.27',
    type: 'SCREEN' as 'SCREEN',
  })),
];

const DUMMY_ISSUE:
  | {
      YET: Omit<T.IssueProps, 'dragAble'>[];
      NOW: Omit<T.IssueProps, 'dragAble'>[];
      DONE: Omit<T.IssueProps, 'dragAble'>[];
    }
  | { [state: string]: Omit<T.IssueProps, 'dragAble'>[] } = {
  YET: [
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
      id: 0,
      name: '이승민의 여자친구 구합니다',
      commit: null,
      assignees: [{ name: '이승민', imageUrl: '/seung-min.png' }],
      priority: 'HIGH' as 'HIGH' | 'MEDIUM' | 'LOW',
      state: 'YET',
      type: 'SCREEN',
    },
  ],
  NOW: [
    {
      id: 0,
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
  ],
  DONE: [
    {
      id: 0,
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
      id: 0,
      name: '유재건 군대 재입대 이슈',
      commit: { title: '입영 통지서 발송 완료 - 5월 24일날 재입대 예정', createAt: '4월 30일' },
      assignees: [{ name: '유재건', imageUrl: '/youjack.png' }],
      priority: 'HIGH' as 'HIGH' | 'MEDIUM' | 'LOW',
      state: 'DONE',
      type: 'SCREEN',
    },
  ],
};
