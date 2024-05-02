import React, { ChangeEvent, useRef, useState } from 'react';
import * as S from './TaskCreationFormStyle';
import * as T from '@/types/components/Modal';
import * as Comp from '@/components';
import * as Icon from '@/assets';
import { PALETTE } from '@/styles';
import { Image as UploadImageIcon } from 'lucide-react';
import { useModal } from '@/customhooks';
import { useRecoilValue } from 'recoil';
import { modalDataState } from '@/stores/atoms/modal';

export default function TaskCreationForm({ modalId }: T.ProjectCreationFormProps) {
  const { updateFormData } = useModal<{
    imageUrl: string;
    description: string;
  }>(modalId);
  const modalData = useRecoilValue(modalDataState(modalId));
  const { formData } = modalData;
  const fileInputRef = useRef<HTMLInputElement>(null);
  // const [preview, setPreview] = useState<string>('');

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    uploadImage(event.target.files);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    uploadImage(files);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const uploadImage = (files: FileList | null) => {
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        updateFormData({ ...formData, imageUrl: reader.result as string });
        // setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('!!', formData);
    updateFormData({ ...formData, description: event.target.value });
  };

  return (
    <S.TaskCreationFormWrapper>
      <S.IssueTitle>
        <S.StyledText fontSize={16} color={PALETTE.SUB_BLACK}>
          # 진행 중인 이슈 제목
        </S.StyledText>
        <Comp.StatusBadge status="NOW" />
      </S.IssueTitle>

      <S.Container onClick={handleButtonClick} onDragOver={handleDragOver} onDrop={handleDrop}>
        <S.HiddenFileInput type="file" ref={fileInputRef} onChange={handleChange} accept="image/*" />
        {formData.imageUrl ? (
          <>
            <S.PreviewContainer>
              <S.Preview src={formData.imageUrl} alt="이미지 미리보기" />
            </S.PreviewContainer>
            <S.UploadButton>
              <UploadImageIcon size={60} color={PALETTE.LIGHT_BLACK} />
            </S.UploadButton>
          </>
        ) : (
          <S.DefaultContainer>
            <Icon.DefaultUploadImage />
            <S.UploadText color={PALETTE.LIGHT_BLACK}>
              이미지를 여기에 드래그하거나, 클릭하여 업로드하세요.
            </S.UploadText>
          </S.DefaultContainer>
        )}
      </S.Container>

      <S.FormItem>
        <Comp.InputWithLabel.Label labelFor="description">작업 메시지</Comp.InputWithLabel.Label>
        <S.StyledInput id="description" type="text" value={formData.description} onChange={handleInputChange} />
      </S.FormItem>
    </S.TaskCreationFormWrapper>
  );
}
