import * as T from '@types';

export const MANUAL_CONSTANTS: {
  API: {
    name: string;
    celType: 'TEXT' | 'SELECT' | 'ASSIGNEES';
    iconName: 'current-state-title' | 'main-title-icon' | 'text-content-title';
    fixedWidth: string;
    resKey: keyof T.API.DetailIssue;
    [key: string]: any;
  }[];
  FEATURE: {
    name: string;
    celType: 'TEXT' | 'SELECT' | 'ASSIGNEES';
    iconName: 'current-state-title' | 'main-title-icon' | 'text-content-title';
    fixedWidth: string;
    resKey: keyof T.API.DetailIssue;
  }[];
} = {
  API: [
    { name: '요구사항명', resKey: 'epic', fixedWidth: '200px', celType: 'TEXT', iconName: 'main-title-icon' },
    { name: '기능명', resKey: 'issueName', fixedWidth: '120px', celType: 'TEXT', iconName: 'current-state-title' },
    { name: '우선순위', resKey: 'priority', fixedWidth: '120px', celType: 'SELECT', iconName: 'main-title-icon' },
    {
      name: '사용할 화면',
      resKey: 'connectedIssues',
      fixedWidth: '200px',
      celType: 'TEXT',
      iconName: 'text-content-title',
    },
    { name: '상세 기능', resKey: 'description', fixedWidth: '312px', celType: 'TEXT', iconName: 'current-state-title' },
    { name: '진행 상태', resKey: 'state', fixedWidth: '172px', celType: 'SELECT', iconName: 'current-state-title' },
    { name: '담당자', resKey: 'assignees', fixedWidth: '172px', celType: 'ASSIGNEES', iconName: 'text-content-title' },
    { name: '시작 날짜', resKey: 'startedAt', fixedWidth: '136px', celType: 'TEXT', iconName: 'text-content-title' },
    { name: '종료 날짜', resKey: 'finishedAt', fixedWidth: '136px', celType: 'TEXT', iconName: 'text-content-title' },
    { name: '종료 날짜', resKey: 'finishedAt', fixedWidth: '160px', celType: 'TEXT', iconName: 'text-content-title' },
  ],
  FEATURE: [
    { name: '요구사항명', resKey: 'epic', fixedWidth: '200px', celType: 'TEXT', iconName: 'main-title-icon' },
    { name: '기능명', resKey: 'issueName', fixedWidth: '200px', celType: 'TEXT', iconName: 'current-state-title' },
    { name: '우선순위', resKey: 'priority', fixedWidth: '120px', celType: 'SELECT', iconName: 'main-title-icon' },
    {
      name: '사용할 화면',
      resKey: 'connectedIssues',
      fixedWidth: '200px',
      celType: 'TEXT',
      iconName: 'text-content-title',
    },
    { name: '상세 기능', resKey: 'description', fixedWidth: '312px', celType: 'TEXT', iconName: 'current-state-title' },
    { name: '진행 상태', resKey: 'state', fixedWidth: '120px', celType: 'SELECT', iconName: 'current-state-title' },
    { name: '담당자', resKey: 'assignees', fixedWidth: '160px', celType: 'ASSIGNEES', iconName: 'text-content-title' },
    { name: '시작 날짜', resKey: 'startedAt', fixedWidth: '160px', celType: 'TEXT', iconName: 'text-content-title' },
    { name: '종료 날짜', resKey: 'finishedAt', fixedWidth: '160px', celType: 'TEXT', iconName: 'text-content-title' },
  ],
};

// type: usingFor

// 요구사항명: epic
// 기능명: issueName
// 우선순위: priority
// 사용할 화면: description
// 상세 기능: description
// 진행 상태: state
// 담당자: assignees
// 시작 날짜: startedAt
// 종료 날짜: finishedAt

// {
//   "issueName": "이슈생성테스트",
//   "description": "사용자 경험 추가해야 합니다.",
//   "type": "FEATURE",
//   "epic": "사용자 개선",
//   "priority": "HIGH"
// }
