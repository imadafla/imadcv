import React, { useState, useRef, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { Sun, Moon, ChevronLeft, ChevronRight } from "lucide-react";


export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const containerRef = useRef(null);

  const toggleExpanded = (idx) => {
    const newExpanded = [...expanded];
    newExpanded[idx] = !newExpanded[idx];
    setExpanded(newExpanded);
  };

  const scrollToCard = (idx) => {
    if (containerRef.current) {
      const cardWidth = containerRef.current.children[0].offsetWidth + 24; // gap-6
      containerRef.current.scrollTo({
        left: cardWidth * idx,
        behavior: "smooth",
      });
      setCurrent(idx);
    }
  };

  // Update HTML class for dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const sections = [
    "home",
    "summary",
    "experience",
    "education",
    "certifications",
    "skills",
    "languages",
    "publications",
    "contact",
  ];

const [activeSection, setActiveSection] = useState(""); // Add at the top

const [current, setCurrent] = useState(0);
const [expanded, setExpanded] = useState(false);
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
    const cardWidth = containerRef.current.children[0].offsetWidth + 24;
    const idx = Math.round(scrollLeft / cardWidth);
    setCurrent(idx);
  };

const paper = publicationsData[current];

  return (
    <div className="font-sans bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-white dark:bg-gray-800 shadow-sm z-50">
  <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
    <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Imad.</h1>

    {/* Desktop Links */}
    <div className="hidden md:flex items-center space-x-4 font-medium">
      {sections.map((item) => (
        <a
          key={item}
          href={`#${item}`}
          className={`transition ${
            activeSection === item
              ? "text-blue-600 border-b-2 border-blue-600"
              : "hover:text-blue-600"
          }`}
        >
          {item.charAt(0).toUpperCase() + item.slice(1)}
        </a>
      ))}

{/* Dark Mode Toggle */}
<button
  onClick={toggleDarkMode}
  className="relative w-14 h-7 flex items-center bg-gray-200 dark:bg-gray-700 rounded-full p-1 transition"
>
  {/* Sun Icon */}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-yellow-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 4.5v1.5M12 18v1.5M4.5 12h1.5M18 12h1.5M6.343 6.343l1.061 1.061M16.596 16.596l1.061 1.061M6.343 17.657l1.061-1.061M16.596 7.404l1.061-1.061M12 8a4 4 0 100 8 4 4 0 000-8z"
    />
  </svg>

  {/* Moon Icon */}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-gray-500 ml-auto"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M21.752 15.002A9 9 0 1112 3a7.5 7.5 0 009.752 12.002z" />
  </svg>

  {/* Circle Indicator */}
  <span
    className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${
      darkMode ? "translate-x-7" : "translate-x-0"
    }`}
  ></span>
</button>
    </div>

    {/* Mobile Hamburger + Dark Mode Toggle */}
    <div className="md:hidden flex items-center space-x-2">
      {/* Dark Mode Toggle Mobile */}
<button
  onClick={toggleDarkMode}
  className="relative w-14 h-7 flex items-center bg-gray-200 dark:bg-gray-700 rounded-full p-1 transition"
>
  {/* Sun Icon */}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-yellow-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 4.5v1.5M12 18v1.5M4.5 12h1.5M18 12h1.5M6.343 6.343l1.061 1.061M16.596 16.596l1.061 1.061M6.343 17.657l1.061-1.061M16.596 7.404l1.061-1.061M12 8a4 4 0 100 8 4 4 0 000-8z"
    />
  </svg>

  {/* Moon Icon */}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-gray-500 ml-auto"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M21.752 15.002A9 9 0 1112 3a7.5 7.5 0 009.752 12.002z" />
  </svg>

  {/* Circle Indicator */}
  <span
    className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${
      darkMode ? "translate-x-7" : "translate-x-0"
    }`}
  ></span>
</button>

      {/* Hamburger Menu */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="focus:outline-none"
      >
        <svg
          className="w-6 h-6 text-gray-800 dark:text-gray-200"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {mobileMenuOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>
    </div>
  </div>

{mobileMenuOpen && (
  <div className="md:hidden w-full bg-white dark:bg-gray-800 shadow-lg flex flex-col">
    {sections.map((item) => (
      <a
        key={item}
        href={`#${item}`}
        className={`px-6 py-3 text-left border-b border-gray-200 dark:border-gray-700 transition
          ${
            activeSection === item
              ? "bg-blue-100/70 dark:bg-blue-900/70 text-blue-600 dark:text-blue-300"
              : "text-gray-800 dark:text-gray-200 hover:bg-gray-100/50 dark:hover:bg-gray-700/50"
          }
        `}
        onClick={(e) => {
  e.preventDefault();
  const sectionEl = document.getElementById(item);
  const yOffset = -80; // navbar height
  if (sectionEl) {
    const y = sectionEl.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
  setMobileMenuOpen(false);
}}
      >
        {item.charAt(0).toUpperCase() + item.slice(1)}
      </a>
    ))}
  </div>
)}

</nav>

{/* Hero Section */}
<section
  id="home"
  className="pt-28 bg-gray-50 dark:bg-gray-900 transition-colors duration-300"
>
  <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10">
    {/* Text */}
    <div className="text-center md:text-left flex flex-col justify-center">
      <p className="uppercase text-sm text-gray-500 dark:text-gray-400 tracking-wider">
        Scientist & Researcher
      </p>
      <h2 className="text-4xl md:text-5xl font-bold leading-tight mt-2">
        Hi, I am{" "}
        <span className="text-blue-600 dark:text-blue-400">Dr. Imad AIT LAASRI</span>
        <br /> Innovating Energy Systems
      </h2>
      <p className="mt-4 text-gray-600 dark:text-gray-300">
        Experienced researcher in novel energy systems & materials for
        buildings, focusing on R&D, modeling, and optimization.
      </p>
      {/* Social / Contact Buttons */}
      <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-4">
        {[
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
        ].map((item) => (
          <a
            key={item.text}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center px-5 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg shadow hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            <img src={item.src} alt={item.text} className="w-5 h-5 mr-2" />
            {item.text}
          </a>
        ))}
      </div>
    </div>

    {/* Photo */}
    <div className="flex justify-center md:justify-end">
      <img
        src="/profile.png"
        alt="Dr. Imad AIT LAASRI"
        className="w-48 md:w-64 lg:w-72 h-auto object-contain drop-shadow-[0_0_4px_white] rounded-lg"
      />
    </div>
  </div>
</section>


{/* Stats Section */}
<section className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 py-16 shadow-inner transition-colors duration-300">
  <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-2xl transition">
      <h3 className="text-4xl md:text-5xl font-bold text-blue-600 dark:text-blue-400">4+</h3>
      <p className="text-gray-600 dark:text-gray-300 mt-2">Years Experience</p>
    </div>
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-2xl transition">
      <h3 className="text-4xl md:text-5xl font-bold text-blue-600 dark:text-blue-400">20+</h3>
      <p className="text-gray-600 dark:text-gray-300 mt-2">Publications</p>
    </div>
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-2xl transition">
      <h3 className="text-4xl md:text-5xl font-bold text-blue-600 dark:text-blue-400">10+</h3>
      <p className="text-gray-600 dark:text-gray-300 mt-2">Projects</p>
    </div>
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-2xl transition">
      <h3 className="text-4xl md:text-5xl font-bold text-blue-600 dark:text-blue-400">3+</h3>
      <p className="text-gray-600 dark:text-gray-300 mt-2">Teaching Roles</p>
    </div>
  </div>
</section>

{/* Summary Section */}
<section
  id="summary"
  className="relative pt-16 pb-12 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 overflow-hidden transition-colors duration-300"
>
  {/* Decorative Background */}
  <div className="absolute -top-16 -left-16 w-80 h-80 bg-blue-100/20 dark:bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
  <div className="absolute -bottom-16 -right-16 w-80 h-80 bg-purple-100/20 dark:bg-purple-400/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>

  {/* Header with photo */}
  <div className="relative max-w-6xl mx-auto flex flex-col md:flex-row justify-center items-center gap-8 px-6">
    {/* Text */}
    <div className="flex-1 flex flex-col justify-center items-start text-left space-y-6">
      <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
        Summary
      </h2>
      <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 text-justify">
        I am a researcher in innovative energy systems and sustainable building materials, 
        specializing in PCM-based thermal storage, HVAC optimization, and adaptive building technologies. 
        My work integrates experimental testing, AI-driven simulations, 
        and smart control strategies to improve energy efficiency and indoor comfort. 
        I hold a PhD in Energy, Thermal & Sustainable Building Technology, 
        have led the creation of a DHW and HVAC performance lab, taught graduate courses, 
        published 20+ peer-reviewed papers, and actively collaborate in international academic and industrial networks.
      </p>
    </div>

    {/* Image */}
    <div className="flex-1 flex justify-center md:justify-end">
      <img
        src="/smart_energy_efficiency.png"
        alt="Smart Energy Efficiency"
        className="w-full max-w-sm"
      />
    </div>
  </div>

  {/* Keywords */}
  <div className="relative max-w-4xl mx-auto flex flex-wrap justify-center gap-4 mt-8 px-6">
  {[
    { text: "Phase Change Composites", logo: "https://cdn-icons-png.flaticon.com/512/5847/5847623.png" },
    { text: "Energy Storage", logo: "https://cdn-icons-png.flaticon.com/512/4092/4092242.png" },
    { text: "Building Energy Optimisation", logo: "/energy_efficiency.png" },
    { text: "CFD", logo: "https://cdn-icons-png.flaticon.com/512/4907/4907928.png" },
    { text: "Passive & Active Control", logo: "/passive_active.png" }
  ].map((keyword, idx) => (
    <div
      key={idx}
      className="flex flex-col items-center bg-white dark:bg-gray-700 rounded-lg shadow-md p-2 w-32 hover:shadow-xl transition-shadow duration-300"
    >
      <img src={keyword.logo} alt={keyword.text} className="w-10 h-10 mb-2 object-contain" />
      <span className="text-center text-sm text-gray-800 dark:text-gray-100">{keyword.text}</span>
    </div>
  ))}
</div>
</section>

{/* Experience Section */}
<section
  id="experience"
  className="relative pt-4 pb-9 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 overflow-hidden transition-colors duration-300"
  style={{
    backgroundImage: `
      linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)
    `,
    backgroundSize: "40px 40px"
  }}
>
  {/* Dark mode overlay for grid */}
  <div className="absolute inset-0 pointer-events-none dark:block dark:bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] dark:bg-[length:40px_40px]"></div>

  {/* Section Header */}
  <div className="relative max-w-4xl mx-auto flex flex-col justify-center items-center text-center space-y-6 px-6 mb-12">
    <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
      Experience
    </h2>
    <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300">
      A journey of research and teaching in innovative energy systems, sustainable building technologies, and scientific excellence.
    </p>
  </div>

{/* Experience Cards */}
<div className="relative max-w-4xl mx-auto flex flex-col gap-8 px-6">
  {[
    {
      company: "Green Energy Park",
      logo: "https://www.greenenergypark.ma/images/logo_gep.png",
      role: "Researcher / Scientist",
      period: "2021–Present",
      descriptionHeader: "Leading research in novel energy systems and building materials:",
      descriptionBullets: [
        "Focus on energy-efficient solutions and phase change materials",
        "Develop hybrid AI models for predictive simulations",
        "Combine experimental testing, numerical modeling, and material development",
        "Advance sustainable and practical building technologies"
      ]
    },
    {
      company: "University Mohammed VI Polytechnic - SAP+D",
      logo: "https://upload.wikimedia.org/wikipedia/commons/b/bf/UM6P_wordmark_%282024%29.svg",
      role: "Adjunct Professor",
      period: "2024-2025",
      descriptionHeader: "",
      descriptionBullets: [
        "Teaching energy systems and sustainable building technologies."
      ]
    },
    {
      company: "University Hassan 2",
      logo: "https://vectorseek.com/wp-content/uploads/2023/08/Universite-Hassan-2-de-Casablanca-Maroc-Logo-Vector.svg--300x231.png",
      role: "Adjunct Professor",
      period: "2021-2022",
      descriptionHeader: "",
      descriptionBullets: [
        "Teaching fluid dynamics and heat transfer for advanced numerical simulations."
      ]
    }
  ].map((exp, idx) => (
    <div
      key={idx}
      className="flex flex-col md:flex-row items-center md:items-start p-6 rounded-2xl shadow-2xl transition-transform duration-300 cursor-pointer
                 bg-white dark:bg-gray-700 hover:scale-105 hover:shadow-3xl"
    >
      {/* Logo */}
      <div className="flex-shrink-0 w-32 h-24 md:mr-6 flex items-center justify-center">
        <img
          src={exp.logo}
          alt={exp.company}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      {/* Text Content */}
      <div className="flex flex-col justify-center mt-4 md:mt-0">
        <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
          {exp.role} – {exp.company}
        </h4>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{exp.period}</p>
        
        {exp.descriptionHeader && (
          <p className="text-gray-800 dark:text-gray-100 font-semibold mb-1">
            {exp.descriptionHeader}
          </p>
        )}

        {exp.descriptionBullets.length > 0 && (
          <ul className="text-gray-700 dark:text-gray-200 list-disc list-inside space-y-1">
            {exp.descriptionBullets.map((bullet, i) => (
              <li key={i}>{bullet}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  ))}
</div>
</section>



{/* Education Section */}
<section
  id="education"
  className="relative pt-4 pb-12 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 overflow-hidden transition-colors duration-300"
  style={{
    backgroundImage: `
      linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)
    `,
    backgroundSize: "40px 40px"
  }}
>
  {/* Dark mode overlay for grid */}
  <div className="absolute inset-0 pointer-events-none dark:block dark:bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] dark:bg-[length:40px_40px]"></div>

  {/* Section Header */}
  <div className="relative max-w-4xl mx-auto flex flex-col justify-center items-center text-center space-y-6 px-6 mb-12">
    <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
      Education
    </h2>
    <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300">
      Academic journey in energy, concentrated solar power, and sustainable technologies.
    </p>
  </div>

  {/* Education Cards */}
<div className="relative max-w-6xl mx-auto flex flex-wrap gap-6 justify-center px-6">
  {[
    {
      degree: "PhD in Energy, Thermal & Building Sustainable Technologies",
      school: "Cadi Ayyad University",
      period: "2021–2024",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Universite_Cadi_Ayyad.png/250px-Universite_Cadi_Ayyad.png",
    },
    {
      degree: "Master in Solar Power Plants",
      school: "Cadi Ayyad University",
      period: "2018–2020",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Universite_Cadi_Ayyad.png/250px-Universite_Cadi_Ayyad.png",
    },
    {
      degree: "Bachelor in Renewable Energies",
      school: "Hassan 1 University",
      period: "2018",
      logo: "https://seeklogo.com/images/U/universite-hassan-1er-settat-logo-7155C7CC1B-seeklogo.com.png",
    }
  ].map((edu, idx) => (
    <a
      key={idx}
      target="_blank"
      rel="noopener noreferrer"
      className="group w-64 bg-white dark:bg-gray-700 rounded-2xl shadow-2xl p-6 hover:shadow-3xl hover:scale-105 transition-transform duration-300 cursor-pointer"
    >
      {/* Logo container with fixed size */}
      <div className="w-24 h-24 mx-auto mb-4 flex items-center justify-center">
        <img
          src={edu.logo}
          alt={edu.school}
          className="max-w-full max-h-full object-contain"
        />
      </div>

      <h4 className="font-semibold text-center text-gray-800 dark:text-gray-100 mb-1">{edu.degree}</h4>
      <p className="text-sm text-gray-500 dark:text-gray-300 text-center">{edu.school}</p>
      <p className="text-gray-700 dark:text-gray-200 text-center mt-2">{edu.period}</p>
    </a>
  ))}
</div>

</section>

{/* Certifications Section */}
<section
  id="certifications"
  className="relative pt-6 pb-6 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 overflow-hidden transition-colors duration-300"
>
  {/* Section Header */}
  <div className="relative max-w-4xl mx-auto flex flex-col justify-center items-center text-center space-y-4 px-6 mb-8">
    <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">
      Certifications
    </h2>
    <p className="text-base md:text-lg text-gray-700 dark:text-gray-300">
      Professional certifications and academic training.
    </p>
  </div>

{/* Certification Cards */}
<div className="relative max-w-4xl mx-auto flex flex-col gap-4 px-6">
  {[
    { name: "KOICA Training: Green Technology R&D Project Management", period: "2023", logo: "https://www.intracen.org/sites/default/files/styles/large/public/media/image/media_image/2025/02/07/koica_logo.png" },
    { name: "Summer School Lecturer on Buildings & Energy Efficiency", period: "2023", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/HSO_Logo_Quer_RGB_positiv.svg/250px-HSO_Logo_Quer_RGB_positiv.svg.png" },
    { name: "Research Stay – Building Envelope & Energy Efficiency Practices", period: "2022", logo: "https://www.entpe.fr/sites/default/files/2018-09/entpe_logo_cmjn_couleur_baseline.png" },
    { name: "EF SET C2 – English Proficiency Certificate", period: "2020", logo: "https://images.seeklogo.com/logo-png/36/2/the-ef-standard-english-test-logo-png_seeklogo-363583.png", link: "https://www.efset.org/cert/1CEQCD" }
  ].map((cert, idx) => {
    const isLink = !!cert.link;
    const CardWrapper = isLink ? "a" : "div";

    return (
      <CardWrapper
        key={idx}
        href={cert.link || undefined}
        target={isLink ? "_blank" : undefined}
        rel={isLink ? "noopener noreferrer" : undefined}
        className="relative group flex items-center w-full bg-white dark:bg-gray-700 rounded-2xl p-4 pb-10 hover:scale-105 transition-transform duration-300 cursor-pointer"
      >
        {/* Left side: logo + text */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 flex items-center justify-center">
            <img
              src={cert.logo}
              alt={cert.name}
              className="max-w-full max-h-full object-contain"
            />
          </div>
          <span className="font-semibold text-gray-800 dark:text-gray-100">{cert.name}</span>
        </div>

        {/* Top-right: year */}
        <span className="absolute top-2 right-4 text-sm text-gray-500 dark:text-gray-300">{cert.period}</span>

        {/* Bottom-right badge for EFSET */}
        {isLink && (
          <div className="absolute bottom-2 right-4 bg-blue-600 text-white text-xs px-2 py-1 rounded-full z-10">
            Access Certificate
          </div>
        )}
      </CardWrapper>
    );
  })}
</div>
</section>

{/* Skills Section */}
<section
  id="skills"
  className="relative pt-6 pb-12 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 overflow-hidden transition-colors duration-300"
>
  {/* Section Header */}
  <div className="relative max-w-4xl mx-auto flex flex-col justify-center items-center text-center space-y-4 px-6 mb-8">
    <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">
      Skills
    </h2>
    <p className="text-base md:text-lg text-gray-700 dark:text-gray-300">
      Technical expertise and programming skills with interactive flair.
    </p>
  </div>

  {/* Programming Languages */}
  <div className="max-w-6xl mx-auto px-6 mb-8">
    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4 text-center">
      Programming Languages
    </h3>
    <div className="flex flex-wrap justify-center gap-6">
      {[
        { name: "Python", logo: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg" },
        { name: "MATLAB", logo: "https://upload.wikimedia.org/wikipedia/commons/2/21/Matlab_Logo.png" },
        { name: "R", logo: "https://upload.wikimedia.org/wikipedia/commons/1/1b/R_logo.svg" },
        { name: "Ruby", logo: "https://upload.wikimedia.org/wikipedia/commons/7/73/Ruby_logo.svg" },
        { name: "C++", logo: "https://upload.wikimedia.org/wikipedia/commons/1/18/ISO_C%2B%2B_Logo.svg" }
      ].map((skill, idx) => (
        <div
          key={idx}
          className="group w-24 h-28 bg-white dark:bg-gray-700 rounded-2xl flex flex-col items-center justify-center cursor-pointer
                     transition-transform duration-500 transform-gpu hover:rotate-12 hover:scale-125 hover:translate-y-[-10px] hover:translate-x-[5px] hover:skew-x-3 hover:skew-y-2 hover:shadow-2xl"
        >
          <img
            src={skill.logo}
            alt={skill.name}
            className="w-12 h-12 mb-2 object-contain transition-transform duration-500 group-hover:rotate-[360deg] group-hover:scale-125"
          />
          <span className="text-sm text-gray-800 dark:text-gray-100 text-center">{skill.name}</span>
        </div>
      ))}
    </div>
  </div>

  {/* Simulation, Modeling & Optimization */}
  <div className="max-w-6xl mx-auto px-6">
    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4 text-center">
      Simulation, Modeling & Optimization
    </h3>
    <div className="flex flex-wrap justify-center gap-6">
      {[
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
      ].map((skill, idx) => (
        <div
          key={idx}
          className="group w-24 h-28 bg-white dark:bg-gray-700 rounded-2xl flex flex-col items-center justify-center cursor-pointer
                     transition-transform duration-500 transform-gpu hover:rotate-12 hover:scale-125 hover:translate-y-[-10px] hover:translate-x-[5px] hover:skew-x-3 hover:skew-y-2 hover:shadow-2xl"
        >
          <img
            src={skill.logo}
            alt={skill.name}
            className="w-12 h-12 mb-2 object-contain transition-transform duration-500 group-hover:rotate-[360deg] group-hover:scale-125"
          />
          <span className="text-sm text-gray-800 dark:text-gray-100 text-center">{skill.name}</span>
        </div>
      ))}
    </div>
  </div>
</section>


{/* Languages Section */}
<section
  id="languages"
  className="relative pt-6 pb-6 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 overflow-hidden transition-colors duration-300"
>
  {/* Section Header */}
  <div className="relative max-w-4xl mx-auto flex flex-col justify-center items-center text-center space-y-4 px-6 mb-8">
    <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">
      Languages
    </h2>
    <p className="text-base md:text-lg text-gray-700 dark:text-gray-300">
      Language proficiency and fluency levels.
    </p>
  </div>

  {/* Language Bars */}
  <div className="relative max-w-4xl mx-auto flex flex-col gap-6 px-6">
    {[
      { name: "Arabic", level: 100, label: "Native" },
      { name: "French", level: 95, label: "Full Professional" },
      { name: "English", level: 95, label: "Full Professional" }
    ].map((lang, idx) => (
      <div key={idx} className="flex flex-col gap-1">
        <div className="flex justify-between mb-1">
          <span className="font-semibold text-gray-800 dark:text-gray-100">{lang.name}</span>
          <span className="font-medium text-gray-600 dark:text-gray-300">{lang.label}</span>
        </div>

        {/* Progress bar container */}
        <div className="relative w-full bg-gray-200 dark:bg-gray-700 rounded-full h-6 overflow-hidden">
          {/* Levels markers */}
          {["Beginner", "Intermediate", "Advanced", "Full Professional", "Native"].map((lvl, i) => (
            <span
              key={i}
              className="absolute top-0 left-[calc(20%*var(--i))] w-0.5 h-full bg-gray-400 dark:bg-gray-500 opacity-50"
              style={{ "--i": i }}
            ></span>
          ))}

          {/* Animated progress */}
          <div
            className="h-6 bg-blue-600 dark:bg-blue-400 rounded-full transition-all duration-2000 ease-out"
            style={{ width: `${lang.level}%` }}
          ></div>
        </div>
      </div>
    ))}
  </div>
</section>

{/* Publications Section */}
<section id="publications" className="relative max-w-4xl mx-auto px-6 py-10">
  <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-8">
    Publications
  </h2>

  {/* Cards Container */}
  <div
  ref={containerRef}
  className="flex gap-6 overflow-x-auto snap-x snap-mandatory md:overflow-hidden scrollbar-hide"
  onScroll={handleScroll}
>
  {publicationsData.map((paper, idx) => (
    <div
      key={idx}
      className="flex-shrink-0 w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden snap-center"
    >
      {/* Image */}
      <div className="w-full flex justify-center bg-gray-100 dark:bg-gray-700 p-4">
        <img
          src={paper.image}
          alt={paper.title}
          className="max-h-[320px] w-auto object-contain"
        />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col gap-2">
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
          {paper.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">{paper.authors}</p>
        <p className="text-sm italic text-gray-500 dark:text-gray-400">{paper.journal}</p>

        <p className="text-gray-700 dark:text-gray-200 mt-2">
          {expanded[idx] ? paper.abstract : paper.abstract.slice(0, 180) + "..."}
        </p>
        <button
          onClick={() => toggleExpanded(idx)}
          className="text-blue-600 dark:text-blue-400 underline text-sm self-start"
        >
          {expanded[idx] ? "View Less" : "View More"}
        </button>

        <div className="flex justify-end mt-4">
          <a
            href={paper.link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 text-white px-5 py-2 rounded-xl shadow-md hover:bg-blue-700 transition"
          >
            View Paper
          </a>
        </div>
      </div>
    </div>
  ))}
</div>


  {/* Arrows (desktop only) */}
  <button
    onClick={prevSlide}
    className="hidden md:flex absolute top-1/2 -translate-y-1/2 left-3 md:-left-12 bg-blue-600 text-white p-3 rounded-full shadow-md hover:bg-blue-700 transition"
  >
    <ChevronLeft className="w-6 h-6" />
  </button>

  <button
    onClick={nextSlide}
    className="hidden md:flex absolute top-1/2 -translate-y-1/2 right-3 md:-right-12 bg-blue-600 text-white p-3 rounded-full shadow-md hover:bg-blue-700 transition"
  >
    <ChevronRight className="w-6 h-6" />
  </button>

  {/* Dots */}
  <div className="flex justify-center gap-2 mt-6">
    {publicationsData.map((_, idx) => (
      <button
        key={idx}
        onClick={() => scrollToCard(idx)}
        className={`w-3 h-3 rounded-full transition ${
          idx === current
            ? "bg-blue-600 scale-125 shadow-md"
            : "bg-gray-400 dark:bg-gray-600"
        }`}
      />
    ))}
  </div>
</section>

{/* Contact Section */}
<section
  id="contact"
  className="relative pt-16 pb-12 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 overflow-hidden transition-colors duration-300"
>
  {/* Decorative grid in background */}
  <div
    className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-10"
    style={{
      backgroundImage: `
        linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)
      `,
      backgroundSize: "40px 40px",
    }}
  ></div>

  {/* Section Header */}
  <div className="relative max-w-4xl mx-auto text-center mb-12 px-6">
    <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Contact Me</h2>
    <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300">
      Get in touch via email or connect via research platforms below.
    </p>
  </div>

  {/* Contact Cards */}
<div className="relative max-w-4xl mx-auto flex flex-col md:flex-row gap-8 px-6 justify-center">
  {[
    {
      type: "Location",
      value: "Marrakech, Morocco",
      icon: "📍",
    },
    {
      type: "Email",
      value: "imadaitlaasri@gmail.com",
      icon: "✉️",
      link: "mailto:imadaitlaasri@gmail.com"
    }
  ].map((c, idx) => {
    const CardWrapper = c.link ? "a" : "div";
    return (
      <CardWrapper
        key={idx}
        href={c.link || undefined}
        className="group flex-1 bg-white dark:bg-gray-700 rounded-2xl p-6 flex items-center gap-4 transform transition duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer"
      >
        <div className="w-14 h-14 flex items-center justify-center text-3xl bg-blue-100 dark:bg-blue-600 rounded-full transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">
          {c.icon}
        </div>
        <div className="flex-1">
          <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">{c.value}</p>
          <p className="text-sm text-gray-500 dark:text-gray-300">{c.type}</p>
        </div>
      </CardWrapper>
    );
  })}
</div>

  {/* Social / Research Icons */}
  <div className="mt-8 flex justify-center gap-6">
    {[{
      name: "LinkedIn",
      icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/linkedin.svg",
      link: "https://www.linkedin.com/in/imadaitlaasri/"
    },{
      name: "ResearchGate",
      icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/researchgate.svg",
      link: "https://www.researchgate.net/profile/Imad-Ait-Laasri"
    },{
      name: "ORCID",
      icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/orcid.svg",
      link: "https://orcid.org/0000-0002-3977-5490"
    }].map((s, idx) => (
      <a
        key={idx}
        href={s.link}
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 flex items-center justify-center bg-white dark:bg-gray-700 rounded-full transition-transform duration-300 hover:scale-110"
        title={s.name}
      >
        <img src={s.icon} alt={s.name} className="w-6 h-6 object-contain" />
      </a>
    ))}
  </div>
</section>

{/* Footer */}
<footer className="bg-gray-100 dark:bg-gray-800 text-center py-6 text-sm text-gray-500 dark:text-gray-300 transition-colors duration-300">
  © {new Date().getFullYear()} Dr. Imad AIT LAASRI. All rights reserved. 
  <br />
  Website designed and developed by Dr. Imad AIT LAASRI.
</footer>

    </div>
  );
}
