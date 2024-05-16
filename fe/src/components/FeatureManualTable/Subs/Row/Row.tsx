/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback } from 'react';
import * as S from './RowStyle';
import * as T from '@types';
import * as API from '@apis';
import * as Sub from './Subs';
import { MANUAL_CONSTANTS } from '@/constants';
import { useMutation } from '@tanstack/react-query';
import { useParams } from 'react-router';

export default function Row({ usingFor, data, idx, readonly }: T.FeatureRowProps) {
  const { projectId } = useParams();
  const { mutate: modifyIssue } = useMutation({
    mutationFn: ({ body }: { body: Body }) =>
      API.project.updateIssue({ issueId: data.id, projectId: Number(projectId), updatedIssue: body }),
    onSuccess: res => {
      console.log(`MODIFY ISSUE :`, res);
    },
  });
  const handleModifyissue = ({ key, value }: { key: keyof Body; value: string }) => {
    const body = { ...data, [key]: value };
    modifyIssue({ body });
  };

  const { mutate: deleteAssignee } = useMutation({
    mutationFn: ({ accountId }: { accountId: number }) =>
      API.project.deleteIssueAssignees({ projectId: Number(projectId), issueId: data.id, accountId }),
    onSuccess: res => {
      console.log(`DELETE ASSIGNEE :`, res);
      // if (res.status === 200) queryClient.invalidateQueries({ queryKey: [{ func: `get-api-list`, projectId }] });
    },
  });
  const handleDeleteAssignee = ({ accountId }: { accountId: number }) => {
    deleteAssignee({ accountId: accountId });
  };

  const { mutate: createAssignee } = useMutation({
    mutationFn: ({ accountId }: { accountId: number }) =>
      API.project.createIssueAssignee({ projectId: Number(projectId), issueId: data.id, accountId }),
    onSuccess: res => {
      console.log(`CREATE ASSIGNEE :`, res);
      // if (res.status === 201) queryClient.invalidateQueries({ queryKey: [{ func: `get-api-list`, projectId }] });
    },
  });
  const handleCreateAssignee = ({ accountId }: { accountId: number }) => {
    createAssignee({ accountId: accountId });
  };

  const createCelType = useCallback(
    ({ key, fixedWidth, celType, idx }: CreateCelTypeParam) => {
      const using = key as keyof T.API.DetailIssue;
      const state = data[using];
      const mapKey = `${usingFor}-table-cell-${key}-${idx}`;

      if (celType === 'TEXT') {
        return (
          <Sub.TextAreaCel
            fixedWidth={fixedWidth}
            initialState={state as string}
            usingFor={using}
            key={mapKey}
            readonly={readonly}
            onUpdate={handleModifyissue}
          />
        );
      } else if (celType === 'SELECT') {
        return (
          <Sub.SelectCel
            fixedWidth={fixedWidth}
            initialState={state as string}
            usingFor={using.toUpperCase() as 'PRIORITY' | 'STATE' | 'METHOD'}
            key={mapKey}
            readonly={readonly}
            onUpdate={handleModifyissue}
          />
        );
      }
      return (
        <Sub.SelectAssigneesCel
          fixedWidth={fixedWidth}
          initialState={state as T.API.Assignee[]}
          usingFor="ASSIGNEES"
          key={mapKey}
          readonly={readonly}
          onCreate={handleCreateAssignee}
          onDelete={handleDeleteAssignee}
        />
      );
    },
    [data, usingFor, readonly, handleModifyissue],
  );
  return (
    <S.RowWrapper>
      {MANUAL_CONSTANTS[usingFor].map(({ key, fixedWidth, celType }) => {
        return createCelType({ key, fixedWidth, celType, idx });
      })}
    </S.RowWrapper>
  );
}

type CreateCelTypeParam =
  | {
      key: keyof T.API.DetailIssue;
      fixedWidth: string;
      celType: 'TEXT' | 'SELECT' | 'ASSIGNEES';
      idx: number;
    }
  | {
      key: keyof T.API.DetailApi;
      fixedWidth: string;
      celType: 'TEXT' | 'SELECT' | 'ASSIGNEES';
      idx: number;
    };

interface Body {
  issueName: string | null;
  description: string | null;
  epic: string | null;
  priority: T.PriorityBadgeProps[`priority`] | null;
}
