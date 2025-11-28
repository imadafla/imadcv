import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { 
  ChevronLeft, 
  ChevronRight, 
  MapPin, 
  Mail, 
  ExternalLink,
  Menu,
  X,
  Zap,
  MousePointer2,
  Monitor,
  Terminal,
  Folder, 
  Trash2, 
  Globe, 
  FileText, 
  Calculator as CalcIcon, 
  Minus, 
  Square, 
  Maximize2,
  Minimize2,
  Ghost,
  Cpu,
  Search,
  MessageSquare,
  Sparkles,
  Loader,
  Palette,
  Eraser,
  Unlock,
  MoreHorizontal,
  ChevronRight as ChevronRightIcon,
  Layout,
  Image as ImageIcon,
  LogOut,
  AlertTriangle,
  Construction,
  Moon,
  Sun
} from "lucide-react";

// ==========================================
// CONFIG & DATA
// ==========================================

const callGemini = async (prompt, systemInstruction = "") => {
  // FIXED: Commented out import.meta to prevent compilation errors
  // const apiKey = import.meta.env.VITE_GEMINI_API_KEY || ""; 
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY; // Enter API Key here
  
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
      title: "Evaluating passive PCM performance in building envelopes for semi-arid climate: Experimental and numerical insights on hysteresis, sub-cooling, and energy savings",
      authors: "Ait Laasri, I., Charai, M., Es-sakali, N., Mghazli, M. O., & Outzourhit, A. (2024)",
      journal: "Journal of Building Engineering",
      abstract: "This study evaluates the performance of macro-encapsulated Phase Change Materials (PCMs) integrated into building envelopes for semi-arid climates...",
      link: "https://www.sciencedirect.com/science/article/pii/S2352710224027293",
      image: "https://ars.els-cdn.com/content/image/1-s2.0-S2352710224027293-gr2_lrg.jpg"
    },
    {
      title: "Recent progress, limitations, and future directions of macro-encapsulated phase change materials for building applications",
      authors: "Ait Laasri, I., Es-Sakali, N., Charai, M., Mghazli, M. O., & Outzourhit, A. (2024).",
      journal: "Renewable and Sustainable Energy Reviews",
      abstract: "This review discusses macro-encapsulated phase change materials (PCMs) as a major contributing factor in the development of future sustainable and energy-efficient heating and cooling systems...",
      link: "https://www.sciencedirect.com/science/article/pii/S1364032124002041",
      image: "https://ars.els-cdn.com/content/image/1-s2.0-S1364032124002041-ga1_lrg.jpg"
    },
    {
      title: "Energy performance assessment of a novel enhanced solar thermal system with topology optimized latent heat thermal energy storage unit for domestic water heating",
      authors: "Ait Laasri, I., Charai, M., Mghazli, M. O., & Outzourhit, A. (2024)",
      journal: "Renewable Energy",
      abstract: "In this study, we introduce an innovative approach by incorporating a Topology-Optimized Latent Heat Thermal Energy Storage (TO-LHTES) unit with fins into a solar water heating system...",
      link: "https://www.sciencedirect.com/science/article/pii/S0960148124002544",
      image: "https://ars.els-cdn.com/content/image/1-s2.0-S0960148124002544-ga1_lrg.jpg"
    },
    {
      title: "Energy efficiency and hygrothermal performance of hemp clay walls for Moroccan residential buildings: An integrated lab-scale, in-situ and simulation-based assessment",
      authors: "Es-sakali, N., Charai, M., Kaitouni, S. I., Ait Laasri, I., Mghazli, M. O., Cherkaoui, M., ... & Ukjoo, S. (2023)",
      journal: "Applied Energy",
      abstract: "Hemp-based building envelopes have gained significant popularity in developed countries, and now the trend of constructing houses with hemp-clay blocks is spreading to developing countries like Morocco...",
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

// ==========================================
// IMADOS 97 (FULL OS IMPLEMENTATION)
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

// --- OS APPS ---

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
        setNewCalc(false);
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

const BrowserApp = () => (
  <div className="h-full flex flex-col bg-white overflow-hidden relative">
    <div className="flex items-center gap-2 p-1 bg-[#c0c0c0] border-b border-gray-400 z-10 relative">
      <button className="px-2 border border-gray-600 bg-[#c0c0c0] text-sm font-bold">Back</button>
      <input type="text" value="http://www.imad-research-blog.com/under-construction" readOnly className="flex-1 border border-gray-600 px-1 text-sm bg-white" />
    </div>
    <div className="flex-1 relative overflow-y-auto overflow-x-hidden bg-yellow-100 p-8">
      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 10, ease: "linear" }} className="absolute top-10 right-10 opacity-20">
        <Construction size={120} className="text-yellow-600" />
      </motion.div>
      <motion.div animate={{ y: [0, 50, 0] }} transition={{ repeat: Infinity, duration: 5 }} className="absolute bottom-20 left-10 opacity-20">
        <AlertTriangle size={100} className="text-red-500" />
      </motion.div>
      <div className="text-center mb-12 relative z-10">
        <motion.h1 animate={{ scale: [1, 1.1, 1], rotate: [0, 2, -2, 0] }} transition={{ repeat: Infinity, duration: 0.5 }} className="text-5xl md:text-7xl font-extrabold text-red-600 mb-2 drop-shadow-[4px_4px_0_rgba(0,0,0,1)] font-mono">WORK IN PROGRESS</motion.h1>
        <div className="bg-black text-yellow-400 inline-block px-4 py-1 font-mono text-xl font-bold animate-pulse transform -rotate-2">⚠ EXPECT BUGS & EXPLOSIONS ⚠</div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        {[{ title: "PCMs (Phase Change Materials)", color: "bg-blue-200" }, { title: "HVAC Systems", color: "bg-green-200" }, { title: "DHW (Domestic Hot Water)", color: "bg-orange-200" }, { title: "Model Predictive Control", color: "bg-purple-200" }].map((topic, i) => (
          <motion.div key={i} initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: "spring", bounce: 0.6, delay: i * 0.2 }} whileHover={{ scale: 1.1, rotate: Math.random() * 10 - 5 }} className={`p-6 border-4 border-black shadow-[8px_8px_0_rgba(0,0,0,1)] ${topic.color}`}>
            <h2 className="text-2xl font-bold mb-2 font-mono">{topic.title}</h2>
            <p className="font-mono text-sm">Research data loading... [████░░░░░░] 45%</p>
            <motion.div animate={{ x: [0, 20, 0] }} transition={{ repeat: Infinity, duration: 0.5 }} className="mt-4 text-xs font-bold bg-white inline-block px-2 border border-black">UPDATING LIVE...</motion.div>
          </motion.div>
        ))}
      </div>
      <div className="mt-12 text-center font-mono text-xs border-t-2 border-dashed border-black pt-4">
        <marquee scrollamount="15" className="font-bold text-red-600 text-lg bg-yellow-300 py-1 border-y-2 border-black">!!! SITE UNDER HEAVY DEVELOPMENT !!! RESEARCH LOADING !!! DO NOT FEED THE BUGS !!!</marquee>
      </div>
    </div>
  </div>
);

const ChatApp = () => {
  const [messages, setMessages] = useState([{ role: 'system', text: 'ImadBot v1.0 Online. Expert on Imad\'s research.' }]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const endRef = useRef(null);

  useEffect(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    const prompt = `${messages.map(m => `${m.role==='user'?'User':'Assistant'}: ${m.text}`).join('\n')}\nUser: ${input}\nAssistant:`;
    const system = `You are ImadBot, representing Dr. Imad Ait Laasri. Be extremely concise. Max 2-3 sentences. Sell his skills in Energy Systems, CFD, and PCMs.`;
    
    const response = await callGemini(prompt, system);
    setMessages(prev => [...prev, { role: 'assistant', text: response }]);
    setIsLoading(false);
  };

  return (
    <div className="h-full flex flex-col bg-[#c0c0c0]">
      <div className="flex-1 bg-white border-2 border-gray-600 m-1 p-2 overflow-y-auto font-sans text-sm">
        {messages.map((msg, i) => (
          <div key={i} className={`mb-2 ${msg.role === 'user' ? 'text-blue-800' : 'text-black'}`}>
            <span className="font-bold">{msg.role === 'user' ? 'You: ' : 'ImadBot: '}</span><span>{msg.text}</span>
          </div>
        ))}
        {isLoading && <div className="text-gray-500 italic">Thinking...</div>}
        <div ref={endRef} />
      </div>
      <div className="p-1 flex gap-1">
        <input type="text" className="flex-1 border-2 border-gray-600 px-1 text-sm outline-none" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} placeholder="Ask..." />
        <button onClick={handleSend} disabled={isLoading} className="px-3 border-2 border-t-white border-l-white border-r-black border-b-black bg-[#c0c0c0] font-bold text-sm">Send</button>
      </div>
    </div>
  );
};

const DoomApp = () => (
  <div className="h-full w-full bg-black flex items-center justify-center text-green-500 font-mono flex-col p-4">
    <Ghost size={64} className="mb-4 animate-bounce" />
    <p>C:\{'>'} RUN_SIMULATION.EXE</p>
    <p>Error: Not enough memory (640KB limit)</p>
    <p className="mt-4 animate-pulse">_</p>
  </div>
);

// --- OS CONFIG ---

const APPS = {
  notepad: { id: 'notepad', title: 'Notepad', headerColor: 'bg-[#000080]', iconColor: '#000080', icon: <FileText size={16} />, component: NotepadApp, w: 400, h: 300 },
  chat: { id: 'chat', title: 'ImadBot AI', headerColor: 'bg-purple-800', iconColor: '#6b21a8', icon: <MessageSquare size={16} />, component: ChatApp, w: 350, h: 400 },
  browser: { id: 'browser', title: 'Internet Explorer', headerColor: 'bg-blue-600', iconColor: '#2563eb', icon: <Globe size={16} />, component: BrowserApp, w: 600, h: 500 },
  calculator: { id: 'calculator', title: 'Calculator', headerColor: 'bg-red-700', iconColor: '#b91c1c', icon: <CalcIcon size={16} />, component: CalculatorApp, w: 250, h: 320 },
  paint: { id: 'paint', title: 'Paint', headerColor: 'bg-green-700', iconColor: '#15803d', icon: <Palette size={16} />, component: PaintApp, w: 600, h: 450 },
  settings: { id: 'settings', title: 'Control Panel', headerColor: 'bg-gray-700', iconColor: '#374151', icon: <Cpu size={16} />, component: SettingsApp, w: 450, h: 350 },
  doom: { id: 'doom', title: 'Simulation', headerColor: 'bg-black', iconColor: '#000000', icon: <Ghost size={16} />, component: DoomApp, w: 500, h: 350 },
};

const ICONS = [
  { id: 'pc', label: 'My Computer', appId: 'settings' },
  { id: 'note', label: 'Readme.txt', appId: 'notepad' },
  { id: 'web', label: 'Internet', appId: 'browser' },
  { id: 'ai', label: 'ImadBot', appId: 'chat' },
  { id: 'calc', label: 'Calculator', appId: 'calculator' },
  { id: 'paint', label: 'Paint', appId: 'paint' },
  { id: 'sim', label: 'Simulation', appId: 'doom' },
  { id: 'exit', label: 'Back to Reality', appId: 'exit', icon: <LogOut size={32} />, special: true },
];

const Window = ({ window: win, isActive, onClose, onMinimize, onMaximize, onFocus, onMove, systemSettings, taskbarPosition }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const winRef = useRef(null);

  useEffect(() => {
    const move = (e) => { if (isDragging) onMove(win.id, e.clientX - offset.x, e.clientY - offset.y); };
    const up = () => setIsDragging(false);
    if (isDragging) { window.addEventListener('mousemove', move); window.addEventListener('mouseup', up); }
    return () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseup', up); };
  }, [isDragging, offset, onMove, win.id]);

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

  if (win.minimized) return null;
  const AppComponent = APPS[win.appId].component;
  const appConfig = APPS[win.appId];
  const style = win.maximized 
    ? { left: 0, top: taskbarPosition === 'top' ? 40 : 0, width: '100%', height: 'calc(100vh - 40px)' } 
    : { left: win.x, top: win.y, width: win.width, height: win.height };

  return (
    <div ref={winRef} className="absolute flex flex-col" style={{ ...style, zIndex: isActive ? 50 : 10 }} onMouseDown={() => onFocus(win.id)} onTouchStart={() => onFocus(win.id)}>
      <RetroBorder className="w-full h-full flex flex-col shadow-xl">
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
        <div className="flex-1 overflow-hidden bg-[#c0c0c0] p-1"><div className="h-full w-full bg-white border-2 border-l-gray-600 border-t-gray-600 border-r-white border-b-white relative overflow-hidden"><AppComponent systemSettings={systemSettings} /></div></div>
      </RetroBorder>
    </div>
  );
};

const ImadOS = ({ onCloseOS }) => {
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

  const StartItem = ({ app, label, icon }) => (
    <div className="px-4 py-2 hover:bg-[#000080] hover:text-white cursor-pointer flex items-center gap-2 text-sm" onClick={() => openApp(app)}>{icon} <span>{label}</span></div>
  );

  return (
    <div className="fixed inset-0 font-sans select-none overflow-hidden z-[9999] text-black" style={{ background: bgColor }}>
      <div className={`absolute left-0 right-0 p-4 flex flex-col flex-wrap content-start gap-6 ${taskbarPos === 'top' ? 'top-10 bottom-0' : 'top-0 bottom-10'}`}>
        {ICONS.map(i => {
          const appConfig = i.appId !== 'exit' ? APPS[i.appId] : null;
          // Use inline color for icon
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

      {windows.map(w => <Window key={w.id} window={w} isActive={activeId === w.id} onClose={closeWindow} onMinimize={() => setWindows(ws => ws.map(x => x.id===w.id?{...x, minimized:true}:x))} onMaximize={toggleMax} onFocus={focusWindow} onMove={moveWindow} systemSettings={{bgColor, setBgColor, taskbarPosition: taskbarPos, setTaskbarPosition: setTaskbarPos}} taskbarPosition={taskbarPos} />)}

      {startOpen && (
        <div className={`absolute ${taskbarPos === 'top' ? 'top-10' : 'bottom-10'} left-1 w-64 bg-[#c0c0c0] border-2 border-t-white border-l-white border-r-gray-800 border-b-gray-800 shadow-xl flex z-[10000]`}>
          <div className="w-10 bg-[#000080] text-white flex items-end justify-center py-2 relative overflow-hidden">
             <div className="-rotate-90 origin-bottom-left translate-x-8 translate-y-[-20px] absolute bottom-4 whitespace-nowrap font-bold text-xl tracking-widest">Imad<span className="text-yellow-400">OS</span> 97</div>
          </div>
          <div className="flex-1 py-1">
            <StartItem app="chat" label="ImadBot AI" icon={<MessageSquare size={16} className="text-purple-800"/>} />
            <StartItem app="browser" label="Internet" icon={<Globe size={16} className="text-blue-600"/>} />
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
// Easter Egg Components
// ==========================================

const SecretSection = () => (
  <section className="py-24 bg-slate-900 relative overflow-hidden border-y-4 border-green-500/50">
    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
    <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="inline-block p-4 rounded-full bg-green-500/20 mb-6">
        <Unlock size={48} className="text-green-400" />
      </motion.div>
      <h2 className="text-4xl md:text-6xl font-mono font-bold text-green-400 mb-6 glitch-effect">SYSTEM UNLOCKED</h2>
      <div className="bg-black/80 rounded-xl p-8 border border-green-500/30 font-mono text-left shadow-2xl shadow-green-900/20">
        <div className="flex items-center gap-2 mb-4 border-b border-green-500/30 pb-4">
          <Terminal size={20} className="text-green-500" />
          <span className="text-green-500 font-bold">root@imad-portfolio:~#</span>
        </div>
        <p className="text-green-300 mb-4 typing-effect">
          {">"} Accessing restricted research data...<br/>{">"} Loading hidden projects...<br/>{">"} <span className="text-white font-bold">Success.</span>
        </p>
        <p className="text-slate-300 leading-relaxed">You've found the secret developer mode. This section is reserved for experimental prototypes and upcoming research in <span className="text-green-400 font-bold">Generative Design & AI</span> applied to passive building envelopes.</p>
        <div className="mt-6 flex gap-4">
            <button className="px-6 py-2 bg-green-600 hover:bg-green-500 text-black font-bold rounded hover:shadow-[0_0_15px_rgba(34,197,94,0.6)] transition-all">View Prototypes</button>
            <button className="px-6 py-2 border border-green-500 text-green-400 hover:bg-green-500/10 rounded transition-all">Close Terminal</button>
        </div>
      </div>
    </div>
  </section>
);

const FakeMouse = ({ isCaught, onCatch, targetRef, onUnlock }) => {
  const controls = useAnimation();
  useEffect(() => {
    if (isCaught) return;
    const moveMouse = async () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const goOffScreen = Math.random() < 0.2; 
      let nextX, nextY;

      if (goOffScreen) {
        const edge = Math.floor(Math.random() * 4);
        switch(edge) {
            case 0: nextX = -100; nextY = Math.random() * height; break;
            case 1: nextX = width + 100; nextY = Math.random() * height; break;
            case 2: nextX = Math.random() * width; nextY = -100; break;
            case 3: nextX = Math.random() * width; nextY = height + 100; break;
            default: break;
        }
      } else {
        nextX = Math.random() * (width - 100);
        nextY = Math.random() * (height - 100);
      }
      await controls.start({ x: nextX, y: nextY, transition: { duration: Math.random() * 1.5 + 0.5, ease: "easeInOut" } });
      if (goOffScreen) {
        const resetX = Math.random() * width;
        const resetY = Math.random() * height;
        controls.set({ x: resetX, y: resetY });
      }
      moveMouse();
    };
    moveMouse();
    return () => controls.stop();
  }, [controls, isCaught]);

  const handleDragEnd = (event, info) => {
    if (!targetRef.current) return;
    const mouseRect = event.target.getBoundingClientRect();
    const targetRect = targetRef.current.getBoundingClientRect();
    const isOverlapping = !(mouseRect.right < targetRect.left || mouseRect.left > targetRect.right || mouseRect.bottom < targetRect.top || mouseRect.top > targetRect.bottom);
    if (isOverlapping) onUnlock();
  };

  return (
    <motion.div
      animate={!isCaught ? controls : undefined}
      drag={isCaught}
      dragMomentum={false}
      onDragEnd={handleDragEnd}
      onClick={onCatch}
      initial={{ x: -50, y: -50 }}
      className={`fixed z-[100] cursor-pointer ${isCaught ? 'pointer-events-auto' : 'pointer-events-auto'}`}
      style={{ touchAction: "none" }}
    >
      <div className="relative">
        <MousePointer2 size={32} className={`fill-black text-white drop-shadow-lg ${isCaught ? "text-green-400 fill-slate-900" : ""}`} />
        {isCaught && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="absolute top-8 left-4 bg-yellow-300 text-slate-900 text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap shadow-lg border-2 border-slate-900">Hint 1 out of 2 found</motion.div>
        )}
      </div>
    </motion.div>
  );
};

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

  // Easter Egg State
  const [gameActive, setGameActive] = useState(false);
  const [mouseCaught, setMouseCaught] = useState(false);
  const [loadingOS, setLoadingOS] = useState(false);
  const [showOS, setShowOS] = useState(false);
  const [secretUnlocked, setSecretUnlocked] = useState(false);
  // NEW: Persistent state to hide the target after unlocking once
  const [hasUnlockedOnce, setHasUnlockedOnce] = useState(false);
  const pcTargetRef = useRef(null);

  const sections = ["home", "summary", "experience", "education", "certifications", "skills", "languages", "publications", "contact"];
  const heroSocials = [{ href: "https://www.linkedin.com/in/imadaitlaasri/", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/960px-LinkedIn_logo_initials.png", text: "LinkedIn" }, { href: "https://orcid.org/0000-0002-3977-5490", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/ORCID_iD.svg/2048px-ORCID_iD.svg.png", text: "ORCID" }, { href: "https://www.researchgate.net/profile/Imad-Ait-Laasri", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/ResearchGate_icon_SVG.svg/2048px-ResearchGate_icon_SVG.svg.png", text: "ResearchGate" }];

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const updateSlideState = (idx) => { setCurrent(idx); setExpanded({}); };
  const toggleExpanded = (idx) => setExpanded(prev => ({...prev, [idx]: !prev[idx]}));
  const scrollToCard = (idx) => { if (containerRef.current) { const firstCard = containerRef.current.children[0]; const cardWidth = firstCard ? firstCard.offsetWidth : 0; containerRef.current.scrollTo({ left: (cardWidth + 24) * idx, behavior: "smooth" }); updateSlideState(idx); }};
  const prevSlide = () => scrollToCard(current === 0 ? publicationsData.length - 1 : current - 1);
  const nextSlide = () => scrollToCard(current === publicationsData.length - 1 ? 0 : current + 1);
  const handleScroll = () => { if (!containerRef.current) return; const idx = Math.round(containerRef.current.scrollLeft / (containerRef.current.children[0].offsetWidth + 24)); if (idx !== current) updateSlideState(idx); };
  const scrollToSection = (id) => { setMobileMenuOpen(false); setTimeout(() => { const element = document.getElementById(id); if (element) { window.scrollTo({ top: element.getBoundingClientRect().top + window.pageYOffset - 80, behavior: "smooth" }); setActiveSection(id); }}, 50); };

  useEffect(() => { const t = setTimeout(() => setGameActive(true), 30000); return () => clearTimeout(t); }, []);
  useEffect(() => { if (darkMode) document.documentElement.classList.add("dark"); else document.documentElement.classList.remove("dark"); }, [darkMode]);
  useEffect(() => { 
    const obs = new IntersectionObserver((es) => es.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); }), { threshold: 0.2 }); 
    sections.forEach(id => { const el = document.getElementById(id); if(el) obs.observe(el); }); 
    return () => obs.disconnect(); 
  }, []);

  // Updated unlock handler
  const handleUnlock = () => { 
      setSecretUnlocked(true);
      setHasUnlockedOnce(true); // Permanently hide target
      setGameActive(false); 
      setLoadingOS(true); 
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
      
      {/* Easter Egg Layers */}
      <AnimatePresence>
        {gameActive && !loadingOS && !showOS && (
            <FakeMouse 
                isCaught={mouseCaught} 
                onCatch={() => setMouseCaught(true)} 
                targetRef={pcTargetRef} 
                onUnlock={handleUnlock} 
            />
        )}
      </AnimatePresence>
      
      {loadingOS && <LoadingScreen onComplete={() => { setLoadingOS(false); setShowOS(true); }} />}
      {showOS && <ImadOS onCloseOS={() => setShowOS(false)} />}

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
            {/* FIXED: Dark Mode Toggle with Icons */}
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
                
                {/* EASTER EGG TARGET */}
                {mouseCaught && !showOS && !loadingOS && !hasUnlockedOnce && (
                    <motion.div
                        ref={pcTargetRef}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.1 }}
                        className="w-24 h-28 bg-red-500/10 dark:bg-red-900/20 rounded-xl flex flex-col items-center justify-center shadow-md border-2 border-dashed border-red-500 animate-pulse"
                    >
                        <Monitor size={40} className="text-red-500 mb-2" />
                        <span className="text-[10px] font-bold text-red-600 dark:text-red-400 text-center px-1 leading-tight">System Error: Missing Mouse!</span>
                    </motion.div>
                )}
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