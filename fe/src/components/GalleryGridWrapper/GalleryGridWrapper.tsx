import React, { useState } from 'react';
import * as S from './GalleryGridWrapperStyle';
import * as T from '@/types';
import * as Comp from '@/components';
import * as API from '@/apis';
import { PALETTE } from '@/styles';
import { Plus } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export default function GalleryGridWrapper({ issueList, type }: T.GalleryGridWrapperProps) {
  const [createNewCard, setCreateNewCard] = useState<boolean>(false);
  const [newIssueName, setNewIssueName] = useState<string>('');
  const { projectId } = useParams();
  const queryClient = useQueryClient();

  const createNewIssueMutation = useMutation({
    mutationKey: [{ func: `create-new-issue`, projectId }],
    mutationFn: API.project.createNewIssue,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [{ func: `get-screen-issues`, projectId }] });
    },
  });

  const handleAddBtn = () => {
    console.log('add');
    setCreateNewCard(true);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewIssueName(event.target.value);
  };

  const handleInputEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      createNewIssueMutation.mutate(
        {
          projectId: Number(projectId),
          newIssue: { issueName: newIssueName, type },
        },
        {
          onSuccess: () => {
            setCreateNewCard(false);
            setNewIssueName('');
          },
          onError: error => {
            console.log(error);
          },
        },
      );
    } else if (event.key === 'Escape') {
      setCreateNewCard(false);
      setNewIssueName('');
    }
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
            type={type}
            imageUrl={type === 'SCREEN' && issue.jobs.length > 0 ? issue.jobs[0].imageUrl : undefined}
          />
        ))}

        {createNewCard ? (
          <S.Card className="hover-moving" style={{ border: `1px solid ${PALETTE.MAIN_COLOR}` }}>
            <S.CardContent>{type === 'SCREEN' ? <S.DefaultImage /> : <S.PreviewContent />}</S.CardContent>
            <S.CardText>
              <S.NewCardInput
                type="text"
                value={newIssueName}
                onChange={handleInputChange}
                onKeyDown={handleInputEnter}
                autoFocus
              />
            </S.CardText>
          </S.Card>
        ) : (
          <S.Card className="hover-moving">
            <S.CardAddBtn onClick={handleAddBtn}>
              <S.TextContainer>
                <Plus size={16} />
                <S.StyledText color={PALETTE.LIGHT_BLACK} fontSize={16}>
                  새로 만들기
                </S.StyledText>
              </S.TextContainer>
            </S.CardAddBtn>
          </S.Card>
        )}
      </S.CardList>
    </S.Grid>
  );
}
