import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as S from '../../pages/Main/MainStyle';
import * as CS from './CarouselStyle';

const Carousel = ({ children }: { children: any }) => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const handleDotClick = (idx: number) => {
    console.log('what', idx);
    setCurrentIndex(idx);
  };

  return (
    <S.MonitorWrapper>
      <S.Monitor id="monitor">
        <S.CameraWrapper>
          {[0, 1, 2].map(index => (
            <CS.Dot
              key={index}
              onClick={() => handleDotClick(index)} // 클릭 핸들러 연결
              isSelected={currentIndex === index} // 선택 여부에 따라 isSelected prop 전달
            ></CS.Dot>
          ))}
        </S.CameraWrapper>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{ width: '100%', height: '100%' }}
        >
          {children[currentIndex]}
        </motion.div>
      </S.Monitor>
    </S.MonitorWrapper>
  );
};

export default Carousel;
