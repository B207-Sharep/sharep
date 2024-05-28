import React, { useEffect, useMemo, useRef, useState } from 'react';
import * as S from './JobCreationFormStyle';
import * as T from '@/types';
import * as Comp from '@/components';
import * as API from '@/apis';
import { PALETTE } from '@/styles';
import { ChevronDown, CircleDotDashed, Image as UploadImageIcon } from 'lucide-react';
import { useModal } from '@/customhooks';
import { useRecoilValue } from 'recoil';
import { modalDataState } from '@/stores/atoms/modal';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export default function JobCreationForm({ modalId }: Pick<T.ModalProps, 'modalId'>) {
  const { updateContentByKey, updateIsValid } = useModal<T.JobCreationFormProps>(modalId);
  const { contents } = useRecoilValue(modalDataState(modalId));
  const { projectId } = useParams();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  const [openIssueList, setOpenIssueList] = useState<boolean>(false);
  const [selectedIssue, setSelectedIssue] = useState<{ id: number | null; issueName: string | null }>({
    id: null,
    issueName: null,
  });

  const {
    data: myNowIssueResponse,
    isSuccess: myNowIssueSuccess,
    isFetching: myNowIssueFetching,
  } = useQuery({
    queryKey: [{ func: `get-now-issue-about-me`, projectId }],
    queryFn: () => API.project.getNowIssueAboutMe({ projectId: Number(projectId) }),
    select: data => data.data,
  });

  const groupedIssueList = useMemo(() => {
    if (!myNowIssueResponse || !myNowIssueResponse[0].issues) return [];
    const sortedIssues = myNowIssueResponse[0].issues.sort((a, b) => a.id - b.id);
    return groupIssuesByType(sortedIssues);
  }, [myNowIssueResponse]);

  const handleSelectValue = (issueId: number | null, issueName: string | null) => {
    setSelectedIssue({ id: issueId, issueName: issueName });
    if (issueId) updateContentByKey('issueId', issueId);
  };

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

      if (!file.type.startsWith('image/')) {
        alert('이미지 파일만 업로드 가능합니다.');
        return;
      }

      updateContentByKey('imageFile', file);

      const previewUrl = URL.createObjectURL(file);
      setImagePreviewUrl(previewUrl);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    updateContentByKey(id as keyof Omit<T.JobCreationFormProps, 'issueId'>, value);

    if (id == 'name') {
      updateIsValid(value.length > 0);
    }
  };

  const toggleDropdown = () => {
    setOpenIssueList(!openIssueList);
  };

  useEffect(() => {
    if (myNowIssueSuccess) {
      console.log(myNowIssueResponse);
    }
  }, [myNowIssueSuccess, myNowIssueResponse]);

  return (
    <S.Wrapper>
      <S.TitleContainer>
        <S.IssueTitle>
          <S.IssueBadge>
            <S.StyledText color={PALETTE.MAIN_WHITE} fontSize={16} fontWeight={600}>
              Issue
            </S.StyledText>
          </S.IssueBadge>
          <S.Filter onClick={toggleDropdown}>
            <CircleDotDashed color={PALETTE.LIGHT_BLACK} size={14} />
            <S.StyledText color={PALETTE.SUB_BLACK} fontSize={14}>
              {selectedIssue.issueName ? `${selectedIssue.issueName}` : '작업을 연결할 이슈를 선택해주세요.'}
            </S.StyledText>
            <S.AccordionIconButton>
              <S.AccordionIcon $isOpen={openIssueList}>
                <ChevronDown size={12} />
              </S.AccordionIcon>
            </S.AccordionIconButton>
            {openIssueList && (
              <S.Dropdown>
                {groupedIssueList ? (
                  <>
                    {Object.entries(groupedIssueList).map(([type, issues]) => (
                      <div key={`${type}-issues`} style={{ width: '100%' }}>
                        <S.FilterType>
                          {type === 'FEATURE'
                            ? `기능 `
                            : type === 'SCREEN'
                            ? `화면 `
                            : type === 'INFRA'
                            ? `인프라 `
                            : `개인 `}
                          이슈
                        </S.FilterType>
                        {issues.map(issue => (
                          <S.DropdowntItem
                            key={`filter-${type}-${issue.id}`}
                            onClick={() => handleSelectValue(issue.id, issue.issueName)}
                          >
                            <S.StyledText>{issue.issueName}</S.StyledText>
                          </S.DropdowntItem>
                        ))}
                      </div>
                    ))}
                  </>
                ) : null}
              </S.Dropdown>
            )}
          </S.Filter>
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
            {/* <Icon.DefaultUploadImage /> */}
            <S.ContentsImg>
              <img src={'/default-upload-icon.png'} height="100%" width="100%" alt=""></img>
            </S.ContentsImg>
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

function groupIssuesByType(issues: T.API.GetNowIssueListResponse['issues']): {
  [key in 'FEATURE' | 'SCREEN' | 'PRIVATE' | 'INFRA']: T.API.GetNowIssueListResponse['issues'];
} {
  return issues.reduce((acc, issue) => {
    const { type } = issue;

    if (!acc[type]) {
      acc[type] = [];
    }

    acc[type].push(issue);

    console.log(acc);
    return acc;
  }, {} as { [key in 'FEATURE' | 'SCREEN' | 'PRIVATE' | 'INFRA']: T.API.GetNowIssueListResponse['issues'] });
}
