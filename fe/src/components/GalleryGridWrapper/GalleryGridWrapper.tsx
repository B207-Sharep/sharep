import React from 'react';
import * as S from './GalleryGridWrapperStyle';
import * as T from '@/types';
import GalleryCard from '../GalleryCard/GalleryCard';

export default function GalleryGridWrapper({}: T.GalleryGridWrapperProps) {
  return (
    <S.Grid>
      <div style={{ border: '1px solid pink', alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
        {/* issueType : SCREEN */}
        <S.CardList>
          {Array.from({ length: 7 }).map((_, index) => (
            <GalleryCard
              key={index}
              issueName="메인 페이지"
              createdAt="2024.04.15"
              issueType="SCREEN"
              imageUrl={issueType === 'SCREEN' ? `https://picsum.photos/id/${index}/300/200` : undefined}
            />
          ))}
        </S.CardList>
        <br />
        {/* issueType :  PRIVATE (for INFRA) */}
        <S.CardList>
          {Array.from({ length: 7 }).map((_, index) => (
            <GalleryCard key={index} issueName="docker 설정" createdAt="2024.04.15" issueType="PRIVATE" />
          ))}
        </S.CardList>
      </div>
    </S.Grid>
  );
}
