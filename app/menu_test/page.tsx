"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { 
  Ear, Type, BrainCircuit, MessageCircle, BookOpen, Star, Trophy, Rocket 
} from "lucide-react";
import { obtenerProgresoArea } from "@/utils/score"; 

export default function MenuAreas() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  const [avatar, setAvatar] = useState("");
  const [nickname, setNickname] = useState("");
  const [edad, setEdad] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [progresos, setProgresos] = useState<Record<string, number>>({});
  const [modoResultados, setModoResultados] = useState(false);

  useEffect(() => {
    // 1. Cargar datos del localStorage
    const avatarLS = localStorage.getItem("avatar");
    const nicknameLS = localStorage.getItem("nickname");
    const edadLS = localStorage.getItem("edad");
    const modoResultadosLS = localStorage.getItem("modo_resultados");

    if (!avatarLS || !nicknameLS || !edadLS) {
        // Datos dummy por si entran directo sin login (para desarrollo)
        setAvatar("https://api.dicebear.com/7.x/avataaars/svg?seed=Felix");
        setNickname("Cadete Espacial");
        setEdad(4); 
    } else {
        setAvatar(avatarLS);
        setNickname(nicknameLS);
        setEdad(Number(edadLS));
    }

    if (modoResultadosLS === "true") {
        setModoResultados(true);
    }

    // 2. Simular carga de progresos
    const nuevosProgresos: Record<string, number> = {};
    const listaAreas = ["fonologica", "letras", "memoria", "lenguaje", "lexica"];
    
    listaAreas.forEach(areaId => {
        nuevosProgresos[areaId] = obtenerProgresoArea(areaId);
    });

    setProgresos(nuevosProgresos);
    setLoading(false);
  }, []);

  const finalizarTest = () => {
      localStorage.setItem("modo_resultados", "true");
      setModoResultados(true);
      alert("🎉 ¡Misión Cumplida! Analizando datos de vuelo...");
      window.location.reload(); 
  };

  if (loading) return null;

  // COLORES ESPACIALES (Neón / Brillantes)
  const colors = {
    fonologica: "bg-indigo-600 border-indigo-800 shadow-[0_0_30px_rgba(79,70,229,0.5)]", 
    letras:     "bg-pink-600 border-pink-800 shadow-[0_0_30px_rgba(236,72,153,0.5)]",       
    memoria:    "bg-orange-500 border-orange-700 shadow-[0_0_30px_rgba(249,115,22,0.5)]", 
    lenguaje:   "bg-emerald-500 border-emerald-700 shadow-[0_0_30px_rgba(16,185,129,0.5)]",    
    lexica:     "bg-cyan-500 border-cyan-700 shadow-[0_0_30px_rgba(6,182,212,0.5)]",       
  };

  const areasBase = [
    { id: "fonologica", nombre: "Fonología", icono: Ear, color: colors.fonologica },
    { id: "letras", nombre: "Letras", icono: Type, color: colors.letras },
    { id: "memoria", nombre: "Memoria", icono: BrainCircuit, color: colors.memoria },
    { id: "lenguaje", nombre: "Lenguaje", icono: MessageCircle, color: colors.lenguaje },
    { id: "lexica", nombre: "Léxica", icono: BookOpen, color: colors.lexica },
  ];

  // FILTRADO POR EDAD
  let areasPorEdad = [];
  if (edad! <= 3) {
    areasPorEdad = areasBase.filter(a => ["fonologica", "lexica"].includes(a.id));
  } else if (edad! === 4) {
    areasPorEdad = areasBase.filter(a => ["fonologica", "memoria", "lexica"].includes(a.id));
  } else {
    areasPorEdad = areasBase;
  }

  // FILTRADO POR MODO RESULTADOS
  let areasVisibles = [];
  if (!modoResultados) {
      areasVisibles = areasPorEdad;
  } else {
      let sumaPuntos = 0;
      areasPorEdad.forEach(a => { sumaPuntos += (progresos[a.id] || 0); });
      const promedio = areasPorEdad.length > 0 ? sumaPuntos / areasPorEdad.length : 0;
      const esGenio = promedio >= 85; 

      if (esGenio) {
          areasVisibles = areasPorEdad; 
      } else {
          areasVisibles = areasPorEdad.filter(a => (progresos[a.id] || 0) < 70);
          if (areasVisibles.length === 0) areasVisibles = areasPorEdad;
      }
  }

  const handleAreaClick = (areaId: string) => {
    router.push(`/juegos/mapa?area=${areaId}`);
  };

  return (
    // FONDO: Universo oscuro
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1e1b4b] via-[#0f172a] to-black flex flex-col items-center font-sans pb-32 relative overflow-hidden">
      
      {/* DECORACIÓN FONDO */}
      <div className="absolute top-0 w-full h-full opacity-30 pointer-events-none">
         <div className="absolute top-20 left-10 w-2 h-2 bg-white rounded-full animate-pulse"></div>
         <div className="absolute top-40 right-20 w-1 h-1 bg-white rounded-full animate-pulse delay-75"></div>
         <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-purple-400 rounded-full blur-sm animate-pulse delay-150"></div>
      </div>

      {/* HEADER: Panel de Control */}
      <div className="sticky top-4 z-50 w-full max-w-md px-4">
        <div className="
          bg-slate-900/80 backdrop-blur-md 
          rounded-full shadow-2xl border border-white/20 
          p-2 pr-4 flex justify-between items-center
        ">
          
          {/* Avatar y nombre */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full border-2 border-cyan-400 p-[2px] shadow-[0_0_10px_rgba(34,211,238,0.5)]">
               <img src={avatar} alt="avatar" className="w-full h-full object-cover rounded-full bg-slate-800" />
            </div>
            <div className="flex flex-col">
               <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">
                   {modoResultados ? "Misión: Refuerzo" : "Misión: Evaluación"}
               </span>
               <span className="text-sm font-black text-white leading-none tracking-wide truncate max-w-[120px]">
                 {nickname}
               </span>
            </div>
          </div>

          {/* Botón Inicio */}
          <button 
            onClick={() => router.push('/')}
            className="
              flex items-center gap-2 
              bg-white/10 hover:bg-white/20 
              px-4 py-2 rounded-full 
              border border-white/10 transition-all
            "
          >
              <Star className="text-yellow-400 fill-yellow-400 w-4 h-4" />
              <span className="font-bold text-white text-xs">BASE</span>
          </button>
        </div>
      </div>

      <h2 className="mt-8 text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 uppercase tracking-widest text-center px-4 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">
        {modoResultados ? "Zonas de Refuerzo" : "Mapa de Misiones"}
      </h2>

      {/* MAPA DE PLANETAS */}
      <div className="flex-1 w-full max-w-md p-4 mt-6 relative" ref={containerRef}>
        
        {/* SVG DEL CAMINO (LÍNEA CURVA) */}
        {/* Dibujamos una línea bezier que conecta los puntos imaginarios */}
        <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-0" style={{ minHeight: '800px' }}>
          {/* Definimos el camino. Ajustamos los valores M, C para que hagan zig-zag suave */}
          <path 
            d="M 210 80 Q 80 180 120 280 T 210 480 T 120 680 T 210 880" 
            fill="none" 
            stroke="url(#gradientLine)" 
            strokeWidth="4" 
            strokeDasharray="10, 10"
            className="opacity-40"
          />
          <defs>
            <linearGradient id="gradientLine" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#c084fc" />
            </linearGradient>
          </defs>
        </svg>

        <div className="flex flex-col items-center gap-24 pt-10">

          {areasVisibles.map((area, index) => {
            const Icono = area.icono;
            // Alternar izquierda/derecha para efecto zig-zag
            let translateClass = "";
            if (index % 2 === 0) translateClass = "-translate-x-12"; // Izquierda
            else translateClass = "translate-x-12";  // Derecha

            const porcentaje = progresos[area.id] || 0;
            const haJugado = porcentaje > 0;

            return (
              <div key={area.id} className={`flex flex-col items-center ${translateClass} relative z-10 group`}>
                
                {/* PLANETA (BOTÓN) */}
                <button
                  onClick={() => handleAreaClick(area.id)}
                  className={`
                    relative w-28 h-28 rounded-full flex items-center justify-center 
                    transition-all duration-300 hover:scale-110 active:scale-95
                    border-4 border-white/20
                    ${area.color}
                  `}
                >
                  {/* Brillo del planeta */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 to-transparent pointer-events-none"></div>

                  <Icono className="w-12 h-12 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] z-20" strokeWidth={2.5} />

                  {/* Etiqueta de Progreso (Satélite) */}
                  <div className={`
                    absolute -top-3 -right-3 
                    text-[10px] font-black px-2 py-1 rounded-full border border-white 
                    min-w-[35px] flex items-center justify-center shadow-lg
                    ${haJugado ? "bg-green-500 text-white" : "bg-white text-slate-900"}
                    animate-bounce delay-1000
                  `}>
                    {haJugado ? `${porcentaje}%` : "GO!"}
                  </div>
                </button>

                {/* NOMBRE DEL ÁREA */}
                <div className="
                  mt-4 px-4 py-1 rounded-full bg-slate-900/80 border border-white/20 backdrop-blur-sm
                  text-center font-bold text-cyan-300 uppercase text-[10px] tracking-widest shadow-xl
                ">
                    {area.nombre}
                </div>
              </div>
            );
          })}
          
          {/* META FINAL (ÍCONO DE COHETE) */}
          <div className="flex flex-col items-center translate-x-0 mt-4 opacity-50">
             <Rocket className="w-10 h-10 text-white animate-pulse" />
             <span className="text-[10px] text-white/50 tracking-widest mt-1">META</span>
          </div>

        </div>
      </div>

      {/* BOTÓN FINALIZAR (ESTILO "EMERGENCIA / ACCIÓN") */}
      {!modoResultados && (
        <div className="fixed bottom-6 w-full max-w-md px-6 z-50">
            <button 
              onClick={finalizarTest}
              className="
                w-full 
                bg-gradient-to-r from-orange-500 to-red-600 
                border-b-4 border-red-800 
                text-white font-black text-lg tracking-wider
                py-4 rounded-full shadow-[0_0_30px_rgba(239,68,68,0.4)] 
                hover:scale-105 active:border-b-0 active:translate-y-1 transition-all 
                flex items-center justify-center gap-3
              "
            >
                <Trophy className="w-6 h-6" />
                FINALIZAR MISIÓN
            </button>
        </div>
      )}

    </div>
  );
}