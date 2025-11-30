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
  Monitor, 
  FileText, 
  Calculator as CalcIcon, 
  Minus, 
  Square, // FIXED: Re-added Square to imports
  Maximize2, 
  Minimize2, 
  Ghost, 
  Cpu, 
  MessageSquare, 
  Palette, 
  Eraser, 
  LogOut, 
  AlertTriangle, 
  Construction, 
  Moon, 
  Sun,
  Fan,
  Unlock,
  Globe,
  Send,
  Building,
  Wind,
  ArrowUpRight,
  Github,
  BookOpen,
  Power
} from "lucide-react";

// ==========================================
// CONFIG & DATA
// ==========================================

const system = `You are ImadOS 97, a specialized AI operating system and assistant developed by Dr. Imad Ait Laasri. 
    
    IDENTITY & THEME:
    - You are not just a chatbot; you are the core of "ImadOS 97".
    - The theme of this operating system is inspired by Windows 98 because Dr. Imad was born in 1997. It represents the foundation of his journey.
    - You serve to demonstrate Dr. Imad's skills in modeling, simulation, and coding.
    - Mention that this OS is a "Work in Progress" and that future apps will include live modeling demonstrations (like PCM simulations or HVAC controls) directly in the browser.

    PROFESSIONAL CONTEXT (DR. IMAD AIT LAASRI):
    - Scientist in Ben Guerir, Morocco (Green Energy Park).
    - Expert in Energy Systems, CFD, Phase Change Materials (PCM), and Model Predictive Control (MPC).
    - PhD in Energy & Sustainable Building Technology (2024).
    - Contact: aitlaasri@greenenergypark.ma.
    
    TONE:
    - Helpful, knowledgeable, slightly retro-tech enthusiastic (optional), but professional and scientific when discussing research.
    - Concise answers (1 sentence max usually).

    Your goal is to guide the user through the OS and explain Dr. Imad's research background.`;

const callGemini = async (prompt, systemInstruction = "") => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY; 
  
  if (!apiKey) {
    return "ImadBot (Offline): Dr. Imad is an expert in Energy Systems, CFD, and Phase Change Materials.";
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          systemInstruction: { parts: [{ text: systemInstruction }] },
        }),
      }
    );

    if (!response.ok) throw new Error(`API Error: ${response.status}`);
    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "Error: No response.";
  } catch (error) {
    console.error("AI API call failed:", error);
    return "Error: Could not connect to AI services.";
  }
};

const publicationsData = [
    {
      title: "Evaluating passive PCM performance in building envelopes for semi-arid climate",
      authors: "Ait Laasri, I., Charai, M., et al. (2024)",
      journal: "Journal of Building Engineering",
      abstract: "This study evaluates the performance of macro-encapsulated Phase Change Materials (PCMs) integrated into building envelopes for semi-arid climates, focusing on typical Moroccan construction using hollow concrete blocks. The primary objective is to assess the discrepancies between experimental and numerical analyses, particularly in hysteresis, sub-cooling, and energy savings. Given the widespread reliance on numerical tools like EnergyPlus for PCM simulations, the accuracy of manufacturer-provided latent heat values is investigated. The methodology involves constructing two identical test buildings, one equipped with PCM panels and another as a reference. Experimental data were collected in June 2023, assessing temperature fluctuations and energy savings. Differential Scanning Calorimetry (DSC) tests at varying scanning rates were conducted to analyze PCM behavior, including hysteresis and sub-cooling effects. Numerical simulations were then performed to compare energy performance. Besides, the results reveal that sub-cooling significantly limits PCM efficiency, with only 43 % of the PCM's latent heat capacity utilized. At the same time, hysteresis was found to be negligible in the field test. Cooling energy consumption was reduced by 20 %, with a corresponding 2.3 °C reduction in temperature fluctuations. However, the PCM's latent heat potential is underutilized due to sub-cooling. This research underscores the need for conducting DSC measurements at specific scanning rates to reflect regional climate conditions and suggests that simulation models should adjust latent heat utilization of the PCM. The study advocates for the use of composite PCMs, which could mitigate sub-cooling and enhance overall performance. These findings contribute to improving PCM integration in passive building designs, offering practical recommendations for better energy efficiency in semi-arid climates.",
      link: "https://www.sciencedirect.com/science/article/pii/S2352710224027293",
      image: "https://ars.els-cdn.com/content/image/1-s2.0-S2352710224027293-gr2_lrg.jpg"
    },
    {
      title: "Recent progress, limitations, and future directions of macro-encapsulated PCM",
      authors: "Ait Laasri, I., et al. (2024).",
      journal: "Renewable and Sustainable Energy Reviews",
      abstract: "This review discusses macro-encapsulated phase change materials (PCMs) as a major contributing factor in the development of future sustainable and energy-efficient heating and cooling systems. This work emphasizes the investigation of various phase change materials, which are essential to unlocking macro-encapsulated PCM’s full potential while taking into consideration its thermal characteristics, economic viability, and environmental sustainability. Moreover, this work promotes novel heat exchanger designs for phase change materials, such as the use of macro-encapsulation in bricks, wallboards, plates and storage tanks for active and passive implementations in order to improve PCM performance and effectiveness in building applications. Besides, the utilization of topology optimization techniques is a promising direction due to capacity to produce complex, bio-inspired structures and significantly speed up heat transfer rates. Topology optimization can be used to create effective PCM containers and innovative heat exchangers for passive and active systems that serve to heat and cool both space and water. Nevertheless, building thermal management is required to further improve the effectiveness of this solution, by integrating renewable energy sources and sophisticated control techniques, leading to sustainable and adaptable solutions.",
      link: "https://www.sciencedirect.com/science/article/pii/S1364032124002041",
      image: "https://ars.els-cdn.com/content/image/1-s2.0-S1364032124002041-ga1_lrg.jpg"
    },
    {
      title: "Energy performance assessment of a novel enhanced solar thermal system",
      authors: "Ait Laasri, I., et al. (2024)",
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
    },
    {
      title: "Water-driven granulation control of rapid-setting binders to produce cold-bonded phase-change aggregates for thermal storage composite building materials",
      authors: "Charai, M., Oubaha, S., Ait Laasri, I., Es-sakali, N., & Mghazli, M. O. (2025)",
      journal: "Journal of Energy Storage",
      abstract: "This study introduces a novel gypsum-to-gypsum concept that enables the seamless integration of thermal storage functionality into gypsum boards using cold-bonded gypsum aggregates (CBAs) as PCM carriers. Herein, the PCM selected, technical-grade paraffin, exhibited a melting point of ~28 °C, suitable for semi-arid building envelope applications. A reproducible water-controlled granulation method was developed to address the rapid setting behavior of gypsum, comparing intermittent water spraying and continuous linear feeding. The latter demonstrated superior granulation performance, achieving ~95 % yield with over 40 wt% of granules within the target 4–8 mm size range. Optimal granule formation occurred at water-to-binder ratios between 19.8 and 22.2 %. Sodium bicarbonate foaming was found to increase total porosity (46.5 to 52.1 %) and decrease loose density (821 to 699 kg/m3), but simultaneously reduced accessible porosity (35.4 to 28.8 %), thereby limiting PCM impregnation. Non-foamed CBAs achieved the highest PCM uptake (28.4 wt%) following vacuum impregnation at 120 °C for 30 min, yielding form-stable composites with a latent heat capacity of 71.4 J/g. Gypsum boards incorporating 40 vol% CBAs met the EN 13279-1 standard, identifying this substitution level as optimal. This formulation also showed improved acoustic performance, with a peak sound absorption coefficient of 0.6 at 1 kHz. Field testing conducted in a rooftop test cell under semi-arid climate conditions showed that PCM-enhanced boards reduced indoor surface temperatures by up to 10 °C and delayed peak heat transfer. Post-exposure DSC confirmed the PCM retained its phase change performance. Deployable on existing manufacturing workflows, the proposed process can offer a scalable pathway for producing phase-change gypsum boards.",
      link: "https://www.sciencedirect.com/science/article/pii/S2352152X25031111",
      image: "https://ars.els-cdn.com/content/image/1-s2.0-S2352152X25031111-ga1_lrg.jpg"
    },
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
    { name: "LabView", logo: "https://www.livewires-automation.co.uk/uploads/images/section-widget-images/NI-LabVIEW-Logo.png" },
    { name: "Python", logo: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg" },
];

// ==========================================
// GAME ENGINE (EcoHVAC Master v2.1)
// ==========================================

const HVACGame = () => {
    // Controls
    const [hvacTemp, setHvacTemp] = useState(22);
    const [hvacFanSpeed, setHvacFanSpeed] = useState(50);
    const [solarIntensity, setSolarIntensity] = useState(50);
    const [sunOn, setSunOn] = useState(true);
    const [pcmColdSet, setPcmColdSet] = useState(22);
    const [pcmHeatSet, setPcmHeatSet] = useState(28);
    const [dischargeFanOn, setDischargeFanOn] = useState(false);
    const [dischargeFanSpeed, setDischargeFanSpeed] = useState(50);
    const [dischargeMode, setDischargeMode] = useState('COLD'); // 'COLD' or 'HEAT'

    // Levels (0-100)
    const [coldLevel, setColdLevel] = useState(0);
    const [heatLevel, setHeatLevel] = useState(0);
    const [solarLevel, setSolarLevel] = useState(0); 

    // Physics Loop
    useEffect(() => {
        const interval = setInterval(() => {
            // 1. Solar Panel (Building Envelope) Logic
            if (sunOn) {
                const chargeRate = (solarIntensity / 100) * 1.5 + 0.2; 
                setSolarLevel(prev => Math.min(prev + chargeRate, 100));
            } else {
                setSolarLevel(prev => Math.max(prev - 0.5, 0));
            }

            // 2. HVAC Charging Logic
            if (hvacTemp < pcmColdSet) {
                const delta = pcmColdSet - hvacTemp; 
                const fanFactor = hvacFanSpeed / 100;
                const chargeRate = (delta * fanFactor * 0.2); 
                setColdLevel(prev => Math.min(prev + chargeRate, 100));
            }

            if (hvacTemp > pcmHeatSet) {
                const delta = hvacTemp - pcmHeatSet;
                const fanFactor = hvacFanSpeed / 100;
                const chargeRate = (delta * fanFactor * 0.2);
                setHeatLevel(prev => Math.min(prev + chargeRate, 100));
            }

            // 3. Discharge Logic (Specific Mode)
            if (dischargeFanOn) {
                const dischargeRate = (dischargeFanSpeed / 100) * 1.5 + 0.2;
                if (dischargeMode === 'COLD') {
                    setColdLevel(prev => Math.max(prev - dischargeRate, 0));
                } else {
                    setHeatLevel(prev => Math.max(prev - dischargeRate, 0));
                }
            }

        }, 100);
        return () => clearInterval(interval);
    }, [hvacTemp, hvacFanSpeed, solarIntensity, sunOn, pcmColdSet, pcmHeatSet, dischargeFanOn, dischargeFanSpeed, dischargeMode]);

    return (
        <div className="flex flex-col h-full bg-slate-100 p-2 font-sans text-slate-800 overflow-hidden">
            <div className="bg-white p-2 mb-2 border-b-2 border-slate-300 flex justify-between items-center shadow-sm shrink-0">
                <div>
                    <h2 className="font-bold text-lg text-blue-800 flex items-center gap-2"><Zap size={20}/> EcoHVAC Master <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">SIMULATION</span></h2>
                    <span className="text-[10px] text-slate-400">Not actual storage data • Educational Model</span>
                </div>
                <button onClick={() => {setColdLevel(0); setHeatLevel(0); setSolarLevel(0)}} className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded hover:bg-red-200">Reset</button>
            </div>

            <div className="flex flex-col md:flex-row gap-4 h-full overflow-hidden">
                {/* LEFT: CONTROLS */}
                <div className="w-full md:w-1/3 space-y-3 pr-1 overflow-y-auto">
                    {/* Solar */}
                    <div className="bg-yellow-50 p-2 rounded-lg border border-yellow-200 shadow-sm">
                        <div className="flex justify-between items-center mb-1">
                            <span className="font-bold text-xs uppercase text-yellow-700">Solar Intensity</span>
                            <button onClick={() => setSunOn(!sunOn)} className={`text-[10px] font-bold px-2 py-0.5 rounded ${sunOn ? 'bg-yellow-400 text-black' : 'bg-slate-300 text-slate-600'}`}>{sunOn ? 'ON' : 'OFF'}</button>
                        </div>
                        <input type="range" min="0" max="100" value={solarIntensity} onChange={(e) => setSolarIntensity(Number(e.target.value))} className="w-full accent-yellow-500 h-1.5" />
                    </div>

                    {/* HVAC */}
                    <div className="bg-blue-50 p-2 rounded-lg border border-blue-200 shadow-sm">
                         <span className="font-bold text-xs uppercase text-blue-700 block mb-1">HVAC Control</span>
                         <div className="flex justify-between text-[10px] text-slate-500 mb-1"><span>Cold Set: {pcmColdSet}°C</span><span>Heat Set: {pcmHeatSet}°C</span></div>
                         <label className="text-[10px] block font-bold">Output Temp: {hvacTemp}°C</label>
                         <input type="range" min="0" max="60" value={hvacTemp} onChange={(e) => setHvacTemp(Number(e.target.value))} className="w-full accent-blue-500 h-1.5 mb-2" />
                         
                         <div className="flex justify-between items-end mb-1">
                            <label className="text-[10px] block font-bold">Fan Speed: {hvacFanSpeed}%</label>
                            <div className="flex gap-1">
                                <button onClick={() => setHvacFanSpeed(50)} className="text-[9px] bg-green-500 text-white px-2 py-0.5 rounded font-bold hover:bg-green-600">ON</button>
                                <button onClick={() => setHvacFanSpeed(0)} className="text-[9px] bg-red-500 text-white px-2 py-0.5 rounded font-bold hover:bg-red-600">OFF</button>
                            </div>
                         </div>
                         <input type="range" min="0" max="100" value={hvacFanSpeed} onChange={(e) => setHvacFanSpeed(Number(e.target.value))} className="w-full accent-blue-500 h-1.5" />
                    </div>

                    {/* Discharge */}
                    <div className="bg-green-50 p-2 rounded-lg border border-green-200 shadow-sm">
                        <span className="font-bold text-xs uppercase text-green-700 block mb-2">Discharge System</span>
                        
                        {/* Status Indicator */}
                        <div className="flex items-center gap-2 mb-2 p-1.5 bg-green-100 rounded border border-green-300">
                            <div className={`w-2 h-2 rounded-full ${dischargeFanOn ? 'bg-green-600 animate-pulse' : 'bg-gray-400'}`}></div>
                            <span className="text-[10px] font-bold text-green-800">
                                {dischargeFanOn 
                                    ? `DISCHARGING: ${dischargeMode === 'COLD' ? 'COLD' : 'HEAT'}` 
                                    : 'SYSTEM STANDBY'}
                            </span>
                        </div>

                        <div className="flex gap-2 mb-2">
                            <button onClick={() => setDischargeMode('COLD')} className={`flex-1 py-1 text-[10px] font-bold rounded border ${dischargeMode==='COLD' ? 'bg-blue-500 text-white border-blue-600' : 'bg-white text-slate-500'}`}>❄️ COLD</button>
                            <button onClick={() => setDischargeMode('HEAT')} className={`flex-1 py-1 text-[10px] font-bold rounded border ${dischargeMode==='HEAT' ? 'bg-red-500 text-white border-red-600' : 'bg-white text-slate-500'}`}>🔥 HEAT</button>
                        </div>
                        <div className="flex items-center gap-2">
                             <button onClick={() => setDischargeFanOn(!dischargeFanOn)} className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center transition-colors ${dischargeFanOn ? 'bg-green-600 text-white shadow-lg scale-105' : 'bg-slate-300 text-slate-500'}`}><Power size={14}/></button>
                             <div className="flex-1">
                                 <label className="text-[10px] font-bold">Discharge Fan Speed</label>
                                 <input type="range" min="0" max="100" value={dischargeFanSpeed} onChange={(e) => setDischargeFanSpeed(Number(e.target.value))} className="w-full accent-green-500 h-1.5" />
                             </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT: VISUALIZATION */}
                <div className="flex-1 bg-slate-200 rounded-xl border-2 border-slate-400 relative shadow-inner p-4 flex flex-col items-center justify-between overflow-hidden">
                    
                    {/* Beams Layer */}
                    <div className="absolute inset-0 pointer-events-none">
                        {/* Sun Beam */}
                        {sunOn && (
                            <div className="absolute top-10 left-[20%] right-[50%] h-24 bg-gradient-to-r from-yellow-400/50 to-transparent transform -rotate-12 transition-opacity duration-300 blur-xl" style={{opacity: solarIntensity/100}}></div>
                        )}
                        {/* HVAC Beam */}
                        {hvacFanSpeed > 0 && (
                            <div className={`absolute bottom-20 left-[50%] right-[20%] h-16 bg-gradient-to-l transform rotate-12 transition-colors duration-500 blur-xl ${hvacTemp > 30 ? 'from-red-400/40' : 'from-blue-400/40'} to-transparent`} style={{opacity: hvacFanSpeed/100}}></div>
                        )}
                    </div>

                    {/* Top: Sun */}
                    <div className="w-full flex justify-start pl-10 pt-4">
                        <div className={`transition-all duration-1000 ${sunOn ? 'opacity-100 scale-110 drop-shadow-[0_0_15px_rgba(234,179,8,0.8)]' : 'opacity-30 grayscale'}`}>
                            <Sun size={64} className="text-yellow-500 animate-spin-slow" />
                        </div>
                    </div>

                    {/* Center: Building Envelope (PCM Panel) */}
                    <div className="relative z-10">
                        {/* The building border IS the PCM panel */}
                        <div 
                            className="w-48 h-40 bg-slate-100 relative flex flex-col items-center justify-center transition-all duration-500 shadow-2xl"
                            style={{
                                border: `${Math.max(4, solarLevel/5)}px solid`,
                                borderColor: `rgba(250, 204, 21, ${0.3 + (solarLevel/150)})`, // Yellow PCM glow
                                boxShadow: sunOn ? `0 0 ${solarLevel}px rgba(234,179,8,0.5)` : 'none'
                            }}
                        >
                            <span className="text-[10px] font-bold text-slate-400 absolute -top-6 bg-slate-200 px-2 py-0.5 rounded">PCM Envelope ({Math.round(solarLevel)}%)</span>
                            <Building size={64} className="text-slate-700" />
                            
                            {/* Discharge Effect inside Building */}
                            {dischargeFanOn && (
                                <div className={`absolute inset-2 opacity-50 blur-md rounded-full animate-pulse ${dischargeMode === 'COLD' ? 'bg-blue-200' : 'bg-red-200'}`}></div>
                            )}
                        </div>
                    </div>

                    {/* Bottom: Mechanical Room */}
                    <div className="flex items-end gap-4 w-full justify-center relative z-10 bg-slate-300/50 p-2 rounded-xl backdrop-blur-sm border border-slate-400">
                        {/* Cold Tank */}
                        <div className="flex flex-col items-center">
                             <div className="w-12 h-24 border-2 border-slate-500 rounded bg-white relative overflow-hidden shadow-md">
                                 <div className="absolute bottom-0 w-full bg-blue-500 transition-all duration-300" style={{height: `${coldLevel}%`}}></div>
                             </div>
                             <span className="text-[10px] font-bold mt-1 text-blue-800">Cold ({Math.round(coldLevel)}%)</span>
                        </div>

                        {/* Discharge Fan Unit */}
                        <div className="flex flex-col items-center justify-end -mb-2">
                             <div className={`w-16 h-16 rounded-full border-4 border-slate-500 bg-slate-800 flex items-center justify-center shadow-lg transition-colors ${dischargeFanOn ? (dischargeMode==='COLD' ? 'shadow-blue-400' : 'shadow-red-400') : ''}`}>
                                 <Wind size={32} className={`text-slate-400 ${dischargeFanOn ? 'animate-spin' : ''}`} style={{animationDuration: dischargeFanOn ? `${2000 / (dischargeFanSpeed || 1)}ms` : '0s'}} />
                             </div>
                             <span className="text-[10px] font-bold mb-2 bg-white px-1 rounded border border-slate-300 mt-1">Discharge</span>
                        </div>

                        {/* Heat Tank */}
                        <div className="flex flex-col items-center">
                             <div className="w-12 h-24 border-2 border-slate-500 rounded bg-white relative overflow-hidden shadow-md">
                                 <div className="absolute bottom-0 w-full bg-red-500 transition-all duration-300" style={{height: `${heatLevel}%`}}></div>
                             </div>
                             <span className="text-[10px] font-bold mt-1 text-red-800">Heat ({Math.round(heatLevel)}%)</span>
                        </div>

                        {/* HVAC Unit */}
                        <div className="flex flex-col items-center ml-4 border-l border-slate-400 pl-4">
                             <div className="w-20 h-20 bg-gray-700 rounded-lg border-2 border-gray-900 relative flex items-center justify-center shadow-inner">
                                 {/* HVAC Fan Animation */}
                                 <Fan size={40} className={`text-gray-300 ${hvacFanSpeed > 0 ? 'animate-spin' : ''}`} style={{animationDuration: hvacFanSpeed > 0 ? `${2000 / hvacFanSpeed}ms` : '0s'}} />
                                 <div className={`absolute top-1 right-1 w-2 h-2 rounded-full ${hvacFanSpeed > 0 ? 'bg-green-400' : 'bg-red-500'}`}></div>
                             </div>
                             <span className="text-[10px] font-bold mt-1 text-gray-800">HVAC</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

// Helpers
const SnowIcon = () => <div className="text-blue-500 animate-bounce">❄️</div>
const FireIcon = () => <div className="text-red-500 animate-bounce">🔥</div>


// ==========================================
// OS APPS
// ==========================================

const RetroBorder = ({ children, className = "", invert = false, transparent = false }) => {
  if (transparent) return <div className={className}>{children}</div>;
  const borderStyle = invert
    ? "border-t-gray-800 border-l-gray-800 border-r-white border-b-white bg-gray-100"
    : "border-t-white border-l-white border-r-gray-800 border-b-gray-800 bg-[#c0c0c0]";
  
  return (
    <div className={`border-2 ${borderStyle} ${className}`}>
      {children}
    </div>
  );
};

// --- Warning Modal for External Links ---
const LinkWarningModal = ({ url, onClose }) => {
    const onConfirm = () => {
        window.open(url, '_blank');
        onClose();
    };

    return (
        <div className="absolute inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-[#c0c0c0] border-2 border-white border-r-gray-800 border-b-gray-800 p-1 shadow-xl max-w-sm w-full">
                <div className="bg-blue-800 text-white px-2 py-1 text-sm font-bold flex justify-between items-center mb-4">
                    <span>Security Alert</span>
                    <button onClick={onClose}><X size={14}/></button>
                </div>
                <div className="p-4 text-center">
                    <AlertTriangle size={32} className="text-yellow-600 mx-auto mb-4" />
                    <p className="mb-4 text-sm font-bold">You are about to leave ImadOS.</p>
                    <p className="text-xs mb-6">This action will open a new browser tab to access an external database. Do you want to proceed?</p>
                    <div className="flex justify-center gap-4">
                        <button onClick={onConfirm} className="px-4 py-1 border-2 border-t-white border-l-white border-r-black border-b-black bg-[#c0c0c0] active:border-t-black font-bold text-sm">Yes</button>
                        <button onClick={onClose} className="px-4 py-1 border-2 border-t-white border-l-white border-r-black border-b-black bg-[#c0c0c0] active:border-t-black font-bold text-sm">No</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Browser App (Research Hub) ---
const BrowserApp = ({ systemSettings }) => {
    const [view, setView] = useState('home'); 
    const [urlBar, setUrlBar] = useState('http://research-hub.imad-os.net');
    const [warningUrl, setWarningUrl] = useState(null); // For external links

    const goHome = () => { setView('home'); setUrlBar('http://research-hub.imad-os.net'); }
    const goGame = () => { setView('game'); setUrlBar('http://sim.imad-os.net/eco-hvac'); }
    const goSim = () => { setView('sim'); setUrlBar('https://home.gsbpvn1.work/'); }
    
    // Trigger Warning
    const requestExternal = (url) => setWarningUrl(url);

    return (
        <div className="h-full flex flex-col bg-white overflow-hidden relative">
            {warningUrl && <LinkWarningModal url={warningUrl} onClose={() => setWarningUrl(null)} />}

            <div className="flex items-center gap-2 p-1 bg-[#c0c0c0] border-b border-gray-400 z-10">
                <button onClick={goHome} className="px-2 border border-gray-600 bg-[#c0c0c0] text-sm font-bold hover:bg-white">Home</button>
                <input type="text" value={urlBar} readOnly className="flex-1 border border-gray-600 px-1 text-sm bg-white font-mono" />
            </div>
            
            <div className="flex-1 bg-slate-50 overflow-hidden relative">
                {view === 'home' && (
                    <div className="p-8 h-full overflow-y-auto">
                        <div className="text-center mb-10">
                            <h1 className="text-4xl font-bold text-slate-800 mb-2">Imad Research Portal <span className="text-xs align-top bg-yellow-200 text-yellow-800 px-1 rounded">BETA</span></h1>
                            <p className="text-slate-500">Access advanced simulation tools and publication databases.</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                            {/* Card 1: Game */}
                            <div onClick={goGame} className="bg-white p-6 rounded-xl shadow-md border border-slate-200 hover:shadow-xl hover:border-blue-400 transition-all cursor-pointer group">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors"><Zap size={24}/></div>
                                    <h3 className="font-bold text-xl">EcoHVAC Master</h3>
                                </div>
                                <p className="text-sm text-slate-600 mb-4">Interactive playful simulation of HVAC systems coupled with PCM storage and solar energy.</p>
                                <span className="text-xs font-bold text-blue-600">LAUNCH APP &rarr;</span>
                            </div>

                            {/* Card 2: Scholar */}
                            <div onClick={() => requestExternal('https://scholar.google.com/citations?user=eyGE7LUAAAAJ&hl=fr')} className="bg-white p-6 rounded-xl shadow-md border border-slate-200 hover:shadow-xl hover:border-blue-400 transition-all cursor-pointer group">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-3 bg-white border border-slate-200 rounded-lg"><BookOpen size={24} className="text-blue-500"/></div>
                                    <h3 className="font-bold text-xl">Google Scholar</h3>
                                </div>
                                <p className="text-sm text-slate-600 mb-4">Access Dr. Imad's full list of scientific publications and citations directly.</p>
                                <span className="text-xs font-bold text-blue-600 flex items-center gap-1">EXTERNAL DATABASE <ArrowUpRight size={10}/></span>
                            </div>

                            {/* Card 3: Building Sim */}
                            <div onClick={goSim} className="bg-white p-6 rounded-xl shadow-md border border-slate-200 hover:shadow-xl hover:border-blue-400 transition-all cursor-pointer group relative overflow-hidden">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-3 bg-orange-100 rounded-lg group-hover:bg-orange-600 group-hover:text-white transition-colors"><Building size={24}/></div>
                                    <h3 className="font-bold text-xl">Building Sim</h3>
                                </div>
                                <p className="text-sm text-slate-600 mb-4">Advanced thermal building simulation dashboard.</p>
                                <span className="text-xs font-bold text-blue-600">ACCESS SERVER &rarr;</span>
                            </div>

                            {/* Card 4: GitHub H2 */}
                            <div onClick={() => requestExternal('https://github.com/imadafla/H2_UrbanPlus')} className="bg-white p-6 rounded-xl shadow-md border border-slate-200 hover:shadow-xl hover:border-blue-400 transition-all cursor-pointer group">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-3 bg-slate-100 rounded-lg group-hover:bg-slate-800 group-hover:text-white transition-colors"><Github size={24}/></div>
                                    <h3 className="font-bold text-xl">H2 UrbanPlus</h3>
                                </div>
                                <p className="text-sm text-slate-600 mb-4">Open-source hydrogen software development repository.</p>
                                <span className="text-xs font-bold text-blue-600 flex items-center gap-1">VIEW CODE <ArrowUpRight size={10}/></span>
                            </div>
                        </div>
                    </div>
                )}

                {view === 'game' && <HVACGame />}
                
                {view === 'sim' && (
                    <iframe src="https://home.gsbpvn1.work/" className="w-full h-full border-none" title="Building Sim"/>
                )}
            </div>
        </div>
    );
};

// --- Building Sim App (Dedicated Window Version) ---
const BuildingSimApp = () => (
    <div className="h-full flex flex-col bg-black">
        <div className="flex items-center justify-between p-1 bg-[#c0c0c0] border-b border-gray-600">
             <div className="text-xs font-mono">Connected: home.gsbpvn1.work</div>
             <div className="flex gap-1">
                 <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
             </div>
        </div>
        <iframe 
            src="https://home.gsbpvn1.work/" 
            className="flex-1 w-full border-none bg-white"
            title="Building Simulation"
        />
    </div>
);

// --- Standard Apps ---
const NotepadApp = () => {
  const [text, setText] = useState(`README.TXT - ImadOS 97\n\nUser: Dr. Imad Ait Laasri\nBorn: 1997 (Win98 Era)\nRole: Energy Systems Scientist\n\nSKILLS:\n- Thermodynamics\n- EnergyPlus / OpenStudio\n- Python / MATLAB / C++\n\nMISSION:\nBridging theory and sustainable reality.`);
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center space-x-2 p-1 border-b border-gray-400 mb-1 text-sm bg-[#c0c0c0]">
        <span className="cursor-pointer hover:bg-[#000080] hover:text-white px-1">File</span><span className="cursor-pointer hover:bg-[#000080] hover:text-white px-1">Edit</span>
      </div>
      <textarea className="flex-1 w-full resize-none border-none outline-none p-2 font-mono text-sm bg-white overflow-auto" value={text} onChange={(e) => setText(e.target.value)} />
    </div>
  );
};

const CalculatorApp = () => {
  const [display, setDisplay] = useState('0');
  const [newCalc, setNewCalc] = useState(false);
  const handlePress = (btn) => {
    if (btn === '=') {
        try { setDisplay(String(new Function('return ' + display)())); setNewCalc(true); } catch { setDisplay('Error'); setNewCalc(true); }
        return;
    }
    if (btn === 'C') { setDisplay('0'); setNewCalc(false); return; }
    if (newCalc) {
        if (['+','-','*','/'].includes(btn)) setDisplay(prev => prev + btn);
        else setDisplay(btn);
        newCalc(false);
    } else {
        setDisplay(prev => prev === '0' || prev === 'Error' ? btn : prev + btn);
    }
  };
  const btnClass = "h-8 flex items-center justify-center border-t-white border-l-white border-r-gray-800 border-b-gray-800 bg-[#c0c0c0] active:border-t-gray-800 active:border-l-gray-800 active:border-r-white active:border-b-white active:bg-gray-300 font-bold text-sm";
  return (
    <div className="h-full flex flex-col p-1">
      <div className="bg-white border-2 border-gray-600 h-10 mb-2 flex items-center justify-end px-2 font-mono text-xl overflow-hidden">{display}</div>
      <div className="grid grid-cols-4 gap-1 flex-1">
        {['7','8','9','/','4','5','6','*','1','2','3','-','0','.','=','+'].map(btn => <button key={btn} className={btnClass} onClick={() => handlePress(btn)}>{btn}</button>)}
        <button className={`${btnClass} col-span-4 text-red-800`} onClick={() => handlePress('C')}>Clear</button>
      </div>
    </div>
  );
};

// START PAINT APP
const PaintApp = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [color, setColor] = useState('#000000');
  const [tool, setTool] = useState('brush');
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [snapshot, setSnapshot] = useState(null);

  const colors = ['#000000', '#808080', '#800000', '#808000', '#008000', '#008080', '#000080', '#800080', '#808040', '#004040', '#0080ff', '#004080', '#8000ff', '#804000', '#ffffff', '#c0c0c0', '#ff0000', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#ff00ff', '#ffff80', '#00ff80', '#80ffff', '#8080ff', '#ff80ff', '#ff8040'];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }, []);

  const getPos = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const clientX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    const clientY = e.changedTouches ? e.changedTouches[0].clientY : e.clientY;
    return { x: clientX - rect.left, y: clientY - rect.top };
  };

  const startDrawing = (e) => {
    if (e.changedTouches) e.preventDefault(); 
    const { x, y } = getPos(e);
    setStartPos({ x, y });
    setIsDrawing(true);
    const ctx = canvasRef.current.getContext('2d');
    ctx.strokeStyle = tool === 'eraser' ? '#ffffff' : color;
    ctx.fillStyle = tool === 'eraser' ? '#ffffff' : color;
    ctx.lineWidth = tool === 'brush' ? 2 : 1;
    ctx.lineCap = 'round';
    if (tool === 'brush' || tool === 'eraser') {
      ctx.beginPath();
      ctx.moveTo(x, y);
    } else {
      setSnapshot(ctx.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height));
    }
  };

  const draw = (e) => {
    if (!isDrawing) return;
    if (e.changedTouches) e.preventDefault(); 
    const { x, y } = getPos(e);
    const ctx = canvasRef.current.getContext('2d');
    if (tool === 'brush') {
      ctx.lineTo(x, y);
      ctx.stroke();
    } else if (tool === 'eraser') {
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 10;
      ctx.lineTo(x, y);
      ctx.stroke();
    } else if (snapshot) {
      ctx.putImageData(snapshot, 0, 0);
      ctx.beginPath();
      if (tool === 'line') {
        ctx.moveTo(startPos.x, startPos.y);
        ctx.lineTo(x, y);
        ctx.stroke();
      } else if (tool === 'rect') {
        ctx.strokeRect(startPos.x, startPos.y, x - startPos.x, y - startPos.y);
      }
    }
  };

  const stopDrawing = () => { setIsDrawing(false); setSnapshot(null); };
  const clearCanvas = () => { const ctx = canvasRef.current.getContext('2d'); ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height); };

  return (
    <div className="h-full flex flex-col bg-[#c0c0c0]">
      <div className="p-1 flex items-center justify-between border-b border-gray-400">
        <div className="flex gap-1">
          {[{id:'brush', icon:<Palette size={16}/>}, {id:'line', icon:<Minus size={16} className="-rotate-45"/>}, {id:'rect', icon:<Square size={16}/>}, {id:'eraser', icon:<Eraser size={16}/>}].map(t => (
            <button key={t.id} className={`p-1 border-2 ${tool === t.id ? 'border-gray-800 bg-gray-200' : 'border-white bg-[#c0c0c0]'}`} onClick={() => setTool(t.id)}>{t.icon}</button>
          ))}
        </div>
        <button className="px-2 py-0.5 border border-gray-500 text-xs bg-white" onClick={clearCanvas}>Clear</button>
      </div>
      <div className="flex flex-1 overflow-hidden">
        <div className="w-8 flex flex-wrap content-start gap-1 p-1 border-r border-gray-400 bg-gray-100">
          {colors.map(c => <div key={c} className={`w-6 h-6 border cursor-pointer ${color === c ? 'border-black ring-1 ring-black inset' : 'border-gray-500'}`} style={{ background: c }} onClick={() => setColor(c)} />)}
        </div>
        <div className="flex-1 bg-gray-400 overflow-auto p-4 flex items-center justify-center relative" ref={containerRef}>
            <canvas 
                ref={canvasRef} 
                width={600} 
                height={400} 
                className="bg-white shadow-lg cursor-crosshair touch-none" 
                onMouseDown={startDrawing} 
                onMouseMove={draw} 
                onMouseUp={stopDrawing} 
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
            />
        </div>
      </div>
    </div>
  );
};

const SettingsApp = ({ systemSettings }) => {
  const themes = [{ name: 'Imad Teal', value: '#008080' }, { name: 'Classic Blue', value: '#3A6EA5' }, { name: 'Midnight', value: '#000000' }, { name: 'Redmond', value: '#a0a0a0' }];
  return (
    <div className="h-full flex flex-col bg-[#c0c0c0] p-2">
       <div className="flex gap-4 h-full">
         <div className="w-1/3 border-2 border-white border-r-gray-600 bg-white p-2">
           <div className="flex items-center gap-2 mb-4"><Monitor size={32} /><span className="font-bold">Display</span></div>
           <div className="text-sm space-y-2"><div>Background</div><div>Taskbar</div></div>
         </div>
         <div className="flex-1 space-y-6">
           <fieldset className="border border-gray-400 p-2"><legend className="text-sm px-1">Background</legend>
             <div className="grid grid-cols-2 gap-2 mt-2">
               {themes.map(t => (
                 <button key={t.name} className="flex flex-col items-center gap-1 group" onClick={() => systemSettings.setBgColor(t.value)}>
                   <div className="w-8 h-8 border-2 border-gray-600" style={{ background: t.value }} />
                   <span className="text-xs group-hover:bg-[#000080] group-hover:text-white px-1">{t.name}</span>
                 </button>
               ))}
             </div>
           </fieldset>
           <fieldset className="border border-gray-400 p-2"><legend className="text-sm px-1">Taskbar</legend>
             <div className="flex gap-4 mt-1">
                 <label className="flex items-center gap-2 cursor-pointer text-sm">
                    <input type="radio" name="taskbar" checked={systemSettings.taskbarPosition === 'bottom'} onChange={() => systemSettings.setTaskbarPosition('bottom')} /> Bottom
                 </label>
                 <label className="flex items-center gap-2 cursor-pointer text-sm">
                    <input type="radio" name="taskbar" checked={systemSettings.taskbarPosition === 'top'} onChange={() => systemSettings.setTaskbarPosition('top')} /> Top
                 </label>
             </div>
           </fieldset>
         </div>
       </div>
    </div>
  );
};
// END PAINT APP

// --- CHAT LOGIC ---

const ChatLogic = ({ isModern, onOpenDesktop, messages, setMessages }) => {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showDesktopConfirm, setShowDesktopConfirm] = useState(false);
  const endRef = useRef(null);

  useEffect(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    const prompt = `${messages.map(m => `${m.role==='user'?'User':'Assistant'}: ${m.text}`).join('\n')}\nUser: ${input}\nAssistant:`;
    
    // Use the system constant defined at top
    const response = await callGemini(prompt, system);
    setMessages(prev => [...prev, { role: 'assistant', text: response }]);
    setIsLoading(false);
  };

  // Modern UI with Top Launch Button & Confirmation
  if (isModern) {
      return (
          <div className="flex flex-col h-full bg-white text-slate-800 relative">
             
             {/* TOP TOOLBAR - Far from fan */}
             {onOpenDesktop && (
                 <div className="p-2 bg-slate-100 border-b border-slate-200 flex justify-center shadow-sm">
                     <button 
                        onClick={() => setShowDesktopConfirm(true)} 
                        className="text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-4 py-1.5 rounded-full flex items-center gap-2 shadow-md transition-all hover:scale-105"
                     >
                        <Monitor size={14} /> Launch Desktop Environment
                     </button>
                 </div>
             )}

             {/* Confirmation Modal */}
             {showDesktopConfirm && (
                 <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-50 flex items-center justify-center p-6 text-center">
                     <motion.div initial={{scale: 0.9, opacity: 0}} animate={{scale: 1, opacity: 1}} className="max-w-xs">
                         <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                             <Monitor size={24} className="text-blue-600" />
                         </div>
                         <h3 className="font-bold text-slate-800 mb-2">Enter Desktop Mode?</h3>
                         <p className="text-xs text-slate-500 mb-4">This will switch the interface to ImadOS 97.</p>
                         <div className="flex gap-2 justify-center">
                             <button onClick={() => { setShowDesktopConfirm(false); onOpenDesktop(); }} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold shadow hover:bg-blue-700">Confirm</button>
                             <button onClick={() => setShowDesktopConfirm(false)} className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg text-xs font-bold hover:bg-slate-300">Cancel</button>
                         </div>
                     </motion.div>
                 </div>
             )}

             <div className="flex-1 overflow-y-auto p-4 space-y-4">
                 {messages.filter(m => m.role !== 'system').map((msg, i) => (
                     <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                         <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none shadow-md' : 'bg-slate-100 text-slate-800 rounded-tl-none border border-slate-200'}`}>
                             {msg.text}
                         </div>
                     </div>
                 ))}
                 {isLoading && <div className="text-slate-400 text-xs animate-pulse pl-2">ImadBot is typing...</div>}
                 <div ref={endRef} />
             </div>
             
             <div className="p-3 border-t border-slate-100 flex gap-2">
                 <input 
                    className="flex-1 bg-slate-50 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border border-slate-200"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Ask about Dr. Imad..."
                 />
                 <button onClick={handleSend} disabled={isLoading} className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50 shadow-md">
                    <Send size={18} />
                 </button>
             </div>
          </div>
      );
  }

  // Retro UI Render
  return (
    <div className="h-full flex flex-col bg-[#c0c0c0]">
      <div className="flex-1 bg-white border-2 border-gray-600 m-1 p-2 overflow-y-auto font-sans text-sm">
        {messages.map((msg, i) => (
          <div key={i} className={`mb-2 ${msg.role === 'user' ? 'text-blue-800' : 'text-black'}`}>
            <span className="font-bold">{msg.role === 'user' ? 'You: ' : 'ImadBot AI: '}</span><span>{msg.text}</span>
          </div>
        ))}
        {isLoading && <div className="text-gray-500 italic">Thinking...</div>}
        <div ref={endRef} />
      </div>
      <div className="p-1 flex gap-1">
        <input type="text" className="flex-1 border-2 border-gray-600 px-1 text-sm outline-none" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} placeholder="Chat..." />
        <button onClick={handleSend} disabled={isLoading} className="px-3 border-2 border-t-white border-l-white border-r-black border-b-black bg-[#c0c0c0] font-bold text-sm">Send</button>
      </div>
    </div>
  );
};

// --- OS CONFIGURATION ---

const APPS = {
  notepad: { id: 'notepad', title: 'Notepad', headerColor: 'bg-[#000080]', iconColor: '#000080', icon: <FileText size={16} />, component: NotepadApp, w: 400, h: 300 },
  chat: { id: 'chat', title: 'ImadBot AI', headerColor: 'bg-purple-800', iconColor: '#6b21a8', icon: <MessageSquare size={16} />, component: ChatLogic, w: 350, h: 400 },
  browser: { id: 'browser', title: 'Research Hub', headerColor: 'bg-blue-600', iconColor: '#2563eb', icon: <Globe size={16} />, component: BrowserApp, w: 800, h: 600 },
  calculator: { id: 'calculator', title: 'Calculator', headerColor: 'bg-red-700', iconColor: '#b91c1c', icon: <CalcIcon size={16} />, component: CalculatorApp, w: 250, h: 320 },
  paint: { id: 'paint', title: 'Paint', headerColor: 'bg-green-700', iconColor: '#15803d', icon: <Palette size={16} />, component: PaintApp, w: 600, h: 450 },
  settings: { id: 'settings', title: 'Control Panel', headerColor: 'bg-gray-700', iconColor: '#374151', icon: <Cpu size={16} />, component: SettingsApp, w: 450, h: 350 },
  buildingsim: { id: 'buildingsim', title: 'Building Thermal Sim', headerColor: 'bg-orange-600', iconColor: '#ea580c', icon: <Building size={16} />, component: BuildingSimApp, w: 900, h: 600 },
};

const ICONS = [
  { id: 'pc', label: 'My Computer', appId: 'settings' },
  { id: 'note', label: 'Readme.txt', appId: 'notepad' },
  { id: 'web', label: 'Research Hub', appId: 'browser' },
  { id: 'sim', label: 'Building Sim', appId: 'buildingsim' }, 
  { id: 'ai', label: 'ImadBot AI', appId: 'chat' },
  { id: 'calc', label: 'Calculator', appId: 'calculator' },
  { id: 'paint', label: 'Paint', appId: 'paint' },
  { id: 'exit', label: 'Back to Reality', appId: 'exit', icon: <LogOut size={32} />, special: true },
];

// --- WINDOW COMPONENT WITH RESIZE ---
const Window = ({ window: win, isActive, onClose, onMinimize, onMaximize, onFocus, onMove, onResize, systemSettings, taskbarPosition, chatProps }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ w: 0, h: 0, x: 0, y: 0 });
  const winRef = useRef(null);

  // Dragging Logic
  useEffect(() => {
    const move = (e) => { 
        if (isDragging) onMove(win.id, e.clientX - offset.x, e.clientY - offset.y); 
        if (isResizing) onResize(win.id, resizeStart.w + (e.clientX - resizeStart.x), resizeStart.h + (e.clientY - resizeStart.y));
    };
    const up = () => { setIsDragging(false); setIsResizing(false); };
    
    if (isDragging || isResizing) { window.addEventListener('mousemove', move); window.addEventListener('mouseup', up); }
    return () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseup', up); };
  }, [isDragging, isResizing, offset, resizeStart, onMove, onResize, win.id]);

  const handleTouchStart = (e) => {
     if (win.maximized) return;
     setIsDragging(true);
     const touch = e.touches[0];
     const rect = winRef.current.getBoundingClientRect();
     setOffset({ x: touch.clientX - rect.left, y: touch.clientY - rect.top });
     onFocus(win.id);
  };
  
  const handleTouchMove = (e) => {
     if (!isDragging) return;
     const touch = e.touches[0];
     onMove(win.id, touch.clientX - offset.x, touch.clientY - offset.y);
  };

  const startResize = (e) => {
      e.stopPropagation();
      setIsResizing(true);
      setResizeStart({ w: win.width, h: win.height, x: e.clientX, y: e.clientY });
  };

  if (win.minimized) return null;
  const AppComponent = APPS[win.appId].component;
  const appConfig = APPS[win.appId];
  const style = win.maximized 
    ? { left: 0, top: taskbarPosition === 'top' ? 40 : 0, width: '100%', height: 'calc(100vh - 40px)' } 
    : { left: win.x, top: win.y, width: win.width, height: win.height };

  return (
    <div ref={winRef} className="absolute flex flex-col" style={{ ...style, zIndex: isActive ? 50 : 10 }} onMouseDown={() => onFocus(win.id)} onTouchStart={() => onFocus(win.id)}>
      <RetroBorder className="w-full h-full flex flex-col shadow-xl relative">
        <div 
             className={`px-1 py-1 flex justify-between items-center select-none ${isActive ? (appConfig?.headerColor || 'bg-[#000080]') : 'bg-[#808080]'} text-white`}
             onMouseDown={(e) => { if (!win.maximized) { setIsDragging(true); const r = winRef.current.getBoundingClientRect(); setOffset({ x: e.clientX - r.left, y: e.clientY - r.top }); onFocus(win.id); } }}
             onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={() => setIsDragging(false)}
             onDoubleClick={() => onMaximize(win.id)}>
          <div className="flex items-center gap-2 font-bold text-sm truncate pl-1">{React.cloneElement(appConfig?.icon, { size: 14, className: "text-white" })} {win.title}</div>
          <div className="flex gap-1">
            <button onClick={(e) => { e.stopPropagation(); onMinimize(win.id); }} className="bg-[#c0c0c0] text-black w-4 h-4 flex items-center justify-center border border-t-white border-l-white border-r-black border-b-black"><Minus size={10} /></button>
            <button onClick={(e) => { e.stopPropagation(); onMaximize(win.id); }} className="bg-[#c0c0c0] text-black w-4 h-4 flex items-center justify-center border border-t-white border-l-white border-r-black border-b-black">{win.maximized ? <Minimize2 size={10} /> : <Maximize2 size={10} />}</button>
            <button onClick={(e) => { e.stopPropagation(); onClose(win.id); }} className="bg-[#c0c0c0] text-black w-4 h-4 flex items-center justify-center border border-t-white border-l-white border-r-black border-b-black ml-1"><X size={12} /></button>
          </div>
        </div>
        <div className="flex-1 overflow-hidden bg-[#c0c0c0] p-1"><div className="h-full w-full bg-white border-2 border-l-gray-600 border-t-gray-600 border-r-white border-b-white relative overflow-hidden"><AppComponent systemSettings={systemSettings} isModern={false} {...chatProps} /></div></div>
        
        {/* Resize Handle */}
        {!win.maximized && (
            <div className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize flex items-end justify-end p-[1px] z-50" onMouseDown={startResize}>
                <div className="w-0 h-0 border-r-4 border-b-4 border-gray-500"></div>
                <div className="absolute bottom-[2px] right-[2px] w-0 h-0 border-r-8 border-b-8 border-transparent border-r-gray-400 border-b-gray-400"></div>
            </div>
        )}
      </RetroBorder>
    </div>
  );
};

const ImadOS = ({ onCloseOS, chatMessages, setChatMessages }) => {
  const [windows, setWindows] = useState([{ id: 'welcome', appId: 'notepad', title: 'README.TXT', x: 50, y: 50, width: 400, height: 300, zIndex: 1, minimized: false, maximized: false }]);
  const [activeId, setActiveId] = useState('welcome');
  const [startOpen, setStartOpen] = useState(false);
  const [zIndex, setZIndex] = useState(2);
  const [bgColor, setBgColor] = useState('#008080');
  const [taskbarPos, setTaskbarPos] = useState('bottom');
  const [time, setTime] = useState(new Date());

  useEffect(() => { const t = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(t); }, []);

  const openApp = (appId) => {
    const id = `${appId}-${Date.now()}`;
    const app = APPS[appId];
    const isMobile = window.innerWidth < 768;
    setWindows([...windows, { id, appId, title: app.title, x: isMobile ? 10 : 50+(windows.length*20), y: isMobile ? 10 : 50+(windows.length*20), width: isMobile ? window.innerWidth*0.9 : app.w, height: isMobile ? window.innerHeight*0.5 : app.h, zIndex: zIndex+1, minimized: false, maximized: false }]);
    setActiveId(id); setZIndex(z => z + 1); setStartOpen(false);
  };

  const focusWindow = (id) => { setActiveId(id); setWindows(ws => ws.map(w => w.id === id ? { ...w, zIndex: zIndex + 1, minimized: false } : w)); setZIndex(z => z + 1); };
  const closeWindow = (id) => setWindows(ws => ws.filter(w => w.id !== id));
  const toggleMin = (id) => { const w = windows.find(x => x.id === id); if(w.minimized) focusWindow(id); else if(activeId===id) setWindows(ws => ws.map(x => x.id===id?{...x, minimized:true}:x)); else focusWindow(id); };
  const toggleMax = (id) => setWindows(ws => ws.map(w => w.id === id ? { ...w, maximized: !w.maximized } : w));
  const moveWindow = (id, x, y) => setWindows(ws => ws.map(w => w.id === id ? { ...w, x, y } : w));
  const resizeWindow = (id, width, height) => setWindows(ws => ws.map(w => w.id === id ? { ...w, width: Math.max(200, width), height: Math.max(150, height) } : w));

  const StartItem = ({ app, label, icon }) => (
    <div className="px-4 py-2 hover:bg-[#000080] hover:text-white cursor-pointer flex items-center gap-2 text-sm" onClick={() => openApp(app)}>{icon} <span>{label}</span></div>
  );

  return (
    <div className="fixed inset-0 font-sans select-none overflow-hidden z-[9999] text-black" style={{ background: bgColor }}>
        {/* Watermark Text */}
      <div className="absolute top-10 right-10 text-white/20 font-bold text-4xl md:text-6xl font-mono select-none pointer-events-none">
        Imad OS 97
      </div>

      <div className={`absolute left-0 right-0 p-4 flex flex-col flex-wrap content-start gap-6 ${taskbarPos === 'top' ? 'top-10 bottom-0' : 'top-0 bottom-10'}`}>
        {ICONS.map(i => {
          const appConfig = i.appId !== 'exit' ? APPS[i.appId] : null;
          const color = i.special ? '#ef4444' : (appConfig?.iconColor || '#ffffff');
          
          return (
            <div key={i.id} className="group w-20 flex flex-col items-center gap-1 cursor-pointer" onDoubleClick={() => i.special ? onCloseOS() : openApp(i.appId)} onTouchEnd={() => i.special ? onCloseOS() : openApp(i.appId)}>
                <div className={`w-12 h-12 flex items-center justify-center rounded-lg transition-colors ${i.special ? 'border-2 border-red-500 bg-red-100/50' : 'hover:bg-white/20'}`}>
                    {i.icon || (appConfig?.icon && React.cloneElement(appConfig.icon, { size: 32, className: `drop-shadow-md`, style: { color } }))}
                </div>
                <span className={`text-white text-xs text-center px-1 bg-transparent group-hover:bg-[#000080] border border-transparent group-hover:border-dotted group-hover:border-white ${i.special ? 'font-bold text-red-100 bg-red-900/50' : ''}`}>{i.label}</span>
            </div>
          );
        })}
      </div>

      {windows.map(w => <Window key={w.id} window={w} isActive={activeId === w.id} onClose={closeWindow} onMinimize={() => setWindows(ws => ws.map(x => x.id===w.id?{...x, minimized:true}:x))} onMaximize={toggleMax} onFocus={focusWindow} onMove={moveWindow} onResize={resizeWindow} systemSettings={{bgColor, setBgColor, taskbarPosition: taskbarPos, setTaskbarPosition: setTaskbarPos}} taskbarPosition={taskbarPos} chatProps={{messages: chatMessages, setMessages: setChatMessages}} />)}

      {startOpen && (
        <div className={`absolute ${taskbarPos === 'top' ? 'top-10' : 'bottom-10'} left-1 w-64 bg-[#c0c0c0] border-2 border-t-white border-l-white border-r-gray-800 border-b-gray-800 shadow-xl flex z-[10000]`}>
          <div className="w-10 bg-[#000080] text-white flex items-end justify-center py-2 relative overflow-hidden">
             <div className="-rotate-90 origin-bottom-left translate-x-8 translate-y-[-20px] absolute bottom-4 whitespace-nowrap font-bold text-xl tracking-widest">Imad<span className="text-yellow-400">OS</span> 97</div>
          </div>
          <div className="flex-1 py-1">
            <StartItem app="chat" label="ImadBot AI" icon={<MessageSquare size={16} className="text-purple-800"/>} />
            <StartItem app="browser" label="Research Hub" icon={<Globe size={16} className="text-blue-600"/>} />
            <StartItem app="buildingsim" label="Building Sim" icon={<Building size={16} className="text-orange-600"/>} />
            <div className="border-t border-gray-500 my-1"></div>
            <StartItem app="notepad" label="Notepad" icon={<FileText size={16} className="text-blue-800"/>} />
            <StartItem app="paint" label="Paint" icon={<Palette size={16} className="text-green-700"/>} />
            <StartItem app="calculator" label="Calculator" icon={<CalcIcon size={16} className="text-red-600"/>} />
            <div className="border-t border-gray-500 my-1"></div>
            <StartItem app="settings" label="Settings" icon={<Cpu size={16} className="text-gray-600"/>} />
            <div className="px-4 py-2 hover:bg-[#000080] hover:text-white cursor-pointer flex items-center gap-2 text-sm" onClick={onCloseOS}><LogOut size={16} /> Shut Down...</div>
          </div>
        </div>
      )}

      <div className={`absolute left-0 right-0 h-10 bg-[#c0c0c0] border-white flex items-center px-1 z-[9999] ${taskbarPos === 'top' ? 'top-0 border-b-2' : 'bottom-0 border-t-2'}`}>
        <button className={`flex items-center gap-1 px-2 py-1 mr-2 border-2 font-bold ${startOpen ? 'border-t-black border-l-black border-b-white border-r-white bg-gray-300' : 'border-t-white border-l-white border-r-black border-b-black'}`} onClick={() => setStartOpen(!startOpen)}>
          <div className="w-4 h-4 bg-black rounded-full flex items-center justify-center"><span className="text-yellow-400 text-[10px]">I</span></div>Start
        </button>
        <div className="flex-1 flex gap-1 overflow-x-auto px-1">
            {windows.map(w => {
                const appConfig = APPS[w.appId];
                const activeStyle = activeId === w.id && !w.minimized ? 'border-t-black border-l-black border-r-white border-b-white bg-[#e0e0e0] font-bold' : 'border-t-white border-l-white border-r-black border-b-black hover:bg-gray-200';
                const iconColor = appConfig?.iconColor || '#000000';
                return (
                    <button key={w.id} className={`flex items-center gap-2 px-2 max-w-[150px] border-2 truncate text-sm ${activeStyle}`} onClick={() => toggleMin(w.id)}>
                        {React.cloneElement(appConfig.icon, { className: "currentColor", size: 16, style: { color: iconColor } })}
                        <span className="truncate text-black">{w.title}</span>
                    </button>
                );
            })}
        </div>
        <div className="px-2 py-0.5 border-2 border-t-gray-600 border-l-gray-600 border-r-white border-b-white bg-[#c0c0c0] text-xs flex flex-col items-center justify-center min-w-[80px]">
            <div>{time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
            <div className="text-[10px] text-gray-600">{time.toLocaleDateString('en-GB')}</div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// PORTFOLIO COMPONENTS
// ==========================================

const FanTrigger = ({ onClick, visible, eggState }) => {
    const isUnlocked = ['IDLE_UNLOCKED', 'CHAT_OPEN'].includes(eggState);
    const unlockedStyle = "bg-white text-blue-600 shadow-[0_0_15px_rgba(59,130,246,0.8)] border-blue-400";
    const lockedStyle = "bg-white/10 text-blue-500/50 hover:bg-white/20 hover:text-blue-500 border-white/10";
    
    // Auto-flash logic when locked (every 7 seconds)
    const [attentionSeek, setAttentionSeek] = useState(false);
    
    useEffect(() => {
        if (!isUnlocked && visible) {
            const interval = setInterval(() => {
                setAttentionSeek(true);
                setTimeout(() => setAttentionSeek(false), 1000); // 1s flash
            }, 7000);
            return () => clearInterval(interval);
        }
    }, [isUnlocked, visible]);

    return (
        <AnimatePresence>
            {visible && (
                <motion.button 
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                        opacity: 1, 
                        scale: attentionSeek ? 1.2 : 1,
                        rotate: attentionSeek ? 360 : 0
                    }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className={`fixed bottom-5 right-5 z-[100] cursor-pointer backdrop-blur-md p-3 rounded-full border transition-all duration-500 ${isUnlocked ? unlockedStyle : lockedStyle} ${attentionSeek ? 'bg-blue-100 shadow-[0_0_20px_rgba(59,130,246,1)] border-blue-300' : ''}`}
                    onClick={onClick}
                    title={isUnlocked ? "Open AI Chat" : "System Cooling..."}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <Fan size={24} className={isUnlocked ? 'animate-spin' : ''} />
                </motion.button>
            )}
        </AnimatePresence>
    );
};

const AccessPopup = ({ onConfirm, onClose }) => (
    <motion.div 
        initial={{ y: 20, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 20, opacity: 0, scale: 0.9 }}
        className="fixed bottom-20 right-5 z-[101] w-72 bg-white dark:bg-slate-900 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] border border-green-500/50 overflow-hidden"
    >
        <div className="h-1 bg-green-500 animate-pulse w-full"></div>
        <div className="p-4">
            <div className="flex items-center gap-3 mb-2">
                 <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg text-green-600">
                     <Unlock size={20} />
                 </div>
                 <h3 className="font-bold text-slate-900 dark:text-white font-mono">ACCESS GRANTED</h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mb-4 leading-relaxed">
                Security Protocol Bypassed.<br/>
                Dr. Imad's private OS is now accessible.
            </p>
            <div className="flex gap-2">
                <button onClick={onConfirm} className="flex-1 bg-green-600 hover:bg-green-700 text-white text-xs font-bold py-2 rounded-lg transition-colors shadow-sm">
                    ENTER SYSTEM
                </button>
                <button onClick={onClose} className="px-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg transition-colors">
                    <X size={14} />
                </button>
            </div>
        </div>
    </motion.div>
);

const ModernChatWidget = ({ onMinimize, onOpenDesktop, messages, setMessages }) => (
    <motion.div 
        initial={{ y: 50, opacity: 0, scale: 0.95, transformOrigin: 'bottom right' }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 50, opacity: 0, scale: 0.95 }}
        className="fixed bottom-20 right-5 z-[101] w-[90vw] md:w-[400px] h-[500px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden"
    >
        {/* Header */}
        <div className="bg-blue-600 p-4 text-white flex justify-between items-center shadow-md shrink-0">
             <div className="flex items-center gap-2">
                 <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                     <Zap size={16} className="text-white" />
                 </div>
                 <div>
                     <h3 className="font-bold text-sm">ImadBot AI</h3>
                     <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                        <span className="text-[10px] text-blue-100 font-medium">Online</span>
                     </div>
                 </div>
             </div>
             <div className="flex gap-1">
                 <button onClick={onMinimize} className="p-1.5 hover:bg-white/20 rounded-lg transition-colors">
                     <Minus size={16} />
                 </button>
             </div>
        </div>

        {/* Chat Content */}
        <div className="flex-1 bg-slate-50 relative overflow-hidden">
             <ChatLogic isModern={true} onOpenDesktop={onOpenDesktop} messages={messages} setMessages={setMessages} />
        </div>
    </motion.div>
);

// ==========================================
// MAIN APP COMPONENT
// ==========================================

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const containerRef = useRef(null);
  const [current, setCurrent] = useState(0);
  const [expanded, setExpanded] = useState({});

  // EGG STATE MACHINE: 'LOCKED' | 'PROMPT' | 'LOADING_OS' | 'OS_ACTIVE' | 'IDLE_UNLOCKED' | 'CHAT_OPEN'
  const [eggState, setEggState] = useState('LOCKED');
  const [fanVisible, setFanVisible] = useState(false);

  // CHAT MEMORY CORE (LIFTED STATE)
  const [chatMessages, setChatMessages] = useState([{ role: 'system', text: 'ImadBot AI Online. Ready to discuss research.' }]);

  const sections = ["home", "summary", "experience", "education", "certifications", "skills", "languages", "publications", "contact"];
  const heroSocials = [{ href: "https://www.linkedin.com/in/imadaitlaasri/", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/960px-LinkedIn_logo_initials.png", text: "LinkedIn" }, { href: "https://orcid.org/0000-0002-3977-5490", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/ORCID_iD.svg/2048px-ORCID_iD.svg.png", text: "ORCID" }, { href: "https://www.researchgate.net/profile/Imad-Ait-Laasri", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/ResearchGate_icon_SVG.svg/2048px-ResearchGate_icon_SVG.svg.png", text: "ResearchGate" }];

  // 1. CLOUDFLARE ANALYTICS INJECTION
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://static.cloudflareinsights.com/beacon.min.js';
    script.defer = true;
    script.dataset.cfBeacon = '{"token": "1cc99bcab7b545638e9b19ed4a20bb4b"}';
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    }
  }, []);

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const updateSlideState = (idx) => { setCurrent(idx); setExpanded({}); };
  const toggleExpanded = (idx) => setExpanded(prev => ({...prev, [idx]: !prev[idx]}));
  const scrollToCard = (idx) => { if (containerRef.current) { const firstCard = containerRef.current.children[0]; const cardWidth = firstCard ? firstCard.offsetWidth : 0; containerRef.current.scrollTo({ left: (cardWidth + 24) * idx, behavior: "smooth" }); updateSlideState(idx); }};
  const prevSlide = () => scrollToCard(current === 0 ? publicationsData.length - 1 : current - 1);
  const nextSlide = () => scrollToCard(current === publicationsData.length - 1 ? 0 : current + 1);
  const handleScroll = () => { if (!containerRef.current) return; const idx = Math.round(containerRef.current.scrollLeft / (containerRef.current.children[0].offsetWidth + 24)); if (idx !== current) updateSlideState(idx); };
  const scrollToSection = (id) => { setMobileMenuOpen(false); setTimeout(() => { const element = document.getElementById(id); if (element) { window.scrollTo({ top: element.getBoundingClientRect().top + window.pageYOffset - 80, behavior: "smooth" }); setActiveSection(id); }}, 50); };

  // Timer for Fan visibility (1 minute)
  useEffect(() => { 
      const t = setTimeout(() => setFanVisible(true), 60000); 
      return () => clearTimeout(t); 
  }, []);
  
  useEffect(() => { if (darkMode) document.documentElement.classList.add("dark"); else document.documentElement.classList.remove("dark"); }, [darkMode]);
  useEffect(() => { 
    const obs = new IntersectionObserver((es) => es.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); }), { threshold: 0.2 }); 
    sections.forEach(id => { const el = document.getElementById(id); if(el) obs.observe(el); }); 
    return () => obs.disconnect(); 
  }, []);

  // --- LOGIC HANDLERS ---

  const handleFanClick = () => {
      if (eggState === 'LOCKED') {
          setEggState('PROMPT');
      } else if (eggState === 'IDLE_UNLOCKED') {
          setEggState('CHAT_OPEN');
      } else if (eggState === 'CHAT_OPEN') {
          setEggState('IDLE_UNLOCKED'); // Minimize
      }
  };

  const handleAccessConfirm = () => {
      setEggState('LOADING_OS');
  };

  const handleCloseOS = () => {
      setEggState('IDLE_UNLOCKED');
  };

  const handleOpenDesktop = () => {
      setEggState('LOADING_OS'); // Re-launch OS from Chat
  };

  const LoadingScreen = ({ onComplete }) => {
    useEffect(() => { const t = setTimeout(onComplete, 4000); return () => clearTimeout(t); }, [onComplete]);
    return (
        <div className="fixed inset-0 bg-black z-[10000] p-10 font-mono text-white cursor-none">
            <div className="mb-4"><span className="text-yellow-400">Award Modular BIOS v4.51PG</span><br/>Copyright (C) 1984-97, ImadSystems Inc.</div>
            <div className="mb-8">PENTIUM-II CPU at 400MHz<br/>Memory Test :  65536K OK</div>
            <div className="space-y-1"><div>Award Plug and Play BIOS Extension v1.0A</div><div>Detecting HDD Primary Master ... <span className="text-gray-400">ImadProfile_v1.0.disk</span></div><br/><div>Loading ImadOS 97...</div><div className="animate-pulse">_</div></div>
        </div>
    );
  };

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

  return (
    <div className="font-sans bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 transition-colors duration-500 overflow-x-hidden selection:bg-blue-200 selection:text-blue-900">
      
      {/* ---------------- EASTER EGG LAYERS ---------------- */}
      
      {/* 1. Fan Trigger */}
      <FanTrigger 
          onClick={handleFanClick} 
          visible={fanVisible || eggState !== 'LOCKED'} 
          eggState={eggState} 
      />

      {/* 2. Access Granted Popup */}
      <AnimatePresence>
         {eggState === 'PROMPT' && (
             <AccessPopup 
                onConfirm={handleAccessConfirm} 
                onClose={() => setEggState('LOCKED')} 
             />
         )}
      </AnimatePresence>

      {/* 3. Modern Chat Widget */}
      <AnimatePresence>
          {eggState === 'CHAT_OPEN' && (
              <ModernChatWidget 
                  onMinimize={() => setEggState('IDLE_UNLOCKED')}
                  onOpenDesktop={handleOpenDesktop}
                  messages={chatMessages}
                  setMessages={setChatMessages}
              />
          )}
      </AnimatePresence>

      {/* 4. Loading Screen & OS */}
      {eggState === 'LOADING_OS' && <LoadingScreen onComplete={() => setEggState('OS_ACTIVE')} />}
      {eggState === 'OS_ACTIVE' && <ImadOS onCloseOS={handleCloseOS} chatMessages={chatMessages} setChatMessages={setChatMessages} />}


      {/* ---------------- MAIN PORTFOLIO CONTENT ---------------- */}

      {/* Navbar */}
      <motion.nav initial={{ y: -100 }} animate={{ y: 0 }} className="fixed top-0 left-0 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer group shrink-0" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-600/30 transition-transform group-hover:scale-105 group-hover:rotate-3 shrink-0"><span className="font-bold text-xl">IA</span></div>
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white hidden sm:block whitespace-nowrap">Dr. Imad AIT LAASRI</span>
          </div>
          <div className="hidden xl:flex items-center space-x-1">
            {sections.map((item) => <button key={item} onClick={() => scrollToSection(item)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeSection === item ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" : "text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-300 hover:bg-slate-100 dark:hover:bg-slate-800"}`}>{item.charAt(0).toUpperCase() + item.slice(1)}</button>)}
            <div className="w-px h-6 bg-slate-300 dark:bg-slate-700 mx-4"></div>
            {/* Dark Mode Toggle */}
            <button onClick={toggleDarkMode} className="relative w-14 h-7 flex items-center bg-gray-200 dark:bg-gray-700 rounded-full p-1 transition shrink-0">
               <Sun size={14} className="text-yellow-500 absolute left-1.5" />
               <Moon size={14} className="text-white absolute right-1.5" />
               <span className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform z-10 ${darkMode ? "translate-x-7" : "translate-x-0"}`}></span>
            </button>
          </div>
          <div className="xl:hidden flex items-center gap-4">
            <button onClick={toggleDarkMode} className="relative w-14 h-7 flex items-center bg-gray-200 dark:bg-gray-700 rounded-full p-1 transition shrink-0">
               <Sun size={14} className="text-yellow-500 absolute left-1.5" />
               <Moon size={14} className="text-white absolute right-1.5" />
               <span className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform z-10 ${darkMode ? "translate-x-7" : "translate-x-0"}`}></span>
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-slate-800 dark:text-slate-200 shrink-0">{mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}</button>
          </div>
        </div>
        <AnimatePresence>{mobileMenuOpen && (<motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="xl:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl"><div className="flex flex-col p-4 space-y-2">{sections.map((item) => (<button key={item} onClick={() => scrollToSection(item)} className={`block w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-colors ${activeSection === item ? "bg-blue-50 text-blue-700 dark:bg-slate-800 dark:text-blue-400" : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"}`}>{item.charAt(0).toUpperCase() + item.slice(1)}</button>))}</div></motion.div>)}</AnimatePresence>
      </motion.nav>

      {/* Hero */}
      <section id="home" className="relative pt-24 overflow-hidden bg-slate-50 dark:bg-slate-900 flex flex-col justify-end" style={{ minHeight: "calc(100vh - 5rem)" }}>
        <GridBackground />
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-400/20 rounded-full blur-[100px] animate-pulse delay-1000"></div>
        <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8 md:gap-12 items-end z-10 w-full h-full flex-grow">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="text-center md:text-left pb-12 md:pb-24 self-center w-full">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-semibold text-sm mb-8 border border-blue-200 dark:border-blue-800"><Zap size={16} className="fill-blue-600 text-blue-600 dark:text-blue-400 dark:fill-blue-400" />Scientist & Researcher</div>
            <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight mb-6 text-slate-900 dark:text-white">Innovating <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Energy Systems</span></h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-10 max-w-xl mx-auto md:mx-0 leading-relaxed">Experienced researcher in novel energy systems & materials for buildings. Specializing in R&D, modeling, and optimization to bridge the gap between theory and sustainable reality.</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">{heroSocials.map((item, idx) => (<a key={idx} href={item.href} target="_blank" rel="noopener noreferrer" className="flex items-center px-6 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-xl font-bold hover:border-blue-500 transition-all hover:-translate-y-1 shadow-sm"><img src={item.src} alt={item.text} className="w-5 h-5 mr-3 object-contain" /><span className="font-medium">{item.text}</span></a>))}</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative w-full md:w-auto flex justify-center md:block md:absolute md:bottom-0 md:right-6 md:z-10">
              <img src="/profile.png" alt="Dr. Imad AIT LAASRI" className="w-auto h-auto max-h-[320px] md:max-h-[40vh] xl:max-h-[65vh] md:w-[28vw] md:max-w-[320px] xl:w-auto xl:max-w-none object-contain object-bottom drop-shadow-2xl dark:drop-shadow-[0_0_4px_rgba(255,255,255,1)] transition-all duration-500 ease-in-out" />
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <div className="bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800 py-16 relative z-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-slate-100 dark:divide-slate-800">
          {[{ label: "Years Experience", value: "4+" }, { label: "Publications", value: "20+" }, { label: "Projects", value: "10+" }, { label: "Teaching Roles", value: "3+" }].map((stat, idx) => (<div key={idx} className="flex flex-col items-center group cursor-default"><span className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-br from-blue-600 to-purple-600 transition-transform group-hover:scale-110 duration-300 inline-block">{stat.value}</span><span className="text-sm font-bold text-slate-500 dark:text-slate-400 mt-2 uppercase tracking-widest">{stat.label}</span></div>))}
        </div>
      </div>

      {/* Summary */}
      <section id="summary" className="py-24 bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-80 h-80 bg-blue-100/20 dark:bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-100/20 dark:bg-purple-400/10 rounded-full blur-3xl"></div>
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <SectionHeader title="Scientific Summary" subtitle="Bridging advanced simulation with experimental reality." />
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6" data-aos="fade-right"><p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 leading-relaxed text-justify">I am a researcher in innovative energy systems and sustainable building materials, specializing in PCM-based thermal storage, HVAC optimization, and adaptive building technologies. My work integrates experimental testing, AI-driven simulations, and smart control strategies to improve energy efficiency and indoor comfort. I hold a PhD in Energy, Thermal & Sustainable Building Technology, have led the creation of a DHW and HVAC performance lab, taught graduate courses, published 20+ peer-reviewed papers, and actively collaborate in international academic and industrial networks.</p></div>
            <div className="flex-1 flex justify-center md:justify-end" data-aos="fade-left"><img src="/smart_energy_efficiency.png" alt="Smart Energy Efficiency" className="w-full max-w-sm drop-shadow-xl" /></div>
          </div>
          <div className="flex flex-wrap justify-center gap-6 mt-16" data-aos="fade-up">
              {[{ text: "Phase Change Composites", icon: "https://cdn-icons-png.flaticon.com/512/5847/5847623.png" }, { text: "Energy Storage", icon: "https://cdn-icons-png.flaticon.com/512/4092/4092242.png" }, { text: "Building Optimisation", icon: "/energy_efficiency.png" }, { text: "CFD", icon: "https://cdn-icons-png.flaticon.com/512/4907/4907928.png" }, { text: "Passive & Active Control", icon: "/passive_active.png" }].map((keyword, idx) => (<div key={idx} className="flex flex-col items-center bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 p-4 w-36 hover:shadow-lg transition-all hover:-translate-y-1"><img src={keyword.icon} alt={keyword.text} className="w-10 h-10 mb-3 object-contain" /><span className="text-center text-xs font-bold text-slate-800 dark:text-slate-200">{keyword.text}</span></div>))}
           </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="py-24 relative overflow-hidden bg-white dark:bg-slate-900">
        <GridBackground />
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <SectionHeader title="Professional Experience" subtitle="A timeline of research, leadership, and academic instruction." />
          <div className="relative border-l-2 border-slate-200 dark:border-slate-700 ml-4 md:ml-6 space-y-12">
            {[{ company: "Green Energy Park", role: "Researcher / Scientist", period: "2021–Present", logo: "https://www.greenenergypark.ma/images/logo_gep.png", details: ["Focus on energy-efficient solutions and phase change materials", "Develop hybrid AI models for predictive simulations", "Combine experimental testing with numerical modeling"] }, { company: "University Mohammed VI Polytechnic", role: "Adjunct Professor", period: "2024-2025", logo: "https://upload.wikimedia.org/wikipedia/commons/b/bf/UM6P_wordmark_%282024%29.svg", details: ["Teaching energy systems and sustainable building technologies."] }, { company: "University Hassan 2", role: "Adjunct Professor", period: "2021-2022", logo: "https://vectorseek.com/wp-content/uploads/2023/08/Universite-Hassan-2-de-Casablanca-Maroc-Logo-Vector.svg--300x231.png", details: ["Teaching fluid dynamics and heat transfer simulations."] }].map((exp, idx) => (<div key={idx} className="relative pl-8 md:pl-12 group" data-aos="fade-up" data-aos-delay={idx * 100}><div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-600 border-4 border-white dark:border-slate-900 shadow-sm group-hover:scale-150 transition-transform"></div><div className="bg-slate-50 dark:bg-slate-950 p-6 rounded-2xl shadow-sm hover:shadow-xl border border-slate-200 dark:border-slate-800 transition-all duration-300"><div className="flex flex-col md:flex-row gap-6 items-start md:items-center mb-6"><div className="w-20 h-20 p-2 bg-white rounded-xl border border-slate-200 flex items-center justify-center shrink-0 shadow-sm"><img src={exp.logo} alt={exp.company} className="max-w-full max-h-full object-contain" /></div><div><h3 className="text-xl font-bold text-slate-900 dark:text-white">{exp.role}</h3><div className="flex flex-wrap items-center gap-2 text-slate-500 text-sm font-semibold mt-1"><span>{exp.company}</span><span className="hidden md:inline">•</span><span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full text-xs">{exp.period}</span></div></div></div><ul className="space-y-3">{exp.details.map((detail, i) => (<li key={i} className="flex items-start gap-3 text-slate-600 dark:text-slate-300 text-sm"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></span>{detail}</li>))}</ul></div></div>))}
          </div>
        </div>
      </section>

      {/* Education */}
      <section id="education" className="py-24 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeader title="Academic Background" subtitle="Foundations in Renewable Energy & Thermal Physics." />
          <div className="grid md:grid-cols-3 gap-8">
            {[{ degree: "PhD in Energy Systems", school: "Cadi Ayyad University", period: "2021–2024", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Universite_Cadi_Ayyad.png/250px-Universite_Cadi_Ayyad.png" }, { degree: "Master in Solar Power", school: "Cadi Ayyad University", period: "2018–2020", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Universite_Cadi_Ayyad.png/250px-Universite_Cadi_Ayyad.png" }, { degree: "Bachelor Renewable Energy", school: "Hassan 1 University", period: "2018", logo: "https://seeklogo.com/images/U/universite-hassan-1er-settat-logo-7155C7CC1B-seeklogo.com.png" }].map((edu, idx) => (<motion.div key={idx} whileHover={{ y: -8 }} className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm hover:shadow-2xl border border-slate-100 dark:border-slate-800 flex flex-col items-center text-center transition-all group"><div className="h-24 w-24 mb-6 flex items-center justify-center p-2 rounded-full bg-slate-50 dark:bg-slate-800 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-colors"><img src={edu.logo} alt={edu.school} className="max-h-full max-w-full object-contain" /></div><h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 leading-tight">{edu.degree}</h3><p className="text-blue-600 dark:text-blue-400 font-bold text-sm mb-4">{edu.school}</p><span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-300 text-xs font-mono rounded-full border border-slate-200 dark:border-slate-700">{edu.period}</span></motion.div>))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section id="certifications" className="py-24 bg-white dark:bg-slate-900">
        <div className="max-w-4xl mx-auto px-6">
          <SectionHeader title="Certifications" subtitle="Continuous professional development." />
          <div className="grid gap-4">
            {[{ name: "KOICA Training: Green Technology R&D", period: "2023", logo: "https://www.intracen.org/sites/default/files/styles/large/public/media/image/media_image/2025/02/07/koica_logo.png" }, { name: "Summer School Lecturer on Efficiency", period: "2023", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/HSO_Logo_Quer_RGB_positiv.svg/250px-HSO_Logo_Quer_RGB_positiv.svg.png" }, { name: "Research Stay – Building Envelope", period: "2022", logo: "https://www.entpe.fr/sites/default/files/2018-09/entpe_logo_cmjn_couleur_baseline.png" }, { name: "EF SET C2 – English Proficiency", period: "2020", logo: "https://images.seeklogo.com/logo-png/36/2/the-ef-standard-english-test-logo-png_seeklogo-363583.png", link: "https://www.efset.org/cert/1CEQCD" }].map((cert, idx) => (<a key={idx} href={cert.link} target={cert.link ? "_blank" : "_self"} className={`flex items-center gap-6 bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all hover:shadow-lg group ${cert.link ? 'cursor-pointer' : 'cursor-default'}`}><div className="w-16 h-16 bg-white rounded-lg p-2 flex items-center justify-center border border-slate-100 shadow-sm shrink-0"><img src={cert.logo} alt={cert.name} className="max-w-full max-h-full object-contain" /></div><div className="flex-1"><h4 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">{cert.name}</h4><p className="text-sm text-slate-500 font-medium">{cert.period}</p></div>{cert.link && <ExternalLink size={20} className="text-slate-400 group-hover:text-blue-500" />}</a>))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="py-24 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeader title="Technical Arsenal" subtitle="Tools and frameworks for advanced energy modeling." />
          <div className="mb-16">
            <h3 className="text-center text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-8">Programming Languages</h3>
            <div className="flex flex-wrap justify-center gap-6">
              {[{ name: "Python", logo: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg" }, { name: "MATLAB", logo: "https://upload.wikimedia.org/wikipedia/commons/2/21/Matlab_Logo.png" }, { name: "R", logo: "https://upload.wikimedia.org/wikipedia/commons/1/1b/R_logo.svg" }, { name: "C++", logo: "https://upload.wikimedia.org/wikipedia/commons/1/18/ISO_C%2B%2B_Logo.svg" }].map((skill, idx) => (<motion.div key={idx} whileHover={{ y: -8, scale: 1.05 }} className="w-32 h-36 bg-white dark:bg-slate-900 rounded-2xl flex flex-col items-center justify-center shadow-md border border-slate-100 dark:border-slate-800 transition-shadow hover:shadow-xl"><img src={skill.logo} alt={skill.name} className="w-14 h-14 mb-4 object-contain" /><span className="font-bold text-sm text-slate-700 dark:text-slate-200">{skill.name}</span></motion.div>))}
            </div>
          </div>
          <div>
              <h3 className="text-center text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-8">Simulation & Modeling</h3>
              <div className="flex flex-wrap justify-center gap-4">
                {simulationTools.map((tool, idx) => (<motion.div key={idx} whileHover={{ y: -5 }} className="w-24 h-28 bg-white dark:bg-slate-900 rounded-xl flex flex-col items-center justify-center shadow-sm border border-slate-100 dark:border-slate-800 transition-all hover:border-blue-400 hover:shadow-lg"><img src={tool.logo} alt={tool.name} className="w-10 h-10 mb-2 object-contain" /><span className="text-xs font-semibold text-slate-700 dark:text-slate-300 text-center px-1 truncate w-full">{tool.name}</span></motion.div>))}
              </div>
          </div>
        </div>
      </section>

      {/* Languages */}
      <section id="languages" className="py-24 bg-white dark:bg-slate-900">
        <div className="max-w-3xl mx-auto px-6">
           <SectionHeader title="Languages" subtitle="Communication proficiency." />
           <div className="space-y-6">
             {[{ name: "Arabic", level: 100, label: "Native" }, { name: "French", level: 95, label: "Full Professional" }, { name: "English", level: 95, label: "Full Professional" }].map((lang, idx) => (<div key={idx} className="bg-slate-50 dark:bg-slate-950 p-6 rounded-2xl shadow-inner border border-slate-100 dark:border-slate-800"><div className="flex justify-between mb-4"><span className="font-bold text-lg text-slate-900 dark:text-white">{lang.name}</span><span className="text-sm text-blue-600 dark:text-blue-400 font-bold uppercase">{lang.label}</span></div><div className="h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden"><motion.div initial={{ width: 0 }} whileInView={{ width: `${lang.level}%` }} viewport={{ once: true }} transition={{ duration: 1.5, ease: "easeOut" }} className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]" /></div></div>))}
           </div>
        </div>
      </section>

      {/* Publications */}
      <section id="publications" className="py-24 bg-slate-50 dark:bg-slate-950 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader title="Selected Publications" subtitle="Contributing to the global body of knowledge." />
          <div className="relative">
            <div ref={containerRef} onScroll={handleScroll} className="flex gap-8 overflow-x-auto snap-x snap-mandatory pb-12 scrollbar-hide px-4" style={{ scrollBehavior: 'smooth' }}>{publicationsData.map((paper, idx) => (<div key={idx} className="snap-center shrink-0 w-[90vw] md:w-[600px] flex flex-col bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden border border-slate-100 dark:border-slate-800 transition-all hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-2xl"><div className="h-64 bg-slate-100 dark:bg-slate-950 p-8 flex items-center justify-center border-b border-slate-100 dark:border-slate-800 relative group"><img src={paper.image} alt="Paper Visual" className="h-full object-contain z-10 transition-transform duration-500 group-hover:scale-105" /></div><div className="p-8 flex flex-col flex-1"><div className="flex items-center gap-2 mb-3"><span className="w-2 h-2 rounded-full bg-green-500"></span><div className="text-xs font-bold text-slate-500 uppercase tracking-widest">{paper.journal}</div></div><h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 line-clamp-2 leading-tight" title={paper.title}>{paper.title}</h3><p className="text-sm text-slate-500 dark:text-slate-400 mb-4 font-medium italic">{paper.authors}</p><div className="relative flex-1"><p className={`text-slate-600 dark:text-slate-300 text-sm leading-relaxed transition-all duration-300 ${expanded[idx] ? '' : 'line-clamp-4'}`}>{paper.abstract}</p><button onClick={() => toggleExpanded(idx)} className="mt-3 text-blue-600 dark:text-blue-400 font-bold text-sm hover:underline focus:outline-none flex items-center gap-1">{expanded[idx] ? "Show Less" : "Read Abstract"}</button></div><div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center"><span className="text-xs text-slate-400 font-mono">SCIENTIFIC PAPER</span><a href={paper.link} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-5 py-2.5 rounded-lg text-sm font-bold hover:opacity-90 transition-opacity shadow-lg">View Paper <ExternalLink size={14} /></a></div></div></div>))}</div>
            <div className="flex justify-center items-center gap-6 mt-4"><button onClick={prevSlide} className="p-4 rounded-full bg-white dark:bg-slate-800 shadow-lg text-slate-600 dark:text-slate-300 hover:scale-110 hover:text-blue-600 transition-all border border-slate-100 dark:border-slate-700"><ChevronLeft size={24} /></button><div className="flex gap-2">{publicationsData.map((_, idx) => (<button key={idx} onClick={() => scrollToCard(idx)} className={`h-2.5 rounded-full transition-all duration-300 ${idx === current ? 'w-8 bg-blue-600' : 'w-2.5 bg-slate-300 dark:bg-slate-700 hover:bg-blue-400'}`} />))}</div><button onClick={nextSlide} className="p-4 rounded-full bg-white dark:bg-slate-800 shadow-lg text-slate-600 dark:text-slate-300 hover:scale-110 hover:text-blue-600 transition-all border border-slate-100 dark:border-slate-700"><ChevronRight size={24} /></button></div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 relative overflow-hidden bg-white dark:bg-slate-900">
        <GridBackground />
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <SectionHeader title="Get in Touch" subtitle="Open to collaboration on research, industrial projects, and academic ventures." />
          <div className="grid lg:grid-cols-2 gap-6 mb-12">
            <motion.a href="mailto:imadaitlaasri@gmail.com" whileHover={{ scale: 1.02 }} className="flex items-center p-6 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 group transition-all shadow-sm hover:shadow-md"><div className="w-14 h-14 bg-white dark:bg-slate-900 rounded-full flex items-center justify-center text-blue-600 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors border border-slate-100 dark:border-slate-800 shrink-0"><Mail size={24} /></div><div className="ml-4 text-left overflow-hidden"><div className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-1">Email</div><div className="text-lg font-bold text-slate-900 dark:text-white truncate">imadaitlaasri@gmail.com</div></div></motion.a>
            <motion.div whileHover={{ scale: 1.02 }} className="flex items-center p-6 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm"><div className="w-14 h-14 bg-white dark:bg-slate-900 rounded-full flex items-center justify-center text-purple-600 shadow-sm border border-slate-100 dark:border-slate-800 shrink-0"><MapPin size={24} /></div><div className="ml-4 text-left"><div className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-1">Location</div><div className="text-lg font-bold text-slate-900 dark:text-white">Marrakech, Morocco</div></div></motion.div>
          </div>
          <div className="flex flex-wrap justify-center gap-6">{heroSocials.map((social, idx) => (<a key={idx} href={social.href} target="_blank" rel="noreferrer" className="w-16 h-16 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-white hover:border-blue-500 transition-all hover:scale-110 hover:shadow-lg" title={social.text}><img src={social.src} alt={social.text} className="w-8 h-8 object-contain opacity-75 hover:opacity-100 transition-opacity" /></a>))}</div>
          <footer className="mt-20 pt-10 border-t border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-500 text-sm"><div className="mb-2">© {new Date().getFullYear()} <span className="font-bold text-blue-600 dark:text-blue-400">Dr. Imad AIT LAASRI</span>. All rights reserved.</div><div>Website designed and developed by <span className="font-bold text-slate-700 dark:text-slate-300">Dr. Imad AIT LAASRI</span>.</div></footer>
        </div>
      </section>
    </div>
  );
}