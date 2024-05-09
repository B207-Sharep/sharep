import React from 'react';
import * as Comp from '@components';
import * as L from '@layouts';

export default function InfraManual() {
  return (
    <L.SideBarLayout>
      <Comp.GalleryGridWrapper issueList={infraIssueList} type="INFRA" />
    </L.SideBarLayout>
  );
}

const infraIssueList = [
  ...Array.from({ length: 7 }, (_, index) => ({
    id: index + 1,
    connectionId: null, // 리스트 조회 시 항상 null
    issueName: `인프라 이슈 ${index + 1}`,
    description: '',
    type: 'INFRA' as 'INFRA',
    epic: '커도',
    state: 'YET' as 'YET',
    createdAt: '2022-12-03',
    priority: null,
    startedAt: null,
    finishedAt: null,
    api: null,
    assignees: [],
    jobs: [],
  })),
];
