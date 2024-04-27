import React from 'react';
import * as S from './GalleryGridWrapperStyle';
import GalleryCard from '../GalleryCard/GalleryCard';

const issueList = [
  ...Array.from({ length: 7 }, (_, index) => ({
    issueName: `${index + 1} 페이지`,
    createdAt: '2024.04.27',
    issueType: 'SCREEN',
  })),
  ...Array.from({ length: 7 }, (_, index) => ({
    issueName: `${index + 1} 페이지`,
    createdAt: '2024.04.27',
    issueType: 'PRIVATE',
  })),
].map(issue => ({
  ...issue,
  issueType: issue.issueType as 'SCREEN' | 'PRIVATE',
}));

export default function GalleryGridWrapper() {
  return (
    <S.Grid>
      <S.CardList>
        {issueList.map((issue, index) => (
          <GalleryCard
            key={index}
            issueName={issue.issueName}
            createdAt={issue.createdAt}
            issueType={issue.issueType}
            imageUrl={issue.issueType === 'SCREEN' ? `https://picsum.photos/id/${index}/300/200` : undefined}
          />
        ))}
      </S.CardList>
    </S.Grid>
  );
}
