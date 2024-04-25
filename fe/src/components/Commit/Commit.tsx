import React from 'react';
import { CommitContent, CommitMessage, CommitUserInfo, CommitWrapper, Img, JobBadgeList, Text } from './CommitStyle';
import { ChevronDown } from 'lucide-react';
import { PALETTE } from '@/styles';
import { CommitProps } from '@/types';

export default function Commit({}: CommitProps) {
  return (
    <CommitWrapper>
      <ChevronDown />
      <CommitContent>
        <CommitMessage>
          <Text color={PALETTE.SUB_BLACK} fontWeight={500}>
            도커란 무엇인가
          </Text>
        </CommitMessage>

        <CommitUserInfo>
          <Img width={16} height={16} radius={8} src="https://via.placeholder.com/16x16" />

          <Text color={PALETTE.LIGHT_BLACK} fontSize={10}>
            임서정
          </Text>
          <JobBadgeList>{/* Job Badge */}</JobBadgeList>
          <Text color={PALETTE.LIGHT_BLACK} fontSize={10}>
            committed
          </Text>
          <Text color={PALETTE.LIGHT_BLACK} fontSize={10}>
            2 hours ago
          </Text>
        </CommitUserInfo>
      </CommitContent>
      <Img width={60} height={60} radius={10} src="https://via.placeholder.com/60x60" />
    </CommitWrapper>
  );
}
