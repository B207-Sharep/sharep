import React, { useCallback } from 'react';
import * as S from './RowStyle';
import * as T from '@types';
import * as API from '@apis';
import * as Sub from './Subs';
import { MANUAL_CONSTANTS } from '@/constants';

export default function Row({ usingFor, data, idx, readonly }: T.RowProps) {
  const createCelType = useCallback(
    ({ key, fixedWidth, celType, idx }: CreateCelTypeParam) => {
      let state;
      const using = key.toUpperCase() as 'PRIORITY' | 'STATE' | 'METHOD';
      const mapKey = `${usingFor}-table-cell-${key}-${idx}`;

      if (usingFor === 'FEATURE') state = data[key as keyof T.API.DetailIssue];
      else if (usingFor === 'API') state = data[key as keyof T.API.DetailApi];
      console.log(`ID :`, data.id);
      if (celType === 'TEXT') {
        return (
          <Sub.TextAreaCel fixedWidth={fixedWidth} initialState={state as string} key={mapKey} readonly={readonly} />
        );
      } else if (celType === 'SELECT') {
        return (
          <Sub.SelectCel
            fixedWidth={fixedWidth}
            initialState={state as string}
            usingFor={using}
            key={mapKey}
            readonly={readonly}
          />
        );
      }
      return (
        <Sub.SelectAssigneesCel
          fixedWidth={fixedWidth}
          initialState={state as T.API.Assignee[]}
          usingFor="ASSIGNEES"
          key={mapKey}
          readonly={readonly}
        />
      );
    },
    [data, usingFor, readonly],
  );
  return (
    <S.RowWrapper>
      {MANUAL_CONSTANTS[usingFor].map(({ key, fixedWidth, celType }) => {
        return createCelType({ key, fixedWidth, celType, idx });
      })}
    </S.RowWrapper>
  );
}

type CreateCelTypeParam =
  | {
      key: keyof T.API.DetailIssue;
      fixedWidth: string;
      celType: 'TEXT' | 'SELECT' | 'ASSIGNEES';
      idx: number;
    }
  | {
      key: keyof T.API.DetailApi;
      fixedWidth: string;
      celType: 'TEXT' | 'SELECT' | 'ASSIGNEES';
      idx: number;
    };
