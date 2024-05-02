import React from 'react';
import * as S from './TeamMemberStyle';
import * as Comp from '@components';
import * as L from '@layouts';

export default function TeamMember() {
  return (
    <L.SideBarLayout>
      <S.CanvansWrapper>
        <S.IssuesWrapper>
          <S.CanvanTitle>
            <Comp.StatusBadge status="YET" />
          </S.CanvanTitle>
          <S.IssuesContainer>
            {DUMMY.YET.map((d, idx) => (
              <Comp.Issue key={`yet-${d.name}-${idx}`} {...d} dragAble={true} />
            ))}
          </S.IssuesContainer>
        </S.IssuesWrapper>
        <S.IssuesWrapper>
          <S.CanvanTitle>
            <Comp.StatusBadge status="NOW" />
          </S.CanvanTitle>
          <S.IssuesContainer>
            {DUMMY.NOW.map((d, idx) => (
              <Comp.Issue key={`now-${d.name}-${idx}`} {...d} dragAble={true} />
            ))}
          </S.IssuesContainer>
        </S.IssuesWrapper>
        <S.IssuesWrapper>
          <S.CanvanTitle>
            <Comp.StatusBadge status="DONE" />
          </S.CanvanTitle>
          <S.IssuesContainer>
            {DUMMY.DONE.map((d, idx) => (
              <Comp.Issue key={`done-${d.name}-${idx}`} {...d} dragAble={true} />
            ))}
          </S.IssuesContainer>
        </S.IssuesWrapper>
      </S.CanvansWrapper>
    </L.SideBarLayout>
  );
}

const DUMMY = {
  YET: [
    {
      id: 0,
      name: '조성규의 색맹 치료',
      commit: null,
      assignees: [{ name: '조성규', url: '/sung-gu.png' }],
      priority: 'HIGH' as 'HIGH' | 'MEDIUM' | 'LOW',
    },
    {
      id: 0,
      name: '이승민의 여자친구 구합니다',
      commit: null,
      assignees: [{ name: '이승민', url: '/seung-min.png' }],
      priority: 'HIGH' as 'HIGH' | 'MEDIUM' | 'LOW',
    },
  ],
  NOW: [
    {
      id: 0,
      name: '단독) 오상훈 ♥ 임서정, 결혼 발표 예식장까지 잡아 놓은 상태',
      commit: { title: '싸피 10기 대전 캠퍼스에 돌릴 청첩장 제작중', createAt: '4월 29일' },
      assignees: [
        { name: '오상훈', url: '/seo-jeong.png' },
        { name: '임서정', url: '/sang-hun.png' },
      ],
      priority: 'HIGH' as 'HIGH' | 'MEDIUM' | 'LOW',
    },
  ],
  DONE: [
    {
      id: 0,
      name: '김성제 생일 국가 공휴일로 지정',
      commit: { title: '김성제 생일을 국가 공휴일로 지정하는 법안 통과', createAt: '2월 11일' },
      assignees: [
        { name: '이준석', url: '/lee-jun-seok.png' },
        { name: '윤석열', url: '/yoon-suk-yeol.png' },
        { name: '이재명', url: '/lee-jae-myung.png' },
      ],
      priority: 'HIGH' as 'HIGH' | 'MEDIUM' | 'LOW',
    },
    {
      id: 0,
      name: '유재건 군대 재입대 이슈',
      commit: { title: '입영 통지서 발송 완료 - 5월 24일날 재입대 예정', createAt: '4월 30일' },
      assignees: [{ name: '유재건', url: '/youjack.png' }],
      priority: 'HIGH' as 'HIGH' | 'MEDIUM' | 'LOW',
    },
  ],
};
