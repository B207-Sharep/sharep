import React from 'react';
import * as S from './GalleryCardStyle';
import * as T from '@/types';
import { PALETTE } from '@/styles';
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

export default function GalleryCard({ id, issueName, createdAt, type, imageUrl }: T.GalleryCardProps) {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const handleCardClick = () => {
    if (type === 'SCREEN') {
      navigate(`/projects/${projectId}/screen-manual/${id}`);
    }
  };

  return (
    <S.Card className="hover-moving" onClick={handleCardClick}>
      <S.CardContent>
        {type === 'SCREEN' ? (
          <>
            {imageUrl ? (
              <S.Img src={imageUrl}></S.Img>
            ) : (
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: PALETTE.MAIN_BACKGROUND,
                }}
              ></div>
            )}
          </>
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
            {dayjs(createdAt).locale('ko').fromNow()}
          </S.StyledText>
        </S.CardDate>
      </S.CardText>
    </S.Card>
  );
}
