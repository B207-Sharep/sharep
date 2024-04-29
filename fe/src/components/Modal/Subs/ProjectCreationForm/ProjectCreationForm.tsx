import React, { useState } from 'react';
import BaseLabelWithInput from '@/components/InputWithLabel/InputWithLabel';
import { PALETTE } from '@/styles';
import * as S from './ProjectCreationFormStyle';
import { Check, Info, Search } from 'lucide-react';
import Git from '@/assets/svgs/git-icon.svg?react';
import { JobBadge } from '@/components';

const dummyResults = [
  {
    accountId: 1,
    email: 'ssafy1234@ssafy.com',
    nickname: '사용자1',
  },
  { accountId: 2, email: 'ssafy5678@ssafy.com', nickname: '사용자2' },
  // { accountId: 3, email: "ssafy1234@ssafy.com",nickname: '사용자1' },
  // { accountId: 4, email: "ssafy5678@ssafy.com",nickname: '사용자2' },
  // { accountId: 5, email: "ssafy5678@ssafy.com",nickname: '사용자2' },
  // { accountId: 6, email: "ssafy5678@ssafy.com",nickname: '사용자2' },
  // { accountId: 7, email: "ssafy1234@ssafy.com", nickname: '사용자1' },
  // { accountId: 8, email: "ssafy1234@ssafy.com", nickname: '사용자1' },
];

export default function ProjectCreationForm() {
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState(dummyResults);
  const [formData, setFormData] = useState({
    title: '',
    bio: '',
    secretKey: '',
    members: [], // 팀원 리스트
  });
  const [isSelected, setIsSelected] = useState(false);

  // 클릭 시 선택 상태를 토글
  const handleClick = () => {
    setIsSelected(!isSelected);
  };

  // 선택된 상태에 따라 배경색과 글자색을 변경
  const bgColor = isSelected ? initialFontColor : initialBgColor;
  const f;
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
        <S.InputContainer>
          <S.StyledInput
            $icon={true}
            id="members"
            type="text"
            placeholder="팀원 이메일 검색"
            value={searchValue}
            onChange={event => setSearchValue(event.target.value)}
          />
          <S.Icon $fillColor={PALETTE.MAIN_WHITE} $strokeColor={PALETTE.LIGHT_BLACK} $position="absolute">
            <Search size={18} />
          </S.Icon>
          {/* 팀원 이메일 검색 결과 */}
          {searchValue.length > 0 && searchResults.length > 0 && (
            <S.SearchResultsDropdown>
              {searchResults.map(user => (
                <S.SearchResultItem key={user.accountId}>{user.nickname}</S.SearchResultItem>
              ))}
            </S.SearchResultsDropdown>
          )}
        </S.InputContainer>
        <div style={{ height: '300px', border: '1px solid red' }}>
          <div
            className="Content"
            style={{
              width: 592,
              height: 321,
              paddingLeft: 12,
              paddingRight: 12,
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              gap: 20,
              display: 'inline-flex',
            }}
          >
            <div
              className="Users"
              style={{
                alignSelf: 'stretch',
                height: 321,
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                gap: 6,
                display: 'flex',
              }}
            >
              <div
                className="Frame17571"
                style={{
                  alignSelf: 'stretch',
                  height: 300,
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  gap: 12,
                  display: 'flex',
                }}
              >
                <S.Row>
                  <div
                    className="Content"
                    style={{ justifyContent: 'flex-start', alignItems: 'center', gap: 11, display: 'flex' }}
                  >
                    <div
                      className="AvatarLabelGroup"
                      style={{ justifyContent: 'flex-start', alignItems: 'center', gap: 12, display: 'flex' }}
                    >
                      <div
                        className="Frame17491"
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: 99999,
                          overflow: 'hidden',
                          border: '1px #636C76 solid',
                          justifyContent: 'center',
                          alignItems: 'center',
                          gap: 10,
                          display: 'flex',
                        }}
                      >
                        <img style={{ flex: '1 1 0', alignSelf: 'stretch' }} src="https://via.placeholder.com/32x32" />
                      </div>
                      <div
                        className="TextAndSupportingText"
                        style={{
                          flexDirection: 'column',
                          justifyContent: 'flex-start',
                          alignItems: 'flex-start',
                          display: 'inline-flex',
                        }}
                      >
                        <S.StyledText color={PALETTE.SUB_BLACK} fontWeight={600}>
                          임서정
                        </S.StyledText>
                        <S.StyledText color={PALETTE.LIGHT_BLACK}>@sj</S.StyledText>
                      </div>
                    </div>
                  </div>
                  <S.JobBadgeButton job="FRONT_END" $fontColor="#E6FCF4" $bgColor="#000000" />
                  <div onClick={handleClick}>
                    <JobBadge job={job} style={{ backgroundColor: bgColor, color: fontColor }} />
                  </div>
                </S.Row>
              </div>
            </div>
          </div>
        </div>
      </S.FormItem>
    </S.ProjectCreationFormWrapper>
  );
}
