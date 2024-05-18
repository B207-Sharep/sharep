import * as T from '@types';

export interface DetailApi {
  assignees: Assignee[];
  description: string | null;
  epic: string | null;
  id: number;
  state: 'YET' | 'NOW' | 'DONE';
  method: 'GET' | 'PUT' | 'PATCH' | 'POST' | 'DELETE' | null;
  request: string | null;
  response: string | null;
  issueName: string | null;
  url: string | null;
}

export interface SimpleApi {
  id: number;
  method: 'GET' | 'PUT' | 'PATCH' | 'POST' | 'DELETE' | null;
  request: string | null;
  response: string | null;
  url: string | null;
}

export interface Job {
  createdAt: string;
  description: string;
  id: number;
  imageUrl: string;
  name: string;
}

export interface Assignee {
  accountId: number;
  id: number;
  imageUrl: string;
  name: string;
  state: 'YET' | 'NOW' | 'DONE';
  roles: ('FRONT_END' | 'BACK_END' | 'INFRA' | 'DESIGNER')[];
}

/** GetFeatureIssuesList - 기능 이슈 리스트 조회,  GetKanbanList - 칸반 리스트 조회  */
export interface DetailIssue {
  id: number;
  issueName: string;
  description: string | null;
  type: 'FEATURE' | 'SCREEN' | 'PRIVATE' | 'INFRA';
  epic: string | null;
  state: 'YET' | 'NOW' | 'DONE'; // 이슈 상태 타입으로 변경 필요해보임
  createdAt: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW' | null;
  startedAt: string | null;
  finishedAt: string | null;
  api: SimpleApi[] | null;
  assignees: Assignee[];
  jobs: Job[];
  connectedIssues: SimpleIssue[];
}

export interface SimpleIssue {
  id: number;
  connectionId: number | null; // 리스트 조회 시 항상 null
  issueName: string;
  description: string | null;
  type: 'FEATURE' | 'SCREEN' | 'PRIVATE' | 'INFRA';
  epic: string | null;
  state: 'YET' | 'NOW' | 'DONE';
  createdAt: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW' | null;
  startedAt: string | null;
  finishedAt: string | null;
  api: SimpleApi[] | null;
  assignees: Assignee[];
  jobs: Job[];
}

// "id": 26,
// "epic": "PRIVATE",
// "state": "YET",
// "method": null,
// "url": null,
// "description": "PRIVATE 이슈 생성 테스트",
// "request": null,
// "response": null,
// "assignees": [
//     {
//         "id": 9,
//         "state": "YET",
//         "accountId": 2,
//         "name": "sss",
//         "imageUrl": null
//     }
// ]
/** GetFeatureIssuesList - 기능 이슈 리스트 조회,  GetKanbanList - 칸반 리스트 조회  */

/** GetNowIssueList - 팀원들의 진행중인 이슈 리스트 조회 */
export interface GetNowIssueListResponse {
  issues: {
    description: string;
    epic: string;
    id: number;
    issueName: string;
    priority: Extract<T.PriorityBadgeProps, 'priority'>;
    state: 'YET' | 'NOW' | 'DONE';
    type: 'FEATURE' | 'SCREEN' | 'PRIVATE' | 'INFRA';
  }[];
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

/** GetProjectList - 프로젝트 리스트 조회 */
export interface GetProjectListResponse {
  id: number;
  title: string;
  bio: string;
  accounts: {
    id: number;
    nickname: string;
    email: string;
    imageUrl: string;
  }[];
}
/** GetProjectList - 프로젝트 리스트 조회 */

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
  summary: string | null;
}
/** GetMemberList - 프로젝트의 멤버 리스트 조회 */

/** GetContributions - 기여도 조회 */
export interface GetContributionsResponse {
  [date: string]: number;
}
/** GetContributions - 기여도 조회 */

/** GetProjectIssueList - 모든 이슈 리스트 조회 */
export interface GetProjectIssueListResponse {
  id: number;
  issueName: string;
  description: string;
}
/** GetProjectIssueList - 모든 이슈 리스트 조회 */

/** SearchUserByEmail - 이메일 계정 조회 */
export interface SearchUserByEmailResponse {
  id: number;
  nickname: string;
  email: string;
  imageUrl: string | null;
}
/** SearchUserByEmail - 이메일 계정 조회 */

/** GetNotificationList - 알림  */
export interface GetNotificationListResponse {
  notificationId: number;
  accountId: number;
  nickname: string;
  roles: Extract<T.RoleBadgeProps, 'role'>[];
  issueId: number;
  type: 'FEATURE' | 'SCREEN' | 'INFRA';
  message: string;
  issueName: string;
  finishedAt: string;
  isRead: boolean;
}
/** GetNotificationList - 알림  */
