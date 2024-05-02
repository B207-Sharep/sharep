import React from 'react';
import { GlobalStyle } from './styles';
import { Route, Routes } from 'react-router-dom';
import * as Page from './pages';

function App() {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<div>main</div>} />
        <Route path="/seo-jeong" element={<Page.SeoJeong />} />
        <Route path="/sung-gu" element={<Page.SungGu />} />
        <Route path="/sung-je" element={<Page.SungJe />} />

        <Route path="/projects/:project-id/team-dashboard" element={<Page.TeamDashboard />} />
        <Route path="/:project-id/feature-manual" element={<Page.FeatureManual />} />
        <Route path="/:project-id/team" element={<div>팀 대쉬보드 페이지</div>} />
        <Route path="/:project-id/team/member/:member-id" element={<Page.TeamMember />} />
        <Route path="/login" element={<Page.Login />} />
        <Route path="/register" element={<Page.Register />} />
        {/* 나중에 사용자 이름으로 바꿔 */}
        <Route path="/mypage" element={<Page.Mypage />} />
        <Route path="/:project-id/screen-manual" element={<Page.ScreenManual />} />
        <Route path="/:project-id/infra-manual" element={<Page.InfraManual />} />
        <Route path="/:project-id/history" element={<Page.CommitHistory />} />
      </Routes>
    </>
  );
}

export default App;
