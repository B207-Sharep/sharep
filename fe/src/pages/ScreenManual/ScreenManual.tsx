import React, { useEffect } from 'react';
import * as Comp from '@components';
import * as L from '@layouts';
import * as S from './ScreenManualStyle';
import * as API from '@/apis/projects';
import { PALETTE } from '@/styles';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export default function ScreenManual() {
  const { projectId } = useParams();

  const {
    data: screenIssueListResponse,
    isFetched: screenIssueListFetched,
    isPending: screenIssueListPending,
  } = useQuery({
    queryKey: [{ screenIssueList: `screenIssueList` }],
    queryFn: () =>
      API.getScreenIssueList({ projectId: Number(projectId) }).then(res => {
        console.log(res);
        if (res.status === 200) {
          return res.data;
        } else {
          console.log('error', res);
        }
      }),
  });

  useEffect(() => {
    console.log(screenIssueListPending, screenIssueListFetched);
  }, [screenIssueListFetched, screenIssueListPending]);

  return (
    <L.SideBarLayout>
      <S.Wrapper>
        <S.Header>
          <S.StyledText color={PALETTE.MAIN_BLACK} fontSize={40} fontWeight={700}>
            화면 정의서
          </S.StyledText>
        </S.Header>
        {screenIssueListFetched && <Comp.GalleryGridWrapper issueList={screenIssueListResponse} type="SCREEN" />}
      </S.Wrapper>
    </L.SideBarLayout>
  );
}

const screenIssueList = [
  ...Array.from({ length: 7 }, (_, index) => ({
    issueId: index + 1,
    issueName: `화면 이슈 ${index + 1}`,
    createdAt: '2024.04.27',
    type: 'SCREEN' as 'SCREEN',
  })),
];
