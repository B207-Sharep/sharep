import React, { useEffect, useRef, useState } from 'react';
import * as S from './SelectCelStyle';
import * as T from '@types';
import * as Comp from '@components';

export default function SelectCel({ initialState, fixedWidth, usingFor }: T.SelectCelProps) {
  const celRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(initialState || '');
  const [isEditingMode, setIsEditingMode] = useState(false);

  useEffect(() => {
    if (isEditingMode && celRef.current) celRef.current.focus();
  }, [isEditingMode]);

  const handleCelClick = (toggledValue: boolean) => {
    if (toggledValue) celRef.current?.focus();

    setIsEditingMode(() => toggledValue);
  };

  const handleListOptionClick = (e: React.MouseEvent) => {
    setValue(String(e.currentTarget.ariaValueText));

    if (celRef.current) {
      celRef.current?.blur();
      handleCelClick(false);
    }
  };

  return (
    <S.Wrapper
      className="hover-bg-dark"
      onClick={() => handleCelClick(true)}
      onFocus={() => handleCelClick(true)}
      onBlur={() => handleCelClick(false)}
      $fixedWidth={fixedWidth}
      $isEditingMode={isEditingMode}
    >
      <S.Palceholder>{OPTIONS[usingFor][value]}</S.Palceholder>
      <S.OptionUlWrapper $isEditingMode={isEditingMode}>
        {Object.keys(OPTIONS[usingFor]).map((key, idx) => (
          <S.OptionLi
            className="hover-bg-dark"
            aria-valuetext={key}
            key={`${usingFor}-${idx}`}
            onClick={handleListOptionClick}
          >
            {OPTIONS[usingFor][key]}
          </S.OptionLi>
        ))}
      </S.OptionUlWrapper>
    </S.Wrapper>
  );
}

const OPTIONS: { [usingFor: string]: { [res: string]: React.ReactNode } } = {
  PRIORITY: {
    HIGH: <Comp.PriorityBadge priority="HIGH" />,
    MEDIUM: <Comp.PriorityBadge priority="MEDIUM" />,
    LOW: <Comp.PriorityBadge priority="LOW" />,
  },
  STATE: {
    YET: <Comp.StatusBadge status="YET" />,
    NOW: <Comp.StatusBadge status="NOW" />,
    DONE: <Comp.StatusBadge status="DONE" />,
  },
  METHOD: {
    GET: <Comp.MethodBadge name="GET" />,
    POST: <Comp.MethodBadge name="POST" />,
    PUT: <Comp.MethodBadge name="PUT" />,
    PATCH: <Comp.MethodBadge name="PATCH" />,
    DELETE: <Comp.MethodBadge name="DELETE" />,
  },
  ASSIGNEES: {
    HIGH: <Comp.PriorityBadge priority="HIGH" />,
    MEDIUM: <Comp.PriorityBadge priority="MEDIUM" />,
    LOW: <Comp.PriorityBadge priority="LOW" />,
  },
};
// // 우선 순위
// const PRIORITY_OPTIONS = {
//   HIGH:<Comp.PriorityBadge priority="HIGH" />,
//   MEDIUM: <Comp.PriorityBadge priority="MEDIUM" />,
//   LOW:<Comp.PriorityBadge priority="LOW" />,
// };

// // 진행 상태
// const STATE_OPTIONS = {
//   YET:<Comp.StatusBadge status="YET" />,
//   NOW:<Comp.StatusBadge status="NOW" />,
//   DONE: <Comp.StatusBadge status="DONE" />,
// };

// // 담당자
// const PERSON_OPTIONS = {
//   HIGH:<Comp.PriorityBadge priority="HIGH" />,
//   MEDIUM:<Comp.PriorityBadge priority="MEDIUM" />,
//   LOW: <Comp.PriorityBadge priority="LOW" />,
// };

// // 메소드
// const METHOD_OPTIONS = {
//   GET:<Comp.MethodBadge name="GET" />,
//   POST:<Comp.MethodBadge name="POST" />,
//   PUT:<Comp.MethodBadge name="PUT" />,
//   PATCH:<Comp.MethodBadge name="PATCH" />,
//   DELETE:<Comp.MethodBadge name="DELETE" />,
// };
