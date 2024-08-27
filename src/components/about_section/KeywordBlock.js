import React from 'react';
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
  const gridColumn = (gridRow % 2 === 1) ? "1" : "2";
  const initialX = (gridColumn === "1") ? "-100" : "100";

  const keywordStyle = {
    fontWeight: "bold",
    textTransform: "uppercase",
    lineHeight: "1.2",
    whiteSpace: "normal",
    overflow: "visible",
    minWidth: "150px",
    textAlign: "center",
    color: "#D3D3D3",
    padding: "0 0px",
    position: "relative",
    display: "inline-block",
    margin: "0 30px",
  };

  return (
    <React.Fragment>
      <motion.div
        style={{
          ...keywordStyle,
          fontSize: "4vw",
          gridColumn: gridColumn,
          gridRow: gridRow,
          alignSelf: "center",
          textAlign: gridColumn === "1" ? "right" : "left",
          justifySelf: gridColumn === "1" ? "end" : "start",
        }}
        initial={{ opacity: 0, x: initialX }}
        animate={animateControl}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        {keyword}
      </motion.div>

      <Arrow gridRow={gridRow} gridColumn={gridColumn} />

      <ListBlock
        listItems={listItems}
        gridColumn={gridColumn}
        gridRow={gridRow}
        listAnimateControl={listAnimateControl}
      />
    </React.Fragment>
  );
};

export default KeywordBlock;
