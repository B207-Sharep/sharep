import React, { useState } from 'react';
import * as S from './TeamMemberStyle';
import * as T from '@types';
import * as Sub from './Subs';
import * as L from '@layouts';

export default function TeamMember() {
  const [issues, setIssues] = useState(DUMMY);

  return (
    <L.SideBarLayout>
      <S.CanvansWrapper>
        {['YET', 'NOW', 'DONE'].map(state => (
          <Sub.Canvan state={state as 'YET' | 'NOW' | 'DONE'} issues={issues} setIssues={setIssues} />
        ))}
      </S.CanvansWrapper>
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
    id: 0,
    name: '이승민의 여자친구 구합니다',
    commit: null,
    assignees: [{ name: '이승민', imageUrl: '/seung-min.png' }],
    priority: 'HIGH' as 'HIGH' | 'MEDIUM' | 'LOW',
    state: 'YET',
    type: 'SCREEN',
  },
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
];
