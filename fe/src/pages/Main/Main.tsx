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
      {/* <S.Header>Header TEMP</S.Header> */}
      <Comp.Header></Comp.Header>
      <S.RootLayout>
        <S.MainWrapper>
          <S.SloganWrapper>
            <S.Slogan>
              <Comp.Slogan></Comp.Slogan>
              <p>Lorem ipsum</p>
            </S.Slogan>
            {/* <motion.div
              initial={{ opacity: 0, y: -90 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: { delay: 0.7 },
              }}
            > */}
            <S.MonitorWrapper>
              <S.Monitor>
                <S.MonitorScreen />
              </S.Monitor>
            </S.MonitorWrapper>
            {/* </motion.div> */}
          </S.SloganWrapper>

          <S.SubSlogan>
            안녕하세요? ShareP와 함께 뭐시기뭐기시 가나다라
            <br />
            도레미파솔라시도
            <br />
            유재건유죄건유잼건
          </S.SubSlogan>
        </S.MainWrapper>
        <S.tw>
          <S.CardSection>fdfdfd</S.CardSection>
          <S.CardSection>fdfdfd</S.CardSection>
          <S.CardSection>fdfdfd</S.CardSection>
          <S.CardSection>fdfdfd</S.CardSection>
        </S.tw>
      </S.RootLayout>
    </>
  );
}
