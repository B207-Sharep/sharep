import React from 'react';
import * as S from './MainStyle';
import * as Comp from '@components';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

export default function Main() {
  const navigate = useNavigate();

  const handleHistoryClick = () => {
    navigate('/projects/1/commit-history');
  };

  const handleTeamDashClick = () => {
    navigate('/projects/1');
  };
  const handleMyDashClick = () => {
    navigate('/projects');
  };
  const handleFeatureManualClick = () => {
    navigate('/projects/1/feature-manual');
  };
  const handleAPIClick = () => {
    navigate('/projects/1/api-manual');
  };
  const handleScreenClick = () => {
    navigate('/projects/1/screen-manual');
  };
  const handleInfraClick = () => {
    navigate('/projects/1/infra-manual');
  };
  return (
    <S.Wrapper>
      <Link to={'/login'}>
        <Comp.MainColorBtn bgc={true} disabled={false}>
          로그인 하기
        </Comp.MainColorBtn>
      </Link>
      <Link to={'/register'}>
        <Comp.MainColorBtn bgc={true} disabled={false}>
          회원가입 하기
        </Comp.MainColorBtn>
      </Link>
      <Link to={'/projects'}>
        <Comp.MainColorBtn bgc={true} disabled={false}>
          마이 프로필
        </Comp.MainColorBtn>
      </Link>
      <Link to={'/projects/1'}>
        <Comp.MainColorBtn bgc={true} disabled={false}>
          팀 대시보드 기기
        </Comp.MainColorBtn>
      </Link>
      <Link to={'/projects/1/members/1'}>
        <Comp.MainColorBtn bgc={true} disabled={false}>
          팀원 대시보드 기기
        </Comp.MainColorBtn>
      </Link>
      <Link to={'/projects/1/feature-manual'}>
        <Comp.MainColorBtn bgc={true} disabled={false}>
          기능 명세서
        </Comp.MainColorBtn>
      </Link>
      <Link to={'/projects/1/api-manual'}>
        <Comp.MainColorBtn bgc={true} disabled={false}>
          API 명세서
        </Comp.MainColorBtn>
      </Link>
      <Link to={'/projects/1/infra-manual'}>
        <Comp.MainColorBtn bgc={true} disabled={false}>
          인프라 명세서
        </Comp.MainColorBtn>
      </Link>
      <Link to={'/projects/1/screen-manual'}>
        <Comp.MainColorBtn bgc={true} disabled={false}>
          화면 정의서
        </Comp.MainColorBtn>
      </Link>
      <Link to={'/projects/1/commit-history'}>
        <Comp.MainColorBtn bgc={true} disabled={false}>
          작업 히스토리 페이지
        </Comp.MainColorBtn>
      </Link>
    </S.Wrapper>
  );
}
