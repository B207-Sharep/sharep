import React, { useState } from 'react';
import * as S from './GalleryCardStyle';
import * as T from '@/types';
import * as API from '@/apis';
import { PALETTE } from '@/styles';
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { Edit, Trash2 } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function GalleryCard({ issue, type }: T.GalleryCardProps) {
  const queryClient = useQueryClient();
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [editCard, setEditCard] = useState<boolean>(false);
  const [newIssueName, setNewIssueName] = useState<string>(issue.issueName);

  const updateIssueMutation = useMutation({
    mutationKey: [{ func: `update-issue`, projectId }],
    mutationFn: API.project.updateIssue,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [{ func: `get-screen-issues`, projectId }] });
    },
  });

  const deleteIssueMutation = useMutation({
    mutationKey: [{ func: `delete-issue`, projectId }],
    mutationFn: API.project.deleteIssue,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [{ func: `get-screen-issues`, projectId }] });
    },
  });

  const handleCardClick = () => {
    if (type === 'SCREEN') {
      navigate(`/projects/${projectId}/screen-manual/${issue.id}`);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewIssueName(event.target.value);
  };

  const handleCardAction = (event: 'edit' | 'delete') => () => {
    console.log(event);
    if (event === 'edit') {
      setEditCard(true);
    } else if (event === 'delete') {
      const answer = confirm(`${issue.issueName}를 삭제하시겠습니까?`);
      if (answer) {
        deleteIssueMutation.mutate({
          projectId: Number(projectId),
          issueId: issue.id,
        });
      }
    }
  };

  const handleInputEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.stopPropagation();
    if (event.key === 'Enter') {
      if (newIssueName.length > 32) {
        alert('이슈 이름은 최대 32자입니다.');
      } else {
        updateIssueMutation.mutate(
          {
            projectId: Number(projectId),
            issueId: issue.id,
            updatedIssue: {
              issueName: newIssueName,
              description: issue.description,
              epic: issue.epic,
              priority: issue.priority,
            },
          },
          {
            onSuccess: () => {
              setEditCard(false);
              setNewIssueName('');
            },
            onError: error => {
              console.log(error);
            },
          },
        );
      }
    } else if (event.key === 'Escape') {
      setEditCard(false);
      setNewIssueName('');
    }
  };

  return (
    <S.Card className="hover-moving" onClick={handleCardClick}>
      <S.CardContent>
        {type === 'SCREEN' ? (
          <>
            {issue.jobs.length > 0 && issue.jobs[0].imageUrl ? (
              <S.Img src={issue.jobs[0].imageUrl}></S.Img>
            ) : (
              <S.DefaultImage />
            )}
          </>
        ) : (
          <S.PreviewContent>
            <div>임시 컴포넌트ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ??</div>
            <div>미리보기 임시 컴포넌트</div>
          </S.PreviewContent>
        )}
      </S.CardContent>
      <S.CardText>
        {editCard ? (
          <S.CardInput
            type="text"
            value={newIssueName}
            onChange={handleInputChange}
            onKeyDown={handleInputEnter}
            autoFocus
          />
        ) : (
          <>
            <S.StyledText color={PALETTE.SUB_BLACK} fontWeight={700}>
              {issue.issueName}
            </S.StyledText>
            {issue.jobs.length > 0 && issue.jobs[0].createdAt && (
              <S.CardDate>
                <S.StyledText color={PALETTE.LIGHT_BLACK} fontSize={12}>
                  최근 작업 날짜
                </S.StyledText>
                <S.StyledText color={PALETTE.LIGHT_BLACK} fontSize={12}>
                  {dayjs(issue.jobs[0].createdAt).locale('ko').fromNow()}
                </S.StyledText>
              </S.CardDate>
            )}
          </>
        )}
      </S.CardText>
      <S.BtnConatiner onClick={e => e.stopPropagation()}>
        <S.EventBtn onClick={handleCardAction('edit')}>
          <Edit size={20} color={PALETTE.LIGHT_BLACK} />
        </S.EventBtn>
        <hr />
        <S.EventBtn onClick={handleCardAction('delete')}>
          <Trash2 size={20} color={PALETTE.LIGHT_BLACK} />
        </S.EventBtn>
      </S.BtnConatiner>
    </S.Card>
  );
}
