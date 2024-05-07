import React, { useRef, useState } from 'react';
import * as S from './JobCreationFormStyle';
import * as T from '@/types';
import * as Comp from '@/components';
import * as Icon from '@/assets';
import { PALETTE } from '@/styles';
import { Image as UploadImageIcon } from 'lucide-react';
import { useModal } from '@/customhooks';
import { useRecoilValue } from 'recoil';
import { modalDataState } from '@/stores/atoms/modal';

export default function JobCreationForm({ modalId }: Pick<T.ModalProps, 'modalId'>) {
  const { updateContentByKey } = useModal<T.JobCreationFormProps>(modalId);
  const { contents } = useRecoilValue(modalDataState(modalId));
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

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
      updateContentByKey('imageFile', file);

      const previewUrl = URL.createObjectURL(file);
      setImagePreviewUrl(previewUrl);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    updateContentByKey(id as keyof T.JobCreationFormProps, value);
  };

  return (
    <S.Wrapper>
      <S.TitleContainer>
        <S.IssueTitle>
          <S.IssueBadge>
            <S.StyledText color={PALETTE.MAIN_WHITE} fontSize={16} fontWeight={600}>
              Issue
            </S.StyledText>
          </S.IssueBadge>
          {/* TODO: IssueName */}
          <S.StyledText fontSize={16} color={PALETTE.SUB_BLACK}>
            진행 중인 이슈 이름
          </S.StyledText>
        </S.IssueTitle>
      </S.TitleContainer>
      <S.Container onClick={handleButtonClick} onDragOver={handleDragOver} onDrop={handleDrop}>
        <S.HiddenFileInput type="file" ref={fileInputRef} onChange={handleChange} accept="image/*" />
        {imagePreviewUrl ? (
          <>
            <S.PreviewContainer>
              <S.Preview src={imagePreviewUrl} alt="이미지 미리보기" />
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
        <Comp.InputWithLabel.Label labelFor="name">작업명</Comp.InputWithLabel.Label>
        <S.StyledInput id="name" type="text" value={contents.name} onChange={handleInputChange} />
      </S.FormItem>
      <S.FormItem>
        <Comp.InputWithLabel.Label labelFor="description">작업 메시지</Comp.InputWithLabel.Label>
        <S.StyledInput
          id="description"
          type="text"
          placeholder="작업 내용을 입력하세요."
          value={contents.description}
          onChange={handleInputChange}
        />
      </S.FormItem>
    </S.Wrapper>
  );
}
