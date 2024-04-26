import React, { useRef, useState } from 'react';
import * as Comp from '@components';

export default function SungJe() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState('');

  return (
    <div>
      <Comp.InputWithLabel.Label labelFor="test">테스트입니다</Comp.InputWithLabel.Label>
      <Comp.InputWithLabel.Input
        id="test"
        type="text"
        onChange={e => setValue(e.target.value)}
        value={value}
        placeholder="입력해봐"
        ref={inputRef}
      />
    </div>
  );
}
