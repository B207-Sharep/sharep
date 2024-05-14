import React, { useMemo } from 'react';
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
    { data: projectIssuesResponse, isFetching: isProjectIssuesResponseFetching },
    { data: screenIssuesResponse, isFetching: isScreenIssuesResponseFetching },
    { data: membersResponse, isFetching: isMembersResponseFeting },
  ] = useQueries({
    queries: [
      {
        queryKey: [{ func: `get-now-issues`, projectId }],
        queryFn: () => API.project.getNowIssueAboutTeamMembers({ projectId: Number(projectId) }),
      },
      {
        queryKey: [{ func: `get-all-simple-issues`, projectId }],
        queryFn: () =>
          API.project.getProjectSimpleIssueList({ projectId: Number(projectId), issueType: null, accountId: null }),
      },
      {
        queryKey: [{ func: `get-screen-issues`, projectId }],
        queryFn: () => API.project.getScreenIssueList({ projectId: Number(projectId) }),
      },
      {
        queryKey: [{ func: `get-member-list`, projectId }],
        queryFn: () => API.project.getProjectMemberList({ projectId: Number(projectId) }),
      },
    ],
  });

  const sortedScreenIssueList = useMemo(() => {
    if (!screenIssuesResponse?.data) return [];

    const sortedIssues = [...screenIssuesResponse.data].sort((a, b) => a.createdAt.localeCompare(b.createdAt));

    sortedIssues.forEach(issue => {
      if (issue.jobs && issue.jobs.length > 0) {
        issue.jobs.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      }
    });

    return sortedIssues;
  }, [screenIssuesResponse?.data]);

  return (
    <L.SideBarLayout>
      <S.Container>
        <div className="row-wrapper">
          <S.WhiteBoxWrapper $flex="1.5" $height="302px">
            <S.Title>
              <Icon.YesterdayWork />
              <span>어제 작업 요약</span>
            </S.Title>
            <S.YesterdayWorksScrollContainer>
              {membersResponse?.data.map((member, i) => (
                <Sub.YesterdayWork key={`yesterday-work-${i}`} {...member} />
              ))}
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
                  {res.issues !== null && (
                    <Comp.Issue {...res.issues[0]} assignees={null} jobs={null} dragAble={false} deleteAble={false} />
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
            <Sub.GanttChart projectIssueList={projectIssuesResponse?.data || []} />
          </S.GantChartScrollContainer>
        </S.WhiteBoxWrapper>
        <S.WhiteBoxWrapper $flex="1" $height="fit-content">
          <S.Title>
            <Icon.GantChart />
            <span>화면 갤러리</span>
          </S.Title>
          <Comp.GalleryGridWrapper issueList={sortedScreenIssueList} type="SCREEN" />
        </S.WhiteBoxWrapper>
      </S.Container>
    </L.SideBarLayout>
  );
}
