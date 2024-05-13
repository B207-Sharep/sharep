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
      {infraIssueListSuccess && <Comp.GalleryGridWrapper issueList={infraIssueListResponse} type="INFRA" />}
    </L.SideBarLayout>
  );
}
