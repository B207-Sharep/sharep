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
  const { projectId, accountId, issueId, roleType } = useParams();
  const navigate = useNavigate();
  const jobModal = useModal('job');

  const [openFilter, setOpenFilter] = useState<keyof T.FilterProps['type'] | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<T.FilterProps['type']>({
    member: null,
    role: null,
    issue: null,
  });

  const [
    { data: jobListResponse, isSuccess: jobListSuccess, isFetching: jobListeFetching },
    { data: memberListResponse, isSuccess: memberListSuccess, isFetching: memberListFetching },
    { data: issueListResponse, isSuccess: issueListSuccess, isFetching: issueListFetching },
  ] = useQueries({
    queries: [
      {
        queryKey: [{ func: `get-job-list`, projectId }],
        queryFn: () =>
          API.project.getJobList({
            projectId: Number(projectId),
            accountId: Number(accountId),
            issueId: Number(issueId),
            roleType: roleType as Extract<T.RoleBadgeProps, 'role'>,
          }),
      },
      {
        queryKey: [{ func: `get-member-list`, projectId }],
        queryFn: () => API.project.getProjectMemberList({ projectId: Number(projectId) }),
      },
      {
        queryKey: [{ func: `get-issue-list`, projectId }],
        queryFn: () => API.project.getProjectIssueList({ projectId: Number(projectId) }),
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
    const member = searchParams.get('member');
    const role = searchParams.get('role');
    const issue = searchParams.get('issue');

    // setSelectedFilter({
    //   member,
    //   role,
    //   issue,
    // });
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
                <S.Filter key={filter.type} onClick={() => toggleDropdown(filter.type)}>
                  <UsersRound color={PALETTE.LIGHT_BLACK} size={14} />
                  <S.StyledText color={PALETTE.SUB_BLACK} fontSize={14}>
                    {filter.label}
                    {selectedFilter[filter.type] ? `: ${selectedFilter[filter.type]}` : ''}
                  </S.StyledText>
                  <S.AccordionIconButton>
                    <S.AccordionIcon $isOpen={openFilter === filter.type}>
                      <ChevronDown size={12} />
                    </S.AccordionIcon>
                  </S.AccordionIconButton>
                  {openFilter === filter.type && (
                    <S.Dropdown>
                      {/* {openFilter === 'role' ? (
                        <>
                          {roleList.map(role => (
                            <S.DropdowntItem key={role} onClick={() => selectValue(openFilter, role)}>
                              <Comp.RoleBadge role={role} selectAble={false} />
                            </S.DropdowntItem>
                          ))}
                        </>
                      ) : openFilter === 'member' && isMemberSuccess ? (
                        <>
                          {memberData.map(member => (
                            <S.DropdowntItem key={member.id} onClick={() => selectValue(openFilter, member.name)}>
                              <S.UserProfile>
                                <Comp.UserImg size="sm" path="https://via.placeholder.com/32x32" />
                                <S.UserInfo>
                                  <S.StyledText>{member.name}</S.StyledText>
                                </S.UserInfo>
                              </S.UserProfile>
                            </S.DropdowntItem>
                          ))}
                        </>
                      ) : openFilter === 'issue' && isIssueSuccess ? (
                        <>
                          {issueData.map(issue => (
                            <S.DropdowntItem key={issue.id} onClick={() => selectValue(openFilter, issue.issueName)}>
                              <S.StyledText>{issue.issueName}</S.StyledText>
                            </S.DropdowntItem>
                          ))}
                        </>
                      ) : null} */}
                      {openFilter === 'role' ? (
                        <>
                          {roleList.map(role => (
                            <S.DropdowntItem key={role} onClick={() => selectValue(openFilter, role)}>
                              <Comp.RoleBadge role={role} selectAble={false} />
                            </S.DropdowntItem>
                          ))}
                        </>
                      ) : openFilter === 'member' && memberListSuccess ? (
                        <>
                          {memberListResponse?.data.map((member: T.API.GetProjectMemberListResponse) => (
                            <S.UserProfile
                              key={member.id}
                              onClick={() =>
                                selectValue(openFilter, { id: member.account.id, nickname: member.account.nickname })
                              }
                            >
                              <Comp.UserImg size="sm" path="https://via.placeholder.com/32x32" />
                              <S.UserInfo>
                                <S.StyledText>{member.account.nickname}</S.StyledText>
                              </S.UserInfo>
                            </S.UserProfile>
                          ))}
                        </>
                      ) : openFilter === 'issue' && issueListSuccess ? (
                        <>{/* <S.StyledText>{value}</S.StyledText> */}</>
                      ) : null}

                      {/* {dropdownDummy[openFilter].map(value => (
                            <S.DropdowntItem key={value} onClick={() => selectValue(openFilter, value)}>
                              {filter.type === 'member' && (
                                <S.UserProfile>
                                  <Comp.UserImg size="sm" path="https://via.placeholder.com/32x32" />
                                  <S.UserInfo>
                                    <S.StyledText>{value}</S.StyledText>
                                  </S.UserInfo>
                                </S.UserProfile>
                              )}
                              {filter.type === 'issue' && <S.StyledText>{value}</S.StyledText>}
                            </S.DropdowntItem>
                          ))} */}
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
            <div key={date}>
              <S.CommitDateWrapper>
                <S.CommitIconContainer>
                  <GitCommitHorizontal size={16} />
                </S.CommitIconContainer>
                <S.StyledText color={PALETTE.LIGHT_BLACK}>{date}</S.StyledText>
              </S.CommitDateWrapper>
              <S.CommitList>
                {commits.map(commit => (
                  <Comp.Commit
                    key={commit.id}
                    id={commit.id}
                    name={commit.name}
                    description={commit.description}
                    createdAt={commit.createdAt}
                    member={{
                      nickname: commit.member.nickname,
                      roles: commit.member.roles,
                      userImageUrl: commit.member.userImageUrl,
                    }}
                    {...(commit.imageUrl ? { imageUrl: commit.imageUrl } : {})}
                    disabled={false}
                  />
                ))}
              </S.CommitList>
            </div>
          ))}
      </S.CommitHistoryWrapper>
    </L.SideBarLayout>
  );
}

// const dropdownDummy = {
//   member: ['팀원1', '팀원2', '팀원3'], // /api/projects/{projectId}/members
//   issue: ['이슈1', '이슈2', '이슈3'],
// };

const roleList = ['FRONT_END' as 'FRONT_END', 'BACK_END' as 'BACK_END', 'INFRA' as 'INFRA', 'DESIGNER' as 'DESIGNER'];

const filters: T.FilterProps['type'][] = [
  { type: 'member', icon: <UsersRound color={PALETTE.LIGHT_BLACK} size={14} />, label: '팀원' },
  { type: 'role', icon: <BriefcaseBusiness color={PALETTE.LIGHT_BLACK} size={14} />, label: '직무' },
  { type: 'issue', icon: <CircleDotDashed color={PALETTE.LIGHT_BLACK} size={14} />, label: '이슈' },
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
