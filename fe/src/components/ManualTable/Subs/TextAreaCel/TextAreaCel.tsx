import React, { useEffect, useRef, useState } from 'react';
import * as S from './TextAreaCelStyle';
import * as T from '@types';

export default function TextAreaCel({ initialState, fixedWidth }: T.CelProps) {
  const celRef = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState(initialState || '');
  const [isEditingMode, setIsEditingMode] = useState(false);
  const [isPressingShiftKey, setIsPressingShiftKey] = useState(false);

  useEffect(() => {
    if (isEditingMode && celRef.current) celRef.current.focus();
  }, [isEditingMode]);

  const handleCelClick = (toggledValue: boolean) => {
    if (toggledValue) celRef.current?.focus();
    else celRef.current?.blur();

    setIsEditingMode(() => toggledValue);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const handleKeyboardEventOnEditor = (e: React.KeyboardEvent<HTMLTextAreaElement>, toggledValue: boolean) => {
    console.log(`test :`, e.keyCode);
    if ((!isPressingShiftKey && e.keyCode === 13) || e.keyCode === 27) handleCelClick(false);
    if (e.keyCode === 16) setIsPressingShiftKey(() => toggledValue);
  };

  return (
    <S.TextAreaCel
      ref={celRef}
      value={value}
      onChange={handleOnChange}
      onKeyDown={e => handleKeyboardEventOnEditor(e, true)}
      onKeyUp={e => handleKeyboardEventOnEditor(e, false)}
      onBlur={() => handleCelClick(false)}
      $fixedWidth={fixedWidth}
      $isEditingMode={isEditingMode}
    />
  );
}
