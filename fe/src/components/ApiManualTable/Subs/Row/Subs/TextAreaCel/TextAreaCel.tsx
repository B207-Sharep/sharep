import React, { useEffect, useRef, useState } from 'react';
import * as S from './TextAreaCelStyle';
import * as T from '@types';

export default function TextAreaCel({ initialState, fixedWidth, usingFor, onUpdate }: T.ApiCelProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [value, setValue] = useState(initialState || '');
  const [isEditingMode, setIsEditingMode] = useState(false);
  const [isPressingShiftKey, setIsPressingShiftKey] = useState(false);

  useEffect(() => {
    if (isEditingMode && textareaRef.current) textareaRef.current.focus();
  }, [isEditingMode]);

  useEffect(() => {
    console.log(`value :`, value);
  }, [value]);

  const handleCelClick = (toggledValue: boolean) => {
    if (textareaRef.current === null || !onUpdate) return;

    if (toggledValue) textareaRef.current.focus();
    else textareaRef.current.blur();

    setIsEditingMode(() => toggledValue);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value || '');

    if (textareaRef.current) {
      const { scrollHeight, style } = textareaRef.current;
      style.height = `${scrollHeight}px`;
    }
  };

  const handleKeyboardEventOnEditor = (e: React.KeyboardEvent<HTMLTextAreaElement>, toggledValue: boolean) => {
    if (textareaRef.current && onUpdate) {
      const { scrollHeight, style } = textareaRef.current;
      const curHeight = Number(style.height.replace('px', ''));

      if (e.key === 'Shift') setIsPressingShiftKey(() => toggledValue);

      if (e.key === 'Backspace' && toggledValue && curHeight > 36) style.height = `${scrollHeight - 16}px`;

      if ((!isPressingShiftKey && e.key === 'Enter') || e.key === 'Escape') {
        onUpdate({ key: usingFor, value: value });
        handleCelClick(false);
      }
    }
  };

  return (
    <S.TextAreaCel
      ref={textareaRef}
      value={value}
      onChange={handleOnChange}
      onKeyDown={e => handleKeyboardEventOnEditor(e, true)}
      onKeyUp={e => handleKeyboardEventOnEditor(e, false)}
      onFocus={() => handleCelClick(true)}
      onBlur={() => handleCelClick(false)}
      readOnly={onUpdate ? false : true}
      $fixedWidth={fixedWidth}
      $isEditingMode={isEditingMode}
    />
  );
}
