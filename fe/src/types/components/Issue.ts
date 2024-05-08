import React from 'react';
import * as T from '@types';

export interface IssueProps {
  id: number;
  issueName: string;
  description: string;
  assignees: { name: string; imageUrl: string }[] | null;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  deleteAble: boolean;
  dragAble:
    | false
    | { setter: React.Dispatch<React.SetStateAction<null | number>>; onDrop: (e: React.DragEvent) => void };
  jobs: { name: string; createAt: string } | null;
  epic: string | null;
  state: 'YET' | 'NOW' | 'DONE' | null;
  type: 'SCREEN' | 'PRIVATE' | 'FEATURE';
}
