import React from 'react';
import * as S from './InfraTaskCreationFormStyle';
import * as T from '@/types/components/Modal';
import * as Comp from '@/components';
import { PALETTE } from '@/styles';
import { useModal } from '@/customhooks';
import { useRecoilValue } from 'recoil';
import { modalDataState } from '@/stores/atoms/modal';
import { Plus, X } from 'lucide-react';

// const jobList = ['FRONT_END' as 'FRONT_END', 'BACK_END' as 'BACK_END', 'INFRA' as 'INFRA', 'DESIGNER' as 'DESIGNER'];

const dummyUsers: {
  accountId: number;
  nickname: string;
  jobs: ('FRONT_END' | 'BACK_END' | 'INFRA' | 'DESIGNER')[];
  userImageUrl?: string;
}[] = [
  {
    accountId: 1,
    nickname: '김성제',
    jobs: ['FRONT_END', 'BACK_END'],
  },
  {
    accountId: 2,
    nickname: '오상훈',
    jobs: ['INFRA', 'BACK_END'],
    userImageUrl: 'https://xsgames.co/randomusers/assets/avatars/pixel/1.jpg',
  },
  {
    accountId: 3,
    nickname: '오상훈',
    jobs: ['INFRA', 'BACK_END'],
    userImageUrl: 'https://xsgames.co/randomusers/assets/avatars/pixel/1.jpg',
  },
  {
    accountId: 4,
    nickname: '오상훈',
    jobs: ['INFRA', 'BACK_END'],
    userImageUrl: 'https://xsgames.co/randomusers/assets/avatars/pixel/1.jpg',
  },
];
export default function InfraTaskCreationForm({ modalId }: T.ProjectCreationFormProps) {
  const { updateContents } = useModal<{
    // TODO:
  }>(modalId);
  const modalData = useRecoilValue(modalDataState(modalId));
  const { contents } = modalData;

  return (
    <S.Wrapper>
      <S.FormItem>
        <Comp.InputWithLabel.Label labelFor="name">작업명</Comp.InputWithLabel.Label>
        <S.StyledInput
          id="name"
          type="text"
          value={contents.name}
          onChange={event => updateContents({ ...contents, name: event.target.value })}
        />
      </S.FormItem>
      <S.FormItem>
        <S.StyledText fontSize={16} fontWeight={400}>
          알림
        </S.StyledText>
        <S.NotiContainer>
          {dummyUsers.map(user => (
            <S.NotiUser>
              <S.CommitUserInfo>
                <Comp.UserImg size="sm" path={user.userImageUrl || 'https://via.placeholder.com/16x16'} />
                <S.StyledText color={PALETTE.LIGHT_BLACK} fontSize={12}>
                  {user.nickname}
                </S.StyledText>
                <S.JobBadgeList>
                  {user.jobs.map((job, index) => (
                    <Comp.JobBadge key={index} job={job} selectAble={false} />
                  ))}
                </S.JobBadgeList>
              </S.CommitUserInfo>
              <S.DeleteBtn>
                <X size={10} color={PALETTE.SUB_BLACK} />
              </S.DeleteBtn>
            </S.NotiUser>
          ))}
          <S.AddUserBtn>
            <Plus size={10} color={PALETTE.SUB_BLACK} />
          </S.AddUserBtn>
        </S.NotiContainer>
      </S.FormItem>

      <S.EditorWrapper>
        <Comp.QuillEditor
          width="100%"
          height="400px"
          value={contents.description}
          hiddenTooltip={false}
          stateSetter={(newDescription: React.SetStateAction<string>) =>
            updateContents({ ...contents, description: newDescription })
          }
          placeholder="내용을 입력하세요."
        />
      </S.EditorWrapper>
    </S.Wrapper>
  );
}
