import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const TeamSection = ({ backgroundImage = '/bg4.jpg' }) => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], ["20%", "0%", "0%", "-20%"]);

  const teamMembers = [
    {
      id: 1,
      name: 'Prof. Alicja Panasiewicz',
      role: 'Profesor sztuki, Artystka wizualna',
      image: '/person1.jpg',
      description: 'Absolwentka ASP w Krakowie, specjalizuje się w instalacjach multimedialnych. Wykładowca na UP w Krakowie, organizatorka targów "Nówka Sztuka".',
      bgColor: 'from-orange-400/30 to-orange-400/10',
      textColor: 'text-orange-100'
    },
    {
      id: 2,
      name: 'Prof. Aleksander Byrski',
      role: 'Profesor nauk informatycznych',
      image: '/person2.jpg',
      description: 'Zastępca Dziekana ds. Współpracy na Wydziale Informatyki AGH. Specjalista w obliczeniach metaheurystycznych i systemach agentowych.',
      bgColor: 'from-teal-500/30 to-teal-500/10',
      textColor: 'text-teal-100'
    },
    {
      id: 3,
      name: 'Prof. Jacek Wachowski',
      role: 'Profesor nauk humanistycznych',
      image: '/person3.jpg',
      description: 'Profesor w Katedrze Teatru i Sztuki Mediów UAM. Specjalista w performatyce i komunikacji społecznej.',
      bgColor: 'from-blue-600/30 to-blue-600/10',
      textColor: 'text-blue-100'
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.section 
      ref={sectionRef}
      id="team" 
      className="relative py-20 overflow-hidden"
      style={{ 
        minHeight: "100vh",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50" />
      <motion.div 
        className="relative z-10 container mx-auto px-4"
        style={{ opacity, y }}
      >
        <h2 className="text-4xl font-bold mb-16 text-center text-white">Nasz Zespół</h2>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {teamMembers.map((member) => (
            <motion.div
              key={member.id}
              variants={cardVariants}
              className={`bg-gradient-to-br ${member.bgColor} rounded-lg overflow-hidden flex flex-col h-full shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm backdrop-filter`}
              whileHover={{ scale: 1.05 }}
              style={{
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                backdropFilter: 'blur(5px)',
                WebkitBackdropFilter: 'blur(5px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
              }}
            >
              <motion.div 
                className="w-48 h-48 mx-auto mt-8 mb-6 overflow-hidden rounded-full"
                whileHover={{ scale: 1.1 }}
              >
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <div className="px-6 pb-6 text-center">
                <h3 className={`text-2xl font-semibold mb-2 ${member.textColor}`}>{member.name}</h3>
                <p className={`text-lg font-medium ${member.textColor} opacity-90 mb-4`}>{member.role}</p>
                <p className={`${member.textColor} text-sm opacity-80`}>{member.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default TeamSection;