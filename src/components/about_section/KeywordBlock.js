import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Arrow from './Arrow';
import ListBlock from './ListBlock';

const ANIMATION_DURATION = 1; // Duration for the color and y animation cycle
const ANIMATION_DELAY = 0.5; // Delay between each keyword animation based on gridRow
const INITIAL_ANIMATION_DURATION = 2; // Initial animation duration for the keyword appearance

const KeywordBlock = ({ keyword, listItems, gridRow, isInView, numberOfKeywords }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const gridColumn = gridRow % 2 === 1 ? '1' : '3';
  const initialX = gridColumn === '1' ? -300 : 300;
  const isDesktopView = windowWidth > 768;
  const keywordStyle = getKeywordStyle(isDesktopView, gridColumn);
  const motionProps = getMotionProps(isInView, gridRow, initialX, numberOfKeywords);

  return (
    <div className="keyword-block-container" style={getContainerStyle(isDesktopView)}>
      <motion.div {...motionProps} style={keywordStyle}>
        {keyword}
      </motion.div>

      <Arrow gridRow={gridRow} gridColumn={gridColumn} isVertical={!isDesktopView} />

      <ListBlock
        listItems={listItems}
        gridColumn={gridColumn}
        gridRow={gridRow}
        isInView={isInView}
        isVertical={!isDesktopView}
      />
    </div>
  );
};

const getContainerStyle = (isDesktopView) => ({
  display: 'grid',
  gridTemplateColumns: isDesktopView ? '1fr auto 1fr' : '1fr',
  gridTemplateRows: isDesktopView ? '1fr' : '1fr auto 1fr',
  alignItems: 'center',
  padding: '0.5vh',
});

const getKeywordStyle = (isDesktopView, gridColumn) => ({
  fontWeight: 'bold',
  textTransform: 'uppercase',
  lineHeight: '1.2',
  whiteSpace: 'normal',
  overflow: 'visible',
  minWidth: '150px',
  textAlign: 'center',
  color: '#D3D3D3',
  padding: '0 0px',
  position: 'relative',
  display: 'inline-block',
  margin: '0 1.5vw',
  fontSize: isDesktopView ? '4vw' : '9vw',
  gridColumn: isDesktopView ? gridColumn : '1',
  gridRow: '1',
  textAlign: isDesktopView ? (gridColumn === '1' ? 'right' : 'center') : 'center',
  justifySelf: isDesktopView ? (gridColumn === '1' ? 'end' : 'start') : 'center',
});

const getMotionProps = (isInView, gridRow, initialX, numberOfKeywords) => {
  const commonTransition = {
    duration: ANIMATION_DURATION,
    delay: INITIAL_ANIMATION_DURATION + numberOfKeywords * ANIMATION_DELAY + (gridRow - 1) * ANIMATION_DURATION,
    repeat: Infinity,
    repeatDelay: ANIMATION_DURATION * (numberOfKeywords - 1),
    repeatType: 'loop',
  };

  return {
    initial: { opacity: 0, x: initialX, color: '#ffffff' },
    animate: isInView
      ? {
        opacity: 1,
        x: 0,
        color: ['#ffffff', '#ff4500', '#ff4500', '#ffffff'],
        y: [0, -5, -5, 0],
      }
      : {
        opacity: 0,
        x: initialX,
        color: '#ffffff',
      },
    transition: isInView
      ? {
        duration: INITIAL_ANIMATION_DURATION,
        delay: gridRow * ANIMATION_DELAY,
        color: commonTransition,
        y: commonTransition,
      }
      : {
        duration: 0,
        delay: 0,
      },
  };
};

export default KeywordBlock;
