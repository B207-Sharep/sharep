import Commit from '@/components/Commit/Commit';
import React from 'react';

export default function CommitHistory() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 10 }}>
      <Commit
        description="
        도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가도커란 무엇인가"
        nickname="임서정"
        createdAt="2024-04-26"
        jobList={['FRONT_END', 'DESIGNER']}
        imageUrl="https://via.placeholder.com/1440x1024"
      />
      <Commit
        description="??!!!??"
        nickname="오상훈"
        createdAt="2024-04-26"
        jobList={['BACK_END', 'INFRA']}
        userImageUrl="https://xsgames.co/randomusers/assets/avatars/pixel/1.jpg"
      />
    </div>
  );
}
