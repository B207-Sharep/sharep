import React from 'react';
import * as T from '@types';

export interface ApiManualTableProps {
  usingFor: 'API';
  dataList: Array<T.API.DetailApi>;
  refetch?: (...args: any) => void;
}

export interface ApiRowProps {
  usingFor: 'API';
  data: T.API.DetailApi;
  idx: number;
  refetch?: (...args: any) => void;
}

export interface ApiCelProps {
  usingFor: keyof T.API.DetailApi;
  initialState: string;
  fixedWidth: string;
  onUpdate?: (...args: any) => void;
}

export interface ApiSelectCelProps {
  initialState: string;
  fixedWidth: string;
  usingFor: 'PRIORITY' | 'STATE' | 'METHOD';
  onUpdate?: (...args: any) => void;
}

export interface ApiSelectAssigneesCelProps {
  initialState: T.API.Assignee[];
  fixedWidth: string;
  usingFor: 'ASSIGNEES';
  onUpdate?: { create: (...args: any) => void; delete: (...args: any) => void };
}
