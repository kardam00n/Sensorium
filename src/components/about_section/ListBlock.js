import React from 'react';
import { motion } from 'framer-motion';

const ListBlock = ({
    listItems,
    gridColumn,
    gridRow,
    listAnimateControl,
    isVertical,
}) => {
    const listStyle = {
        color: '#D3D3D3',
        textAlign: 'left',
        margin: '0 30px',
    };

    const listItemVariants = {
        hover: {
            scale: 1.05,
            opacity: 1,
            transition: {
                type: 'spring',
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

    return (
        <motion.div
            className="text-lg font-light tracking-wide"
            style={{
                ...listStyle,
                gridColumn: isVertical ? '1' : gridColumn === '1' ? '3' : '1',
                gridRow: isVertical ? '3' : '1',
                textAlign: isVertical ? 'left' : gridColumn === '1' ? 'left' : 'right',
                alignSelf: 'center',
                fontSize: isVertical ? '2.8vw' : '1.1vw',
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
                        animate={{ opacity: listAnimateControl ? 1 : 0 }}
                        transition={{
                            duration: 1,
                            ease: 'easeOut',
                            delay: 0.2 + index * 0.1,
                        }}
                        variants={listItemVariants}
                    >
                        {item}
                    </motion.li>
                ))}
            </ul>
        </motion.div>
    );
};

export default ListBlock;
