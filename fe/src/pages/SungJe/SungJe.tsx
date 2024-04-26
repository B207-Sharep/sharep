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
      <Comp.StatusBadge status="DONE"></Comp.StatusBadge>
      <Comp.StatusBadge status="NOW"></Comp.StatusBadge>
      <Comp.StatusBadge status="YET"></Comp.StatusBadge>

      <Comp.MethodBadge name="DELETE" />
      <Comp.MethodBadge name="GET" />
      <Comp.MethodBadge name="PATCH" />
      <Comp.MethodBadge name="POST" />
      <Comp.MethodBadge name="PUT" />

      <Comp.JobBadge job="BACK_END" />
      <Comp.JobBadge job="DESIGNER" />
      <Comp.JobBadge job="FRONT_END" />
      <Comp.JobBadge job="INFRA" />

      <Comp.PriorityBadge priority="HIGH" />
      <Comp.PriorityBadge priority="MEDIUM" />
      <Comp.PriorityBadge priority="LOW" />
    </div>
  );
}
