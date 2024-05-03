import React, { useEffect, useRef, useState } from 'react';
import * as S from './InfraTaskCreationFormStyle';
import * as T from '@/types/components/Modal';
import * as Comp from '@/components';
import { PALETTE } from '@/styles';
import { useModal } from '@/customhooks';
import { useRecoilValue } from 'recoil';
import { modalDataState } from '@/stores/atoms/modal';
import { Plus, X } from 'lucide-react';

const dummyUsers: {
  accountId: number;
  nickname: string;
  jobs: ('FRONT_END' | 'BACK_END' | 'INFRA' | 'DESIGNER')[];
  userImageUrl?: string;
}[] = [
  {
    accountId: 1,
    nickname: '임서정',
    jobs: ['FRONT_END', 'DESIGNER'],
  },
  {
    accountId: 2,
    nickname: '오상훈',
    jobs: ['INFRA', 'BACK_END'],
    userImageUrl: 'https://xsgames.co/randomusers/assets/avatars/pixel/1.jpg',
  },
  {
    accountId: 3,
    nickname: '조성규',
    jobs: ['FRONT_END', 'BACK_END'],
    userImageUrl: 'https://xsgames.co/randomusers/assets/avatars/pixel/2.jpg',
  },
  {
    accountId: 4,
    nickname: '김성제',
    jobs: ['INFRA', 'BACK_END'],
    userImageUrl: 'https://xsgames.co/randomusers/assets/avatars/pixel/3.jpg',
  },
];

export default function InfraTaskCreationForm({ modalId }: T.ProjectCreationFormProps) {
  const { updateContentByKey } = useModal<{
    name: string;
    notiUsers: {
      accountId: number;
      nickname: string;
      jobs: ('FRONT_END' | 'BACK_END' | 'INFRA' | 'DESIGNER')[];
      userImageUrl?: string;
    }[];
    description: string;
  }>(modalId);
  const modalData = useRecoilValue(modalDataState(modalId));
  const { contents } = modalData;
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState('left');
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const notiContainerRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleAddNotiUser = (userToAdd: {
    accountId: number;
    nickname: string;
    jobs: ('FRONT_END' | 'BACK_END' | 'INFRA' | 'DESIGNER')[];
    userImageUrl?: string;
  }) => {
    const isAlreadyAdded = contents.notiUsers.some(
      (user: {
        accountId: number;
        nickname: string;
        jobs: ('FRONT_END' | 'BACK_END' | 'INFRA' | 'DESIGNER')[];
        userImageUrl?: string;
      }) => user.accountId === userToAdd.accountId,
    );

    if (!isAlreadyAdded) {
      updateContentByKey('notiUsers', [...contents.notiUsers, userToAdd]);
    }
  };

  // 화면의 크기에 따라서 dropdown의 위치 동적으로 조정
  useEffect(() => {
    const handleResize = () => {
      if (dropdownRef.current && notiContainerRef.current) {
        const dropdownChildren = dropdownRef.current.children;
        let maxWidth = 0;

        Array.from(dropdownChildren).forEach(child => {
          const rect = child.getBoundingClientRect();
          maxWidth = Math.max(maxWidth, rect.width);
        });

        const dropdownRect = dropdownRef.current.getBoundingClientRect();
        const notiContainerRect = notiContainerRef.current.getBoundingClientRect();

        if (dropdownRect.right + maxWidth < notiContainerRect.right) {
          setDropdownPosition('left');
        } else {
          setDropdownPosition('right');
        }
      }
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [dropdownRef, notiContainerRef]);

  // dropdown 외 다른 컴포넌트 클릭시 dropdown 안 보이게 설정
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownVisible(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <S.Wrapper>
      <S.FormItem>
        <Comp.InputWithLabel.Label labelFor="name">작업명</Comp.InputWithLabel.Label>
        <S.StyledInput
          id="name"
          type="text"
          value={contents.name}
          onChange={event => updateContentByKey('name', event.target.value)}
        />
      </S.FormItem>
      <S.FormItem>
        <S.StyledText fontSize={16} fontWeight={400}>
          알림
        </S.StyledText>
        <S.NotiContainer ref={notiContainerRef}>
          {contents.notiUsers.map(
            (user: {
              accountId: number;
              nickname: string;
              jobs: ('FRONT_END' | 'BACK_END' | 'INFRA' | 'DESIGNER')[];
              userImageUrl?: string;
            }) => (
              <S.NotiUser key={user.accountId}>
                <S.UserInfo>
                  <Comp.UserImg size="sm" path={user.userImageUrl || 'https://via.placeholder.com/16x16'} />
                  <S.StyledText color={PALETTE.LIGHT_BLACK} fontSize={12}>
                    {user.nickname}
                  </S.StyledText>
                  <S.JobBadgeList>
                    {user.jobs.map((job, index) => (
                      <Comp.JobBadge key={index} job={job} selectAble={false} />
                    ))}
                  </S.JobBadgeList>
                </S.UserInfo>
                <S.DeleteBtn>
                  <X size={10} color={PALETTE.SUB_BLACK} />
                </S.DeleteBtn>
              </S.NotiUser>
            ),
          )}
          <S.AddUserBtn ref={dropdownRef} onClick={toggleDropdown}>
            <Plus size={10} color={PALETTE.SUB_BLACK} />
            <S.Dropdown $isDropdownVisible={isDropdownVisible} $dropdownPosition={dropdownPosition}>
              {dummyUsers.map(user => (
                <S.DropdowntItem key={user.accountId} onClick={() => handleAddNotiUser(user)}>
                  <S.UserInfo>
                    <S.UserProfile>
                      <Comp.UserImg size="sm" path={user.userImageUrl || 'https://via.placeholder.com/16x16'} />
                      <S.StyledText color={PALETTE.LIGHT_BLACK} fontSize={12}>
                        {user.nickname}
                      </S.StyledText>
                    </S.UserProfile>
                    <S.JobBadgeList>
                      {user.jobs.map((job, index) => (
                        <Comp.JobBadge
                          key={index}
                          job={job as 'FRONT_END' | 'BACK_END' | 'INFRA' | 'DESIGNER'}
                          selectAble={false}
                        />
                      ))}
                    </S.JobBadgeList>
                  </S.UserInfo>
                </S.DropdowntItem>
              ))}
            </S.Dropdown>
          </S.AddUserBtn>
        </S.NotiContainer>
      </S.FormItem>

      <S.EditorWrapper>
        <Comp.QuillEditor
          width="100%"
          height="400px"
          value={contents.description}
          hiddenTooltip={false}
          stateSetter={newDescriptionOrUpdater =>
            typeof newDescriptionOrUpdater === 'function'
              ? updateContentByKey('description', newDescriptionOrUpdater(contents.description))
              : updateContentByKey('description', newDescriptionOrUpdater)
          }
          placeholder="내용을 입력하세요."
        />
      </S.EditorWrapper>
    </S.Wrapper>
  );
}
