import React, { useRef, useState } from 'react';
import * as Comp from '@components';
import * as Icon from '@/assets';

export default function SungJe() {
  return (
    <div
      style={{
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '12px',
      }}
    >
      <Comp.ManualTable columnTitles={COLUMN_TITLES} dataList={DUMMY} />
    </div>
  );
}

const COLUMN_TITLES: {
  name: string;
  celType: 'TEXT' | 'SELECT';
  iconName: 'current-state-title' | 'main-title-icon' | 'text-content-title';
}[] = [
  { name: '요구사항명', celType: 'TEXT', iconName: 'main-title-icon' },
  { name: '기능명', celType: 'TEXT', iconName: 'current-state-title' },
  { name: '우선순위', celType: 'TEXT', iconName: 'main-title-icon' },
  { name: '사용할 화면', celType: 'TEXT', iconName: 'current-state-title' },
  { name: '상세 기능', celType: 'TEXT', iconName: 'current-state-title' },
  { name: '진행상태', celType: 'TEXT', iconName: 'current-state-title' },
  { name: '담당자', celType: 'TEXT', iconName: 'current-state-title' },
  { name: '시작 날짜', celType: 'TEXT', iconName: 'current-state-title' },
  { name: '종료 날짜', celType: 'TEXT', iconName: 'current-state-title' },
];

const DUMMY = [
  {
    requestName: '요구사항명 - 0',
    functionName: '기능명 - 0',
    priority: '우선순위 - 0',
    willUsingScreen: '사용할 화면 - 0',
    detail: '상세 기능 - 0',
    currentState: '진행상태 - 0',
    person: '담당자 - 0',
    startedDate: '시작 날짜 - 0',
    endedDate: '종료 날짜 - 0',
  },
  {
    requestName: '요구사항명 - 1',
    functionName: '기능명 - 1',
    priority: '우선순위 - 1',
    willUsingScreen: '사용할 화면 - 1',
    detail: '상세 기능 - 1',
    currentState: '진행상태 - 1',
    person: '담당자 - 1',
    startedDate: '시작 날짜 - 1',
    endedDate: '종료 날짜 - 1',
  },
  {
    requestName: '요구사항명 - 2',
    functionName: '기능명 - 2',
    priority: '우선순위 - 2',
    willUsingScreen: '사용할 화면 - 2',
    detail: '상세 기능 - 2',
    currentState: '진행상태 - 2',
    person: '담당자 - 2',
    startedDate: '시작 날짜 - 2',
    endedDate: '종료 날짜 - 2',
  },
  {
    requestName: '요구사항명 - 3',
    functionName: '기능명 - 3',
    priority: '우선순위 - 3',
    willUsingScreen: '사용할 화면 - 3',
    detail: '상세 기능 - 3',
    currentState: '진행상태 - 3',
    person: '담당자 - 3',
    startedDate: '시작 날짜 - 3',
    endedDate: '종료 날짜 - 3',
  },
];
