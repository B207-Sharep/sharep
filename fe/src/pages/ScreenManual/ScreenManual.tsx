import React from 'react';
import * as Comp from '@components';
import * as L from '@layouts';
import * as S from './ScreenManualStyle';
import { PALETTE } from '@/styles';

const screenIssueList = [
  ...Array.from({ length: 7 }, (_, index) => ({
    issueId: index + 1,
    issueName: `화면 이슈 ${index + 1}`,
    createdAt: '2024.04.27',
    issueType: 'SCREEN' as 'SCREEN',
  })),
];

export default function ScreenManual() {
  return (
    <L.SideBarLayout>
      <S.Wrapper>
        <S.Header>
          <S.StyledText color={PALETTE.MAIN_BLACK} fontSize={40} fontWeight={700}>
            화면 정의서
          </S.StyledText>
        </S.Header>
        <Comp.GalleryGridWrapper issueList={screenIssueList} />
      </S.Wrapper>
    </L.SideBarLayout>
  );
}
