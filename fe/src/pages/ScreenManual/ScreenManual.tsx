import React, { useEffect, useMemo } from 'react';
import * as Comp from '@components';
import * as L from '@layouts';
import * as S from './ScreenManualStyle';
import * as API from '@/apis';
import { PALETTE } from '@/styles';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export default function ScreenManual() {
  const { projectId } = useParams();

  const {
    data: screenIssueListResponse,
    isSuccess: screenIssueListSuccess,
    isFetching: screenIssueListLoading,
  } = useQuery({
    queryKey: [{ func: `get-screen-issues`, projectId }],
    queryFn: () => API.project.getScreenIssueList({ projectId: Number(projectId) }),
    select: data => data.data,
  });

  const sortedScreenIssueList = useMemo(() => {
    if (!screenIssueListResponse) return [];

    const sortedIssues = [...screenIssueListResponse].sort((a, b) => a.createdAt.localeCompare(b.createdAt));

    sortedIssues.forEach(issue => {
      if (issue.jobs && issue.jobs.length > 0) {
        issue.jobs.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      }
    });

    return sortedIssues;
  }, [screenIssueListResponse]);

  return (
    // <L.SideBarLayout>
    <S.Wrapper>
      <S.Header>
        <S.StyledText color={PALETTE.MAIN_BLACK} fontSize={40} fontWeight={700}>
          화면 정의서
        </S.StyledText>
      </S.Header>
      {screenIssueListSuccess && <Comp.GalleryGridWrapper issueList={sortedScreenIssueList} type="SCREEN" />}
    </S.Wrapper>
    // </L.SideBarLayout>
  );
}
