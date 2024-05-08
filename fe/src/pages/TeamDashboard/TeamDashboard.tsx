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
    { data: featureIssuesResponse, isFetching: isFeatureIssuesResponseFetching },
    { data: screenIssuesResponse, isFetching: isScreenIssuesResponseFetching },
  ] = useQueries({
    queries: [
      {
        queryKey: [{ func: `get-now-issues`, projectId }],
        queryFn: () => API.project.getNowIssueAboutTeamMembers({ projectId: Number(projectId) }),
      },
      {
        queryKey: [{ func: `get-feature-issues`, projectId }],
        queryFn: () => API.project.getFeatureIssuesList({ projectId: Number(projectId) }),
      },
      {
        queryKey: [{ func: `get-screen-issues`, projectId }],
        queryFn: () => API.project.getScreenIssueList({ projectId: Number(projectId) }),
      },
    ],
  });

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
              {/* {Array.from({ length: 6 }).map((res, i) => (
                <Sub.YesterdayWork key={`yesterday-work-${i}`} {...DUMMY_USER[0]} />
              ))} */}
            </S.YesterdayWorksScrollContainer>
          </S.WhiteBoxWrapper>
          <S.WhiteBoxWrapper $flex="2" $height="302px">
            <S.Title>
              <Icon.CurrentWork />
              <span>가장 최근 작업 중인 이슈</span>
            </S.Title>
            <S.CurrentWorksScrollContainer>
              {nowIssuesResponse?.data.map((res: T.API.GetNowIssueListResponse, i: number) => (
                <S.CurrentWork key={`current-work-${i}`}>
                  <Sub.TeamMember {...res.member} />
                  {res.issue !== null && (
                    <Comp.Issue
                      {...res.issue}
                      assignees={null}
                      jobs={null}
                      state={null}
                      dragAble={false}
                      deleteAble={false}
                    />
                  )}
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
          <Comp.GalleryGridWrapper issueList={screenIssuesResponse?.data || []} type="SCREEN" />
        </S.WhiteBoxWrapper>
      </S.Container>
    </L.SideBarLayout>
  );
}
