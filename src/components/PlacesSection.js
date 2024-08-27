import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';

const PlacesSection = () => {
  const [expandedCard, setExpandedCard] = useState(null);
  const controls = useAnimation();
  const textRef = useRef(null);

  const headingVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 150, damping: 25, duration: 1.2 } },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.4 },
    }),
  };

  const checkInView = useCallback(() => {
    if (textRef.current) {
      const rect = textRef.current.getBoundingClientRect();
      const isInView = rect.top < window.innerHeight && rect.bottom > 0;
      if (isInView) {
        controls.start('visible');
      } else {
        controls.start('hidden');
      }
    }
  }, [controls]);

  useEffect(() => {
    window.addEventListener('scroll', checkInView);
    checkInView();

    return () => window.removeEventListener('scroll', checkInView);
  }, [checkInView]);

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

  useEffect(() => {
    controls.start('visible');
  }, [controls]);

  return (
    <section id="places" className="py-40 bg-black text-white">
      <div className="container mx-auto px-8">
        <div className="text-center mb-40">
          <motion.h2
            ref={textRef}
            className="text-9xl mb-6 inline-block font-bold font-sans-serif"        
            variants={headingVariants}
            animate={controls}
          >
            {splitText('Nasze miejsca')}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 relative">
          <LocationCard
            title="Sensorium_artlab"
            description="Galeria sztuki, w której prezentowane będą prace z nurtu art&science, dwóch pozornie różnych światów, które jednak doskonale współpracują, dając zaskakujące, nowatorskie projekty."
            fullDescription="Galeria sztuki, w której prezentowane będą prace z nurtu art&science, dwóch pozornie różnych światów, które jednak doskonale współpracują, dając zaskakujące, nowatorskie projekty. W przestrzeni zobaczymy prace artystów, inżynierów, naukowców, którzy eksplorują granice kreatywności i wiedzy. To miejsce ożywa dzięki nowym technologiom i artystycznym poszukiwaniom, tworząc dynamiczną przestrzeń dla kreatywnych eksploracji."
            details={[
              { label: "Lokalizacja", value: "Wydział Informatyki AGH, ul. Kawiory 21, Kraków" },
              { value: "Galeria powstała we współpracy z AGH w Krakowie oraz Fundacją Nówka Sztuka." }
            ]}
            imageSrc="/place4.jpg"
            isExpanded={expandedCard === "Sensorium_artlab"}
            onClick={() => setExpandedCard(expandedCard === "Sensorium_artlab" ? null : "Sensorium_artlab")}
          />

          <LocationCard
            title="Pałac sztuki w Krakowie"
            description="Pałac Sztuki w Krakowie jest siedzibą powstałego w 1854 r. Towarzystwa Przyjaciół Sztuk Pięknych."
            fullDescription="Pałac Sztuki w Krakowie jest siedzibą powstałego w 1854 r. Towarzystwa Przyjaciół Sztuk Pięknych. To zabytkowy budynek, który nie tylko prezentuje dzieła sztuki, ale także jest miejscem spotkań artystów i miłośników sztuki z całej Polski i poza jej granicami. Budynek łączy w sobie historię z nowoczesnością."
            details={[
              { label: "Adres", value: "Plac Szczepański 4, 31-011 Kraków" },
              { label: "Tel/Fax", value: "+ 48 12 422 66 16" },
              { label: "Godziny otwarcia", value: "Wt-Pt: 10-18, Sb-Nd: 10-18" },
              { label: "Strona", value: "http://palac-sztuki.krakow.pl", isLink: true }
            ]}
            imageSrc="/place2.jpg"
            isExpanded={expandedCard === "Pałac sztuki w Krakowie"}
            onClick={() => setExpandedCard(expandedCard === "Pałac sztuki w Krakowie" ? null : "Pałac sztuki w Krakowie")}
          />
        </div>
      </div>
    </section>
  );
};

const LocationCard = ({ title, description, fullDescription, details, imageSrc, isExpanded, onClick }) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: { scale: 1.03, y: -10 },
    expanded: { opacity: 1, scale: 1, transition: { duration: 0.3 } }
  };

  return (
    <AnimatePresence>
      <motion.div
        layout
        variants={containerVariants}
        initial="hidden"
        animate={isExpanded ? "expanded" : "visible"}
        whileHover={isExpanded ? {} : "hover"}
        transition={{ duration: 0.3 }}
        onClick={onClick}
        className={`
          rounded-xl overflow-hidden flex flex-col transition-all duration-300 cursor-pointer
          ${isExpanded
            ? 'fixed inset-0 z-50 m-auto w-[90vw] h-[90vh] max-w-6xl max-h-[90vh]'
            : 'relative border-2'
          }
        `}
        style={{
          backgroundColor: '#1c1c1c',
          borderColor: isExpanded ? 'transparent' : '#1c1c1c',
        }}
      >
        <motion.div
          layout
          className={`relative ${isExpanded ? 'h-[60%]' : 'h-[400px]'}`}
        >
          <img src={imageSrc} alt={title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex items-end justify-start p-6">
            <h3 className="text-4xl lg:text-5xl font-bold text-white">{title}</h3>
          </div>
        </motion.div>
        <motion.div
          layout
          className={`p-6 flex-grow flex flex-col ${isExpanded ? 'overflow-y-auto' : ''}`}
        >
          <p className="text-gray-200 text-lg mb-4 flex-grow">
            {isExpanded ? fullDescription : description}
          </p>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-2 mt-auto"
            >
              {Array.isArray(details) &&
                details.map((detail, index) => (
                  <p key={index} className="text-gray-200 text-lg">
                    {detail.label && (
                      <span className="font-semibold">{detail.label}:{' '}</span>
                    )}
                    {detail.isLink ? (
                      <a href={detail.value} className="text-blue-400 hover:underline">
                        {detail.value}
                      </a>
                    ) : (
                      detail.value
                    )}
                  </p>
                ))}
            </motion.div>
          )}
        </motion.div>
        {isExpanded && (
          <button
            onClick={(e) => { e.stopPropagation(); onClick(); }}
            className="absolute top-4 right-4 text-white text-4xl"
          >
            &times;
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default PlacesSection;