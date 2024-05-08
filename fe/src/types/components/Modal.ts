import React from 'react';
import * as T from '@/types';

export interface ModalProps {
  modalId: string;
  title: string;
  subTitle?: string;
  children: React.ReactNode;
  btnText?: string;
}

export interface JobCreationFormProps {
  name: string;
  imageFile: File;
  description: string;
}

export interface ProjectCreationFormProps {
  title: string;
  bio: string;
  members: {
    accountId: number;
    email: string;
    nickname: string;
    roles: Record<T.RoleBadgeProps['role'], boolean>;
  }[];
}

export interface InfraJobCreationFormProps {
  name: string;
  description: string;
  notiUsers: {
    accountId: number;
    nickname: string;
    roles: T.RoleBadgeProps['role'][];
    userImageUrl?: string;
  }[];
}

export interface SecretKeyFormProps {
  secretKey: string;
}
