import React, { useState } from 'react';
import * as S from './ManualTableStyle';
import * as T from '@types';
import * as Sub from './Subs';

export default function ManualTable({ columnTitles, dataList }: T.ManualTableProps) {
  return (
    <S.TableWrapper>
      <S.TitleRowWrapper>
        {columnTitles.map((title, titleIdx) => (
          <S.Title key={`${title.name}-${titleIdx}`}>{title.name}</S.Title>
        ))}
      </S.TitleRowWrapper>
      {dataList.map((data, dataIdx) => (
        <S.RowWrapper key={`table-row-${dataIdx}`}>
          {Object.keys(data).map((title, titleIdx) => (
            <>
              {columnTitles[titleIdx].iconName}
              <Sub.TextCel key={`table-row-${dataIdx}-${title}`} initialState={dataList[dataIdx][title]} />
            </>
          ))}
        </S.RowWrapper>
      ))}
    </S.TableWrapper>
  );
}
