import React from 'react';

export interface ManualTableProps {
  usingFor: 'API' | 'FEATURE';
  columnTitles: {
    name: string;
    celType: 'TEXT' | 'SELECT';
    iconName: 'current-state-title' | 'main-title-icon' | 'text-content-title';
    fixedWidth: string;
  }[];
  dataList: {
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
  }[];
}

export interface CelProps {
  initialState: string;
  fixedWidth: string;
}

export interface SelectCelProps {
  initialState: string;
  fixedWidth: string;
  usingFor: 'PRIORITY' | 'STATE' | 'ASSIGNEES' | 'METHOD';
}
