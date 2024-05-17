import React from 'react';
import * as T from '@types';

export interface FeatureManualTableProps {
  dataList: Array<T.API.DetailIssue | T.API.SimpleIssue>;
  readonly: boolean;
  dataType: 'DETAIL' | 'SIMPLE';
}

export interface FeatureRowProps {
  data: T.API.DetailIssue | T.API.SimpleIssue;
  idx: number;
  readonly: boolean;
  dataType: 'DETAIL' | 'SIMPLE';
}

export interface FeatureTextAreaCelProps {
  initialState: string;
  fixedWidth: string;
  usingFor: keyof T.API.DetailIssue | T.API.SimpleIssue;
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

export interface FeatureSelectConnectedIssueCelProps {
  initialState: T.API.SimpleIssue[];
  fixedWidth: string;
  usingFor: 'CONNECTEDISSUES';
  readonly: boolean;
  onCreate: ({ screenIssueId }: { screenIssueId: number }) => void;
  onDelete: ({ connectionId }: { connectionId: number }) => void;
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
