import React from 'react';
import * as T from '@types';

export interface FeatureManualTableProps {
  usingFor: 'FEATURE';
  dataList: Array<T.API.DetailIssue>;
  readonly: boolean;
}

export interface FeatureRowProps {
  usingFor: 'FEATURE';
  data: T.API.DetailIssue;
  idx: number;
  readonly: boolean;
}

export interface FeatureCelProps {
  initialState: string;
  fixedWidth: string;
  usingFor: keyof T.API.DetailIssue;
  readonly: boolean;
  onUpdate: (...args: any) => void;
}

export interface FeatureSelectCelProps {
  initialState: string;
  fixedWidth: string;
  usingFor: 'PRIORITY' | 'STATE' | 'METHOD';
  readonly: boolean;
  onUpdate: (...args: any) => void;
}

export interface FeatureSelectAssigneesCelProps {
  initialState: T.API.Assignee[];
  fixedWidth: string;
  usingFor: 'ASSIGNEES';
  readonly: boolean;
  onCreate: ({ accountId }: { accountId: number }) => void;
  onDelete: ({ accountId }: { accountId: number }) => void;
}

interface Body {
  issueName: string | null;
  description: string | null;
  epic: string | null;
  priority: T.PriorityBadgeProps[`priority`] | null;
}
