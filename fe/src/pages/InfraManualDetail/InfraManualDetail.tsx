import React, { useCallback, useEffect, useMemo, useState } from 'react';
import * as L from '@layouts';
import * as T from '@/types';
import * as S from './InfraManualDetailStyle';
import * as Comp from '@components';
import * as API from '@/apis';
import { PALETTE } from '@/styles';
import { BriefcaseBusiness, ChevronDown, CircleDotDashed, GitCommitHorizontal, UsersRound } from 'lucide-react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useModal } from '@/customhooks';
import { useQueries } from '@tanstack/react-query';

export default function InfraManualDetail() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { projectId, manualId } = useParams();
  const navigate = useNavigate();
  const infraModal = useModal('infra-job');

  const [openFilter, setOpenFilter] = useState<keyof T.FilterProps['type'] | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<T.FilterProps['type']>({
    accountId: { id: null, data: null },
    roleType: { id: null, data: null },
    issueId: { id: null, data: null },
  });

  const [
    { data: jobListResponse, isSuccess: jobListSuccess, isFetching: jobListeFetching, refetch: jobListRefetch },
    { data: memberListResponse, isSuccess: memberListSuccess, isFetching: memberListFetching },
    { data: issueListResponse, isSuccess: issueListSuccess, isFetching: issueListFetching },
  ] = useQueries({
    queries: [
      {
        queryKey: [{ func: `get-job-list`, projectId, searchParams }],
        queryFn: () =>
          API.project.getJobList({
            projectId: Number(projectId),
            accountId: Number(searchParams.get('accountId')),
            issueId: Number(manualId),
            roleType: searchParams.get('roleType') as Extract<T.RoleBadgeProps, 'role'>,
          }),
      },
      {
        queryKey: [{ func: `get-member-list`, projectId }],
        queryFn: () => API.project.getProjectMemberList({ projectId: Number(projectId) }),
      },
      {
        queryKey: [{ func: `get-issue-list`, projectId }],
        queryFn: () =>
          API.project.getProjectSimpleIssueList({
            projectId: Number(projectId),
            issueType: null,
            accountId: null,
          }),
      },
    ],
  });

  const groupedCommits = useMemo(() => {
    if (!jobListResponse) return [];
    return jobListResponse && groupCommitsByDate(jobListResponse.data);
  }, [jobListResponse]);

  //   const groupedIssueList = useMemo(() => {
  //     if (!issueListResponse) return [];
  //     const sortedIssues = [...issueListResponse.data].sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  //     return groupIssuesByType(sortedIssues);
  //   }, [issueListResponse]);

  //   console.log(manualId);
  const handleModalOpen = () => {
    infraModal.openModal({
      name: '',
      description: '',
      notiUsers: [],
    });
  };

  const toggleDropdown = (filter: keyof T.FilterProps['type']) => {
    setOpenFilter(openFilter === filter ? null : filter);
  };

  const selectValue = (filter: keyof T.FilterProps['type'], value: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(filter, value);

    navigate(`?${newSearchParams.toString()}`, { replace: true });
  };

  return (
    <L.SideBarLayout>
      <S.CommitHistoryWrapper>
        <S.Header>
          <S.StyledText color={PALETTE.MAIN_BLACK} fontSize={40} fontWeight={700}>
            작업 기록
          </S.StyledText>
          <div>
            <S.FilterWrapper>
              <S.CommitAddBtn onClick={handleModalOpen}>
                <Comp.Add />
              </S.CommitAddBtn>
              <Comp.Modal modalId="infra-job" title="새 작업 작성">
                <Comp.InfraJobCreationForm modalId="infra-job" />
              </Comp.Modal>
            </S.FilterWrapper>
          </div>
        </S.Header>
        <S.Divider />
        {Object.entries(groupedCommits).map(([date, commits]) => (
          <div key={`commits-date-${date}`}>
            <S.CommitDateWrapper>
              <S.CommitIconContainer>
                <GitCommitHorizontal size={16} />
              </S.CommitIconContainer>
              <S.StyledText color={PALETTE.LIGHT_BLACK}>{date}</S.StyledText>
            </S.CommitDateWrapper>
            <S.CommitList>
              {commits.map(commit => (
                <Comp.Commit key={`commit-${commit.id}`} {...commit} infra={true} disabled={false} />
              ))}
            </S.CommitList>
          </div>
        ))}
      </S.CommitHistoryWrapper>
    </L.SideBarLayout>
  );
}

const roleList = ['FRONT_END' as 'FRONT_END', 'BACK_END' as 'BACK_END', 'INFRA' as 'INFRA', 'DESIGNER' as 'DESIGNER'];

const filters: {
  type: keyof T.FilterProps['type'];
  icon: React.JSX.Element;
  label: string;
}[] = [
  { type: 'accountId', icon: <UsersRound color={PALETTE.LIGHT_BLACK} size={14} />, label: '팀원' },
  { type: 'roleType', icon: <BriefcaseBusiness color={PALETTE.LIGHT_BLACK} size={14} />, label: '직무' },
  { type: 'issueId', icon: <CircleDotDashed color={PALETTE.LIGHT_BLACK} size={14} />, label: '이슈' },
];

function groupCommitsByDate(commits: T.CommitHistoryProps[]): Record<string, T.CommitHistoryProps[]> {
  return commits.reduce((acc, commit) => {
    const date = commit.createdAt.split('T')[0];
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(commit);
    return acc;
  }, {} as Record<string, T.CommitHistoryProps[]>);
}

function groupIssuesByType(issues: T.API.SimpleIssue[]): {
  [key in 'FEATURE' | 'SCREEN' | 'PRIVATE' | 'INFRA']: T.API.SimpleIssue[];
} {
  return issues.reduce((acc, issue) => {
    const { type } = issue;

    if (!acc[type]) {
      acc[type] = [];
    }

    acc[type].push(issue);

    return acc;
  }, {} as { [key in 'FEATURE' | 'SCREEN' | 'PRIVATE' | 'INFRA']: T.API.SimpleIssue[] });
}
