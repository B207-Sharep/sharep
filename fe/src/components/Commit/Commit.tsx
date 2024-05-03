import React, { useState } from 'react';
import * as S from './CommitStyle';
import * as T from '@/types';
import { PALETTE } from '@/styles';
import { ChevronDown } from 'lucide-react';
import RoleBadge from '../RoleBadge/RoleBadge';

export default function Commit({ description, nickname, createdAt, userImageUrl, roleList, imageUrl }: T.CommitProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isClickable = imageUrl !== undefined;

  return (
    <S.CommitWrapper>
      <S.CommitInfo $isClickable={isClickable} onClick={() => setIsOpen(!isOpen)}>
        {isClickable ? (
          <S.AccordionIconButton>
            <S.AccordionIcon $isOpen={isOpen}>
              <ChevronDown />
            </S.AccordionIcon>
          </S.AccordionIconButton>
        ) : (
          <div style={{ width: '24px', height: '24px' }}></div>
        )}
        <S.CommitContent>
          <S.CommitMessage>
            {/* 작업 메시지 */}
            <S.StyledText color={PALETTE.SUB_BLACK} fontWeight={500}>
              {description}
            </S.StyledText>
            {/* 유저 정보 + 작업 완료 시간 */}
            <S.CommitUserInfo>
              <S.Img width={16} height={16} radius={8} src={userImageUrl || 'https://via.placeholder.com/16x16'} />
              <S.StyledText color={PALETTE.LIGHT_BLACK} fontSize={12}>
                {nickname}
              </S.StyledText>
              <S.RoleBadgeList>
                {roleList.map((role, index) => (
                  <RoleBadge
                    key={index}
                    role={role as 'FRONT_END' | 'BACK_END' | 'INFRA' | 'DESIGNER'}
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
        <S.CommitImageDetail>
          <S.Img width={800} height={600} radius={0} src={imageUrl} />
        </S.CommitImageDetail>
      )}
    </S.CommitWrapper>
  );
}
