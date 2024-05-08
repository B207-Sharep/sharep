import * as T from '@types';
import React from 'react';

export interface KanbanProps {
  state: 'YET' | 'NOW' | 'DONE';
  issues: Omit<Omit<T.IssueProps, 'dragAble'>, 'deleteAble'>[];
  dragEnterdState: null | 'YET' | 'NOW' | 'DONE';
  setDragEnterdState: React.Dispatch<React.SetStateAction<null | 'YET' | 'NOW' | 'DONE'>>;
  refetchKanvansResponse: () => any;
  dragAble: boolean;
  deleteAble: boolean;
  // setIssues: React.Dispatch<React.SetStateAction<Omit<T.IssueProps, 'dragAble'>[]>>;
}

export interface ContributionsChartProps {
  dataList: { [date: string]: number };
}

export interface YesterdayWorkProps {
  accountId: number;
  nickname: string;
  roles: Extract<T.RoleBadgeProps, 'role'>[];
  userImageUrl: string;
}

export interface MemberListResponse {
  account: {
    email: string;
    id: number;
    imageUrl: string;
    nickname: string;
  };
  id: number;
  roles: Extract<T.RoleBadgeProps, 'role'>[];
  summary: string | null;
}
