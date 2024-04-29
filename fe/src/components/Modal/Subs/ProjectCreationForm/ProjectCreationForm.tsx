import React, { useEffect, useRef, useState } from 'react';
import BaseLabelWithInput from '@/components/InputWithLabel/InputWithLabel';
import { PALETTE } from '@/styles';
import * as S from './ProjectCreationFormStyle';
import { Info, MinusCircle, MinusIcon, Search } from 'lucide-react';
import Git from '@/assets/svgs/git-icon.svg?react';
import { JobBadge } from '@/components';
import UserImg from '../../../UserImg/UserImg';

type UserInfoProps = {
  accountId: number;
  email: string;
  nickname: string;
};

const dummyResults: UserInfoProps[] = [
  {
    accountId: 1,
    email: 'ssafy1234@ssafy.com',
    nickname: '사용자1',
  },
  { accountId: 2, email: 'ssafy5678@ssafy.com', nickname: '사용자2' },
  { accountId: 3, email: 'oh4@ssafy.com', nickname: '오상훈' },
  { accountId: 4, email: 'sj@ssafy.com', nickname: '임서정' },
  { accountId: 5, email: 'jo@ssafy.com', nickname: '조성규' },
  { accountId: 6, email: 'princess@ssafy.com', nickname: '김성제' },
  { accountId: 7, email: 'jack@ssafy.com', nickname: '유재건' },
  { accountId: 8, email: 'mehot@ssafy.com', nickname: '이승민' },
];

export default function ProjectCreationForm() {
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchResults, setSearchResults] = useState<UserInfoProps[]>([]);
  const [formData, setFormData] = useState<{ title: string; bio: string; secretKey: string; members: UserInfoProps[] }>(
    { title: '', bio: '', secretKey: '', members: [] },
  );
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    setSearchResults(dummyResults);
    setIsDropdownVisible(true);
  }, [searchValue]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsDropdownVisible(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleResultClick = (result: { accountId: number; email: string; nickname: string }) => () => {
    setSearchValue('');
    const isMemberAlreadyAdded = formData.members.some(member => member.accountId === result.accountId);
    if (!isMemberAlreadyAdded) {
      setFormData({
        ...formData,
        members: [...formData.members, result],
      });
    }
    setIsDropdownVisible(false);
  };

  const handleRemoveClick = (result: { accountId: number; email: string; nickname: string }) => () => {
    setSearchValue('');
    setFormData({
      ...formData,
      members: formData.members.filter(member => member.accountId !== result.accountId),
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
          onChange={event => setFormData({ ...formData, title: event.target.value })}
        />
      </S.FormItem>
      {/* 프로젝트 소개 */}
      <S.FormItem>
        <BaseLabelWithInput.Label labelFor="bio">프로젝트 소개</BaseLabelWithInput.Label>
        <S.StyledInput
          id="bio"
          type="text"
          value={formData.bio}
          onChange={event => setFormData({ ...formData, bio: event.target.value })}
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
            onChange={event => setFormData({ ...formData, secretKey: event.target.value })}
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

        {/* 추가된 팀원 목록*/}
        <S.Content>
          <S.MemberList>
            {formData.members.map(user => (
              <S.Row key={user.accountId}>
                <S.UserProfile>
                  <S.DeleteBtn onClick={handleRemoveClick(user)}>
                    <MinusCircle color={PALETTE.LIGHT_BLACK} size={16} />
                  </S.DeleteBtn>
                  <UserImg size="xs" path="https://via.placeholder.com/32x32" />
                  <S.UserInfo>
                    <S.StyledText fontSize={12}>{user.email}</S.StyledText>
                    <S.StyledText color={PALETTE.LIGHT_BLACK} fontSize={10}>
                      {user.nickname}
                    </S.StyledText>
                  </S.UserInfo>
                </S.UserProfile>
                {/* TODO: button으로 변경 */}
                <S.JobBadgeList>
                  <JobBadge job="FRONT_END" />
                  <JobBadge job="BACK_END" />
                  <JobBadge job="INFRA" />
                  <JobBadge job="DESIGNER" />
                </S.JobBadgeList>
              </S.Row>
            ))}
          </S.MemberList>
        </S.Content>
      </S.FormItem>
    </S.ProjectCreationFormWrapper>
  );
}
