import React from 'react';
import * as T from '@types';

export interface ApiManualTableProps {
  usingFor: 'API';
  dataList: Array<T.API.DetailApi>;
  readonly?: boolean;
}

export interface ApiRowProps {
  usingFor: 'API';
  data: T.API.DetailApi;
  idx: number;
  readonly?: boolean;
}

export interface ApiCelProps {
  usingFor: keyof T.API.DetailApi;
  initialState: string;
  fixedWidth: string;
  onUpdate: (...args: any) => void;
  readonly?: boolean;
}

export interface ApiSelectCelProps {
  initialState: string;
  fixedWidth: string;
  usingFor: 'PRIORITY' | 'STATE' | 'METHOD';
  onUpdate: (...args: any) => void;
  readonly?: boolean;
}

export interface ApiSelectAssigneesCelProps {
  initialState: T.API.Assignee[];
  fixedWidth: string;
  usingFor: 'ASSIGNEES';
  onCreate: ({ accountId }: { accountId: number }) => void;
  onDelete: ({ accountId }: { accountId: number }) => void;
  readonly?: boolean;
}
