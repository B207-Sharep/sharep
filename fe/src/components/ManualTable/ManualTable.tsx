import React, { useCallback } from 'react';
import * as S from './ManualTableStyle';
import * as T from '@types';
import * as Sub from './Subs';
import * as Icon from '@assets';

export default function ManualTable({ columnTitles, dataList, usingFor }: T.ManualTableProps) {
  const createIconUsingIconName = useCallback(({ idx }: { idx: number }) => {
    if (columnTitles[idx].iconName === 'main-title-icon') {
      return <Icon.MainTitle />;
    }
    if (columnTitles[idx].iconName === 'current-state-title') {
      return <Icon.CurrentStateTitle />;
    }
    if (columnTitles[idx].iconName === 'text-content-title') {
      return <Icon.TextContentTitle />;
    }
  }, []);

  return (
    <S.TableWrapper>
      <S.TitleRowWrapper>
        {columnTitles.map((title, titleIdx) => (
          <S.Title $fixedWidth={columnTitles[titleIdx].fixedWidth} key={`title-${title.name}-${titleIdx}`}>
            {createIconUsingIconName({ idx: titleIdx })}
            <p>{title.name}</p>
          </S.Title>
        ))}
      </S.TitleRowWrapper>
      {dataList.map((data, dataIdx) => (
        <S.RowWrapper key={`${usingFor}-table-row-${dataIdx}`}>
          {Object.keys(data).map((dataObjKey, dataObjKeyIdx) =>
            columnTitles[dataObjKeyIdx].celType === 'TEXT' ? (
              <Sub.TextAreaCel
                fixedWidth={columnTitles[dataObjKeyIdx].fixedWidth}
                initialState={dataList[dataIdx][dataObjKey]}
                key={`${usingFor}-table-cell-${dataObjKey}-${dataIdx}`}
              />
            ) : (
              <Sub.SelectCel
                fixedWidth={columnTitles[dataObjKeyIdx].fixedWidth}
                initialState={dataList[dataIdx][dataObjKey]}
                usingFor={dataObjKey.toUpperCase() as 'PRIORITY' | 'STATE' | 'ASSIGNEES' | 'METHOD'}
                key={`${usingFor}-table-cell-${dataObjKey}-${dataIdx}`}
              />
            ),
          )}
        </S.RowWrapper>
      ))}
    </S.TableWrapper>
  );
}
