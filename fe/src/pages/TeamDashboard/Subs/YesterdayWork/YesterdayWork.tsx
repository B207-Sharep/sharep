import React from 'react';
import * as T from '@types';
import * as Sub from '..';
import * as S from './YesterdayWorkStyle';

export default function YesterdayWork({ id, imageUrl, nickname, roles }: T.YesterdayWorkProps) {
  return (
    <S.YesterdayWork>
      <Sub.TeamMember id={id} imageUrl={imageUrl} nickname={nickname} roles={roles} />
      <p aria-label={DUMMY_YESTERDAY_WORK}>{DUMMY_YESTERDAY_WORK}</p>
    </S.YesterdayWork>
  );
}

const DUMMY_YESTERDAY_WORK = `달이 떴다고 전화를 주시다니요. 이 밤 너무 신나고 근사해요. 내 마음에도 생전 처음 보는 환한 달이
떠오르고 산아래 작은 마을이 그려집니다. 간절한 이 그리움들을, 사무쳐오는 이 연정들을 달빛에 실어
당신께 보냅니다. 세상에, 강변에 달이 곱다고 전화를 다 주시다니요. 흐르는 물 어디쯤 눈부시게 부서지는
소리 문득 들려옵니다.`;
