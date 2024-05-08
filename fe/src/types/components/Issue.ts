import React from 'react';
import * as T from '@types';

export interface IssueProps {
  id: number;
  issueName: string;
  description: string;
  assignees:
    | { accountId: number; id: number; imageUrl: string; name: string; state: Extract<T.StatusBadgeProps, 'status'> }[]
    | null;
  priority: Extract<T.PriorityBadgeProps, 'priority'>;
  jobs: { name: string; createdAt: string }[] | null;
  epic: string | null;
  state: 'YET' | 'NOW' | 'DONE' | null;
  type: 'SCREEN' | 'PRIVATE' | 'FEATURE';

  deleteAble: boolean;
  dragAble:
    | false
    | { setter: React.Dispatch<React.SetStateAction<null | number>>; onDrop: (e: React.DragEvent) => void };
}
