import * as T from '@types';

interface Api {
  id: number;
  method: 'GET' | 'PUT' | 'PATCH' | 'POST' | 'DELETE' | null;
  request: string | null;
  response: string | null;
  url: string | null;
}

interface Job {
  createdAt: string;
  description: string;
  id: number;
  imageUrl: string;
  name: string;
}

interface Assignee {
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
  api: Api | null;
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
  api: Api | null;
  assignees: Assignee[];
  jobs: Job[];
}
/** GetFeatureIssuesList - 기능 이슈 리스트 조회,  GetKanbanList - 칸반 리스트 조회  */

/** GetNowIssueList - 팀원들의 진행중인 이슈 리스트 조회 */
export interface GetNowIssueListResponse {
  issue: {
    description: string;
    epic: string;
    id: number;
    issueName: string;
    priority: Extract<T.PriorityBadgeProps, 'priority'>;
    state: 'YET' | 'NOW' | 'DONE';
    type: 'FEATURE' | 'SCREEN' | 'PRIVATE' | 'INFRA';
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
