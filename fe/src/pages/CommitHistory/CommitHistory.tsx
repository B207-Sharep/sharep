import React, { useEffect, useState } from 'react';
import * as L from '@layouts';
import * as S from './CommitHistoryStyle';
import * as Comp from '@components';
import { PALETTE } from '@/styles';
import { BriefcaseBusiness, ChevronDown, CircleDotDashed, UsersRound } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useModal } from '@/customhooks';
import { TaskCreationForm } from '@/components/Modal/Subs';

const dropdownDummy = {
  member: ['팀원1', '팀원2', '팀원3'],
  issue: ['이슈1', '이슈2', '이슈3'],
};

const commitDummy: {
  commitId: number;
  description: string;
  createdAt: string;
  user: {
    nickname: string;
    roles: ('FRONT_END' | 'BACK_END' | 'INFRA' | 'DESIGNER')[];
    userImageUrl?: string;
  };
  imageUrl?: string;
}[] = [
  {
    commitId: 1,
    description:
      '도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가',
    createdAt: '2024-04-26',
    user: {
      nickname: '임서정',
      roles: ['FRONT_END', 'DESIGNER'],
    },
    imageUrl: 'https://via.placeholder.com/1440x1024',
  },
  {
    commitId: 2,
    description: '??!!!??',
    createdAt: '2024-04-26',
    user: {
      nickname: '오상훈',
      roles: ['BACK_END', 'INFRA'],
      userImageUrl: 'https://xsgames.co/randomusers/assets/avatars/pixel/1.jpg',
    },
  },
  {
    commitId: 3,
    description: '123123123',
    createdAt: '2024-04-25',
    user: {
      nickname: '조성규',
      roles: ['FRONT_END', 'BACK_END'],
      userImageUrl: 'https://xsgames.co/randomusers/assets/avatars/pixel/2.jpg',
    },
    imageUrl: 'https://via.placeholder.com/1440x1024',
  },
  {
    commitId: 4,
    description: '에베베베ㅔ',
    createdAt: '2024-04-25',
    user: {
      nickname: '이승민',
      roles: ['BACK_END', 'INFRA'],
    },
  },
];

const roleList = ['FRONT_END' as 'FRONT_END', 'BACK_END' as 'BACK_END', 'INFRA' as 'INFRA', 'DESIGNER' as 'DESIGNER'];

const filters: {
  type: 'member' | 'role' | 'issue';
  icon: React.JSX.Element;
  label: string;
}[] = [
  { type: 'member', icon: <UsersRound color={PALETTE.LIGHT_BLACK} size={14} />, label: '팀원' },
  { type: 'role', icon: <BriefcaseBusiness color={PALETTE.LIGHT_BLACK} size={14} />, label: '직무' },
  { type: 'issue', icon: <CircleDotDashed color={PALETTE.LIGHT_BLACK} size={14} />, label: '이슈' },
];

export default function CommitHistory() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const taskModal = useModal('task');

  const [openFilter, setOpenFilter] = useState<'member' | 'role' | 'issue' | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<{ [key: string]: string | null }>({
    member: null,
    role: null,
    issue: null,
  });

  const toggleDropdown = (filter: 'member' | 'role' | 'issue') => {
    setOpenFilter(openFilter === filter ? null : filter);
  };

  const selectValue = (filter: 'member' | 'role' | 'issue', value: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(filter, value);

    navigate(`?${newSearchParams.toString()}`, { replace: true });
  };

  const handleModalOpen = () => {
    taskModal.openModal({
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
              <Comp.Modal modalId="task" title="새 작업 작성">
                <TaskCreationForm modalId="task" />
              </Comp.Modal>
            </S.FilterWrapper>
          </div>
        </S.Header>
        <S.Divider />
        <S.CommitList>
          {commitDummy.map(commit => (
            <Comp.Commit
              key={commit.commitId}
              description={commit.description}
              createdAt={commit.createdAt}
              user={{
                nickname: commit.user.nickname,
                roles: commit.user.roles,
                userImageUrl: commit.user.userImageUrl,
              }}
              {...(commit.imageUrl ? { imageUrl: commit.imageUrl } : {})}
            />
          ))}
        </S.CommitList>
      </S.CommitHistoryWrapper>
    </L.SideBarLayout>
  );
}
