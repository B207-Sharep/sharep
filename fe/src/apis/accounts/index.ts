// export async function name(params:type) {

import { instanceOfJson } from '../instance';

// }
export async function emailDuplicateCheck(email: string) {
  return await instanceOfJson.get(`/accounts/email?email=${email}`);
}
export async function signup(email: string, uid: string, password: string) {
  return await instanceOfJson.post(`/accounts/sign-up`, {
    email: `${email}`,
    nickname: `${uid}`,
    password: `${password}`,
  });
}

export async function login(email: string, password: string) {
  return await instanceOfJson.post(`/auth/login`, {
    email: `${email}`,
    password: `${password}`,
  });
}
