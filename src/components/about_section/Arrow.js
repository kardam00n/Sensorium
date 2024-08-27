import React from 'react';
import { motion } from 'framer-motion';

const Arrow = ({ gridRow, gridColumn, isVertical }) => {
    const arrowStyle = {
        gridColumn: isVertical ? '1' : '2', // Kolumna środkowa
        gridRow: isVertical ? '2' : '1',   // Wiersz środkowy
        alignSelf: 'center',
        justifySelf: 'center',
        width: '30px',
        height: '30px',
        margin: '10px 0 10px 0',
        backgroundColor: '#D3D3D3',
        clipPath: isVertical
            ? 'polygon(0 0, 100% 50%, 0 100%)'
            : gridColumn === '1'
                ? 'polygon(0 0, 100% 50%, 0 100%)'
                : 'polygon(100% 0, 0 50%, 100% 100%)',
        transform: isVertical ? 'rotate(90deg)' : 'none',
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
