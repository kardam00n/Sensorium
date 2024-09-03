import React from 'react';
import { motion } from 'framer-motion';

const ListBlock = ({
    listItems,
    gridColumn,
    gridRow,
    isInView,
    isVertical,
}) => {
    const listStyle = {
        color: '#D3D3D3',
        textAlign: 'left',
        margin: '0 30px',
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
            }}
            animate={
                isInView ?
                    { opacity: 1 }
                    :
                    { opacity: 0 }
            }
            transition={
                isInView ?
                    {
                        duration: 2.5,
                        delay: 0.5 + gridRow * 0.5,
                    }
                    :
                    {
                        duration: 0,
                        delay: 0
                    }
            }
        >
            <ul>
                {listItems.map((item, index) => (
                    <motion.li
                        key={index}
                        className="list-item text-1xl"
                        whileHover={{ scale: 1.05 }}
                        transition={{
                            duration: 0.3,
                            ease: 'easeOut',
                        }}
                    >
                        {item}
                    </motion.li>
                ))}
            </ul>
        </motion.div>
    );
};

export default ListBlock;
