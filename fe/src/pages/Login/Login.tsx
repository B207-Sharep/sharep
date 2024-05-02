import { InputWithLabel } from '@/components';
import React, { useState } from 'react';
import * as S from './LoginStyle';
import * as G from '@/styles';
import MainColorBtn from '@/components/Button/MainColorBtn/MainColorBtn';
import { UserRound, Lock } from 'lucide-react';
import { useNavigate } from 'react-router';
import { login } from '@/apis/accounts';
export default function Login() {
  const [uid, setUid] = useState('');
  const [pw, setPw] = useState('');
  const [loginError, setloginError] = useState('');

  const navigate = useNavigate();

  const registerClick = () => {
    navigate('/register');
  };

  const loginClick = async () => {
    if (uid === '' || pw === '') {
      return false;
    }
    try {
      console.log(uid, pw);
      const res = await login(uid, pw);
      if (res) {
        console.log(res.data.apiToken);
        setloginError('');
        localStorage.setItem('token', res.data.apiToken);
        navigate('/mypage');
      } else {
        console.log('ERROR');
      }
    } catch (error) {
      console.log('EEEEEEEEEEEEEEEEEEEEEEEEEEEEE');
      setloginError('정보가 일치하지 않습니다.');
    }
  };

  return (
    <S.Wrapper>
      <S.CardWrapper>
        <S.LogoWrapper>
          <S.Logo></S.Logo>
          <S.SloganWrapper>
            <S.Slogan>하나의 레시피에서 출발하는 프로젝트의 완성</S.Slogan>로그인후 서비스를 이용해보세요
          </S.SloganWrapper>
        </S.LogoWrapper>
        <S.InputContentWrapper>
          <S.InputWrapper labelFor="test">
            <UserRound size={18} color={G.PALETTE.LIGHT_BLACK}></UserRound>
            <InputWithLabel.Input
              id="test"
              placeholder="이메일"
              onChange={e => setUid(e.target.value)}
              value={uid}
              type="text"
            />
          </S.InputWrapper>
          <S.InputWrapper labelFor="test">
            <Lock size={18} color={G.PALETTE.LIGHT_BLACK}></Lock>
            <InputWithLabel.Input
              id="test"
              placeholder="비밀번호"
              onChange={e => setPw(e.target.value)}
              value={pw}
              type="password"
            />
          </S.InputWrapper>
          <S.Register onClick={registerClick}>회원가입</S.Register>
        </S.InputContentWrapper>
        {loginError && <small style={{ color: 'red' }}>{loginError}</small>}
        <S.BtnWrapper onClick={loginClick}>
          <MainColorBtn disabled={false} bgc={true}>
            로그인
          </MainColorBtn>
        </S.BtnWrapper>
      </S.CardWrapper>
    </S.Wrapper>
  );
}
