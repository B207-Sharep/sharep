import React from 'react';
import * as S from './MainStyle';
import * as Comp from '@components';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Main() {
  const navigate = useNavigate();

  const handleHistoryClick = () => {
    navigate('/projects/1/commit-history');
  };

  return (
    <>
      <S.Header>Header TEMP</S.Header>
      <S.RootLayout>
        <S.MainWrapper>
          <S.SloganWrapper>
            <S.Slogan>
              <Comp.Slogan></Comp.Slogan>
              <p>Lorem ipsum</p>
            </S.Slogan>
          </S.SloganWrapper>
          <S.SubSlogan>dfd</S.SubSlogan>
        </S.MainWrapper>
        {/* <S.tw>
          <S.t>dfd</S.t>
          <S.t>dfd</S.t>
          <S.t>dfd</S.t>
        </S.tw> */}
      </S.RootLayout>
    </>
  );
}
