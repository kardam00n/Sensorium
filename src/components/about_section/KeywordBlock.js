import React from 'react';
import { motion } from 'framer-motion';

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
    
      const listStyle = {
        color: "#D3D3D3",
        textAlign: "left",
        margin: "0 30px",
      };
    
      const listItemVariants = {
        hover: {
          scale: 1.05,
          opacity: 1,
          transition: {
            type: "spring",
            stiffness: 300,
            damping: 10,
            duration: 0.5,
          },
        },
        initial: {
          scale: 1,
          opacity: 0,
        },
      };

  // Określenie kierunku strzałki w zależności od kolumny
  const arrowStyle = {
    gridColumn: "1 / span 2",
    gridRow: gridRow,
    alignSelf: "center",
    justifySelf: "center",
    width: "30px",
    height: "30px",
    backgroundColor: "#D3D3D3",
    clipPath: gridColumn === "1" ? "polygon(0 0, 100% 50%, 0 100%)" : "polygon(100% 0, 0 50%, 100% 100%)", // Strzałka w prawo lub w lewo
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

      <motion.div
        className="arrow"
        style={arrowStyle}
        whileHover={{ scale: 1.1, backgroundColor: "#EFEFEF" }} 
      />

      <motion.div
        className="text-lg font-light tracking-wide"
        style={{
          ...listStyle,
          gridColumn: gridColumn === "1" ? "2" : "1",
          gridRow: gridRow,
          textAlign: gridColumn === "1" ? "left" : "right",
          alignSelf: "center",
        }}
        animate={listAnimateControl}
      >
        <ul>
          {listItems.map((item, index) => (
            <motion.li
              key={index}
              className="list-item"
              initial="initial"
              whileHover="hover"
              animate={{ opacity: listAnimateControl ? 1 : 0 }} // Animacja pojawiania listy
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 + index * 0.1 }}
              variants={listItemVariants}
            >
              {item}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </React.Fragment>
  );
};

export default KeywordBlock;
