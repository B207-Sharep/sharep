import React from 'react';
import * as S from './GalleryCardStyle';
import * as T from '@/types';
import { PALETTE } from '@/styles';

export default function GalleryCard({ issueType, imageUrl, issueName, createdAt }: T.GalleryCardProps) {
  // content 결정 로직
  const getContent = () => {
    if (issueType === 'SCREEN') {
      // issueType이 SCREEN이면 이미지 URL을 반환
      return <S.Img src={imageUrl}></S.Img>;
    } else if (issueType === 'PRIVATE') {
      // issueType이 PRIVATE이면 컴포넌트를 반환
      return <TempComponent />;
    }
  };
  const TempComponent = () => (
    <div
      style={{
        width: '100%',
        height: '100%',
        border: '2px solid green',
        borderRadius: '3px 3px 0px 0px',
        padding: '10px',
      }}
    >
      임시 컴포넌트
    </div>
  );
  const content = getContent();
  return (
    <S.Card>
      <S.CardContent>{content}</S.CardContent>
      <S.CardText>
        <S.Text color={PALETTE.SUB_BLACK} fontWeight={700}>
          {issueName}
        </S.Text>
        <S.CardDate>
          <S.Text color={PALETTE.LIGHT_BLACK} fontSize={10}>
            수정된 날짜
          </S.Text>
          <S.Text color={PALETTE.LIGHT_BLACK} fontSize={10}>
            {createdAt}
          </S.Text>
        </S.CardDate>
      </S.CardText>
    </S.Card>
  );
}
