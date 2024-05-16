import React, { useCallback } from 'react';
import * as S from './FeatureManualTableStyle';
import * as T from '@types';
import * as Icon from '@assets';
import * as API from '@apis';
import Row from './Subs/Row/Row';
import { MANUAL_CONSTANTS } from '@/constants';

export default function FeatureManualTable({ dataList, usingFor, readonly }: T.FeatureManualTableProps) {
  const createIconUsingIconName = useCallback(
    ({ idx }: { idx: number }) => {
      const iconName = MANUAL_CONSTANTS[usingFor][idx].iconName;
      if (iconName === 'main-title-icon') return <Icon.MainTitle />;
      if (iconName === 'current-state-title') return <Icon.CurrentStateTitle />;
      if (iconName === 'text-content-title') return <Icon.TextContentTitle />;
    },
    [usingFor],
  );

  return (
    <S.TableContainer>
      <S.TitleRowWrapper>
        {MANUAL_CONSTANTS[usingFor].map((title, titleIdx) => (
          <S.Title
            $fixedWidth={MANUAL_CONSTANTS[usingFor][titleIdx].fixedWidth}
            key={`title-${title.name}-${titleIdx}`}
          >
            {createIconUsingIconName({ idx: titleIdx })}
            <span>{title.name}</span>
          </S.Title>
        ))}
      </S.TitleRowWrapper>
      {dataList?.map((data, dataIdx) => (
        <Row
          idx={dataIdx}
          data={data as T.API.DetailIssue}
          usingFor={'FEATURE'}
          readonly={readonly}
          key={`${usingFor}-table-row-${dataIdx}`}
        />
      ))}
    </S.TableContainer>
  );
}
