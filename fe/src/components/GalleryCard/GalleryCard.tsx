import React from 'react';
import * as S from './GalleryCardStyle';
import * as T from '@/types';
import { PALETTE } from '@/styles';

export default function GalleryCard({ issueName, createdAt, issueType, imageUrl }: T.GalleryCardProps) {
  return (
    <S.Card className="hover-moving">
      <S.CardContent>
        {issueType === 'SCREEN' ? (
          <S.Img src={imageUrl}></S.Img>
        ) : (
          <S.PreviewContent>
            <div>임시 컴포넌트ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ</div>
            <div>임시 컴포넌트</div>
          </S.PreviewContent>
        )}
      </S.CardContent>
      <S.CardText>
        <S.StyledText color={PALETTE.SUB_BLACK} fontWeight={700}>
          {issueName}
        </S.StyledText>
        <S.CardDate>
          <S.StyledText color={PALETTE.LIGHT_BLACK} fontSize={10}>
            수정된 날짜
          </S.StyledText>
          <S.StyledText color={PALETTE.LIGHT_BLACK} fontSize={10}>
            {createdAt}
          </S.StyledText>
        </S.CardDate>
      </S.CardText>
    </S.Card>
  );
}
