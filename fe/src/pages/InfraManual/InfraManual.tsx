import React from 'react';
import * as Comp from '@components';
import * as L from '@layouts';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import * as API from '@/apis';

export default function InfraManual() {
  const { projectId } = useParams();

  const {
    data: infraIssueListResponse,
    isSuccess: infraIssueListSuccess,
    isFetching: infraIssueListLoading,
  } = useQuery({
    queryKey: [{ func: `get-infra-issues`, projectId }],
    queryFn: () => API.project.getInfraIssueList({ projectId: Number(projectId) }),
    select: data => data.data,
  });

  console.log(infraIssueListResponse);

  return (
    <L.SideBarLayout>
      {infraIssueListSuccess && <Comp.GalleryGridWrapper issueList={infraIssueListResponse} type="SCREEN" />}
    </L.SideBarLayout>
  );
}
// 더ㅏ미
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
