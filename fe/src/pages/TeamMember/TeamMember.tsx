import React, { useMemo, useState } from 'react';
import * as S from './TeamMemberStyle';
import * as T from '@types';
import * as Sub from './Subs';
import * as Comp from '@components';
import * as L from '@layouts';
import * as API from '@apis';
import { useQueries } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userState } from '@/stores/atoms/loadUser';

export default function TeamMember() {
  const { projectId, accountId } = useParams();
  const clientUser = useRecoilValue(userState);
  const [dragEnterdState, setDragEnterdState] = useState<null | 'YET' | 'NOW' | 'DONE'>(null);

  const [
    { data: jobsResponse, isFetching: isJobsResponseFeting },
    { data: contributionsResponse, isFetching: isContributionsResponseFeting },
    { data: kanbansResponse, isFetching: isKanbansResponseFeting, refetch: refetchKanbansResponse },
    { data: membersResponse, isFetching: isMembersResponseFeting },
  ] = useQueries({
    queries: [
      {
        queryKey: [{ func: `get-job-list`, projectId, accountId }],
        queryFn: () =>
          API.project.getJobList({
            projectId: Number(projectId),
            accountId: Number(accountId),
            issueId: null,
            roleType: null,
          }),
      },
      {
        queryKey: [{ func: `get-contributions`, projectId, accountId: accountId }],
        queryFn: () => API.project.getContributions({ projectId: Number(projectId), accountId: Number(accountId) }),
      },
      {
        queryKey: [{ func: `get-kanban`, projectId, accountId: accountId }],
        queryFn: () => API.project.getKanbanList({ projectId: Number(projectId), accountId: Number(accountId) }),
      },
      {
        queryKey: [{ func: `get-member-list`, projectId }],
        queryFn: () => API.project.getProjectMemberList({ projectId: Number(projectId) }),
      },
    ],
  });

  const findMember = useMemo((): T.API.GetProjectMemberListResponse => {
    return membersResponse?.data
      .map((member: T.API.GetProjectMemberListResponse) => member.account.id === Number(accountId) && member)
      .filter((el: T.API.GetProjectMemberListResponse | false) => el)[0] as T.API.GetProjectMemberListResponse;
  }, [membersResponse?.data, accountId]);

  return (
    <L.SideBarLayout>
      <S.RowWrapper>
        <S.WhiteBoxWrapper $flex="2" $direction="row">
          {findMember && (
            <S.MemberWrapper>
              <Comp.UserImg size="lg" path={findMember.account.imageUrl} />
              <p>
                <span>{findMember.account.nickname}</span>
                <span>@{findMember.account.email}</span>
              </p>
            </S.MemberWrapper>
          )}
          <S.WorksWrapper>
            <S.YesterdayWork>
              <S.Title>
                <span>어제 한 일</span>
              </S.Title>
              <p aria-label={DUMMY_YESTERDAY_WORK}>{DUMMY_YESTERDAY_WORK}</p>
            </S.YesterdayWork>
            <S.RecentlyCommitsWrapper>
              <S.Title>
                <span>최근 작업들</span>
              </S.Title>
              <S.RecentlyCommitsScrollContainer>
                {jobsResponse?.data.map((job: T.API.GetJobListResponse) => (
                  <Comp.Commit {...job} key={`job-in-team-member-page-${job.id}`} disabled={true} />
                ))}
              </S.RecentlyCommitsScrollContainer>
            </S.RecentlyCommitsWrapper>
          </S.WorksWrapper>
        </S.WhiteBoxWrapper>
        <S.WhiteBoxWrapper $flex="1" $direction="column">
          <S.Title>
            <span>{findMember && findMember.account.nickname}님의 기여도</span>
          </S.Title>
          <Sub.ContributionsChart dataList={contributionsResponse?.data || null} />
        </S.WhiteBoxWrapper>
      </S.RowWrapper>
      <S.KanbansWrapper>
        {['YET', 'NOW', 'DONE'].map(state => (
          <Sub.Kanban
            key={`kanban-${state}`}
            state={state as 'YET' | 'NOW' | 'DONE'}
            refetchKanbansResponse={refetchKanbansResponse}
            dragEnterdState={dragEnterdState}
            setDragEnterdState={setDragEnterdState}
            issues={kanbansResponse?.data || []}
            dragAble={findMember && clientUser !== null && findMember.account.id === Number(clientUser.id)}
            deleteAble={findMember && clientUser !== null && findMember.account.id === Number(clientUser.id)}
          />
        ))}
      </S.KanbansWrapper>
    </L.SideBarLayout>
  );
}

const DUMMY_YESTERDAY_WORK = `달이 떴다고 전화를 주시다니요. 이 밤 너무 신나고 근사해요. `;
