import React from 'react';
import * as S from './HeaderStyle';
import * as Comp from '@components';
import { useNavigate } from 'react-router';

export default function Header() {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/register');
  };
  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <header>
      <S.MainWrapper>
        <S.LogoWrapper>
          <p>로고</p>
        </S.LogoWrapper>
        <S.BtnWrapper>
          <Comp.MainColorBtn bgc={false} disabled={false} onClick={handleRegisterClick}>
            가입하기
          </Comp.MainColorBtn>
          <Comp.MainColorBtn bgc={true} disabled={false} onClick={handleLoginClick}>
            로그인
          </Comp.MainColorBtn>
        </S.BtnWrapper>
      </S.MainWrapper>
    </header>
  );
}
