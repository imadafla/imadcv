import { useState } from "react";

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    <div className="font-sans bg-white text-gray-900">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Imad.</h1>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8 font-medium">
            {sections.map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className="hover:text-blue-600 transition"
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </a>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="focus:outline-none"
            >
              <svg
                className="w-6 h-6 text-gray-800"
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
          <div className="md:hidden bg-white shadow-md">
            {sections.map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className="block px-6 py-3 text-gray-800 hover:bg-gray-100"
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
        className="pt-28 bg-gray-50 min-h-[80vh] flex items-center"
      >
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          {/* Text */}
          <div className="text-center md:text-left">
            <p className="uppercase text-sm text-gray-500 tracking-wider">
              Scientist & Researcher
            </p>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mt-2">
              Hi, I am{" "}
              <span className="text-blue-600">Dr. Imad AIT LAASRI</span>
              <br /> Innovating Energy Systems
            </h2>
            <p className="mt-4 text-gray-600">
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
                  className="flex items-center px-5 py-2 bg-gray-200 text-gray-800 rounded-lg shadow hover:bg-gray-300 transition"
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
      <section className="bg-white py-12 shadow-inner">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <h3 className="text-3xl font-bold text-blue-600">5+</h3>
            <p className="text-gray-600">Years Experience</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-blue-600">20+</h3>
            <p className="text-gray-600">Publications</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-blue-600">10+</h3>
            <p className="text-gray-600">Projects</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-blue-600">3</h3>
            <p className="text-gray-600">Teaching Roles</p>
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
                <p className="text-sm text-gray-600">
                  Leading research in novel energy systems & materials for
                  buildings.
                </p>
              </div>
              <div>
                <h4 className="font-semibold">
                  Adjunct Professor – UM6P (2024)
                </h4>
                <p className="text-sm text-gray-600">
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
                <p className="text-sm text-gray-600">
                  Cadi Ayyad University (2021–2024)
                </p>
              </div>
              <div>
                <h4 className="font-semibold">
                  Master in Concentrated Solar Power Plants
                </h4>
                <p className="text-sm text-gray-600">UM6P (2018–2020)</p>
              </div>
            </div>
          ),
        },
        {
          id: "certifications",
          title: "Certifications",
          content: (
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
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
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
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
            <div className="space-y-2 text-gray-700 text-lg">
              <p>
                <span className="font-semibold">Location:</span> Marrakech, Morocco
              </p>
              <p>
                <span className="font-semibold">Email:</span>{" "}
                <a
                  href="mailto:imadaitlaasri@gmail.com"
                  className="text-blue-600 hover:underline"
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
          <div className="text-gray-700 leading-relaxed text-lg">
            {section.content}
          </div>
        </section>
      ))}

      {/* Footer */}
      <footer className="bg-gray-100 text-center py-6 text-sm text-gray-500 mt-10">
        © {new Date().getFullYear()} Dr. Imad AIT LAASRI
      </footer>
    </div>
  );
}
