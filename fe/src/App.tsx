import React from 'react';
import { GlobalStyle } from './styles';
import { Route, Routes } from 'react-router-dom';
import * as Page from './pages';
import { useLoadUser } from './customhooks';

function App() {
  const user = useLoadUser();
  // console.log(user, 'USER APP');
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

        <Route path="/projects/:projectId" element={<Page.TeamDashboard />} />
        <Route path="/projects/:projectId/members/:memberId" element={<Page.TeamMember />} />

        <Route path="/projects/:projectId/commit-history" element={<Page.CommitHistory />} />

        <Route path="/projects/:projectId/feature-manual" element={<Page.FeatureManual />} />
        <Route path="/projects/:projectId/api-manual" element={<Page.FeatureManual />} />
        <Route path="/projects/:projectId/screen-manual" element={<Page.ScreenManual />} />
        <Route path="/projects/:projectId/infra-manual" element={<Page.InfraManual />} />
      </Routes>
    </>
  );
}

export default App;
