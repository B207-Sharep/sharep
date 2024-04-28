import React, { useRef, useState } from 'react';
import * as Comp from '@components';

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
      <Comp.QuillEditor
        width="716px"
        height="574px"
        hiddenTooltip={false}
        placeholder=""
        initialValue="testestsetsetset"
      />
    </div>
  );
}
