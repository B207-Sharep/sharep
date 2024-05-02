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
  const { updateFormData } = useModal<{}>(modalId);
  const modalData = useRecoilValue(modalDataState(modalId));
  const { formData } = modalData;
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData({ ...formData, description: event.target.value });
  };

  return (
    <S.Wrapper>
      <S.FormItem>
        <Comp.InputWithLabel.Label labelFor="name">작업명</Comp.InputWithLabel.Label>
        <S.StyledInput id="name" type="text" value={taskName} onChange={event => setTaskName(event?.target.value)} />
      </S.FormItem>

      <div style={{ minHeight: '90%' }}>
        <Comp.QuillEditor
          width="100%"
          height="400px"
          value={description}
          hiddenTooltip={false}
          stateSetter={setDescription}
          placeholder="내용을 입력하세요."
        />
      </div>
    </S.Wrapper>
  );
}
