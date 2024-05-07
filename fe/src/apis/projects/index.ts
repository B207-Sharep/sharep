import { instanceOfJson } from '../instance';
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
