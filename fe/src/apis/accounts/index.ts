// export async function name(params:type) {

import { instance } from '../instance';

// }
export async function emailDuplicateCheck(email: string) {
  return await instance.get(`/accounts/email?email=${email}`);
}
export async function signup(email: string, uid: string, password: string) {
  return await instance.post(`/accounts/sign-up`, {
    email: `${email}`,
    nickname: `${uid}`,
    password: `${password}`,
  });
}

export async function login(email: string, password: string) {
  return await instance.post(`/auth/login`, {
    email: `${email}`,
    password: `${password}`,
  });
}

export async function account() {
  return await instance.get(`/accounts`);
}
