import React, { useState } from 'react';
import * as S from './CommitStyle';
import * as T from '@/types';
import { PALETTE } from '@/styles';
import { ChevronDown } from 'lucide-react';

export default function Commit({ description, nickname, createdAt, userImageUrl, imageUrl }: T.CommitProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <S.CommitWrapper>
      <S.CommitInfo>
        {imageUrl ? (
          <S.AccordionIconButton onClick={() => setIsOpen(!isOpen)}>
            <S.AccordionIcon isOpen={isOpen}>
              <ChevronDown />
            </S.AccordionIcon>
          </S.AccordionIconButton>
        ) : (
          <div style={{ width: '24px', height: '24px' }}></div>
        )}
        <S.CommitContent>
          <S.CommitMessage>
            <S.Text color={PALETTE.SUB_BLACK} fontWeight={500}>
              {description}
            </S.Text>
          </S.CommitMessage>
          <S.CommitUserInfo>
            <S.Img width={16} height={16} radius={8} src={userImageUrl || 'https://via.placeholder.com/16x16'} />
            <S.Text color={PALETTE.LIGHT_BLACK} fontSize={10}>
              {nickname}
            </S.Text>
            <S.JobBadgeList>
              {/* TODO */}
              {/* Job Badge */}
            </S.JobBadgeList>
            <S.Text color={PALETTE.LIGHT_BLACK} fontSize={10}>
              작업 완료
            </S.Text>
            <S.Text color={PALETTE.LIGHT_BLACK} fontSize={10}>
              {createdAt}
            </S.Text>
          </S.CommitUserInfo>
        </S.CommitContent>
        {imageUrl && <S.Img width={60} height={60} radius={10} src={imageUrl} />}
      </S.CommitInfo>
      {imageUrl && isOpen && (
        <S.CommitImageDetail>
          <S.Img width={800} height={600} radius={0} src={imageUrl} />
        </S.CommitImageDetail>
      )}
    </S.CommitWrapper>
  );
}
