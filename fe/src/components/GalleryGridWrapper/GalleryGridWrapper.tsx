import React from 'react';
import * as S from './GalleryGridWrapperStyle';
import GalleryCard from '../GalleryCard/GalleryCard';
import { GalleryGridWrapperProps } from '@/types/components/GalleryGridWrapper';

export default function GalleryGridWrapper({ issueList }: GalleryGridWrapperProps) {
  return (
    <S.Grid>
      <S.CardList>
        {issueList.map((issue, index) => (
          <GalleryCard
            key={index}
            issueName={issue.issueName}
            createdAt={issue.createdAt}
            issueType={issue.issueType as 'SCREEN' | 'PRIVATE'}
            imageUrl={issue.issueType === 'SCREEN' ? `https://picsum.photos/id/${index}/300/200` : undefined}
          />
        ))}
      </S.CardList>
    </S.Grid>
  );
}
