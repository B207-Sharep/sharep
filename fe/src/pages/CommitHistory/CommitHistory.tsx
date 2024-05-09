import React, { useEffect, useMemo, useState } from 'react';
import * as L from '@layouts';
import * as T from '@/types';
import * as S from './CommitHistoryStyle';
import * as Comp from '@components';
import * as API from '@/apis';
import { PALETTE } from '@/styles';
import { BriefcaseBusiness, ChevronDown, CircleDotDashed, GitCommitHorizontal, UsersRound } from 'lucide-react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useModal } from '@/customhooks';
import { useQueries } from '@tanstack/react-query';

export default function CommitHistory() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { projectId } = useParams();
  const navigate = useNavigate();
  const jobModal = useModal('job');

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
            issueId: Number(searchParams.get('issueId')),
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
          API.project.getProjectIssueList({
            projectId: Number(projectId),
            dataType: 'SIMPLE',
            issueType: null,
            accountId: null,
          }),
      },
    ],
  });

  const groupedCommits = useMemo(
    () => jobListResponse && jobListResponse && groupCommitsByDate(jobListResponse.data),
    [jobListResponse],
  );

  const handleModalOpen = () => {
    jobModal.openModal({
      name: '',
      imageFile: null,
      description: '',
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

  useEffect(() => {
    const accountId = searchParams.get('accountId');
    const roleType = searchParams.get('roleType');
    const issueId = searchParams.get('issueId');

    const newFilter: T.FilterProps['type'] = {
      accountId: { id: null, data: null },
      roleType: { id: null, data: null },
      issueId: { id: null, data: null },
    };

    if (accountId) {
      const member = memberListResponse?.data.find(member => member.account.id.toString() === accountId);
      if (member) {
        newFilter.accountId = { id: Number(accountId), data: member.account.nickname };
      }
    }

    if (roleType) {
      newFilter.roleType = { id: null, data: roleType as Extract<T.RoleBadgeProps, 'role'> };
    }

    if (issueId) {
      const issue = issueListResponse?.data.find(issue => issue.id.toString() === issueId);
      if (issue) {
        newFilter.issueId = { id: Number(issueId), data: issue.issueName };
      }
    }

    console.log(newFilter);
    setSelectedFilter(newFilter);
    console.log('search params changed');
    jobListRefetch();
  }, [searchParams]);

  return (
    <L.SideBarLayout>
      <S.CommitHistoryWrapper>
        <S.Header>
          <S.StyledText color={PALETTE.MAIN_BLACK} fontSize={40} fontWeight={700}>
            작업 기록
          </S.StyledText>
          <div>
            <S.FilterWrapper>
              {filters.map(filter => (
                <S.Filter key={`filter-${filter.type}`} onClick={() => toggleDropdown(filter.type)}>
                  <UsersRound color={PALETTE.LIGHT_BLACK} size={14} />
                  <S.StyledText color={PALETTE.SUB_BLACK} fontSize={14}>
                    {filter.label}
                    {selectedFilter[filter.type].data ? `: ${selectedFilter[filter.type].data}` : ''}
                  </S.StyledText>
                  <S.AccordionIconButton>
                    <S.AccordionIcon $isOpen={openFilter === filter.type}>
                      <ChevronDown size={12} />
                    </S.AccordionIcon>
                  </S.AccordionIconButton>
                  {openFilter === filter.type && (
                    <S.Dropdown>
                      {openFilter === 'roleType' ? (
                        <>
                          {roleList.map(role => (
                            <S.DropdowntItem
                              key={`filter-${openFilter}-${role}`}
                              onClick={() => selectValue(openFilter, role)}
                            >
                              <Comp.RoleBadge role={role} selectAble={false} />
                            </S.DropdowntItem>
                          ))}
                        </>
                      ) : openFilter === 'accountId' && memberListSuccess ? (
                        <>
                          {memberListResponse?.data.map((member: T.API.GetProjectMemberListResponse) => (
                            <S.DropdowntItem
                              key={`filter-${openFilter}-${member.id}`}
                              onClick={() => selectValue(openFilter, member.account.id.toString())}
                            >
                              <S.UserProfile>
                                <Comp.UserImg size="sm" path="https://via.placeholder.com/32x32" />
                                <S.UserInfo>
                                  <S.StyledText>{member.account.nickname}</S.StyledText>
                                </S.UserInfo>
                              </S.UserProfile>
                            </S.DropdowntItem>
                          ))}
                        </>
                      ) : openFilter === 'issueId' && issueListSuccess ? (
                        <>
                          {issueListResponse?.data.map((issue: T.API.GetProjectIssueListResponse) => (
                            <S.DropdowntItem
                              key={`filter-${openFilter}-${issue.id}`}
                              onClick={() => selectValue(openFilter, issue.id.toString())}
                            >
                              <S.StyledText>{issue.issueName}</S.StyledText>
                            </S.DropdowntItem>
                          ))}
                        </>
                      ) : null}
                    </S.Dropdown>
                  )}
                </S.Filter>
              ))}
              <S.CommitAddBtn onClick={handleModalOpen}>
                <Comp.Add />
              </S.CommitAddBtn>
              <Comp.Modal modalId="job" title="새 작업 작성">
                <Comp.JobCreationForm modalId="job" />
              </Comp.Modal>
            </S.FilterWrapper>
          </div>
        </S.Header>
        <S.Divider />
        {groupedCommits &&
          Object.entries(groupedCommits).map(([date, commits]) => (
            <div key={`commits-date-${date}`}>
              <S.CommitDateWrapper>
                <S.CommitIconContainer>
                  <GitCommitHorizontal size={16} />
                </S.CommitIconContainer>
                <S.StyledText color={PALETTE.LIGHT_BLACK}>{date}</S.StyledText>
              </S.CommitDateWrapper>
              <S.CommitList>
                {commits.map(commit => (
                  <Comp.Commit key={`commit-${commit.id}`} {...commit} disabled={false} />
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
