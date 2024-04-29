import React from 'react';

export interface ManualTableProps {
  columnTitles: {
    name: string;
    celType: 'TEXT' | 'SELECT';
    iconName: 'current-state-title' | 'main-title-icon' | 'text-content-title';
  }[];
  dataList: {
    requestName: string | number;
    functionName: string | number;
    priority: string | number;
    willUsingScreen: string | number;
    detail: string | number;
    currentState: string | number;
    person: string | number;
    startedDate: string | number;
    endedDate: string | number;
    [key: string]: string | number;
  }[];
}

export interface CelProps {
  initialState: string | number;
}

export interface SelectCelProps {}
