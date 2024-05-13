import React from 'react';
import * as S from './FeatureManualStyle';
import * as T from '@types';
import * as API from '@apis';
import * as Comp from '@components';
import * as L from '@layouts';
import { SocketProvider } from '@/providers/SocketProvider';
import { useQueries } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export default function FeatureManual() {
  const { projectId } = useParams();
  const [{ data: featureIssuesResponse, isFetching: isFeatureIssuesResponseFetching }] = useQueries({
    queries: [
      {
        queryKey: [{ func: `get-detail-feature-issues` }],
        queryFn: () =>
          API.project.getProjectDetailIssueList({
            projectId: Number(projectId),
            issueType: 'FEATURE',
            accountId: null,
          }),
      },
    ],
  });

  return (
    <SocketProvider>
      <L.SideBarLayout>
        <S.ManualWrapper>
          <Comp.FeatureManual readonly={false} dataList={featureIssuesResponse?.data || []} usingFor="FEATURE" />
        </S.ManualWrapper>
      </L.SideBarLayout>
    </SocketProvider>
  );
}
