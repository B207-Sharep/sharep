import React from 'react';
import * as S from './ProjectCardStyle';
import * as T from '@/types';
import { PALETTE } from '@/styles';
import { UserImg } from '..';
import { Plus } from 'lucide-react';

export default function ProjectCard({ id, title, bio, imgs, createdAt, add }: T.ProjectCardProps) {
  return (
    <S.Card className="hover-moving">
      <S.CardTextWrapper>
        <S.StyledText color={PALETTE.SUB_BLACK} fontWeight={700} fontSize={20} $add={add}>
          {title}
        </S.StyledText>
        {!add ? (
          <S.StyledText color={PALETTE.LIGHT_BLACK} fontWeight={500} fontSize={14}>
            {bio}
          </S.StyledText>
        ) : (
          <S.AddWrapper>
            <Plus size={18} color={PALETTE.LIGHT_BLACK} />
            <S.StyledText color={PALETTE.LIGHT_BLACK} fontWeight={500} fontSize={14}>
              {bio}
            </S.StyledText>
          </S.AddWrapper>
        )}
      </S.CardTextWrapper>
      {!add ? (
        <S.ImgWrapper>
          {imgs?.map((img, idx) => (
            <UserImg size="sm" path={img} key={idx} />
          ))}
        </S.ImgWrapper>
      ) : (
        <div style={{ width: '32px', height: '32px', visibility: 'hidden' }}>hello</div>
      )}
    </S.Card>
  );
}
