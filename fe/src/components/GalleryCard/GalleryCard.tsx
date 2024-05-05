import React from 'react';
import * as S from './GalleryCardStyle';
import * as T from '@/types';
import { PALETTE } from '@/styles';
import { useNavigate } from 'react-router-dom';

export default function GalleryCard({ issueId, issueName, createdAt, issueType, imageUrl }: T.GalleryCardProps) {
  const navigate = useNavigate();
  const handleCardClick = () => {
    if (issueType === 'SCREEN') {
      // TODO: projectId
      navigate(`/projects/1/screen-manual/${issueId}`);
    }
  };

  return (
    <S.Card className="hover-moving" onClick={handleCardClick}>
      <S.CardContent>
        {issueType === 'SCREEN' ? (
          <S.Img src={imageUrl}></S.Img>
        ) : (
          <S.PreviewContent>
            <div>임시 컴포넌트ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ??</div>
            <div>임시 컴포넌트</div>
          </S.PreviewContent>
        )}
      </S.CardContent>
      <S.CardText>
        <S.StyledText color={PALETTE.SUB_BLACK} fontWeight={700}>
          {issueName}
        </S.StyledText>
        <S.CardDate>
          <S.StyledText color={PALETTE.LIGHT_BLACK} fontSize={12}>
            수정된 날짜
          </S.StyledText>
          <S.StyledText color={PALETTE.LIGHT_BLACK} fontSize={12}>
            {createdAt}
          </S.StyledText>
        </S.CardDate>
      </S.CardText>
    </S.Card>
  );
}
