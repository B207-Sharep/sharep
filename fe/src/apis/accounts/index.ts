// export async function name(params:type) {

import { instance } from '../instance';

// }
export async function idDuplicateCheck(uid: string) {
  return await instance.get(`/accounts/nickname?nickname=${uid}`);
}
export async function signup(email: string, uid: string, password: string) {
  return await instance.post(`/accounts/sign-up`, {
    email: `${email}`,
    nickname: `${uid}`,
    password: `${password}`,
  });
}

export async function login(email: string, password: string) {
  return await instance.post(`/accounts/login`, {
    email: `${email}`,
    password: `${password}`,
  });
}
