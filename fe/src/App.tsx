import React from 'react';
import { GlobalStyle } from './styles';
import { Route, Routes } from 'react-router-dom';
import * as Page from './pages';

function App() {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Page.Main />} />
        <Route path="/seo-jeong" element={<Page.SeoJeong />} />
        <Route path="/sung-gu" element={<Page.SungGu />} />
        <Route path="/sung-je" element={<Page.SungJe />} />
        <Route path="/login" element={<Page.Login />} />
        <Route path="/register" element={<Page.Register />} />
        <Route path="/projects" element={<Page.Mypage />} />
        {/* 나중에 사용자 이름으로 바꿔 */}

        <Route path="/projects/:project-id" element={<Page.TeamDashboard />} />
        <Route path="/projects/:project-id/members/:member-id" element={<Page.TeamMember />} />

        <Route path="/projects/:project-id/commit-history" element={<Page.CommitHistory />} />

        <Route path="/projects/:project-id/feature-manual" element={<Page.FeatureManual />} />
        <Route path="/projects/:project-id/api-manual" element={<Page.FeatureManual />} />
        <Route path="/projects/:project-id/screen-manual" element={<Page.ScreenManual />} />
        <Route path="/projects/:project-id/screen-manual/:manual-id" element={<Page.ScreenManualDetail />} />
        <Route path="/projects/:project-id/infra-manual" element={<Page.InfraManual />} />
      </Routes>
    </>
  );
}

export default App;
