import { InputWithLabel } from '@/components';
import { useEffect, useState } from 'react';
import * as S from '../Login/LoginStyle';
import * as G from '@/styles';
import MainColorBtn from '@/components/Button/MainColorBtn/MainColorBtn';
import { UserRound, Lock } from 'lucide-react';
export default function Register() {
  const [uname, setUname] = useState('');
  const [uid, setUid] = useState('');
  const [pw, setPw] = useState('');
  const [pwcheck, setPwcheck] = useState('');
  const [isValid, setIsValid] = useState(false);
  const isSame = pw === pwcheck;

  useEffect(() => {
    if (uid !== '' && isSame === true && uname !== '') {
      console.log('yes');
      setIsValid(true);
    }
  }, [uid, isSame, uname]);

  const checker = () => {
    console.log('CHECK', isSame, ' is val /??', isValid);
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
          <S.InputWrapper labelFor="name">
            <UserRound size={18} color={G.PALETTE.LIGHT_BLACK}></UserRound>
            <InputWithLabel.Input
              id="name"
              placeholder="이름"
              onChange={e => setUname(e.target.value)}
              value={uname}
              type="text"
            />
          </S.InputWrapper>
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
          <S.InputWrapper labelFor="pw">
            <Lock size={18} color={G.PALETTE.LIGHT_BLACK}></Lock>
            <InputWithLabel.Input
              id="pw"
              placeholder="비밀번호"
              onChange={e => setPw(e.target.value)}
              value={pw}
              type="password"
            />
          </S.InputWrapper>
          <S.InputWrapper labelFor="pwcheck">
            <Lock size={18} color={G.PALETTE.LIGHT_BLACK}></Lock>
            <InputWithLabel.Input
              id="pwcheck"
              placeholder="비밀번호확인"
              onChange={e => setPwcheck(e.target.value)}
              value={pwcheck}
              type="password"
            />
          </S.InputWrapper>
          {/* <S.Register>회원가입</S.Register> */}
        </S.InputContentWrapper>
        {/* <button disabled={false}>fdfd</button> */}
        <S.BtnWrapper onClick={checker}>
          <MainColorBtn disabled={false} bgc={true}>
            회원가입
          </MainColorBtn>
        </S.BtnWrapper>
      </S.CardWrapper>
    </S.Wrapper>
  );
}
