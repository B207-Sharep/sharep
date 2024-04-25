import React from 'react';
import { CommitProps } from '../../types';
import { CommitBox, Text } from './CommitStyle';
import { ChevronDown } from 'lucide-react';
import { PALETTE } from '../../styles/globals';

export default function Commit({}: CommitProps) {
  return (
    <CommitBox>
      <div
        style={{
          alignSelf: 'stretch',
          paddingLeft: 24,
          paddingRight: 24,
          paddingTop: 16,
          paddingBottom: 16,
          borderTopLeftRadius: 6,
          borderTopRightRadius: 6,
          justifyContent: 'flex-start',
          alignItems: 'center',
          gap: 24,
          display: 'inline-flex',
        }}
      >
        <div style={{ height: 21, justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'flex' }}>
          <div
            style={{
              paddingLeft: 5,
              paddingRight: 5,
              paddingTop: 8,
              paddingBottom: 8,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-start',
              gap: 10,
              display: 'inline-flex',
            }}
          >
            <ChevronDown />
          </div>
        </div>
        <div
          style={{
            flex: '1 1 0',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            gap: 10,
            display: 'inline-flex',
          }}
        >
          <div
            style={{
              alignSelf: 'stretch',
              height: 24,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-start',
              gap: 10,
              display: 'flex',
            }}
          >
            <div
              style={{
                color: '#1F2328',
                fontSize: 15.5,
                fontFamily: 'Noto Sans',
                fontWeight: '500',
                lineHeight: 24,
                wordWrap: 'break-word',
              }}
            >
              돚커란 무엇인가
            </div>
          </div>
          <div
            style={{
              alignSelf: 'stretch',
              height: 18,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-start',
              gap: 10,
              display: 'flex',
            }}
          >
            <div
              style={{
                alignSelf: 'stretch',
                paddingLeft: 1,
                paddingRight: 1,
                justifyContent: 'flex-start',
                alignItems: 'center',
                gap: 8,
                display: 'inline-flex',
              }}
            >
              <div
                style={{
                  height: 16,
                  boxShadow: '0px 0px 0px 1px rgba(31, 35, 40, 0.15)',
                  borderRadius: 8,
                  overflow: 'hidden',
                  backgroundImage: 'url(https://via.placeholder.com/16x16)',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 10,
                  display: 'inline-flex',
                }}
              >
                <img style={{ width: 16, height: 16 }} src="https://via.placeholder.com/16x16" />
              </div>
              <Text color={PALETTE.LIGHT_BLACK} fontSize={4}>
                임서정
              </Text>
              <div style={{ justifyContent: 'flex-start', alignItems: 'flex-start', gap: 4, display: 'flex' }}>
                {/* Job Badge */}
              </div>
              <div
                style={{
                  width: 51.56,
                  height: 18,
                  color: '#636C76',
                  fontSize: 10.5,
                  wordWrap: 'break-word',
                }}
              >
                committed
              </div>
              <div
                style={{
                  width: 72.92,
                  height: 18,
                  color: '#636C76',
                  fontSize: 11.81,
                  wordWrap: 'break-word',
                }}
              >
                2 hours ago
              </div>
            </div>
          </div>
        </div>
      </div>
    </CommitBox>
  );
}
