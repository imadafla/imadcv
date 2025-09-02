import { useState, useEffect } from "react";

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

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
                className="hover:text-blue-600 transition"
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </a>
            ))}

            {/* Dark Mode Toggle Desktop */}
            <button
              onClick={toggleDarkMode}
              className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded transition"
            >
              {darkMode ? "Light" : "Dark"}
            </button>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleDarkMode}
              className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded transition"
            >
              {darkMode ? "Light" : "Dark"}
            </button>

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

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-800 shadow-md flex flex-col items-end"> 
            {sections.map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className="block px-6 py-3 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded w-full text-right"
                onClick={() => setMobileMenuOpen(false)}
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
        className="pt-28 bg-gray-50 dark:bg-gray-900 min-h-[80vh] flex items-center transition-colors duration-300"
      >
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          {/* Text */}
          <div className="text-center md:text-left">
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
              src="/profile.jpg"
              alt="Dr. Imad AIT LAASRI"
              className="w-64 md:w-80 h-auto rounded-full object-cover shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white dark:bg-gray-800 py-12 shadow-inner transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <h3 className="text-3xl font-bold text-blue-600 dark:text-blue-400">5+</h3>
            <p className="text-gray-600 dark:text-gray-300">Years Experience</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-blue-600 dark:text-blue-400">20+</h3>
            <p className="text-gray-600 dark:text-gray-300">Publications</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-blue-600 dark:text-blue-400">10+</h3>
            <p className="text-gray-600 dark:text-gray-300">Projects</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-blue-600 dark:text-blue-400">3</h3>
            <p className="text-gray-600 dark:text-gray-300">Teaching Roles</p>
          </div>
        </div>
      </section>

      {/* Sections */}
      {[
        {
          id: "summary",
          title: "Summary",
          content:
            "Experienced researcher in innovative applications of passive and active energy systems and materials for buildings, with expertise in modeling, optimization, and advanced visualization.",
        },
        {
          id: "experience",
          title: "Experience",
          content: (
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold">
                  Scientist – Green Energy Park (2024–Present)
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Leading research in novel energy systems & materials for
                  buildings.
                </p>
              </div>
              <div>
                <h4 className="font-semibold">
                  Adjunct Professor – UM6P (2024)
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Teaching energy systems and sustainable building technologies.
                </p>
              </div>
            </div>
          ),
        },
        {
          id: "education",
          title: "Education",
          content: (
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold">
                  PhD in Energy, Thermal & Sustainable Building Technology
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Cadi Ayyad University (2021–2024)
                </p>
              </div>
              <div>
                <h4 className="font-semibold">
                  Master in Concentrated Solar Power Plants
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">UM6P (2018–2020)</p>
              </div>
            </div>
          ),
        },
        {
          id: "certifications",
          title: "Certifications",
          content: (
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1">
              <li>KOICA Training, South Korea (2023)</li>
              <li>Summer School Lecturer, Germany (2023)</li>
              <li>Research Stay, ENTPE France (2022)</li>
            </ul>
          ),
        },
        {
          id: "skills",
          title: "Skills & Interests",
          content:
            "Modeling, AI, Optimization, Thermal Systems, Renewable Energy, Data Visualization, Programming (Python, MATLAB, R, C++).",
        },
        {
          id: "languages",
          title: "Linguistic Skills",
          content: (
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1">
              <li>Arabic – Native</li>
              <li>French – Full Professional</li>
              <li>English – Full Professional</li>
            </ul>
          ),
        },
        {
          id: "publications",
          title: "Publications",
          content:
            "20+ Scopus-indexed journal and conference papers in energy systems, building technologies, and materials innovation.",
        },
        {
          id: "contact",
          title: "Contact",
          content: (
            <div className="space-y-2 text-gray-700 dark:text-gray-300 text-lg">
              <p>
                <span className="font-semibold">Location:</span> Marrakech, Morocco
              </p>
              <p>
                <span className="font-semibold">Email:</span>{" "}
                <a
                  href="mailto:imadaitlaasri@gmail.com"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  imadaitlaasri@gmail.com
                </a>
              </p>
            </div>
          ),
        },
      ].map((section) => (
        <section
          key={section.id}
          id={section.id}
          className="max-w-6xl mx-auto px-6 py-16"
        >
          <h3 className="text-3xl font-bold mb-6">{section.title}</h3>
          <div className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
            {section.content}
          </div>
        </section>
      ))}

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-800 text-center py-6 text-sm text-gray-500 dark:text-gray-300 mt-10 transition-colors duration-300">
        © {new Date().getFullYear()} Dr. Imad AIT LAASRI
      </footer>
    </div>
  );
}
