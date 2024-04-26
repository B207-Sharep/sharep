import { ChangeEvent, HTMLInputTypeAttribute } from 'react';

export interface BaseInputProps {
  id: string;
  type: HTMLInputTypeAttribute;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  placeholder?: string;
  accept?: string;
  hidden?: boolean;
}

export interface BaseLabelProps {
  labelFor: string;
  className?: string;
  children?: React.ReactNode;
  onDragEnter?: (...args: unknown[]) => void;
  onDragLeave?: (...args: unknown[]) => void;
  onDragOver?: (...args: unknown[]) => void;
  onDrop?: (...args: unknown[]) => void;
  onClick?: (...args: unknown[]) => void;
  role?: string;
}

export interface BaseLabelWithInputProps {
  id: string;
  type: HTMLInputTypeAttribute;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  children?: React.ReactNode;
}
