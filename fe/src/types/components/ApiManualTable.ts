import React from 'react';
import * as T from '@types';

export interface ApiManualTableProps {
  dataList: Array<T.API.DetailApi | T.API.SimpleApi>;
  readonly?: boolean;
}

export interface ApiRowProps {
  data: T.API.DetailApi | T.API.SimpleApi;
  idx: number;
  readonly?: boolean;
}

export interface ApiTextCelProps {
  usingFor: keyof T.API.DetailApi | T.API.SimpleApi;
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
