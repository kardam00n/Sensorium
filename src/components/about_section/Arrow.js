import React from 'react';
import { motion } from 'framer-motion';

const Arrow = ({ gridRow, gridColumn }) => {
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
        <motion.div
            className="arrow"
            style={arrowStyle}
            whileHover={{ scale: 1.1, backgroundColor: "#EFEFEF" }}
        />
    );
};

export default Arrow;
