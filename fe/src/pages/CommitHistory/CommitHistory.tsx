import React, { useEffect, useState } from 'react';
import * as L from '@layouts';
import * as T from '@/types';
import * as S from './CommitHistoryStyle';
import * as Comp from '@components';
import { PALETTE } from '@/styles';
import { BriefcaseBusiness, ChevronDown, CircleDotDashed, GitCommitHorizontal, UsersRound } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useModal } from '@/customhooks';

export default function CommitHistory() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const jobModal = useModal('job');

  const groupedCommits = groupCommitsByDate(commitDummy);

  const [openFilter, setOpenFilter] = useState<T.FilterProps['type'] | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<Record<T.FilterProps['type'], string | null>>({
    member: null,
    role: null,
    issue: null,
  });

  const toggleDropdown = (filter: T.FilterProps['type']) => {
    setOpenFilter(openFilter === filter ? null : filter);
  };

  const selectValue = (filter: T.FilterProps['type'], value: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(filter, value);

    navigate(`?${newSearchParams.toString()}`, { replace: true });
  };

  const handleModalOpen = () => {
    jobModal.openModal({
      name: '',
      imageFile: null,
      description: '',
    });
  };

  useEffect(() => {
    const member = searchParams.get('member');
    const role = searchParams.get('role');
    const issue = searchParams.get('issue');

    setSelectedFilter({
      member,
      role,
      issue,
    });
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
                      {openFilter === 'role' ? (
                        <>
                          {roleList.map(role => (
                            <S.DropdowntItem key={role} onClick={() => selectValue(openFilter, role)}>
                              <Comp.RoleBadge role={role} selectAble={false} />
                            </S.DropdowntItem>
                          ))}
                        </>
                      ) : (
                        <>
                          {dropdownDummy[openFilter].map(value => (
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
                          ))}
                        </>
                      )}
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
        {Object.entries(groupedCommits).map(([date, commits]) => (
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

const dropdownDummy = {
  member: ['팀원1', '팀원2', '팀원3'], // /api/projects/{projectId}/members
  issue: ['이슈1', '이슈2', '이슈3'],
};

/*
/api/projects/{projectId}/jobs?accountId=&roleType=&issueId=

아무것도 안넣으면 팀별
accounId를 넣으면 구성원별
roleType을 넣으면 역할별
issueId를 넣으면 이슈별
*/
const commitDummy: T.CommitHistoryProps[] = [
  {
    id: 1,
    name: '작업명1',
    description:
      '도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가',
    createdAt: '2024-04-26',
    issueId: 1,
    member: {
      memberId: 1,
      nickname: '임서정',
      roles: ['FRONT_END', 'DESIGNER'] as Extract<T.RoleBadgeProps, 'role'>[],
    },
    imageUrl: 'https://via.placeholder.com/1440x1024',
  },
  {
    id: 2,
    name: '작업명2',
    description: '??!!!??',
    createdAt: '2024-04-26',
    issueId: 2,
    member: {
      memberId: 2,
      nickname: '오상훈',
      roles: ['BACK_END', 'INFRA'] as Extract<T.RoleBadgeProps, 'role'>[],
      userImageUrl: 'https://xsgames.co/randomusers/assets/avatars/pixel/1.jpg',
    },
  },
  {
    id: 3,
    name: '작업명3',
    description: '123123123',
    createdAt: '2024-04-25',
    issueId: 3,
    member: {
      memberId: 3,
      nickname: '조성규',
      roles: ['FRONT_END', 'DESIGNER'] as Extract<T.RoleBadgeProps, 'role'>[],
      userImageUrl: 'https://xsgames.co/randomusers/assets/avatars/pixel/2.jpg',
    },
    imageUrl: 'https://via.placeholder.com/1440x1024',
  },
  {
    id: 4,
    name: '작업명4',
    description: '에베베베ㅔ',
    createdAt: '2024-04-25',
    issueId: 4,
    member: {
      memberId: 4,
      nickname: '이승민',
      roles: ['BACK_END', 'INFRA'] as Extract<T.RoleBadgeProps, 'role'>[],
    },
  },
];

const roleList = ['FRONT_END' as 'FRONT_END', 'BACK_END' as 'BACK_END', 'INFRA' as 'INFRA', 'DESIGNER' as 'DESIGNER'];

const filters: T.FilterProps[] = [
  { type: 'member', icon: <UsersRound color={PALETTE.LIGHT_BLACK} size={14} />, label: '팀원' },
  { type: 'role', icon: <BriefcaseBusiness color={PALETTE.LIGHT_BLACK} size={14} />, label: '직무' },
  { type: 'issue', icon: <CircleDotDashed color={PALETTE.LIGHT_BLACK} size={14} />, label: '이슈' },
];

function groupCommitsByDate(commits: T.CommitHistoryProps[]): Record<string, T.CommitHistoryProps[]> {
  return commits.reduce((acc, commit) => {
    const date = commit.createdAt;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(commit);
    return acc;
  }, {} as Record<string, T.CommitHistoryProps[]>);
}
