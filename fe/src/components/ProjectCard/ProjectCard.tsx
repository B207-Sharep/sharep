import React from 'react';
import * as S from './ProjectCardStyle';
import * as T from '@/types';
import { PALETTE } from '@/styles';
import { UserImg } from '..';

export default function ProjectCard({ id, title, bio, imgs, createdAt }: T.ProjectCardProps) {
  return (
    <S.Card className="hover-moving">
      <S.CardTextWrapper>
        <S.StyledText color={PALETTE.SUB_BLACK} fontWeight={700} fontSize={20}>
          {title}
        </S.StyledText>
        <S.StyledText color={PALETTE.LIGHT_BLACK} fontWeight={500} fontSize={14}>
          {bio}
        </S.StyledText>
      </S.CardTextWrapper>
      <S.ImgWrapper>
        {imgs.map((img, idx) => (
          <UserImg size="sm" path={img} />
        ))}
      </S.ImgWrapper>
    </S.Card>
  );
}
