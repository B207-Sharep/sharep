import React, { useState } from 'react';
import * as S from './CommitStyle';
import * as T from '@/types';
import * as Comp from '@/components';
import { PALETTE } from '@/styles';
import { ChevronDown } from 'lucide-react';

export default function Commit({
  name,
  description,
  createdAt,
  imageUrl,
  // issueId,
  member: {
    // memberId,
    nickname,
    role,
    userImageUrl,
  },
}: T.CommitProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isClickable = imageUrl !== undefined;

  return (
    <S.CommitWrapper>
      <S.CommitInfo $isClickable={isClickable} onClick={() => setIsOpen(!isOpen)}>
        {isClickable ? (
          <S.AccordionIconButton>
            <S.AccordionIcon $isOpen={isOpen}>
              <ChevronDown color={PALETTE.LIGHT_BLACK} />
            </S.AccordionIcon>
          </S.AccordionIconButton>
        ) : (
          <div style={{ width: '24px', height: '24px' }}></div>
        )}
        <S.CommitContent>
          <S.CommitMessage>
            {/* 작업 메시지 */}
            <S.StyledText color={PALETTE.SUB_BLACK} fontWeight={600}>
              {name}
            </S.StyledText>
            {/* 유저 정보 + 작업 완료 시간 */}
            <S.CommitUserInfo>
              <S.Img width={16} height={16} radius={8} src={userImageUrl || 'https://via.placeholder.com/16x16'} />
              <S.StyledText color={PALETTE.LIGHT_BLACK} fontSize={12}>
                {nickname}
              </S.StyledText>
              <S.RoleBadgeList>
                {role.map((_role, index) => (
                  <Comp.RoleBadge
                    key={index}
                    role={_role as 'FRONT_END' | 'BACK_END' | 'INFRA' | 'DESIGNER'}
                    selectAble={false}
                  />
                ))}
              </S.RoleBadgeList>
              <S.StyledText color={PALETTE.LIGHT_BLACK} fontSize={10}>
                작업 완료
              </S.StyledText>
              <S.StyledText color={PALETTE.LIGHT_BLACK} fontSize={10}>
                {createdAt}
              </S.StyledText>
            </S.CommitUserInfo>
          </S.CommitMessage>
        </S.CommitContent>
        {isClickable && <S.Img width={60} height={60} radius={10} src={imageUrl} />}
      </S.CommitInfo>
      {isClickable && isOpen && (
        // TODO :작업명, 작업 설명 스타일 적용
        <>
          <div>{name}</div>
          <div>{description}</div>
          <S.CommitImageDetail>
            <S.Img width={800} height={600} radius={0} src={imageUrl} />
          </S.CommitImageDetail>
        </>
      )}
    </S.CommitWrapper>
  );
}
