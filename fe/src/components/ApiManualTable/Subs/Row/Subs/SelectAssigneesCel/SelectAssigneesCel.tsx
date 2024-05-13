import React, { useEffect, useRef, useState } from 'react';
import * as S from './SelectAssigneesCelStyle';
import * as T from '@types';
import * as API from '@apis';
import * as Comp from '@components';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export default function SelectAssigneesCel({
  initialState,
  fixedWidth,
  usingFor,
  onUpdate,
}: T.ApiSelectAssigneesCelProps) {
  const { projectId } = useParams();
  const celRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(initialState || []);

  const { data: membersResponse, isFetching: isMembersResponseFeting } = useQuery({
    queryKey: [{ func: `get-member-list`, projectId }],
    queryFn: () => API.project.getProjectMemberList({ projectId: Number(projectId) }),
  });

  const handleCelClick = (toggledValue: boolean) => {
    if (celRef.current === null) return;

    if (toggledValue) celRef.current.focus();
    else celRef.current.blur();
  };

  const handleListOptionClick = (e: React.MouseEvent) => {
    console.log(`${usingFor} :`, e);
    if (celRef.current) {
      celRef.current.blur();
      handleCelClick(false);
    }
  };

  return (
    <S.Wrapper
      className="hover-bg-dark"
      onClick={() => handleCelClick(true)}
      onFocus={() => handleCelClick(true)}
      onBlur={() => handleCelClick(false)}
      $fixedWidth={fixedWidth}
    >
      <S.Palceholder>
        {value.map((el, i) => (
          <Comp.UserImg key={`assignees-${el.accountId}-${i}`} size="32px" path={el.imageUrl} />
        ))}
      </S.Palceholder>
      <S.OptionUlWrapper>
        {membersResponse?.data.map((res, idx) => (
          <S.OptionLi
            className="hover-bg-dark"
            aria-valuetext={res.account.nickname}
            key={`assignees-li-${res.account.id}-${res.id}-${idx}`}
            onClick={handleListOptionClick}
          >
            <Comp.UserImg size="32px" path={res.account.imageUrl} />
            <span>{res.account.nickname}</span>
          </S.OptionLi>
        ))}
      </S.OptionUlWrapper>
    </S.Wrapper>
  );
}
