import React, { useCallback } from 'react';
import * as S from './ApiManualTableStyle';
import * as T from '@types';
import * as Icon from '@assets';
import Row from './Subs/Row/Row';
import { MANUAL_CONSTANTS } from '@/constants';
import { Plus } from 'lucide-react';
import { PALETTE } from '@/styles';

export default function ApiManualTable({ dataList, usingFor, refetch }: T.ApiManualTableProps) {
  const createIconUsingIconName = useCallback(
    ({ idx }: { idx: number }) => {
      if (MANUAL_CONSTANTS[usingFor][idx].iconName === 'main-title-icon') {
        return <Icon.MainTitle />;
      }
      if (MANUAL_CONSTANTS[usingFor][idx].iconName === 'current-state-title') {
        return <Icon.CurrentStateTitle />;
      }
      if (MANUAL_CONSTANTS[usingFor][idx].iconName === 'text-content-title') {
        return <Icon.TextContentTitle />;
      }
    },
    [usingFor],
  );

  return (
    <S.TableWrapper>
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
        {dataList?.map((data, dataIdx) => {
          return (
            <Row
              idx={dataIdx}
              data={data as T.API.DetailApi}
              usingFor={'API'}
              refetch={refetch}
              key={`${usingFor}-table-row-${dataIdx}`}
            />
          );
        })}
      </S.TableContainer>
      {/* <S.CreateNewRowButton>
        <Plus color={PALETTE.LIGHT_BLACK} size={14}></Plus>
        <span>작업 추가</span>
      </S.CreateNewRowButton> */}
    </S.TableWrapper>
  );
}
