import React, { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { PALETTE } from '@/styles';
import * as S from './ProjectCreationFormStyle';
import * as T from '@/types';
import * as Comp from '@/components';
import * as API from '@/apis';
import { Info, MinusCircle, Search } from 'lucide-react';
import { modalDataState } from '@/stores/atoms/modal';
import { useModal } from '@/customhooks';
import { useQuery } from '@tanstack/react-query';

export default function ProjectCreationForm({ modalId }: Pick<T.ModalProps, 'modalId'>) {
  const { updateContentByKey, updateIsValid } = useModal<T.ProjectCreationFormProps>(modalId);
  const { contents } = useRecoilValue(modalDataState(modalId));
  const [searchValue, setSearchValue] = useState<string>('');

  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const {
    data: searchEmailResponse,
    isSuccess: searchEmailSuccess,
    isFetching: searchEmailFetching,
    refetch: searchEmailRefetch,
  } = useQuery({
    queryKey: [{ func: `search-by-email`, searchValue }],
    queryFn: () => API.project.searchUserByEmail({ email: searchValue }),
    enabled: !!searchValue,
    select: data => data.data,
  });

  useEffect(() => {
    if (searchEmailSuccess) {
      setIsDropdownVisible(true);
    }
  }, [searchEmailSuccess, searchEmailResponse]);

  // dropdown에 팀원 이메일 검색내역 불러오기
  useEffect(() => {
    if (searchValue) {
      searchEmailRefetch();
    }
  }, [searchValue, searchEmailRefetch]);

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
    const { id, value } = event.target;
    if (id === 'members') {
      setSearchValue(event.target.value);
    } else {
      updateContentByKey(id as keyof T.ProjectCreationFormProps, value);

      if (id == 'title') {
        updateIsValid(value.length > 0 && contents.bio.length > 0);
      }
      if (id == 'bio') {
        updateIsValid(value.length > 0 && contents.title.length > 0);
      }
    }
  };

  // 팀원 이메일 검색 내역 dropdown item 선택 했을 때, 중복 제외하고 선택된 팀원 추가
  const handleResultClick = (selectedUser: Omit<T.ProjectCreationFormProps['members'][number], 'roles'>) => () => {
    setSearchValue('');

    // 이미 추가된 팀원인지 체크
    const isMemberAlreadyAdded = contents.members.some(
      (member: T.ProjectCreationFormProps['members'][number]) => member.id === selectedUser.id,
    );
    if (!isMemberAlreadyAdded) {
      const newMember = {
        ...selectedUser,
        roles: { FRONT_END: false, BACK_END: false, INFRA: false, DESIGNER: false },
      };
      updateContentByKey('members', [...contents.members, newMember]);
    } else alert(`이미 추가된 팀원입니다`);
    setIsDropdownVisible(false);
  };

  // 추가된 팀원 목록에서 팀원 삭제
  const handleRemoveClick = (selectedUser: T.ProjectCreationFormProps['members'][number]) => () => {
    setSearchValue('');
    updateContentByKey(
      'members',
      contents.members.filter((member: T.ProjectCreationFormProps['members'][number]) => member.id !== selectedUser.id),
    );

    setIsDropdownVisible(false);
  };

  // 특정 Role의 선택 상태 토글
  const toggleRoleState = (id: number, role: T.RoleBadgeProps['role']) => {
    updateContentByKey(
      'members',
      contents.members.map((member: T.ProjectCreationFormProps['members'][number]) =>
        member.id === id
          ? {
              ...member,
              roles: {
                ...member.roles,
                [role]: !member.roles[role],
              },
            }
          : member,
      ),
    );
  };

  return (
    <S.Wrapper>
      {/* 프로젝트 이름 */}
      <S.FormItem>
        <Comp.InputWithLabel.Label labelFor="title">프로젝트 이름</Comp.InputWithLabel.Label>
        <S.StyledInput id="title" type="text" value={contents.title} onChange={handleInputChange} />
      </S.FormItem>
      {/* 프로젝트 소개 */}
      <S.FormItem>
        <Comp.InputWithLabel.Label labelFor="bio">프로젝트 소개</Comp.InputWithLabel.Label>
        <S.StyledInput id="bio" type="text" value={contents.bio} onChange={handleInputChange} />
      </S.FormItem>
      {/* 팀원 */}
      <S.FormItem>
        <Comp.InputWithLabel.Label labelFor="members">팀원 추가</Comp.InputWithLabel.Label>
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
          {isDropdownVisible && searchEmailSuccess && (
            <S.SearchResultsDropdown>
              {searchEmailResponse.map(user => (
                <S.SearchResultItem key={`search-user-${user.id}`} onClick={handleResultClick(user)}>
                  <S.UserProfile>
                    <Comp.UserImg size="sm" path={user.imageUrl} />
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
        <S.RoleInfo>
          <S.Icon $fillColor={PALETTE.LIGHT_BLACK} $strokeColor={PALETTE.MAIN_WHITE}>
            <Info size={12} />
          </S.Icon>
          <S.StyledText color={PALETTE.LIGHT_BLACK} fontSize={10}>
            4개의 직무 중 각 팀원의 역할을 선택해주세요.
          </S.StyledText>
        </S.RoleInfo>
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
                <Comp.UserImg size="sm" path={contents.members[0].imageUrl} />
                <S.UserInfo>
                  <S.StyledText fontSize={12}>{contents.members[0].email}</S.StyledText>
                  <S.StyledText color={PALETTE.LIGHT_BLACK} fontSize={10}>
                    {contents.members[0].nickname}
                  </S.StyledText>
                </S.UserInfo>
              </S.UserProfile>

              <S.RoleBadgeList>
                {roleList.map(role => (
                  <S.RoleBadgeBtn
                    key={`leader-role-${contents.members[0].id}-${role}`}
                    onClick={() => toggleRoleState(contents.members[0].id, role)}
                    $state={contents.members[0].roles[role]}
                  >
                    <Comp.RoleBadge
                      role={role}
                      selectAble={{
                        state: contents.members[0].roles[role],
                        onClick: () => {},
                      }}
                    />
                  </S.RoleBadgeBtn>
                ))}
              </S.RoleBadgeList>
            </S.RowContent>
          </S.Row>

          {contents.members.slice(1).map((member: T.ProjectCreationFormProps['members'][number]) => (
            <S.Row key={`member-${member.id}`}>
              <S.DeleteBtn $cursor={true} onClick={handleRemoveClick(member)}>
                <MinusCircle color={PALETTE.MAIN_RED} size={16} />
              </S.DeleteBtn>

              <S.RowContent>
                <S.UserProfile>
                  <Comp.UserImg size="sm" path={member.imageUrl} />
                  <S.UserInfo>
                    <S.StyledText fontSize={12}>{member.email}</S.StyledText>
                    <S.StyledText color={PALETTE.LIGHT_BLACK} fontSize={10}>
                      {member.nickname}
                    </S.StyledText>
                  </S.UserInfo>
                </S.UserProfile>
                <S.RoleBadgeList>
                  {roleList.map(role => (
                    <S.RoleBadgeBtn
                      key={`member-role-${member.id}-${role}`}
                      onClick={() => toggleRoleState(member.id, role)}
                      $state={member.roles[role]}
                    >
                      <Comp.RoleBadge
                        role={role}
                        selectAble={{
                          state: member.roles[role],
                          onClick: () => {},
                        }}
                      />
                    </S.RoleBadgeBtn>
                  ))}
                </S.RoleBadgeList>
              </S.RowContent>
            </S.Row>
          ))}
        </S.MemberList>
      </S.Content>
    </S.Wrapper>
  );
}

const roleList = ['FRONT_END' as 'FRONT_END', 'BACK_END' as 'BACK_END', 'INFRA' as 'INFRA', 'DESIGNER' as 'DESIGNER'];
