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

/** 팀원들의 진행중인 이슈 리스트 조회 */
export async function getNowIssueAboutTeamMembers({ projectId }: { projectId: number }) {
  return instanceOfJson.get(`/projects/${projectId}/now/issues`);
}

/** 본인의 진행중인 이슈 조회 */
export async function getNowIssueAboutMe({ projectId }: { projectId: number }) {
  return instanceOfJson.get(`/projects/${projectId}/own/now/issues`);
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
export async function createNewProject(newProject: {
  title: string;
  bio: string;
  members: {
    id: number;
    roles: T.RoleBadgeProps['role'][];
  }[];
}) {
  return await instanceOfJson.post(`/projects`, newProject);
}

/** 새 작업 생성 */
export async function createNewJob({
  projectId,
  newJob,
}: {
  projectId: number;
  newJob: {
    issueId: number;
    name: string;
    description: string;
    imageFile: File | null;
  };
}) {
  const formData = new FormData();
  formData.append('request', JSON.stringify({ name: newJob.name, description: newJob.description }));
  if (newJob.imageFile) formData.append('image', newJob.imageFile);

  return await instanceOfFormData.post(`/projects/${projectId}/issues/${newJob.issueId}/jobs`, formData);
}

/** 이메일 계정 조회 */
export async function searchByEmail({ email }: { email: string }) {
  return await instanceOfJson.get(`/accounts/email?email=${email}`);
}
