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
            <S.StyledText fontSize={20} fontWeight={700}>
              기능명세 작성과 API명세부터
            </S.StyledText>
            <S.StyledText fontSize={20} fontWeight={700}>
              화면설계, 인프라 담당자 또한 커밋을 남길 수 있고
            </S.StyledText>
            <S.StyledText fontSize={20} fontWeight={700}>
              완료된 기능은 알림으로 알려드려요
            </S.StyledText>
          </S.SubSlogan>
        </S.MainWrapper>
        <section>
          <S.ContentsWrapper>
            <S.Contents>
              <img src={'/work-status.png'} height="100%" alt="위원회들"></img>
            </S.Contents>
            <S.Contents>fdfdfd</S.Contents>
            <S.Contents>fdfdfd</S.Contents>
          </S.ContentsWrapper>
        </section>
      </S.RootLayout>
    </>
  );
}
