import * as T from '@types';

/** GetFeatureIssuesList - 기능 이슈 리스트 조회 */
export interface GetFeatureIssuesListResponse {
  assignees: {
    accountId: number;
    id: number;
    imageUrl: string;
    name: string;
    state: Extract<T.StatusBadgeProps, 'status'>;
  }[];
  createdAt: string;

  description: string;
  epic: string;
  id: number;
  issueName: string;
  priority: Extract<T.PriorityBadgeProps, 'priority'>;
  state: Extract<T.StatusBadgeProps, 'status'>;
  type: T.IssueProps['type'];

  startedAt: string | null;
  finishedAt: string | null;
  screens: {
    connectionId: number;
    screenIssueResponse: {
      id: number;
      issueName: string;
      description: string;
    };
  }[];
}
/** GetFeatureIssuesList - 기능 이슈 리스트 조회 */

/** GetKanbanList - 칸반 리스트 조회 */
export interface GetKanbanListResponse {
  assignees: {
    accountId: number;
    id: number;
    imageUrl: string;
    name: string;
    state: Extract<T.StatusBadgeProps, 'status'>;
  }[];
  createdAt: string;

  description: string;
  epic: string;
  id: number;
  issueName: string;
  priority: Extract<T.PriorityBadgeProps, 'priority'>;
  state: Extract<T.StatusBadgeProps, 'status'>;
  type: T.IssueProps['type'];

  jobs: {
    createdAt: string;
    description: string;
    id: number;
    imageUrl: string | null;
    name: string;
  }[];
}
/** GetKanbanList - 칸반 리스트 조회 */

/** GetNowIssueList - 팀원들의 진행중인 이슈 리스트 조회 */
export interface GetNowIssueListResponse {
  issue: {
    description: string;
    epic: string;
    id: number;
    issueName: string;
    priority: Extract<T.PriorityBadgeProps, 'priority'>;
    state: Extract<T.StatusBadgeProps, 'status'>;
    type: T.IssueProps['type'];
  };
  member: {
    accountId: number;
    nickname: string;
    roles: Extract<T.RoleBadgeProps, 'role'>[];
    userImageUrl: string;
  };
}
/** GetNowIssueList - 팀원들의 진행중인 이슈 리스트 조회 */

/** GetJobList - 작업 리스트 조회 */
export interface GetJobListResponse {
  createdAt: string;
  description: string;
  id: number;
  imageUrl: string;
  issueId: number;
  member: {
    accountId: number;
    nickname: string;
    roles: Extract<T.RoleBadgeProps, 'role'>[];
    userImageUrl: string;
  };

  name: string;
}
/** GetJobList - 작업 리스트 조회 */

/** GetMemberList - 프로젝트의 멤버 리스트 조회 */
export interface GetProjectMemberListResponse {
  account: {
    email: string;
    id: number;
    imageUrl: string;
    nickname: string;
  };
  id: number;
  roles: Extract<T.RoleBadgeProps, 'role'>[];
}
/** GetMemberList - 프로젝트의 멤버 리스트 조회 */

/** GetContributions - 기여도 조회 */
export interface GetContributionsResponse {
  [date: string]: number;
}
/** GetContributions - 기여도 조회 */

/** GetScreenIssueList - 화면 이슈 조회 */
// export interface GetScreenIssueListResponse {
//   id: number;
//   issueName: string;
//   description: string;
//   epic: string;
//   createdAt: string;
//   priority: Extract<T.PriorityBadgeProps, 'priority'>;
//   features: {
//     connectionId: number;
//     featureIssueResponse: {
//       id: number;
//       issueName: string;
//       description: string;
//     };
//   }[];
//   jobs: {
//     createdAt: string;
//     description: string;
//     id: number;
//     imageUrl: string | null;
//     name: string;
//   }[];
// }
/** GetScreenIssueList - 화면 이슈 조회 */

/** GetProjectIssueList - 모든 이슈 리스트 조회 */
export interface GetProjectIssueListResponse {
  id: number;
  issueName: string;
  description: string;
}
/** GetProjectIssueList - 모든 이슈 리스트 조회 */
