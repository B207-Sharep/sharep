import { InputWithLabel } from '@/components';
import { useEffect, useState } from 'react';
import * as S from '../Login/LoginStyle';
import * as G from '@/styles';
import MainColorBtn from '@/components/Button/MainColorBtn/MainColorBtn';
import { UserRound, Lock } from 'lucide-react';
import { idDuplicateCheck } from '@/apis/accounts';
export default function Register() {
  const [uid, setUid] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const [idError, setIdError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');

  const [isIdCheck, setIsIdCheck] = useState(false); // 중복 검사를 했는지 안했는지
  const [isEmailCheck, setEmailCheck] = useState(false); // 중복 검사를 했는지 안했는지
  const [isIdAvailable, setIsIdAvailable] = useState(false); // 아이디 사용 가능한지 아닌지
  const [isEmailAvailable, setEmailAvailable] = useState(false); // 아이디 사용 가능한지 아닌지

  const onChangeIdHandler = (e: { target: { value: any } }) => {
    console.log('why?', uid);
    const idValue = e.target.value;
    setUid(idValue);
    idCheckHandler(idValue);
  };
  const onChangeEmailHandler = (e: { target: { value: any } }) => {
    console.log('email?', email);
    const emailValue = e.target.value;
    setEmail(emailValue);
    EmailCheckHandler(emailValue);
  };

  const onChangePasswordHandler = (e: { target: { id: any; value: any } }) => {
    const { id, value } = e.target;
    console.log('PW');
    if (id === 'pw') {
      setPassword(value);
      passwordCheckHandler(value, confirm);
    } else {
      setConfirm(value);
      passwordCheckHandler(password, value);
    }
  };

  const EmailCheckHandler = async (email: string) => {
    const emailRegex = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;

    if (email === '') {
      setEmailError('이메일을 입력해주세요.');
      setEmailAvailable(false);
      return false;
    } else if (!emailRegex.test(email)) {
      setEmailError('이메일 형식에 맞게 입력해주세요');
      setEmailAvailable(false);
      return false;
    }
    try {
      setEmailError('사용 가능한 이메일 입니다.');
      setEmailCheck(true);
      setEmailAvailable(true);
      //   const responseData = await idDuplicateCheck(id);
      //   if (responseData) {
      //     setIdError('사용 가능한 아이디입니다.');
      //     setIsIdCheck(true);
      //     setIsIdAvailable(true);
      //     return true;
      //   } else {
      //     setIdError('이미 사용중인 아이디입니다.');
      //     setIsIdAvailable(false);
      //     return false;
      //   }
    } catch (error) {
      alert('서버 오류입니다. 관리자에게 문의하세요.');
      console.error(error);
      return false;
    }
  };

  const idCheckHandler = async (id: string) => {
    // const idRegex = /^[a-z\d]{5,10}$/;
    if (id === '') {
      setIdError('닉네임을 입력해주세요.');
      setIsIdAvailable(false);
      return false;
    }
    console.log(id, 'here');
    try {
      //   setIdError('사용 가능한 닉네임입니다.');
      //   setIsIdCheck(true);
      //   setIsIdAvailable(true);
      const responseData = await idDuplicateCheck(id);
      console.log(responseData, 'respnonse');
      if (responseData) {
        setIdError('사용 가능한 아이디입니다.');
        setIsIdCheck(true);
        setIsIdAvailable(true);
        return true;
      } else {
        setIdError('이미 사용중인 아이디입니다.');
        setIsIdAvailable(false);
        return false;
      }
    } catch (error) {
      alert('서버 오류입니다. 관리자에게 문의하세요.');
      console.error(error);
      return false;
    }
  };

  const passwordCheckHandler = (password: string, confirm: string) => {
    const passwordRegex = /^[a-z\d!@*&-_]{8,16}$/;
    if (password === '') {
      setPasswordError('비밀번호를 입력해주세요.');
      return false;
    } else if (!passwordRegex.test(password)) {
      setPasswordError('비밀번호는 8~16자의 영소문자, 숫자, !@*&-_만 입력 가능합니다.');
      return false;
    } else if (confirm !== password) {
      setPasswordError('');
      setConfirmError('비밀번호가 일치하지 않습니다.');
      return false;
    } else {
      setPasswordError('');
      setConfirmError('');
      return true;
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
          <S.InputWrapper labelFor="name">
            <UserRound size={18} color={G.PALETTE.LIGHT_BLACK}></UserRound>
            <InputWithLabel.Input id="name" placeholder="이름" onChange={onChangeIdHandler} value={uid} type="text" />
          </S.InputWrapper>
          {idError && <small className={isIdAvailable ? 'idAvailable' : ''}>{idError}</small>}
          <S.InputWrapper labelFor="email">
            <UserRound size={18} color={G.PALETTE.LIGHT_BLACK}></UserRound>
            <InputWithLabel.Input
              id="email"
              placeholder="이메일"
              onChange={onChangeEmailHandler}
              value={email}
              type="text"
            />
          </S.InputWrapper>
          {emailError && <small className={isEmailAvailable ? 'emailAvailable' : ''}>{emailError}</small>}
          <S.InputWrapper labelFor="pw">
            <Lock size={18} color={G.PALETTE.LIGHT_BLACK}></Lock>
            <InputWithLabel.Input
              id="pw"
              placeholder="비밀번호"
              onChange={onChangePasswordHandler}
              value={password}
              type="password"
            />
          </S.InputWrapper>
          {passwordError && <small>{passwordError}</small>}
          <S.InputWrapper labelFor="pwcheck">
            <Lock size={18} color={G.PALETTE.LIGHT_BLACK}></Lock>
            <InputWithLabel.Input
              id="pwcheck"
              placeholder="비밀번호ddddefewwefwefwef확인"
              onChange={onChangePasswordHandler}
              value={confirm}
              type="password"
            />
          </S.InputWrapper>
          {confirmError && <small>{confirmError}</small>}
          {/* <S.Register>회원가입</S.Register> */}
        </S.InputContentWrapper>
        {/* <button disabled={false}>fdfd</button> */}
        <S.BtnWrapper>
          <MainColorBtn disabled={false} bgc={true}>
            회원가입
          </MainColorBtn>
        </S.BtnWrapper>
      </S.CardWrapper>
    </S.Wrapper>
  );
}
