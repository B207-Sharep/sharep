import React, { useRef, useState } from 'react';
import * as S from './InfraTaskCreationFormStyle';
import * as T from '@/types/components/Modal';
import * as Comp from '@/components';
import * as Icon from '@/assets';
import { PALETTE } from '@/styles';
import { useModal } from '@/customhooks';
import { useRecoilValue } from 'recoil';
import { modalDataState } from '@/stores/atoms/modal';
import ReactQuill from 'react-quill';

export default function InfraTaskCreationForm({ modalId }: T.ProjectCreationFormProps) {
  const { updateContents } = useModal<{
    // TODO:
  }>(modalId);
  const modalData = useRecoilValue(modalDataState(modalId));
  const { contents } = modalData;

  return (
    <S.Wrapper>
      <S.FormItem>
        <Comp.InputWithLabel.Label labelFor="name">작업명</Comp.InputWithLabel.Label>
        <S.StyledInput
          id="name"
          type="text"
          value={contents.name}
          onChange={event => updateContents({ ...contents, name: event.target.value })}
        />
      </S.FormItem>
      {data}
      <S.EditorWrapper>
        <ReactQuill
          theme="snow"
          value={contents.description}
          modules={DEFAULT_MODULE}
          formats={DEFAULT_TOOLBAR_FORMAT}
          onChange={(newDescription: React.SetStateAction<string>) =>
            updateContents({ ...contents, description: newDescription })
          }
          placeholder="내용을 입력하세요."
        />
      </S.EditorWrapper>
      {/* <S.EditorWrapper>
        <Comp.QuillEditor
          width="100%"
          height="400px"
          value={contents.description}
          hiddenTooltip={false}
          stateSetter={(newDescription: React.SetStateAction<string>) =>
            updateContents({ ...contents, description: newDescription })
          }
          placeholder="내용을 입력하세요."
        />
      </S.EditorWrapper> */}
    </S.Wrapper>
  );
}

const data = `<p><strong>123123123123123123213</strong><img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDABXkvxQ1LztUgsh9y3TJPqzcn9AKmbtFmtGN5o85nbZnsQME+/+cVl3J3ZGR6fhV64cquPzz61lX0nl2cr5IOCoNZU0dNRmIswMrvn\\"></p><p><br></p><p><br></p><p><br></p><p><strong style="color: rgb(230, 0, 0);"><em><u>바봉~~~</u></em></strong></p>`;
const DEFAULT_MODULE = {
  toolbar: [
    [{ size: ['small', false, 'large'] }],
    [{ color: [] }, { background: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    ['link', 'image'],
    ['clean'],
  ],
};
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
  // 'image',
];
