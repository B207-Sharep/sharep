import React from 'react';
import * as S from './GalleryGridWrapperStyle';
import GalleryCard from '../GalleryCard/GalleryCard';
import { GalleryGridWrapperProps } from '@/types/components/GalleryGridWrapper';
import { PALETTE } from '@/styles';
import { Plus } from 'lucide-react';

export default function GalleryGridWrapper({ issueList }: GalleryGridWrapperProps) {
  const handleAddBtn = () => {
    console.log('add');
  };

  return (
    <S.Grid>
      <S.CardList>
        {issueList.map((issue, index) => (
          <GalleryCard
            key={index}
            issueId={issue.issueId}
            issueName={issue.issueName}
            createdAt={issue.createdAt}
            issueType={issue.issueType as 'SCREEN' | 'PRIVATE'}
            imageUrl={issue.issueType === 'SCREEN' ? `https://picsum.photos/id/${index}/300/200` : undefined}
          />
        ))}
        <S.CardAddBtn className="hover-moving" onClick={handleAddBtn}>
          <S.TextContainer>
            <Plus size={16} />
            <S.StyledText color={PALETTE.LIGHT_BLACK} fontSize={16}>
              새로 만들기
            </S.StyledText>
          </S.TextContainer>
        </S.CardAddBtn>
      </S.CardList>
    </S.Grid>
  );
}
