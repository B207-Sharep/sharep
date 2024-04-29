import React from 'react';
import * as S from './JobBadgeStyle';
import * as T from '@types';

const JOB_COLOR_PALETTE: {
  [key: string]: { BG_COLOR: string; FONT_COLOR: string; TEXT: string };
} = {
  FRONT_END: { BG_COLOR: '#FFEFF1', FONT_COLOR: '#FD5B71', TEXT: 'FE' },
  BACK_END: { BG_COLOR: '#E6FCF4', FONT_COLOR: '#07E092', TEXT: 'BE' },
  INFRA: { BG_COLOR: '#F2F2F2', FONT_COLOR: '#828282', TEXT: 'Infra' },
  DESIGNER: { BG_COLOR: '#F5EEFC', FONT_COLOR: '#9B51E0', TEXT: 'Design' },
};

export default function JobBadge({ job }: T.JobBadgeProps) {
  return (
    <S.Wrapper $bgColor={JOB_COLOR_PALETTE[job].BG_COLOR} $fontColor={JOB_COLOR_PALETTE[job].FONT_COLOR}>
      {JOB_COLOR_PALETTE[job].TEXT}
    </S.Wrapper>
  );
}
