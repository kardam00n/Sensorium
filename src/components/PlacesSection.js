import React from 'react';
import { motion } from 'framer-motion';

const PlacesSection = () => {
  return (
    <section id="places" className="py-20 bg-gradient-to-b from-blue-50 to-purple-50">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-12 text-center text-gray-800"
        >
          Nasze Miejsca
        </motion.h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <LocationCard
            title="Sensorium_artlab"
            description="Galeria sztuki, w której prezentowane będą prace z nurtu art&science, dwóch pozornie różnych światów, które jednak doskonale współpracują, dając zaskakujące, nowatorskie projekty."
            details={[
              { label: "Lokalizacja", value: "Wydział Informatyki AGH, ul. Kawiory 21, Kraków" },
              { label: "Otwarcie", value: "Wernisaż 27 czerwca" }
            ]}
            imageSrc="/place4.jpg"
          />
          
          <LocationCard
            title="Pałac sztuki w Krakowie"
            description="Pałac Sztuki w Krakowie jest siedzibą powstałego w 1854 r. Towarzystwa Przyjaciół Sztuk Pięknych."
            details={[
              { label: "Adres", value: "Plac Szczepański 4, 31-011 Kraków" },
              { label: "Tel/Fax", value: "+ 48 12 422 66 16" },
              { label: "Godziny otwarcia", value: "Wt-Pt: 10-18, Sb-Nd: 10-18" },
              { label: "Strona", value: "http://palac-sztuki.krakow.pl", isLink: true }
            ]}
            imageSrc="/place2.jpg"
          />
        </div>
      </div>
    </section>
  );
};

const LocationCard = ({ title, description, details, imageSrc }) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: { scale: 1.02, y: -5 }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col h-full hover:shadow-xl transition-all duration-300"
    >
      <div className="relative h-64">
        <img 
          src={imageSrc} 
          alt={title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <h3 className="text-3xl font-semibold text-white text-center px-4">{title}</h3>
        </div>
      </div>
      <div className="p-6 flex-grow">
        <p className="text-gray-600 mb-6">{description}</p>
        <div className="space-y-2">
          {Array.isArray(details) && details.map((detail, index) => (
            <p key={index} className="text-gray-500 text-sm">
              <span className="font-semibold text-gray-700">{detail.label}:</span>{' '}
              {detail.isLink ? (
                <a href={detail.value} className="text-blue-600 hover:underline">{detail.value}</a>
              ) : (
                detail.value
              )}
            </p>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default PlacesSection;