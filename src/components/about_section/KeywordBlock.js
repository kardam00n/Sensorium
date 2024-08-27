import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Arrow from './Arrow';
import ListBlock from './ListBlock';

const KeywordBlock = ({
  keyword,
  listItems,
  gridRow,
  animateControl,
  listAnimateControl,
}) => {
  const gridColumn = gridRow % 2 === 1 ? '1' : '3';
  const initialX = gridColumn === '1' ? '-100' : '100';

  const keywordStyle = {
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
  };

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      className="keyword-block-container"
      style={{
        display: 'grid',
        gridTemplateColumns: windowWidth > 768 ? '1fr auto 1fr' : '1fr',
        gridTemplateRows: windowWidth > 768 ? '1fr' : '1fr auto 1fr',
        alignItems: 'center',
        padding: 10,
      }}
    >
      <motion.div
        style={{
          ...keywordStyle,
          fontSize: windowWidth > 768 ? '4vw' : '8vw',
          gridColumn: windowWidth > 768 ? gridColumn : '1',
          gridRow: '1',
          textAlign: windowWidth > 768 ? gridColumn === '1' ? 'right' : 'center' : 'center',
          justifySelf: windowWidth > 768 ? gridColumn === '1' ? 'end' : 'start' : 'center',
        }}
        initial={{ opacity: 0, x: initialX }}
        animate={animateControl}
        transition={{ duration: 2, ease: 'easeOut' }}
      >
        {keyword}
      </motion.div>

      <Arrow
        gridRow={gridRow}
        gridColumn={gridColumn}
        isVertical={windowWidth <= 768}
      />

      <ListBlock
        listItems={listItems}
        gridColumn={gridColumn}
        gridRow={gridRow}
        listAnimateControl={listAnimateControl}
        isVertical={windowWidth <= 768}
      />
    </div>
  );
};

export default KeywordBlock;
