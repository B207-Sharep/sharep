import React from 'react';
import { connections } from '@/stores';
import { useRecoilState } from 'recoil';

export default function useDataChannels() {
  const [dataChannelList, setDataChannelList] = useRecoilState(connections);

  const addCodeDataChannel = (socketId: string, dataChannel: RTCDataChannel) => {
    setDataChannelList(previous => {
      return [...previous, { id: socketId, dataChannel }];
    });
  };

  const removeCodeDataChannel = (socketId: string) => {
    setDataChannelList(previous => {
      return previous.filter(({ id }) => id !== socketId);
    });
  };

  return { addCodeDataChannel, removeCodeDataChannel };
}
