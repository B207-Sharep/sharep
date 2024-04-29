import React, { useRef, useState } from 'react';
import * as Comp from '@components';
import * as Icon from '@/assets';
import * as L from '@layouts';

export default function SungJe() {
  return (
    <L.NoneSideBarLayout>
      <div style={{ width: '400px', height: '200px', backgroundColor: 'white' }}></div>
      <div style={{ width: '400px', height: '200px', backgroundColor: 'white' }}></div>
      <div style={{ width: '400px', height: '200px', backgroundColor: 'white' }}></div>
    </L.NoneSideBarLayout>
  );
}

const FEATURE_MANUAL_COLUMN_TITLES: {
  name: string;
  celType: 'TEXT' | 'SELECT';
  iconName: 'current-state-title' | 'main-title-icon' | 'text-content-title';
  fixedWidth: string;
}[] = [
  { name: '요구사항명', celType: 'TEXT', iconName: 'main-title-icon', fixedWidth: '200px' },
  { name: '기능명', celType: 'TEXT', iconName: 'current-state-title', fixedWidth: '200px' },
  { name: '우선순위', celType: 'SELECT', iconName: 'main-title-icon', fixedWidth: '120px' },
  { name: '사용할 화면', celType: 'TEXT', iconName: 'current-state-title', fixedWidth: '200px' },
  { name: '상세 기능', celType: 'TEXT', iconName: 'current-state-title', fixedWidth: '312px' },
  { name: '진행상태', celType: 'SELECT', iconName: 'current-state-title', fixedWidth: '120px' },
  { name: '담당자', celType: 'SELECT', iconName: 'current-state-title', fixedWidth: '160px' },
  { name: '시작 날짜', celType: 'TEXT', iconName: 'current-state-title', fixedWidth: '160px' },
  { name: '종료 날짜', celType: 'TEXT', iconName: 'current-state-title', fixedWidth: '160px' },
];

const FEATURE_MANUAL_DUMMY = [
  {
    requestName: '요구사항명 - 0',
    functionName: '기능명 - 0',
    priority: 'HIGH', //
    willUsingScreen: '사용할 화면 - 0',
    detail: '상세 기능 - 0',
    state: 'DONE', // YET, NOW, DONE
    assignees: '담당자 - 0', //
    startedDate: '시작 날짜 - 0',
    endedDate: '종료 날짜 - 0',
  },
  {
    requestName: '요구사항명 - 1',
    functionName: '기능명 - 1',
    priority: 'MEDIUM', //
    willUsingScreen: '사용할 화면 - 1',
    detail: '상세 기능 - 1',
    state: 'YET', //
    assignees: '담당자 - 1', //
    startedDate: '시작 날짜 - 1',
    endedDate: '종료 날짜 - 1',
  },
  {
    requestName: '요구사항명 - 2',
    functionName: '기능명 - 2',
    priority: 'MEDIUM', //
    willUsingScreen: '사용할 화면 - 2',
    detail: '상세 기능 - 2',
    state: 'NOW', //
    assignees: '담당자 - 2', //
    startedDate: '시작 날짜 - 2',
    endedDate: '종료 날짜 - 2',
  },
  {
    requestName: '요구사항명 - 3',
    functionName: '기능명 - 3',
    priority: 'LOW', //
    willUsingScreen: '사용할 화면 - 3',
    detail: '상세 기능 - 3',
    state: 'YET', //
    assignees: '담당자 - 3', //
    startedDate: '시작 날짜 - 3',
    endedDate: '종료 날짜 - 3',
  },
];

// ### API 명세서 조회
// - ???: 분류 (대분류)
// - state: 상태 (진행 상태)    ---> HIGH, MEDIUM, LOW
// - method: 메소드            ---> GET, POST, PUT, PATCH, DELETE
// - ???: API 경로
// - ???: 설명 (상세 설명)
// - ???: RequestBody
// - ???: ResponseBody
// - ???: BE 구현 (구현 상태)
// - ???: FE 구현 (구현 상태)
// - assignees: 담당자 (N명)   ---> API RESPONSE LIST

// ### 기능 명세서
// - ???: 요구사항명 (대분류)
// - ???: 기능명
// - priority: 우선 순위      ---> HIGH, MEDIUM, LOW
// - ???: 사용할 화면
// - state: 진행상태          ---> YET, NOW, DONE
// - assignees: 담당자 (N명)
// - ???: 시작 날짜
// - ???: 종료 날짜
