import React, { useEffect, useState } from 'react';
import * as L from '@layouts';
import * as S from './CommitHistoryStyle';
import * as Comp from '@components';
import { PALETTE } from '@/styles';
import { BriefcaseBusiness, ChevronDown, CircleDotDashed, UsersRound } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const dropdownDummy = {
  member: ['팀원1', '팀원2', '팀원3'],
  issue: ['이슈1', '이슈2', '이슈3'],
};

const jobs = ['FRONT_END' as 'FRONT_END', 'BACK_END' as 'BACK_END', 'INFRA' as 'INFRA', 'DESIGNER' as 'DESIGNER'];

const filters: {
  type: 'member' | 'job' | 'issue';
  icon: React.JSX.Element;
  label: string;
}[] = [
  { type: 'member', icon: <UsersRound color={PALETTE.LIGHT_BLACK} size={14} />, label: '팀원' },
  { type: 'job', icon: <BriefcaseBusiness color={PALETTE.LIGHT_BLACK} size={14} />, label: '직무' },
  { type: 'issue', icon: <CircleDotDashed color={PALETTE.LIGHT_BLACK} size={14} />, label: '이슈' },
];

export default function CommitHistory() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [openFilter, setOpenFilter] = useState<'member' | 'job' | 'issue' | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<{ [key: string]: string | null }>({
    member: null,
    job: null,
    issue: null,
  });

  const toggleDropdown = (filter: 'member' | 'job' | 'issue') => {
    setOpenFilter(openFilter === filter ? null : filter);
  };

  const selectValue = (filter: 'member' | 'job' | 'issue', value: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(filter, value);

    navigate(`?${newSearchParams.toString()}`, { replace: true });
  };

  useEffect(() => {
    const member = searchParams.get('member');
    const job = searchParams.get('job');
    const issue = searchParams.get('issue');

    setSelectedFilter({
      member,
      job,
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
                      {openFilter === 'job' ? (
                        <>
                          {jobs.map(job => (
                            <S.DropdowntItem key={job} onClick={() => selectValue(openFilter, job)}>
                              <Comp.JobBadge job={job} />
                            </S.DropdowntItem>
                          ))}
                        </>
                      ) : (
                        <>
                          {dropdownDummy[openFilter].map(value => (
                            <S.DropdowntItem key={value} onClick={() => selectValue(openFilter, value)}>
                              {filter.type === 'member' && (
                                <S.UserProfile>
                                  <Comp.UserImg size="xs" path="https://via.placeholder.com/32x32" />
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
              <Comp.Add />
            </S.FilterWrapper>
          </div>
        </S.Header>
        <S.Divider />
        <S.CommitList>
          <Comp.Commit
            description="
          도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가"
            nickname="임서정"
            createdAt="2024-04-26"
            jobList={['FRONT_END', 'DESIGNER']}
            imageUrl="https://via.placeholder.com/1440x1024"
          />
          <Comp.Commit
            description="??!!!??"
            nickname="오상훈"
            createdAt="2024-04-26"
            jobList={['BACK_END', 'INFRA']}
            userImageUrl="https://xsgames.co/randomusers/assets/avatars/pixel/1.jpg"
          />
        </S.CommitList>
      </S.CommitHistoryWrapper>
    </L.SideBarLayout>
  );
}
