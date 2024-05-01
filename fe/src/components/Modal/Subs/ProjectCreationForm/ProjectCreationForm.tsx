import React, { useEffect, useRef, useState } from 'react';
import BaseLabelWithInput from '@/components/InputWithLabel/InputWithLabel';
import { PALETTE } from '@/styles';
import * as S from './ProjectCreationFormStyle';
import { Info, MinusCircle, Search } from 'lucide-react';
import Git from '@/assets/svgs/git-icon.svg?react';
import { JobBadge } from '@/components';
import UserImg from '../../../UserImg/UserImg';

//DUMMY
import UIMG from '@/assets/imgs/youjack.png';

import { ProjectCreationFormProps } from '@/types/components/ProjectCreationForm';
import { modalDataState } from '@/stores/atoms/modal';
import { useRecoilValue } from 'recoil';
import { useModal } from '@/customhooks';

const dummyResults: {
  accountId: number;
  email: string;
  nickname: string;
}[] = [
  {
    accountId: 2,
    email: 'ssafy1234@ssafy.com',
    nickname: '사용자1',
  },
  { accountId: 3, email: 'ssafy5678@ssafy.com', nickname: '사용자2' },
  { accountId: 4, email: 'oh4@ssafy.com', nickname: '오상훈' },
  { accountId: 5, email: 'sj@ssafy.com', nickname: '임서정' },
  { accountId: 6, email: 'jo@ssafy.com', nickname: '조성규' },
  { accountId: 7, email: 'princess@ssafy.com', nickname: '김성제' },
  { accountId: 8, email: 'mehot@ssafy.com', nickname: '이승민' },
  // { accountId: 9, email: 'jack@ssafy.com', nickname: '유재건' },
];

const jobs = ['FRONT_END' as 'FRONT_END', 'BACK_END' as 'BACK_END', 'INFRA' as 'INFRA', 'DESIGNER' as 'DESIGNER'];

export default function ProjectCreationForm({ modalId }: ProjectCreationFormProps) {
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchResults, setSearchResults] = useState<
    {
      accountId: number;
      email: string;
      nickname: string;
    }[]
  >([]);

  const { updateFormData } = useModal<{
    title: string;
    bio: string;
    secretKey: string;
    members: {
      accountId: number;
      email: string;
      nickname: string;
      jobs: { [key: string]: boolean };
    }[];
  }>(modalId);

  const modalData = useRecoilValue(modalDataState(modalId));
  const { formData } = modalData;

  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  // 특정 Job의 선택 상태 토글
  const toggleJobState = (accountId: number, job: 'FRONT_END' | 'BACK_END' | 'INFRA' | 'DESIGNER') => {
    updateFormData({
      ...formData,
      members: formData.members.map(
        (member: { accountId: number; email: string; nickname: string; jobs: { [key: string]: boolean } }) =>
          member.accountId === accountId
            ? {
                ...member,
                jobs: {
                  ...member.jobs,
                  [job]: !member.jobs[job],
                },
              }
            : member,
      ),
    });
  };

  // dropdown에 팀원 이메일 검색내역 불러오기
  useEffect(() => {
    setSearchResults(dummyResults);
    setIsDropdownVisible(true);
  }, [searchValue]);

  // 팀원 이메일 검색 시 input focusout 되었을 때 처리
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsDropdownVisible(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  //  팀원 이메일 검색 시 input change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  // 팀원 이메일 검색 내역 dropdown item 선택 했을 때, 중복 제외하고 선택된 팀원 추가
  const handleResultClick = (selectedUser: { accountId: number; email: string; nickname: string }) => () => {
    setSearchValue('');

    // 이미 추가된 팀원인지 체크
    const isMemberAlreadyAdded = formData.members.some(
      (member: { accountId: number; email: string; nickname: string; jobs: { [key: string]: boolean } }) =>
        member.accountId === selectedUser.accountId,
    );
    if (!isMemberAlreadyAdded) {
      const newMember = { ...selectedUser, jobs: { FRONT_END: false, BACK_END: false, INFRA: false, DESIGNER: false } };
      updateFormData({
        ...formData,
        members: [...formData.members, newMember],
      });
    }
    setIsDropdownVisible(false);
  };

  // 추가된 팀원 목록에서 팀원 삭제
  const handleRemoveClick =
    (selectedUser: { accountId: number; email: string; nickname: string; jobs: { [key: string]: boolean } }) => () => {
      setSearchValue('');
      updateFormData({
        ...formData,
        members: formData.members.filter(
          (member: { accountId: number; email: string; nickname: string; jobs: { [key: string]: boolean } }) =>
            member.accountId !== selectedUser.accountId,
        ),
      });

      setIsDropdownVisible(false);
    };

  return (
    <S.ProjectCreationFormWrapper>
      {/* 프로젝트 이름 */}
      <S.FormItem>
        <BaseLabelWithInput.Label labelFor="title">프로젝트 이름</BaseLabelWithInput.Label>
        <S.StyledInput
          id="title"
          type="text"
          value={formData.title}
          onChange={event => updateFormData({ ...formData, title: event.target.value })}
        />
      </S.FormItem>
      {/* 프로젝트 소개 */}
      <S.FormItem>
        <BaseLabelWithInput.Label labelFor="bio">프로젝트 소개</BaseLabelWithInput.Label>
        <S.StyledInput
          id="bio"
          type="text"
          value={formData.bio}
          onChange={event => updateFormData({ ...formData, bio: event.target.value })}
        />
      </S.FormItem>
      {/* 프로젝트 token */}
      <S.FormItem>
        <BaseLabelWithInput.Label labelFor="secretKey">
          <S.StyledLabel>
            Token
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <S.Icon $fillColor={PALETTE.LIGHT_BLACK} $strokeColor={PALETTE.MAIN_WHITE}>
                <Info size={12} />
              </S.Icon>
              <S.StyledText color={PALETTE.LIGHT_BLACK} fontSize={10}>
                repository의 read 권한이 있는 token을 등록해주세요.
              </S.StyledText>
            </div>
          </S.StyledLabel>
        </BaseLabelWithInput.Label>
        <S.InputContainer>
          <S.StyledInput
            $icon={true}
            id="secretKey"
            type="text"
            value={formData.secretKey}
            onChange={event => updateFormData({ ...formData, secretKey: event.target.value })}
          />
          <S.Icon $fillColor={PALETTE.LIGHT_BLACK} $position="absolute">
            <Git />
          </S.Icon>
        </S.InputContainer>
      </S.FormItem>
      {/* 팀원 */}
      <S.FormItem>
        <BaseLabelWithInput.Label labelFor="members">팀원 추가</BaseLabelWithInput.Label>
        <S.InputContainer ref={wrapperRef}>
          <S.StyledInput
            $icon={true}
            id="members"
            type="text"
            placeholder="팀원 이메일 검색"
            value={searchValue}
            onChange={handleInputChange}
          />
          <S.Icon $fillColor={PALETTE.MAIN_WHITE} $strokeColor={PALETTE.LIGHT_BLACK} $position="absolute">
            <Search size={18} />
          </S.Icon>
          {/* 팀원 이메일 검색 결과 */}
          {isDropdownVisible && searchValue.length > 0 && searchResults.length > 0 && (
            <S.SearchResultsDropdown>
              {searchResults.map(user => (
                <S.SearchResultItem key={user.accountId} onClick={handleResultClick(user)}>
                  <S.UserProfile>
                    <UserImg size="xs" path="https://via.placeholder.com/32x32" />
                    <S.UserInfo>
                      <S.StyledText fontSize={12}>{user.email}</S.StyledText>
                      <S.StyledText color={PALETTE.LIGHT_BLACK} fontSize={10}>
                        {user.nickname}
                      </S.StyledText>
                    </S.UserInfo>
                  </S.UserProfile>
                </S.SearchResultItem>
              ))}
            </S.SearchResultsDropdown>
          )}
        </S.InputContainer>
      </S.FormItem>
      {/* 추가된 팀원 목록*/}
      <S.Content>
        <S.MemberList>
          {/* 팀장은 기본으로 등록, 삭제 불가 */}
          <S.Row>
            <S.DeleteBtn $cursor={false}>
              <S.LeaderBadge>
                <S.StyledText color={PALETTE.MAIN_WHITE} fontSize={10}>
                  팀장
                </S.StyledText>
              </S.LeaderBadge>
            </S.DeleteBtn>

            <S.RowContent>
              <S.UserProfile>
                <UserImg size="xs" path={UIMG} />
                <S.UserInfo>
                  <S.StyledText fontSize={12}>jack@ssafy.com</S.StyledText>
                  <S.StyledText color={PALETTE.LIGHT_BLACK} fontSize={10}>
                    유잭건
                  </S.StyledText>
                </S.UserInfo>
              </S.UserProfile>

              <S.JobBadgeList>
                {jobs.map(job => (
                  <S.JobBadgeBtn
                    key={job}
                    onClick={() => toggleJobState(formData.members[0].accountId, job)}
                    $state={formData.members[0].jobs[job]}
                  >
                    <JobBadge
                      job={job}
                      selectAble={{
                        state: formData.members[0].jobs[job],
                        onClick: () => {},
                      }}
                    />
                  </S.JobBadgeBtn>
                ))}
              </S.JobBadgeList>
            </S.RowContent>
          </S.Row>

          {formData.members
            .slice(1)
            .map((user: { accountId: number; email: string; nickname: string; jobs: { [key: string]: boolean } }) => (
              <S.Row key={user.accountId}>
                <S.DeleteBtn $cursor={true} onClick={handleRemoveClick(user)}>
                  <MinusCircle color={PALETTE.LIGHT_BLACK} size={16} />
                </S.DeleteBtn>

                <S.RowContent>
                  <S.UserProfile>
                    <UserImg size="xs" path="https://via.placeholder.com/32x32" />
                    <S.UserInfo>
                      <S.StyledText fontSize={12}>{user.email}</S.StyledText>
                      <S.StyledText color={PALETTE.LIGHT_BLACK} fontSize={10}>
                        {user.nickname}
                      </S.StyledText>
                    </S.UserInfo>
                  </S.UserProfile>
                  <S.JobBadgeList>
                    {jobs.map(job => (
                      <S.JobBadgeBtn
                        key={job}
                        onClick={() => toggleJobState(user.accountId, job)}
                        $state={user.jobs[job]}
                      >
                        <JobBadge
                          job={job}
                          selectAble={{
                            state: user.jobs[job],
                            onClick: () => {},
                          }}
                        />
                      </S.JobBadgeBtn>
                    ))}
                  </S.JobBadgeList>
                </S.RowContent>
              </S.Row>
            ))}
        </S.MemberList>
      </S.Content>
    </S.ProjectCreationFormWrapper>
  );
}
