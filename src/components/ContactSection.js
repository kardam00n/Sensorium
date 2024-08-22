import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

const ContactSection = () => {
  const controls = useAnimation();
  const textRef = useRef(null);

  const headingVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 150, damping: 25, duration: 1.2 } },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.4,
      },
    }),
  };

  const checkInView = () => {
    if (textRef.current) {
      const rect = textRef.current.getBoundingClientRect();
      const isInView = rect.top < window.innerHeight && rect.bottom > 0;

      if (isInView) {
        controls.start('visible');
      } else {
        controls.start('hidden');
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', checkInView);
    checkInView();

    return () => window.removeEventListener('scroll', checkInView);
  }, [controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  const iconVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  const splitText = (text) => {
    return text.split('').map((char, index) => (
      <motion.span
        key={index}
        variants={letterVariants}
        custom={index}
      >
        {char}
      </motion.span>
    ));
  };

  return (
    <section id="contact" className="py-32 bg-gradient-to-b from-blue-50 to-purple-50">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-2xl ml-0"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="text-left mb-12">
            <motion.h2
              ref={textRef}
              className="text-6xl mb-6 text-black inline-block"
              variants={headingVariants}
              animate={controls}
            >
              {splitText('Kontakt')}
            </motion.h2>
          </div>
          <motion.div variants={itemVariants} className="flex mb-8">
            <motion.div
              variants={iconVariants}
              className="mr-3"
              whileHover={{ scale: 1.2 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </motion.div>
            <p className="text-gray-600 text-xl">
              <span className="font-semibold">Email: </span>
              <a href="mailto:fundacjanowkisztuki@gmail.com" className="hover:text-blue-500 hover:underline">fundacjanowkisztuki@gmail.com</a>
              <br />
              <a href="mailto:targi.nowka@gmail.com" className="hover:text-blue-500 hover:underline">targi.nowka@gmail.com</a>
            </p>
          </motion.div>
          <motion.div variants={itemVariants} className="flex mb-8">
            <motion.div
              variants={iconVariants}
              className="mr-3"
              whileHover={{ scale: 1.2 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </motion.div>
            <motion.div variants={itemVariants} className="flex mb-8">
              <p className="text-gray-600 text-xl">
                <span className="font-semibold">Adres: </span>
                <a
                  href="https://www.google.com/maps?q=30-519+Krak%C3%B3w,+ul.+Zamoyskiego+27/22"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-500 hover:underline"
                >
                  30-519 Kraków, ul. Zamoyskiego 27/22
                </a>
              </p>
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex mb-8">
            <motion.div
              variants={iconVariants}
              className="mr-3"
              whileHover={{ scale: 1.2 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-600" fill="currentColor" viewBox="0 0 16 16" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.1} d="m8 0 6.61 3h.89a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H15v7a.5.5 0 0 1 .485.38l.5 2a.498.498 0 0 1-.485.62H.5a.498.498 0 0 1-.485-.62l.5-2A.5.5 0 0 1 1 13V6H.5a.5.5 0 0 1-.5-.5v-2A.5.5 0 0 1 .5 3h.89zM3.777 3h8.447L8 1zM2 6v7h1V6zm2 0v7h2.5V6zm3.5 0v7h1V6zm2 0v7H12V6zM13 6v7h1V6zm2-1V4H1v1zm-.39 9H1.39l-.25 1h13.72z" />
              </svg>
            </motion.div>
            <div className="text-gray-600 text-xl">
              <p>
                <span className="font-semibold">Numer konta: </span>
                12 3456 7890 1234 5678 9012 3456
              </p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex mb-8">
            <p className="text-gray-600 text-xl text-left">
              <span className="font-semibold">KRS</span> 0000613974
              <br /> <span className="font-semibold">NIP</span> 6772403037
              <br /> <span className="font-semibold">REGON</span> 364429126
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;


