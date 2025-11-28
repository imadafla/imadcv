import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronLeft, 
  ChevronRight, 
  MapPin, 
  Mail, 
  ExternalLink,
  Menu,
  X,
  Zap,
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

// ==========================================
// Reusable UI Components
// ==========================================

const SectionHeader = ({ title, subtitle, align = "center" }) => (
  <div className={`mb-16 px-6 ${align === "left" ? "text-left" : "text-center"}`} data-aos="fade-up">
    <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6">
      {title}
    </h2>
    <div className={`h-1.5 w-24 bg-blue-600 rounded-full mb-6 ${align === "center" ? "mx-auto" : ""}`}></div>
    <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed font-light">
      {subtitle}
    </p>
  </div>
);

const GridBackground = () => (
  <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]">
    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid-pattern)" />
    </svg>
  </div>
);

// ==========================================
// Main Application
// ==========================================

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  
  // Publication Carousel State
  const containerRef = useRef(null);
  const [current, setCurrent] = useState(0);
  const [expanded, setExpanded] = useState({});

  // --- Data ---

  const sections = [
    "home", "summary", "experience", "education", "certifications", "skills", "languages", "publications", "contact"
  ];

  const heroSocials = [
    {
        href: "https://www.linkedin.com/in/imadaitlaasri/",
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/960px-LinkedIn_logo_initials.png",
        text: "LinkedIn",
    },
    {
        href: "https://orcid.org/0000-0002-3977-5490",
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/ORCID_iD.svg/2048px-ORCID_iD.svg.png",
        text: "ORCID",
    },
    {
        href: "https://www.researchgate.net/profile/Imad-Ait-Laasri",
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/ResearchGate_icon_SVG.svg/2048px-ResearchGate_icon_SVG.svg.png",
        text: "ResearchGate",
    },
  ];

  const publicationsData = [
    {
      title: "Evaluating passive PCM performance in building envelopes for semi-arid climate: Experimental and numerical insights on hysteresis, sub-cooling, and energy savings",
      authors: "Ait Laasri, I., Charai, M., Es-sakali, N., Mghazli, M. O., & Outzourhit, A. (2024)",
      journal: "Journal of Building Engineering",
      abstract: "This study evaluates the performance of macro-encapsulated Phase Change Materials (PCMs) integrated into building envelopes for semi-arid climates, focusing on typical Moroccan construction using hollow concrete blocks. The primary objective is to assess the discrepancies between experimental and numerical analyses, particularly in hysteresis, sub-cooling, and energy savings. Given the widespread reliance on numerical tools like EnergyPlus for PCM simulations, the accuracy of manufacturer-provided latent heat values is investigated. The methodology involves constructing two identical test buildings, one equipped with PCM panels and another as a reference. Experimental data were collected in June 2023, assessing temperature fluctuations and energy savings. Differential Scanning Calorimetry (DSC) tests at varying scanning rates were conducted to analyze PCM behavior, including hysteresis and sub-cooling effects. Numerical simulations were then performed to compare energy performance. Besides, the results reveal that sub-cooling significantly limits PCM efficiency, with only 43 % of the PCM's latent heat capacity utilized. At the same time, hysteresis was found to be negligible in the field test. Cooling energy consumption was reduced by 20 %, with a corresponding 2.3 °C reduction in temperature fluctuations. However, the PCM's latent heat potential is underutilized due to sub-cooling. This research underscores the need for conducting DSC measurements at specific scanning rates to reflect regional climate conditions and suggests that simulation models should adjust latent heat utilization of the PCM. The study advocates for the use of composite PCMs, which could mitigate sub-cooling and enhance overall performance. These findings contribute to improving PCM integration in passive building designs, offering practical recommendations for better energy efficiency in semi-arid climates.",
      link: "https://www.sciencedirect.com/science/article/pii/S2352710224027293",
      image: "https://ars.els-cdn.com/content/image/1-s2.0-S2352710224027293-gr2_lrg.jpg"
    },
    {
      title: "Recent progress, limitations, and future directions of macro-encapsulated phase change materials for building applications",
      authors: "Ait Laasri, I., Es-Sakali, N., Charai, M., Mghazli, M. O., & Outzourhit, A. (2024).",
      journal: "Renewable and Sustainable Energy Reviews",
      abstract: "This review discusses macro-encapsulated phase change materials (PCMs) as a major contributing factor in the development of future sustainable and energy-efficient heating and cooling systems. This work emphasizes the investigation of various phase change materials, which are essential to unlocking macro-encapsulated PCM’s full potential while taking into consideration its thermal characteristics, economic viability, and environmental sustainability. Moreover, this work promotes novel heat exchanger designs for phase change materials, such as the use of macro-encapsulation in bricks, wallboards, plates and storage tanks for active and passive implementations in order to improve PCM performance and effectiveness in building applications. Besides, the utilization of topology optimization techniques is a promising direction due to capacity to produce complex, bio-inspired structures and significantly speed up heat transfer rates. Topology optimization can be used to create effective PCM containers and innovative heat exchangers for passive and active systems that serve to heat and cool both space and water. Nevertheless, building thermal management is required to further improve the effectiveness of this solution, by integrating renewable energy sources and sophisticated control techniques, leading to sustainable and adaptable solutions.",
      link: "https://www.sciencedirect.com/science/article/pii/S1364032124002041",
      image: "https://ars.els-cdn.com/content/image/1-s2.0-S1364032124002041-ga1_lrg.jpg"
    },
    {
      title: "Energy performance assessment of a novel enhanced solar thermal system with topology optimized latent heat thermal energy storage unit for domestic water heating",
      authors: "Ait Laasri, I., Charai, M., Mghazli, M. O., & Outzourhit, A. (2024)",
      journal: "Renewable Energy",
      abstract: "In this study, we introduce an innovative approach by incorporating a Topology-Optimized Latent Heat Thermal Energy Storage (TO-LHTES) unit with fins into a solar water heating system. Employing EnergyPlus software, we initially assess the energy and power requirements essential for meeting domestic hot water needs within the Moroccan context. Afterward, Computational Fluid Dynamics (CFD) analyses explore diverse Phase Change Materials (RT35, RT50, and RT60) under varying operational conditions, including injected temperature, velocity, and stored temperature. Our investigation extends to different climates, evaluating the energy savings potential. The study's outcomes reveal the remarkable efficacy of the enhanced solar system featuring the TO-LHTES unit, particularly with specific configurations—such as an injected temperature of 20 °C, injected velocity of 0.02 m/s, stored temperature of 80 °C, and RT50 as the chosen Phase change material. Given the poor thermal conductivity of many PCMs, effective heat distribution and storage necessitate innovative methods. While various finned heat exchanger structures have been explored in existing literature, a notable gap exists in non-intuitive heat exchanger concepts specifically tailored for LHTES units. This work contributes by presenting an innovative TO-LHTES unit design, advancing the understanding and applicability of latent heat storage in solar water heating systems. Importantly, a maximum energy savings of 63.2% was achieved.",
      link: "https://www.sciencedirect.com/science/article/pii/S0960148124002544",
      image: "https://ars.els-cdn.com/content/image/1-s2.0-S0960148124002544-ga1_lrg.jpg"
    },
    {
      title: "Energy efficiency and hygrothermal performance of hemp clay walls for Moroccan residential buildings: An integrated lab-scale, in-situ and simulation-based assessment",
      authors: "Es-sakali, N., Charai, M., Kaitouni, S. I., Ait Laasri, I., Mghazli, M. O., Cherkaoui, M., ... & Ukjoo, S. (2023)",
      journal: "Applied Energy",
      abstract: "Hemp-based building envelopes have gained significant popularity in developed countries, and now the trend of constructing houses with hemp-clay blocks is spreading to developing countries like Morocco. Investigating the hygrothermal behavior of such structures under actual climate conditions is essential for advancing and promoting this sustainable practice. This paper presents an in-depth experimental characterization of a commercial hemp-clay brick that has been exposed to the outdoor environment for four years, in addition to field measurements on a building scale demonstration prototype. Additionally, the study simulates 17 representative cities to assess the hygrothermal performance and energy-saving potential in each of Morocco's six existing climate zones, using the EnergyPlus engine. The experimental campaign's findings demonstrate excellent indoor air temperature and relative humidity regulation within the hemp-clay wall building, leading to satisfactory levels of thermal comfort within hemp-clay wall buildings. This is attributed to the material's good thermal conductivity and excellent moisture buffering capacity (found to be 0.31 W/mK and 2.25 g/m2%RH), respectively). The energy simulation findings also point to significant energy savings, with cooling and heating energy reductions ranging from 27.7% to 47.5% and 33.7% to 79.8%, respectively, as compared to traditional Moroccan buildings.",
      link: "https://www.sciencedirect.com/science/article/pii/S0306261923013314",
      image: "https://ars.els-cdn.com/content/image/1-s2.0-S0306261923013314-ga1_lrg.jpg"
    }
  ];

  const simulationTools = [
    { name: "EnergyPlus", logo: "https://energyplus.net/assets/images/eplus_logo.png" },
    { name: "OpenStudio", logo: "https://openstudiocoalition.org/img/OpenStudio+Coalition-logo-crop.png" },
    { name: "COMSOL", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Comsol_logo.svg/2560px-Comsol_logo.svg.png" },
    { name: "SketchUp", logo: "https://www.sketchupaustralia.com.au/wp-content/uploads/SketchUp-Mark-1200pxl-RGB.png" },
    { name: "Rhino", logo: "https://www.clipartmax.com/png/middle/342-3424718_rhino-3d-logo-png.png" },
    { name: "Grasshopper", logo: "https://images.seeklogo.com/logo-png/29/1/grasshopper-3d-logo-png_seeklogo-291372.png" },
    { name: "Ladybug", logo: "https://www.ladybug.tools/assets/img/ladybug.png" },
    { name: "Honeybee", logo: "https://www.clipartmax.com/png/full/71-719603_honeybee-ladybug-grasshopper-logo.png" },
    { name: "AutoCAD", logo: "https://images.seeklogo.com/logo-png/48/2/autocad-logo-png_seeklogo-482394.png" },
    { name: "Solidworks", logo: "https://img.icons8.com/color/512/solidworks.png" },
    { name: "ANSYS", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Ansys_logo_%282019%29.svg/855px-Ansys_logo_%282019%29.svg.png" },
    { name: "TRNSYS", logo: "https://usoftly.ir/wp-content/uploads/2024/02/TRNSYS-18.02.png" },
    { name: "DesignBuilder", logo: "https://designbuilder.co.uk/templates/r_explorer/custom/images/DesignBuilder-logo.png" },
    { name: "LabView", logo: "https://www.livewires-automation.co.uk/uploads/images/section-widget-images/NI-LabVIEW-Logo.png" }
  ];

  // --- Logic Functions ---

  const toggleDarkMode = () => setDarkMode(!darkMode);

  // Updates slide AND resets the expanded state of publication abstracts
  const updateSlideState = (idx) => {
    setCurrent(idx);
    setExpanded({});
  };

  const toggleExpanded = (idx) => {
    setExpanded(prev => ({...prev, [idx]: !prev[idx]}));
  };

  const scrollToCard = (idx) => {
    if (containerRef.current) {
      const firstCard = containerRef.current.children[0];
      const cardWidth = firstCard ? firstCard.offsetWidth : 0;
      const gap = 24; 
      
      containerRef.current.scrollTo({
        left: (cardWidth + gap) * idx,
        behavior: "smooth",
      });
      updateSlideState(idx);
    }
  };

  const prevSlide = () => {
    const newIndex = current === 0 ? publicationsData.length - 1 : current - 1;
    scrollToCard(newIndex);
  };

  const nextSlide = () => {
    const newIndex = current === publicationsData.length - 1 ? 0 : current + 1;
    scrollToCard(newIndex);
  };

  const handleScroll = () => {
    if (!containerRef.current) return;
    const scrollLeft = containerRef.current.scrollLeft;
    const firstCard = containerRef.current.children[0];
    const cardWidth = firstCard ? firstCard.offsetWidth + 24 : 0;
    
    if (cardWidth > 0) {
      const idx = Math.round(scrollLeft / cardWidth);
      if (idx !== current) {
          updateSlideState(idx);
      }
    }
  };

  // Fixed Scroll to Section function
  const scrollToSection = (id) => {
    setMobileMenuOpen(false); // Close menu instantly
    
    // Small timeout to allow state to update and menu to close
    setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
            const headerOffset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
            setActiveSection(id);
        }
    }, 50); 
  };

  // --- Effects ---

  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 50 });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { threshold: 0.2 });

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="font-sans bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 transition-colors duration-500 overflow-x-hidden selection:bg-blue-200 selection:text-blue-900">
      
      {/* ==========================================
          Navbar 
      ========================================== */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 z-50 transition-all duration-300"
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          
          {/* Logo / Brand */}
          <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-600/30 transition-transform group-hover:scale-105 group-hover:rotate-3">
              <span className="font-bold text-xl">IA</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white hidden sm:block">
              Dr. Imad AIT LAASRI
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {sections.map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeSection === item
                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                    : "text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            ))}
            
            <div className="w-px h-6 bg-slate-300 dark:bg-slate-700 mx-4"></div>

            {/* Dark Mode Toggle (Desktop) */}
            <button
                onClick={toggleDarkMode}
                className="relative w-14 h-7 flex items-center bg-gray-200 dark:bg-gray-700 rounded-full p-1 transition"
                >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v1.5M12 18v1.5M4.5 12h1.5M18 12h1.5M6.343 6.343l1.061 1.061M16.596 16.596l1.061 1.061M6.343 17.657l1.061-1.061M16.596 7.404l1.061-1.061M12 8a4 4 0 100 8 4 4 0 000-8z"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 ml-auto" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21.752 15.002A9 9 0 1112 3a7.5 7.5 0 009.752 12.002z" />
                </svg>
                <span className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${darkMode ? "translate-x-7" : "translate-x-0"}`}></span>
            </button>
          </div>

          {/* Mobile Controls */}
          <div className="lg:hidden flex items-center gap-4">
            {/* Dark Mode Toggle (Mobile) */}
            <button
                onClick={toggleDarkMode}
                className="relative w-14 h-7 flex items-center bg-gray-200 dark:bg-gray-700 rounded-full p-1 transition"
                >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v1.5M12 18v1.5M4.5 12h1.5M18 12h1.5M6.343 6.343l1.061 1.061M16.596 16.596l1.061 1.061M6.343 17.657l1.061-1.061M16.596 7.404l1.061-1.061M12 8a4 4 0 100 8 4 4 0 000-8z"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 ml-auto" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21.752 15.002A9 9 0 1112 3a7.5 7.5 0 009.752 12.002z" />
                </svg>
                <span className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${darkMode ? "translate-x-7" : "translate-x-0"}`}></span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-800 dark:text-slate-200"
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl"
            >
              <div className="flex flex-col p-4 space-y-2">
                {sections.map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className={`block w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                      activeSection === item
                        ? "bg-blue-50 text-blue-700 dark:bg-slate-800 dark:text-blue-400"
                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                    }`}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ==========================================
          Hero Section 
      ========================================== */}
      <section 
        id="home" 
        className="relative pt-24 overflow-hidden bg-slate-50 dark:bg-slate-900 flex flex-col justify-end"
        style={{ minHeight: "calc(100vh - 5rem)" }} 
        // 5rem is approximately the navbar height (h-20)
      >
        <GridBackground />
        
        {/* Animated Background Blobs */}
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-400/20 rounded-full blur-[100px] animate-pulse delay-1000"></div>

        <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8 md:gap-12 items-end z-10 w-full h-full flex-grow">
          
          {/* Left Column: Text */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center md:text-left pb-12 md:pb-24 self-center w-full"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-semibold text-sm mb-8 border border-blue-200 dark:border-blue-800">
              <Zap size={16} className="fill-blue-600 text-blue-600 dark:text-blue-400 dark:fill-blue-400" />
              Scientist & Researcher
            </div>

            <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight mb-6 text-slate-900 dark:text-white">
              Innovating <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Energy Systems
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-10 max-w-xl mx-auto md:mx-0 leading-relaxed">
              Experienced researcher in novel energy systems & materials for buildings. 
              Specializing in R&D, modeling, and optimization to bridge the gap between theory and sustainable reality.
            </p>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              {heroSocials.map((item, idx) => (
                  <a
                    key={idx}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-6 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-xl font-bold hover:border-blue-500 transition-all hover:-translate-y-1 shadow-sm"
                  >
                    <img src={item.src} alt={item.text} className="w-5 h-5 mr-3 object-contain" />
                    <span className="font-medium">{item.text}</span>
                  </a>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Image */}
          {/* Mobile: Normal Flex Flow | Desktop: Absolute Bottom Right */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full md:w-auto flex justify-center md:block md:absolute md:bottom-0 md:right-6 md:z-10"
          >
              <img
                src="public/profile.png"
                alt="Dr. Imad AIT LAASRI"
                className="w-auto h-auto max-h-[400px] md:max-h-[70vh] object-contain object-bottom drop-shadow-2xl dark:drop-shadow-[0_0_4px_rgba(255,255,255,1)]"
              />
          </motion.div>
        </div>
      </section>

      {/* ==========================================
          Stats Section
      ========================================== */}
      <div className="bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800 py-16 relative z-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-slate-100 dark:divide-slate-800">
          {[
            { label: "Years Experience", value: "4+" },
            { label: "Publications", value: "20+" },
            { label: "Projects", value: "10+" },
            { label: "Teaching Roles", value: "3+" }
          ].map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center group cursor-default">
              <span className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-br from-blue-600 to-purple-600 transition-transform group-hover:scale-110 duration-300 inline-block">{stat.value}</span>
              <span className="text-sm font-bold text-slate-500 dark:text-slate-400 mt-2 uppercase tracking-widest">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ==========================================
          Summary Section (Restored Old Layout Structure)
      ========================================== */}
      <section id="summary" className="py-24 bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-80 h-80 bg-blue-100/20 dark:bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-100/20 dark:bg-purple-400/10 rounded-full blur-3xl"></div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <SectionHeader title="Scientific Summary" subtitle="Bridging advanced simulation with experimental reality." />
          
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Left: Text Content */}
            <div className="flex-1 space-y-6" data-aos="fade-right">
              <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 leading-relaxed text-justify">
                I am a researcher in innovative energy systems and sustainable building materials, 
                specializing in PCM-based thermal storage, HVAC optimization, and adaptive building technologies. 
                My work integrates experimental testing, AI-driven simulations, 
                and smart control strategies to improve energy efficiency and indoor comfort. 
                I hold a PhD in Energy, Thermal & Sustainable Building Technology, 
                have led the creation of a DHW and HVAC performance lab, taught graduate courses, 
                published 20+ peer-reviewed papers, and actively collaborate in international academic and industrial networks.
              </p>
            </div>

            {/* Right: Image (Old Code Style) */}
            <div className="flex-1 flex justify-center md:justify-end" data-aos="fade-left">
              <img
                src="/smart_energy_efficiency.png"
                alt="Smart Energy Efficiency"
                className="w-full max-w-sm drop-shadow-xl"
              />
            </div>
          </div>
          
           {/* Keywords Row (Restored from Old Code) */}
           <div className="flex flex-wrap justify-center gap-6 mt-16" data-aos="fade-up">
              {[
                { text: "Phase Change Composites", icon: "https://cdn-icons-png.flaticon.com/512/5847/5847623.png" },
                { text: "Energy Storage", icon: "https://cdn-icons-png.flaticon.com/512/4092/4092242.png" },
                { text: "Building Optimisation", icon: "/energy_efficiency.png" },
                { text: "CFD", icon: "https://cdn-icons-png.flaticon.com/512/4907/4907928.png" },
                { text: "Passive & Active Control", icon: "/passive_active.png" }
              ].map((keyword, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 p-4 w-36 hover:shadow-lg transition-all hover:-translate-y-1"
                >
                  <img src={keyword.icon} alt={keyword.text} className="w-10 h-10 mb-3 object-contain" />
                  <span className="text-center text-xs font-bold text-slate-800 dark:text-slate-200">{keyword.text}</span>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* ==========================================
          Experience Section
      ========================================== */}
      <section id="experience" className="py-24 relative overflow-hidden bg-white dark:bg-slate-900">
        <GridBackground />
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <SectionHeader title="Professional Experience" subtitle="A timeline of research, leadership, and academic instruction." />
          
          <div className="relative border-l-2 border-slate-200 dark:border-slate-700 ml-4 md:ml-6 space-y-12">
            {[
              {
                company: "Green Energy Park",
                role: "Researcher / Scientist",
                period: "2021–Present",
                logo: "https://www.greenenergypark.ma/images/logo_gep.png",
                details: [
                  "Focus on energy-efficient solutions and phase change materials",
                  "Develop hybrid AI models for predictive simulations",
                  "Combine experimental testing with numerical modeling"
                ]
              },
              {
                company: "University Mohammed VI Polytechnic",
                role: "Adjunct Professor",
                period: "2024-2025",
                logo: "https://upload.wikimedia.org/wikipedia/commons/b/bf/UM6P_wordmark_%282024%29.svg",
                details: ["Teaching energy systems and sustainable building technologies."]
              },
              {
                company: "University Hassan 2",
                role: "Adjunct Professor",
                period: "2021-2022",
                logo: "https://vectorseek.com/wp-content/uploads/2023/08/Universite-Hassan-2-de-Casablanca-Maroc-Logo-Vector.svg--300x231.png",
                details: ["Teaching fluid dynamics and heat transfer simulations."]
              }
            ].map((exp, idx) => (
              <div key={idx} className="relative pl-8 md:pl-12 group" data-aos="fade-up" data-aos-delay={idx * 100}>
                {/* Timeline Dot */}
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-600 border-4 border-white dark:border-slate-900 shadow-sm group-hover:scale-150 transition-transform"></div>
                
                <div className="bg-slate-50 dark:bg-slate-950 p-6 rounded-2xl shadow-sm hover:shadow-xl border border-slate-200 dark:border-slate-800 transition-all duration-300">
                  <div className="flex flex-col md:flex-row gap-6 items-start md:items-center mb-6">
                    <div className="w-20 h-20 p-2 bg-white rounded-xl border border-slate-200 flex items-center justify-center shrink-0 shadow-sm">
                      <img src={exp.logo} alt={exp.company} className="max-w-full max-h-full object-contain" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">{exp.role}</h3>
                      <div className="flex flex-wrap items-center gap-2 text-slate-500 text-sm font-semibold mt-1">
                        <span>{exp.company}</span>
                        <span className="hidden md:inline">•</span>
                        <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full text-xs">
                            {exp.period}
                        </span>
                      </div>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {exp.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-600 dark:text-slate-300 text-sm">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          Education Section 
      ========================================== */}
      <section id="education" className="py-24 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeader title="Academic Background" subtitle="Foundations in Renewable Energy & Thermal Physics." />
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { degree: "PhD in Energy Systems", school: "Cadi Ayyad University", period: "2021–2024", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Universite_Cadi_Ayyad.png/250px-Universite_Cadi_Ayyad.png" },
              { degree: "Master in Solar Power", school: "Cadi Ayyad University", period: "2018–2020", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Universite_Cadi_Ayyad.png/250px-Universite_Cadi_Ayyad.png" },
              { degree: "Bachelor Renewable Energy", school: "Hassan 1 University", period: "2018", logo: "https://seeklogo.com/images/U/universite-hassan-1er-settat-logo-7155C7CC1B-seeklogo.com.png" },
            ].map((edu, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -8 }}
                className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm hover:shadow-2xl border border-slate-100 dark:border-slate-800 flex flex-col items-center text-center transition-all group"
              >
                <div className="h-24 w-24 mb-6 flex items-center justify-center p-2 rounded-full bg-slate-50 dark:bg-slate-800 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-colors">
                  <img src={edu.logo} alt={edu.school} className="max-h-full max-w-full object-contain" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 leading-tight">{edu.degree}</h3>
                <p className="text-blue-600 dark:text-blue-400 font-bold text-sm mb-4">{edu.school}</p>
                <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-300 text-xs font-mono rounded-full border border-slate-200 dark:border-slate-700">{edu.period}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          Certifications Section
      ========================================== */}
      <section id="certifications" className="py-24 bg-white dark:bg-slate-900">
        <div className="max-w-4xl mx-auto px-6">
          <SectionHeader title="Certifications" subtitle="Continuous professional development." />
          <div className="grid gap-4">
            {[
              { name: "KOICA Training: Green Technology R&D", period: "2023", logo: "https://www.intracen.org/sites/default/files/styles/large/public/media/image/media_image/2025/02/07/koica_logo.png" },
              { name: "Summer School Lecturer on Efficiency", period: "2023", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/HSO_Logo_Quer_RGB_positiv.svg/250px-HSO_Logo_Quer_RGB_positiv.svg.png" },
              { name: "Research Stay – Building Envelope", period: "2022", logo: "https://www.entpe.fr/sites/default/files/2018-09/entpe_logo_cmjn_couleur_baseline.png" },
              { name: "EF SET C2 – English Proficiency", period: "2020", logo: "https://images.seeklogo.com/logo-png/36/2/the-ef-standard-english-test-logo-png_seeklogo-363583.png", link: "https://www.efset.org/cert/1CEQCD" }
            ].map((cert, idx) => (
              <a 
                key={idx} 
                href={cert.link} 
                target={cert.link ? "_blank" : "_self"} 
                className={`flex items-center gap-6 bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all hover:shadow-lg group ${cert.link ? 'cursor-pointer' : 'cursor-default'}`}
              >
                <div className="w-16 h-16 bg-white rounded-lg p-2 flex items-center justify-center border border-slate-100 shadow-sm shrink-0">
                  <img src={cert.logo} alt={cert.name} className="max-w-full max-h-full object-contain" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">{cert.name}</h4>
                  <p className="text-sm text-slate-500 font-medium">{cert.period}</p>
                </div>
                {cert.link && <ExternalLink size={20} className="text-slate-400 group-hover:text-blue-500" />}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          Skills Section (Icons Restored + Smaller)
      ========================================== */}
      <section id="skills" className="py-24 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeader title="Technical Arsenal" subtitle="Tools and frameworks for advanced energy modeling." />

          {/* Programming Languages */}
          <div className="mb-16">
            <h3 className="text-center text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-8">Programming Languages</h3>
            <div className="flex flex-wrap justify-center gap-6">
              {[
                { name: "Python", logo: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg" },
                { name: "MATLAB", logo: "https://upload.wikimedia.org/wikipedia/commons/2/21/Matlab_Logo.png" },
                { name: "R", logo: "https://upload.wikimedia.org/wikipedia/commons/1/1b/R_logo.svg" },
                { name: "C++", logo: "https://upload.wikimedia.org/wikipedia/commons/1/18/ISO_C%2B%2B_Logo.svg" }
              ].map((skill, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -8, scale: 1.05 }}
                  className="w-32 h-36 bg-white dark:bg-slate-900 rounded-2xl flex flex-col items-center justify-center shadow-md border border-slate-100 dark:border-slate-800 transition-shadow hover:shadow-xl"
                >
                  <img src={skill.logo} alt={skill.name} className="w-14 h-14 mb-4 object-contain" />
                  <span className="font-bold text-sm text-slate-700 dark:text-slate-200">{skill.name}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Simulation & Modeling - RESTORED ICON GRID (Smaller Cards) */}
          <div>
             <h3 className="text-center text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-8">Simulation & Modeling</h3>
             <div className="flex flex-wrap justify-center gap-4">
               {simulationTools.map((tool, idx) => (
                 <motion.div
                   key={idx}
                   whileHover={{ y: -5 }}
                   className="w-24 h-28 bg-white dark:bg-slate-900 rounded-xl flex flex-col items-center justify-center shadow-sm border border-slate-100 dark:border-slate-800 transition-all hover:border-blue-400 hover:shadow-lg"
                 >
                   <img src={tool.logo} alt={tool.name} className="w-10 h-10 mb-2 object-contain" />
                   <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 text-center px-1 truncate w-full">{tool.name}</span>
                 </motion.div>
               ))}
             </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          Languages Section 
      ========================================== */}
      <section id="languages" className="py-24 bg-white dark:bg-slate-900">
        <div className="max-w-3xl mx-auto px-6">
           <SectionHeader title="Languages" subtitle="Communication proficiency." />
           <div className="space-y-6">
             {[
               { name: "Arabic", level: 100, label: "Native" },
               { name: "French", level: 95, label: "Full Professional" },
               { name: "English", level: 95, label: "Full Professional" }
             ].map((lang, idx) => (
               <div key={idx} className="bg-slate-50 dark:bg-slate-950 p-6 rounded-2xl shadow-inner border border-slate-100 dark:border-slate-800">
                  <div className="flex justify-between mb-4">
                    <span className="font-bold text-lg text-slate-900 dark:text-white">{lang.name}</span>
                    <span className="text-sm text-blue-600 dark:text-blue-400 font-bold uppercase">{lang.label}</span>
                  </div>
                  <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${lang.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                    />
                  </div>
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* ==========================================
          Publications Section 
      ========================================== */}
      <section id="publications" className="py-24 bg-slate-50 dark:bg-slate-950 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader title="Selected Publications" subtitle="Contributing to the global body of knowledge." />
          
          <div className="relative">
            {/* Scroll Container */}
            <div 
              ref={containerRef}
              onScroll={handleScroll}
              className="flex gap-8 overflow-x-auto snap-x snap-mandatory pb-12 scrollbar-hide px-4"
              style={{ scrollBehavior: 'smooth' }}
            >
              {publicationsData.map((paper, idx) => (
                <div 
                  key={idx}
                  className="snap-center shrink-0 w-[90vw] md:w-[600px] flex flex-col bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden border border-slate-100 dark:border-slate-800 transition-all hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-2xl"
                >
                  {/* Card Header Image */}
                  <div className="h-64 bg-slate-100 dark:bg-slate-950 p-8 flex items-center justify-center border-b border-slate-100 dark:border-slate-800 relative group">
                    <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                    <img 
                      src={paper.image} 
                      alt="Paper Visual" 
                      className="h-full object-contain z-10 transition-transform duration-500 group-hover:scale-105" 
                    />
                  </div>

                  {/* Card Content */}
                  <div className="p-8 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3">
                       <span className="w-2 h-2 rounded-full bg-green-500"></span>
                       <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">{paper.journal}</div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 line-clamp-2 leading-tight" title={paper.title}>
                      {paper.title}
                    </h3>
                    
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 font-medium italic">
                      {paper.authors}
                    </p>

                    <div className="relative flex-1">
                       <p className={`text-slate-600 dark:text-slate-300 text-sm leading-relaxed transition-all duration-300 ${expanded[idx] ? '' : 'line-clamp-4'}`}>
                         {paper.abstract}
                       </p>
                       <button 
                         onClick={() => toggleExpanded(idx)}
                         className="mt-3 text-blue-600 dark:text-blue-400 font-bold text-sm hover:underline focus:outline-none flex items-center gap-1"
                       >
                         {expanded[idx] ? "Show Less" : "Read Abstract"}
                       </button>
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                      <span className="text-xs text-slate-400 font-mono">SCIENTIFIC PAPER</span>
                      <a href={paper.link} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-5 py-2.5 rounded-lg text-sm font-bold hover:opacity-90 transition-opacity shadow-lg">
                        View Paper <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Controls */}
            <div className="flex justify-center items-center gap-6 mt-4">
              <button 
                onClick={prevSlide} 
                className="p-4 rounded-full bg-white dark:bg-slate-800 shadow-lg text-slate-600 dark:text-slate-300 hover:scale-110 hover:text-blue-600 transition-all border border-slate-100 dark:border-slate-700"
              >
                <ChevronLeft size={24} />
              </button>
              
              <div className="flex gap-2">
                {publicationsData.map((_, idx) => (
                  <button 
                    key={idx}
                    onClick={() => scrollToCard(idx)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${idx === current ? 'w-8 bg-blue-600' : 'w-2.5 bg-slate-300 dark:bg-slate-700 hover:bg-blue-400'}`}
                  />
                ))}
              </div>

              <button 
                onClick={nextSlide} 
                className="p-4 rounded-full bg-white dark:bg-slate-800 shadow-lg text-slate-600 dark:text-slate-300 hover:scale-110 hover:text-blue-600 transition-all border border-slate-100 dark:border-slate-700"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          Contact Section
      ========================================== */}
      <section id="contact" className="py-24 relative overflow-hidden bg-white dark:bg-slate-900">
        <GridBackground />
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <SectionHeader title="Get in Touch" subtitle="Open to collaboration on research, industrial projects, and academic ventures." />
          
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <motion.a 
              href="mailto:imadaitlaasri@gmail.com"
              whileHover={{ scale: 1.02 }}
              className="flex items-center p-6 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 group transition-all shadow-sm hover:shadow-md"
            >
              <div className="w-14 h-14 bg-white dark:bg-slate-900 rounded-full flex items-center justify-center text-blue-600 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors border border-slate-100 dark:border-slate-800">
                <Mail size={24} />
              </div>
              <div className="ml-4 text-left">
                <div className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-1">Email</div>
                <div className="text-lg font-bold text-slate-900 dark:text-white break-all">imadaitlaasri@gmail.com</div>
              </div>
            </motion.a>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="flex items-center p-6 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm"
            >
              <div className="w-14 h-14 bg-white dark:bg-slate-900 rounded-full flex items-center justify-center text-purple-600 shadow-sm border border-slate-100 dark:border-slate-800">
                <MapPin size={24} />
              </div>
              <div className="ml-4 text-left">
                <div className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-1">Location</div>
                <div className="text-lg font-bold text-slate-900 dark:text-white">Marrakech, Morocco</div>
              </div>
            </motion.div>
          </div>

          {/* Social Icons - Restored */}
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { 
                name: "LinkedIn", 
                icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/linkedin.svg", 
                link: "https://www.linkedin.com/in/imadaitlaasri/" 
              },
              { 
                name: "ResearchGate", 
                icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/researchgate.svg", 
                link: "https://www.researchgate.net/profile/Imad-Ait-Laasri" 
              },
              { 
                name: "ORCID", 
                icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/orcid.svg", 
                link: "https://orcid.org/0000-0002-3977-5490" 
              }
            ].map((social, idx) => (
              <a 
                key={idx}
                href={social.link}
                target="_blank"
                rel="noreferrer"
                className="w-16 h-16 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-white hover:border-blue-500 transition-all hover:scale-110 hover:shadow-lg"
                title={social.name}
              >
                <img src={social.icon} alt={social.name} className="w-8 h-8 object-contain opacity-75 hover:opacity-100 transition-opacity" />
              </a>
            ))}
          </div>

          <footer className="mt-20 pt-10 border-t border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-500 text-sm">
             <div className="mb-2">
               © {new Date().getFullYear()} <span className="font-bold text-blue-600 dark:text-blue-400">Dr. Imad AIT LAASRI</span>. All rights reserved.
             </div>
             <div>
               Website designed and developed by <span className="font-bold text-slate-700 dark:text-slate-300">Dr. Imad AIT LAASRI</span>.
             </div>
          </footer>
        </div>
      </section>
    </div>
  );
}