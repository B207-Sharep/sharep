import React, { useRef, useState } from 'react';
import * as Comp from '@components';

export default function SungJe() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState('');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Comp.InputWithLabel.Label labelFor="test">테스트입니다</Comp.InputWithLabel.Label>
      <Comp.InputWithLabel.Input
        id="test"
        type="text"
        onChange={e => setValue(e.target.value)}
        value={value}
        placeholder="입력해봐"
        ref={inputRef}
      />
      <Comp.StatusBadge status="시작 전"></Comp.StatusBadge>
      <Comp.StatusBadge status="진행 중"></Comp.StatusBadge>
      <Comp.StatusBadge status="완료"></Comp.StatusBadge>

      <Comp.MethodBadge name="DELETE" />
      <Comp.MethodBadge name="GET" />
      <Comp.MethodBadge name="PATCH" />
      <Comp.MethodBadge name="POST" />
      <Comp.MethodBadge name="PUT" />

      <Comp.JobBadge job="BE" />
      <Comp.JobBadge job="Design" />
      <Comp.JobBadge job="FE" />
      <Comp.JobBadge job="Infra" />
    </div>
  );
}
