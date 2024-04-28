import React, { useRef, useState } from 'react';
import * as S from './QuillEditorStyle';
import * as T from '@types';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function QuillEditor({ hiddenTooltip, initialValue, width, height, placeholder }: T.QuillEditorProps) {
  const quillRef = useRef<ReactQuill>(null);
  const [value, setValue] = useState(initialValue || '');

  return (
    <S.EditorWrapper width={width} height={height}>
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        modules={hiddenTooltip ? HIDDEN_TOOLBAR_MODULE : DEFAULT_MODULE}
        formats={hiddenTooltip ? HIDDEN_TOOLBAR_FORMAT : DEFAULT_TOOLBAR_FORMAT}
        onChange={setValue}
        placeholder={placeholder}
      />
    </S.EditorWrapper>
  );
}

const HIDDEN_TOOLBAR_MODULE = { toolbar: false };
const DEFAULT_MODULE = {
  toolbar: [
    [{ size: ['small', false, 'large'] }], // custom dropdown
    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    ['link', 'image'],
    ['clean'],
  ],
};

const HIDDEN_TOOLBAR_FORMAT = ['header', 'bold', 'italic', 'underline', 'link'];
const DEFAULT_TOOLBAR_FORMAT = [
  'font',
  'size',
  'header',
  'color',
  'background',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
];
