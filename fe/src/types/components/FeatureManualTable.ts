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
  readonly: boolean;
}

export interface FeatureSelectCelProps {
  initialState: string;
  fixedWidth: string;
  usingFor: 'PRIORITY' | 'STATE' | 'METHOD';
  readonly: boolean;
}

export interface FeatureSelectAssigneesCelProps {
  initialState: T.API.Assignee[];
  fixedWidth: string;
  usingFor: 'ASSIGNEES';
  readonly: boolean;
}
