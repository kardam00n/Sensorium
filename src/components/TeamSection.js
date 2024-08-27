import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const TeamSection = () => {
  const [selectedMember, setSelectedMember] = useState(null);
  const [direction, setDirection] = useState(0);

  const teamMembers = [
    {
      id: 1,
      name: "Prof. Alicja Panasiewicz",
      role: "Profesor sztuki, Artystka wizualna",
      image: "/osoba_1.png",
      description:
        'Absolwentka ASP w Krakowie, specjalizuje się w instalacjach multimedialnych. Wykładowca na UP w Krakowie, organizatorka targów "Nówka Sztuka".',
    },
    {
      id: 2,
      name: "Prof. Aleksander Byrski",
      role: "Profesor nauk informatycznych",
      image: "/osoba_2.png",
      description:
        "Zastępca Dziekana ds. Współpracy na Wydziale Informatyki AGH. Specjalista w obliczeniach metaheurystycznych i systemach agentowych.",
    },
    {
      id: 3,
      name: "Prof. Jacek Wachowski",
      role: "Profesor nauk humanistycznych",
      image: "/osoba_3.png",
      description:
        "Profesor w Katedrze Teatru i Sztuki Mediów UAM. Specjalista w performatyce i komunikacji społecznej.",
    },
  ];

  const handleMemberClick = (member) => {
    setDirection(selectedMember && selectedMember.id < member.id ? 1 : -1);
    setTimeout(() => {
      if (selectedMember && selectedMember.id === member.id) {
        setSelectedMember(null);
        return;
      }
      setSelectedMember(member);
    }, 50);
  };

  const waveVariants = {
    enter: (direction) => ({
      scale: 0.8,
      y: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      scale: 1,
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
    exit: (direction) => ({
      scale: 0.8,
      y: direction > 0 ? -100 : 100,
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    }),
  };

  return (
    <section id="team" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-16 text-center text-gray-800">
          Nasz Zespół
        </h2>
        <div className="flex flex-col md:flex-row gap-12">
          {/* Left side - Image */}
          <div
            className="w-full md:w-1/2 relative overflow-hidden rounded-lg"
            style={{ height: "450px" }} // Adjusted height
          >
            <div className="w-full h-full" style={{ perspective: "1000px" }}>
              <AnimatePresence initial={false} custom={direction}>
                <motion.img
                  key={selectedMember ? selectedMember.id : "placeholder"}
                  src={
                    selectedMember ? selectedMember.image : "/placeholder.png"
                  }
                  alt={
                    selectedMember
                      ? selectedMember.name
                      : "Select a team member"
                  }
                  className="w-full h-full object-contain absolute top-0 left-0"
                  variants={waveVariants}
                  custom={direction}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  style={{
                    transformOrigin: "center center",
                    filter: "grayscale(100%)",
                  }}
                />
              </AnimatePresence>
            </div>
          </div>

          {/* Right side - Names and Info */}
          <div className="w-full md:w-1/2">
            <ul className="space-y-4">
              {teamMembers.map((member) => (
                <li key={member.id}>
                  <button
                    onClick={() => handleMemberClick(member)}
                    className={`text-left w-full p-4 rounded-lg transition-all ${
                      selectedMember && selectedMember.id === member.id
                        ? "bg-blue-100 text-blue-800"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex flex-start items-center">
                      {selectedMember && selectedMember.id === member.id ? (<FaChevronUp />) : (<FaChevronDown /> )}
                      <h3 className="text-xl font-semibold pl-6">{member.name}</h3>
                    </div>
                    {selectedMember && selectedMember.id === member.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="text-gray-600 mt-2">{member.role}</p>
                        <p className="text-gray-700 mt-2">
                          {member.description}
                        </p>
                      </motion.div>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
