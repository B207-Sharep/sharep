import React, { useEffect, useRef, useState } from 'react';
import * as S from './TextAreaCelStyle';
import * as T from '@types';
import YjsCRDT from '@/service/crdt';
import { useWebSocket } from '@/providers/SocketProvider';

export default function TextAreaCel({ initialState, fixedWidth }: T.CelProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [value, setValue] = useState(initialState || '');
  const [isEditingMode, setIsEditingMode] = useState(false);
  const [isPressingShiftKey, setIsPressingShiftKey] = useState(false);

  /** ====================================== */
  const socket = useWebSocket();
  const [cursorPosition, setCursorPosition] = useState<number>(0);
  const crdt = new YjsCRDT();

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value;
    const newCursor = event.target.selectionStart; // 연산 이후의 최종 위치

    setValue(newText);
    setCursorPosition(newCursor);

    const changedLength = value.length - newText.length;
    const isAdded = changedLength < 0;

    if (isAdded) {
      const addedText = newText.slice(newCursor - Math.abs(changedLength), newCursor);
      const isOneLetter = addedText.length === 1;
      const isKorean = addedText.match(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/);

      if (isOneLetter && isKorean) return;

      crdt.insert(newCursor - Math.abs(changedLength), addedText);
    } else {
      const removedLength = Math.abs(changedLength);
      crdt.delete(newCursor, removedLength);
    }

    // sendMessageDataChannels(codeDataChannel, crdt.encodeData());
  };

  // useEffect(() => {
  //   console.log(`socket :`, socket);
  //   if (socket) {
  //     socket.subscribe('/topic/greetings', message => console.log(`Received: ${message.body}`));
  //   }
  // }, [socket]);

  // useEffect(() => {
  //   console.log(`socket :`, socket);
  //   if (socket) {
  //     socket.publish({ destination: '/app/hello', body: value });
  //   }
  // }, [value]);
  /** ====================================== */

  useEffect(() => {
    if (isEditingMode && textareaRef.current) textareaRef.current.focus();
  }, [isEditingMode]);

  const handleCelClick = (toggledValue: boolean) => {
    if (toggledValue) textareaRef.current?.focus();
    else textareaRef.current?.blur();

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
    if (textareaRef.current) {
      const { scrollHeight, style } = textareaRef.current;
      const curHeight = Number(style.height.replace('px', ''));

      if (e.key === 'Shift') setIsPressingShiftKey(() => toggledValue);

      if ((!isPressingShiftKey && e.key === 'Enter') || e.key === 'Escape') handleCelClick(false);

      if (e.key === 'Backspace' && toggledValue && curHeight > 36) style.height = `${scrollHeight - 16}px`;
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
      $fixedWidth={fixedWidth}
      $isEditingMode={isEditingMode}
    />
  );
}
