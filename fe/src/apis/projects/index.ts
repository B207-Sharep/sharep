import { instanceOfFormData, instanceOfJson } from '../instance';
import * as T from '@types';

// export async function getGrass(email: string) {
//   return await instance.get(`/projects/`);
// }
export async function getProjectList() {
  return await instanceOfJson.get(`/projects`);
}

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

export async function getContributions({ projectId, accountId }: { projectId: number; accountId: number }) {
  return await instanceOfJson.get(`/projects/${projectId}/accounts/${accountId}/contributions`);
}

export async function getKanvanList({ projectId, accountId }: { projectId: number; accountId: number | null }) {
  return await instanceOfJson.get(`/projects/${projectId}/issues/kanban?accountId=${accountId || ''}`);
}

export async function getNowIssueAboutTeamMembers({ projectId }: { projectId: number }) {
  return instanceOfJson.get(`/projects/${projectId}/now/issues`);
}

export async function getScreenIssueList({ projectId }: { projectId: number }) {
  return instanceOfJson.get(`/projects/${projectId}/issues/screen`);
}

export async function createNewProject(newProject: T.ProjectCreationFormProps) {
  return await instanceOfJson.post(`/projects`, newProject);
}

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
