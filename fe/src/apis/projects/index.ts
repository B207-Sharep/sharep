import { instanceOfFormData, instanceOfJson } from '../instance';
import * as T from '@types';

export async function getGrass() {
  return await instanceOfJson.get(`/jobs`);
}
export async function getProjectList() {
  return await instanceOfJson.get(`/projects`);
}

/** 작업 리스트 조회 */
export async function getJobList({
  projectId,
  accountId,
  roleType,
  issueId,
}: {
  projectId: number;
  accountId: number | null;
  roleType: Extract<T.RoleBadgeProps, 'role'> | null;
  issueId: number | null;
}) {
  return await instanceOfJson.get(
    `/projects/${projectId}/jobs?accountId=${accountId || ''}&roleType=${roleType || ''}&issueId=${issueId || ''}`,
  );
}

/** 기여도 조회 */
export async function getContributions({ projectId, accountId }: { projectId: number; accountId: number }) {
  return await instanceOfJson.get(`/projects/${projectId}/accounts/${accountId}/contributions`);
}

/** 칸반 리스트 조회 */
export async function getKanvanList({ projectId, accountId }: { projectId: number; accountId: number | null }) {
  return await instanceOfJson.get(`/projects/${projectId}/issues/kanban?accountId=${accountId || ''}`);
}

/** 팀원들의 진행중인 리스트 조회 */
export async function getNowIssueAboutTeamMembers({ projectId }: { projectId: number }) {
  return instanceOfJson.get(`/projects/${projectId}/now/issues`);
}

/** 모든 이슈 리스트 조회 */
export async function getProjectIssueList({ projectId }: { projectId: number }) {
  return instanceOfJson.get(`/projects/${projectId}/issues`);
}

/** 기능 이슈 리스트 조회 */
export async function getFeatureIssuesList({ projectId }: { projectId: number }) {
  return instanceOfJson.get(`/projects/${projectId}/issues/feature`);
}

/** 화면 이슈 리스트 조회 */
export async function getScreenIssueList({ projectId }: { projectId: number }) {
  return instanceOfJson.get(`/projects/${projectId}/issues/screen`);
}

/** 새 프로젝트 생성 */
export async function createNewProject(newProject: T.ProjectCreationFormProps) {
  return await instanceOfJson.post(`/projects`, newProject);
}

/** 새 작업 생성 */
export async function createNewJob({
  projectId,
  issueId,
  newJob,
}: {
  issueId: number;
  projectId: number;
  newJob: T.JobCreationFormProps;
}) {
  return await instanceOfFormData.post(`/projects/${projectId}/issues/${issueId}/jobs`, newJob);
}

/** 이슈 상태 변경 */
export async function patchIssueAssigneesState({
  projectId,
  issueId,
  accountId,
  state,
}: {
  projectId: number;
  issueId: number;
  accountId: number;
  state: 'YET' | 'NOW' | 'DONE';
}) {
  return await instanceOfJson.patch(`/projects/${projectId}/issues/${issueId}/accounts/${accountId}/assignees`, {
    state: state,
  });
}

export async function deleteIssueAssignees({
  projectId,
  issueId,
  accountId,
}: {
  projectId: number;
  issueId: number;
  accountId: number;
}) {
  return instanceOfJson.delete(`/projects/${projectId}/issues/${issueId}/accounts/${accountId}/assignees`);
}

/** 프로젝트의 맴버 리스트 조회 */
export async function getProjectMemberList({ projectId }: { projectId: number }) {
  return await instanceOfJson.get(`/projects/${projectId}/members`);
}
