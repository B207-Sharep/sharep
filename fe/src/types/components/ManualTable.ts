import React from 'react';
import * as T from '@types';

export interface ManualTableProps {
  usingFor: 'API' | 'FEATURE';
  columnTitles: {
    name: string;
    celType: 'TEXT' | 'SELECT';
    iconName: 'current-state-title' | 'main-title-icon' | 'text-content-title';
    fixedWidth: string;
  }[];
  dataList:
    | {
        requestName: string;
        functionName: string;
        priority: string;
        willUsingScreen: string;
        detail: string;
        state: string;
        assignees: string;
        startedDate: string;
        endedDate: string;
        [key: string]: string;
      }[]
    | {
        category: string;
        state: string;
        method: string;
        apiPath: string;
        detail: string;
        requestBody: string;
        responseBody: string;
        beState: string;
        feState: string;
        assignees: string;
        [key: string]: string;
      }[];
}

export interface FeatureManualTableProps {
  usingFor: 'API' | 'FEATURE';
  dataList: Array<T.API.DetailIssue>;
}

export interface CelProps {
  initialState: string;
  fixedWidth: string;
}

export interface SelectCelProps {
  initialState: string;
  fixedWidth: string;
  usingFor: 'PRIORITY' | 'STATE' | 'METHOD';
}

export interface SelectAssigneesCelProps {
  initialState: T.API.Assignee[];
  fixedWidth: string;
  usingFor: 'ASSIGNEES';
}
