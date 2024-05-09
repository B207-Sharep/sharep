import React, { useEffect } from 'react';
import * as S from './GalleryGridWrapperStyle';
import * as T from '@/types';
import * as Comp from '@/components';
import { PALETTE } from '@/styles';
import { Plus } from 'lucide-react';

export default function GalleryGridWrapper({ issueList, type }: T.GalleryGridWrapperProps) {
  const handleAddBtn = () => {
    console.log('add');
  };

  return (
    <S.Grid>
      <S.CardList>
        {issueList.map(issue => (
          <Comp.GalleryCard
            key={`issue-${issue.id}`}
            id={issue.id}
            issueName={issue.issueName}
            createdAt={issue.createdAt}
            type={type as 'SCREEN' | 'PRIVATE'}
            imageUrl={type === 'SCREEN' ? issue.imageUrl && issue.imageUrl : undefined}
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
