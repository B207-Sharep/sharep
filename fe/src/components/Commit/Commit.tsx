import React, { useState } from 'react';
import * as S from './CommitStyle';
import * as T from '@/types';
import { PALETTE } from '@/styles';
import { ChevronDown } from 'lucide-react';
import JobBadge from '../JobBadge/JobBadge';

export default function Commit({ description, nickname, createdAt, userImageUrl, jobList, imageUrl }: T.CommitProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isClickable = imageUrl !== undefined;

  return (
    <S.CommitWrapper>
      <S.CommitInfo $isClickable={isClickable} onClick={() => setIsOpen(!isOpen)}>
        {isClickable ? (
          <S.AccordionIconButton>
            <S.AccordionIcon $isOpen={isOpen}>
              <ChevronDown />
            </S.AccordionIcon>
          </S.AccordionIconButton>
        ) : (
          <div style={{ width: '24px', height: '24px' }}></div>
        )}
        <S.CommitContent>
          <S.CommitMessage>
            {/* 작업 메시지 */}
            <S.Text color={PALETTE.SUB_BLACK} fontWeight={500}>
              {description}
            </S.Text>
            {/* 유저 정보 + 작업 완료 시간 */}
            <S.CommitUserInfo>
              <S.Img width={16} height={16} radius={8} src={userImageUrl || 'https://via.placeholder.com/16x16'} />
              <S.Text color={PALETTE.LIGHT_BLACK} fontSize={12}>
                {nickname}
              </S.Text>
              <S.JobBadgeList>
                {jobList.map((job, index) => (
                  <JobBadge key={index} job={job as 'FRONT_END' | 'BACK_END' | 'INFRA' | 'DESIGNER'} />
                ))}
              </S.JobBadgeList>
              <S.Text color={PALETTE.LIGHT_BLACK} fontSize={10}>
                작업 완료
              </S.Text>
              <S.Text color={PALETTE.LIGHT_BLACK} fontSize={10}>
                {createdAt}
              </S.Text>
            </S.CommitUserInfo>
          </S.CommitMessage>
        </S.CommitContent>
        {isClickable && <S.Img width={60} height={60} radius={10} src={imageUrl} />}
      </S.CommitInfo>
      {isClickable && isOpen && (
        <S.CommitImageDetail>
          <S.Img width={800} height={600} radius={0} src={imageUrl} />
        </S.CommitImageDetail>
      )}
    </S.CommitWrapper>
  );
}
