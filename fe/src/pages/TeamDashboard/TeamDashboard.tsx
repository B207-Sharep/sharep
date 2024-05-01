import React from 'react';
import * as S from './TeamDashboardStyle';
import * as T from '@types';
import * as L from '@layouts';
import * as Sub from './Subs';
import * as Comp from '@components';
import * as Icon from '@assets';

export default function TeamDashboard() {
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
              {Array.from({ length: 6 }).map((_, i) => (
                <S.YesterdayWork key={`yesterday-work-${i}`}>
                  <Sub.TeamMember {...DUMMY_USER} />
                  <p aria-label={DUMMY_YESTERDAY_WORK}>{DUMMY_YESTERDAY_WORK}</p>
                </S.YesterdayWork>
              ))}
            </S.YesterdayWorksScrollContainer>
          </S.WhiteBoxWrapper>
          <S.WhiteBoxWrapper $flex="2" $height="302px">
            <S.Title>
              <Icon.CurrentWork />
              <span>가장 최근 작업 중인 이슈</span>
            </S.Title>
            <S.CurrentWorksScrollContainer>
              {Array.from({ length: 6 }).map((_, i) => (
                <S.CurrentWork>
                  <Sub.TeamMember {...DUMMY_USER} />
                  <div className="issue" />
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
          <Comp.GalleryGridWrapper issueList={DUMMY_SCREEN_LIST} />
        </S.WhiteBoxWrapper>
      </S.Container>
    </L.SideBarLayout>
  );
}

const DUMMY_USER: T.TeamMemberProps = {
  name: '쨰용이행님',
  image: '/lee-jae-yong.png',
  jobs: ['FRONT_END', 'DESIGNER'] as Extract<T.JobBadgeProps, 'job'>[],
};

const DUMMY_YESTERDAY_WORK = `달이 떴다고 전화를 주시다니요. 이 밤 너무 신나고 근사해요. 내 마음에도 생전 처음 보는 환한 달이
떠오르고 산아래 작은 마을이 그려집니다. 간절한 이 그리움들을, 사무쳐오는 이 연정들을 달빛에 실어
당신께 보냅니다. 세상에, 강변에 달이 곱다고 전화를 다 주시다니요. 흐르는 물 어디쯤 눈부시게 부서지는
소리 문득 들려옵니다.`;

const DUMMY_SCREEN_LIST = [
  ...Array.from({ length: 7 }, (_, index) => ({
    issueName: `화면 이슈 ${index + 1}`,
    createdAt: '2024.04.27',
    issueType: 'SCREEN' as 'SCREEN',
  })),
];
