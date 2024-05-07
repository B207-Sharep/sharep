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
    isSuccess: screenIssueListSuccess,
    isLoading: screenIssueListLoading,
  } = useQuery({
    queryKey: [{ func: `screenIssueList` }],
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

  return (
    <L.SideBarLayout>
      <S.Wrapper>
        <S.Header>
          <S.StyledText color={PALETTE.MAIN_BLACK} fontSize={40} fontWeight={700}>
            화면 정의서
          </S.StyledText>
        </S.Header>
        {screenIssueListSuccess && <Comp.GalleryGridWrapper issueList={screenIssueListResponse} type="SCREEN" />}
      </S.Wrapper>
    </L.SideBarLayout>
  );
}
