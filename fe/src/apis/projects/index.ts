import { instance } from '../instance';
import * as T from '@types';

// export async function getGrass(email: string) {
//   return await instance.get(`/projects/`);
// }
export async function getProjectList() {
  return await instance.get(`/projects`);
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
  return await instance.get(
    `/projects/${projectId}/jobs?accountId=${accountId || ''}&roleType=${roleType || ''}&issueId=${issueId || ''}`,
  );
}

export async function getContributions({ projectId, accountId }: { projectId: number; accountId: number }) {
  return await instance.get(`/projects/${projectId}/accounts/${accountId}/contributions`);
}
