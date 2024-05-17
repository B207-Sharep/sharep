import React from 'react';
import * as S from './ApiManualStyle';
import * as Comp from '@components';
import * as API from '@apis';
import * as L from '@layouts';
import { useQueries } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export default function ApiManual() {
  const { projectId } = useParams();
  const [{ data: apiListResponse, isFetching: isApiListResponseFetching, refetch: refetchApiList }] = useQueries({
    queries: [
      {
        queryKey: [{ func: `get-api-list`, projectId }],
        queryFn: () => API.project.getApiIssueList({ projectId: Number(projectId) }),
      },
    ],
  });

  return (
    <>
      <S.ManualWrapper>
        <Comp.ApiManual readonly={false} dataList={apiListResponse?.data || []} usingFor="API" />
      </S.ManualWrapper>
    </>
  );
}
