import GalleryGridWrapper from '@/components/GalleryGridWrapper/GalleryGridWrapper';
import { PALETTE } from '@/styles';
import React from 'react';
import CommitHistory from '../CommitHistory/CommitHistory';
import { SideBar } from '@/components';

export default function SeoJeong() {
  return (
    <div
      style={{
        margin: 'auto',
        width: '100%',
        height: '100%',
        display: 'flex',
        gap: 10,
      }}
    >
      <SideBar />
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#f7f7f7',
          padding: '25px',
        }}
      >
        <GalleryGridWrapper />
        {/* <CommitHistory /> */}
      </div>
    </div>
    // 작업 기록 리스트 페이지
  );
}
