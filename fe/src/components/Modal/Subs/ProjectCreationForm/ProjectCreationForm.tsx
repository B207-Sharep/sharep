import React, { useState } from 'react';
import BaseLabelWithInput from '@/components/InputWithLabel/InputWithLabel';
import { PALETTE } from '@/styles';
import * as T from '@/types/components/ProjectCreationForm';
import * as S from './ProjectCreationFormStyle';
import { Info, Search } from 'lucide-react';
import Git from '@/assets/svgs/git-icon.svg?react';

const dummyResults = [
  {
    accountId: 1,
    email: 'ssafy1234@ssafy.com',
    nickname: '사용자1',
  },
  // { accountId: 2, email: 'ssafy5678@ssafy.com', nickname: '사용자2' },
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

  return (
    <S.ProjectCreationFormWrapper>
      {/* 프로젝트 이름 */}
      <S.StyledLabel labelFor="title">프로젝트 이름</S.StyledLabel>
      <S.StyledInput
        id="title"
        type="text"
        value={formData.title}
        onChange={event => setFormData({ ...formData, title: event.target.value })}
      />
      {/* 프로젝트 소개 */}
      <S.StyledLabel labelFor="bio">프로젝트 소개</S.StyledLabel>
      <S.StyledInput
        id="bio"
        type="text"
        value={formData.bio}
        onChange={event => setFormData({ ...formData, bio: event.target.value })}
      />
      {/* 프로젝트 token */}
      <S.StyledLabel labelFor="secretKey">
        <S.Label>
          Token
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <S.Icon $fillColor={PALETTE.LIGHT_BLACK} $strokeColor={PALETTE.MAIN_WHITE}>
              <Info size={12} />
            </S.Icon>
            <S.Text color={PALETTE.LIGHT_BLACK} fontSize={10}>
              repository의 read 권한이 있는 token을 등록해주세요.
            </S.Text>
          </div>
        </S.Label>
      </S.StyledLabel>
      <S.StyledInput
        id="secretKey"
        type="text"
        value={formData.secretKey}
        onChange={event => setFormData({ ...formData, secretKey: event.target.value })}
      />
    </S.ProjectCreationFormWrapper>
  );
}
