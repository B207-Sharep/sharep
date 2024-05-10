import React, { useCallback, useEffect } from 'react';
import * as S from './ManualTableStyle';
import * as T from '@types';
import { MANUAL_CONSTANTS } from '@/constants';
import * as Sub from './Subs';
import * as Icon from '@assets';
import { useWebSocket } from '@/providers/SocketProvider';
import { Plus } from 'lucide-react';
import { PALETTE } from '@/styles';

const READY_STATE = {
  CONNECTING: 0,
  OPEN: 1,
  CLOSING: 2,
  CLOSED: 3,
};

export default function ManualTable({ dataList, usingFor }: T.FeatureManualTableProps) {
  // const socket = useWebSocket();

  // useEffect(() => {
  //   if (socket) {
  //     socket.addEventListener('open', event => {
  //       if (event.target && socket.readyState === READY_STATE.OPEN) {
  //         const messageObject = { username: `멀티버스 김성제 - ${Math.random()}`, message: '입장했습니다.' };
  //         console.log(`OPEN :`, READY_STATE.OPEN);
  //         socket.send(JSON.stringify(messageObject));
  //       }
  //     });
  //     socket.addEventListener('message', event => {
  //       if (event.target && socket.readyState === READY_STATE.OPEN) {
  //         console.log(`MESSAGE :`, event);
  //       }
  //     });
  //   }
  // }, [socket]);

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

  const createCelType = useCallback(
    ({ resKey, fixedWidth, celType, dataIdx }: CreateCelTypeParam) => {
      const state = dataList[dataIdx][resKey];
      const using = resKey.toUpperCase() as 'PRIORITY' | 'STATE' | 'METHOD';
      const mapKey = `${usingFor}-table-cell-${resKey}-${dataIdx}`;

      if (celType === 'TEXT') {
        return <Sub.TextAreaCel fixedWidth={fixedWidth} initialState={state as string} key={mapKey} />;
      } else if (celType === 'SELECT') {
        return <Sub.SelectCel fixedWidth={fixedWidth} initialState={state as string} usingFor={using} key={mapKey} />;
      }
      return (
        <Sub.SelectAssigneesCel
          fixedWidth={fixedWidth}
          initialState={state as T.API.Assignee[]}
          usingFor="ASSIGNEES"
          key={mapKey}
        />
      );
    },
    [dataList, usingFor],
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
        {dataList?.map((_, dataIdx) => (
          <S.RowWrapper key={`${usingFor}-table-row-${dataIdx}`}>
            {MANUAL_CONSTANTS[usingFor].map(({ resKey, fixedWidth, celType }) => {
              return createCelType({ resKey, fixedWidth, celType, dataIdx });
            })}
          </S.RowWrapper>
        ))}
      </S.TableContainer>
      <S.CreateNewRowButton>
        <Plus color={PALETTE.LIGHT_BLACK} size={14}></Plus>
        <span>작업 추가</span>
      </S.CreateNewRowButton>
    </S.TableWrapper>
  );
}

interface CreateCelTypeParam {
  resKey: keyof T.API.DetailIssue;
  fixedWidth: string;
  celType: 'TEXT' | 'SELECT' | 'ASSIGNEES';
  dataIdx: number;
}
