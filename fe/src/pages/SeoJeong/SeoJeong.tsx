import React from 'react';
import GalleryGridWrapper from '@/components/GalleryGridWrapper/GalleryGridWrapper';
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
  );
}
