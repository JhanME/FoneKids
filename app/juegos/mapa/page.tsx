"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  Music, 
  Layers, 
  Mic, 
  Puzzle, 
  Star, 
  Play, 
  BookOpen,
  Type, 
  BrainCircuit, 
  MessageCircle,
  BookCheck,
  X
} from "lucide-react";

// Importamos la utilidad para leer puntajes
import { obtenerPuntaje } from "@/utils/score"; 

// ------------------------------------------
// DEFINICIÓN DE TIPOS
// ------------------------------------------
type TipoNodo = "juego" | "carpeta";

interface ItemJuego {
  id: string;
  tipo: TipoNodo;
  nombre: string;
  descripcion?: string;
  icono: any;
  color: string;
  contenido?: ItemJuego[]; 
}

export default function MapaJuegosPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-cyan-400">Cargando mapa estelar...</div>}>
      <MapaContent />
    </Suspense>
  );
}

function MapaContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const areaId = searchParams.get("area"); 

  const [edad, setEdad] = useState<number | null>(null);
  const [avatar, setAvatar] = useState("");
  const [loading, setLoading] = useState(true);
  const [carpetaAbierta, setCarpetaAbierta] = useState<ItemJuego | null>(null);

  useEffect(() => {
    const edadLS = localStorage.getItem("edad");
    const avatarLS = localStorage.getItem("avatar");
    
    if (edadLS) setEdad(Number(edadLS));
    if (avatarLS) setAvatar(avatarLS);
    
    setLoading(false);
  }, []);

  if (loading) return null;

  // ------------------------------------------
  // LÓGICA DEL ÁRBOL DE JUEGOS
  // ------------------------------------------

  // COLORES NEÓN ESPACIALES
  const colors = {
    purple: "bg-purple-600 border-purple-400 shadow-[0_0_25px_rgba(168,85,247,0.6)]",
    blue:   "bg-blue-600 border-blue-400 shadow-[0_0_25px_rgba(59,130,246,0.6)]",
    teal:   "bg-cyan-600 border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.6)]",
    orange: "bg-orange-500 border-orange-300 shadow-[0_0_25px_rgba(249,115,22,0.6)]",
    red:    "bg-red-600 border-red-400 shadow-[0_0_25px_rgba(220,38,38,0.6)]",
    pink:   "bg-pink-600 border-pink-400 shadow-[0_0_25px_rgba(236,72,153,0.6)]",
    indigo: "bg-indigo-600 border-indigo-400 shadow-[0_0_25px_rgba(99,102,241,0.6)]",
    green:  "bg-emerald-600 border-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.6)]",
  };

  // ------------------------------------------
  // ÁREAS (Lógica idéntica, solo cambian los iconos/colores si quieres)
  // ------------------------------------------

  const obtenerNodos = (area: string | null, edadUsuario: number): ItemJuego[] => {
    if (!area) return [];

    // --- AREA 1: CONCIENCIA FONOLÓGICA ---
    if (area === "fonologica") {
      const nodos: ItemJuego[] = [];

      nodos.push({ id: "rimas_finales", tipo: "juego", nombre: "Rimas", icono: Music, color: colors.purple });

      const contenidoSilabas: ItemJuego[] = [];
      contenidoSilabas.push({ id: "silaba_inicial", tipo: "juego", nombre: "Sílaba Inicial", icono: Puzzle, color: colors.blue });
      if (edadUsuario >= 4) {
        contenidoSilabas.push({ id: "silaba_final", tipo: "juego", nombre: "Sílaba Final", icono: Puzzle, color: colors.blue });
        contenidoSilabas.push({ id: "silaba_medial", tipo: "juego", nombre: "Sílaba Medial", icono: Puzzle, color: colors.blue });
      }
      nodos.push({ id: "folder_silabas", tipo: "carpeta", nombre: "Sílabas", icono: Layers, color: colors.teal, contenido: contenidoSilabas });

      if (edadUsuario >= 5) {
        const contenidoFonemas: ItemJuego[] = [
           { id: "fonema_inicial", tipo: "juego", nombre: "Fonema Inicial", icono: Mic, color: colors.orange },
           { id: "fonema_final", tipo: "juego", nombre: "Fonema Final", icono: Mic, color: colors.red },
           { id: "fonema_medial", tipo: "juego", nombre: "Fonema Medial", icono: Mic, color: colors.teal },
           { id: "sintesis", tipo: "juego", nombre: "Unir Sonidos", icono: Star, color: colors.purple },
        ];
        nodos.push({ id: "folder_fonemas", tipo: "carpeta", nombre: "Fonemas", icono: Mic, color: colors.orange, contenido: contenidoFonemas });
      }

      return nodos;
    }

    // --- AREA 2: LETRAS ---
    if (area === "letras") {
        return [
            { id: "letra_nombre", tipo: "juego", nombre: "Letras", icono: Type, color: colors.pink },
        ];
    }

    // --- AREA 3: MEMORIA ---
    if (area === "memoria") {
        return [
            { id: "memoria", tipo: "juego", nombre: "Repetir Frases", icono: BrainCircuit, color: colors.orange }
        ];
    }

    // --- AREA 4: LENGUAJE ---
    if (area === "lenguaje") {
        return [
            { id: "semantica", tipo: "juego", nombre: "Significados", icono: MessageCircle, color: colors.green },
            { id: "comprension", tipo: "juego", nombre: "Historias", icono: BookOpen, color: colors.green }
        ];
    }
    
    // --- AREA 5: LÉXICA ---
    if (area === "lexica") {
        return [
            { id: "contar_palabras", tipo: "juego", nombre: "Completar", icono: BookCheck, color: colors.teal }
        ];
    }

    return [];
  };

  const nodosVisibles = obtenerNodos(areaId, edad || 4);

  const handleNodeClick = (nodo: ItemJuego) => {
    if (nodo.tipo === "carpeta") {
        setCarpetaAbierta(nodo); 
    } else {
        router.push(`/juegos/jugar/${nodo.id}`); 
    }
  };

  const renderEstadoJuego = (idJuego: string) => {
    const score = obtenerPuntaje(idJuego);

    if (score) {
      return (
        <div className="absolute -bottom-3 bg-slate-900 flex items-center gap-1 px-2 py-1 rounded-full border border-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]">
          <span className="text-[10px] font-black text-green-400">
            {score.aciertos}/{score.total}
          </span>
        </div>
      );
    } else {
      return (
        <div className="absolute -bottom-3 bg-slate-900 flex gap-0.5 px-2 py-1 rounded-full border border-slate-700">
          <Star className="w-2.5 h-2.5 text-slate-600" />
          <Star className="w-2.5 h-2.5 text-slate-600" />
        </div>
      );
    }
  };

  return (
    // FONDO: El mismo gradiente espacial oscuro
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1e1b4b] via-[#0f172a] to-black flex flex-col items-center font-sans relative overflow-hidden">

      {/* DECORACIÓN FONDO (Estrellas) */}
      <div className="absolute top-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 left-10 w-1 h-1 bg-white rounded-full animate-pulse"></div>
        <div className="absolute bottom-40 right-10 w-2 h-2 bg-purple-400 rounded-full blur-[2px] animate-pulse"></div>
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-cyan-900/20 rounded-full blur-[100px]"></div>
      </div>

      {/* HEADER FLOTANTE */}
      <div className="sticky top-4 z-40 w-full max-w-md px-4">
        <div className="bg-slate-900/80 backdrop-blur-md border border-white/20 rounded-full p-2 pl-4 flex items-center justify-between shadow-2xl">
          <button 
            onClick={() => router.back()}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition hover:scale-105"
          >
              <ArrowLeft className="w-5 h-5" />
          </button>
          
          <h1 className="font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 uppercase tracking-widest text-sm drop-shadow-md">
              {areaId?.replace("_", " ")}
          </h1>
          
          <div className="w-10 h-10 rounded-full border-2 border-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)] overflow-hidden">
              <img src={avatar} alt="avatar" className="w-full h-full object-cover bg-slate-800"/>
          </div>
        </div>
      </div>

      {/* MAPA DE NODOS */}
      <div className="flex-1 w-full max-w-md p-8 pb-32 mt-4 relative">
        <div className="flex flex-col items-center gap-16 relative">

            {/* LÍNEA CONECTORA (RAYO LÁSER) */}
            {/* Un gradiente vertical que conecta todo */}
            <div className="absolute top-10 bottom-20 w-1 bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent -z-10 shadow-[0_0_15px_rgba(6,182,212,0.5)]"></div>

            {nodosVisibles.map((nodo, index) => {
                const Icono = nodo.icono;
                // Zig-zag suave
                let translateClass = index % 2 === 0 ? "-translate-x-10" : "translate-x-10";

                return (
                    <div key={nodo.id} className={`flex flex-col items-center ${translateClass} relative group`}>
                        
                        <button
                            onClick={() => handleNodeClick(nodo)}
                            className={`
                                relative w-24 h-24 rounded-full flex items-center justify-center 
                                transition-all duration-300 active:scale-95
                                border-2 border-white/30 z-10
                                ${nodo.color}
                                hover:scale-110 hover:brightness-110
                            `}
                        >
                            {/* Brillo interior */}
                            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/40 to-transparent pointer-events-none"></div>

                            {/* Etiqueta "Colección" si es carpeta */}
                            {nodo.tipo === "carpeta" && (
                                <div className="absolute -top-4 bg-slate-900 text-cyan-400 text-[9px] font-bold px-2 py-0.5 rounded border border-cyan-500/50 shadow-[0_0_10px_rgba(6,182,212,0.4)] uppercase tracking-wider">
                                    DATA
                                </div>
                            )}

                            <Icono className="w-10 h-10 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] z-20" />

                            {nodo.tipo === "juego" && renderEstadoJuego(nodo.id)}
                        </button>

                        {/* Etiqueta de Nombre estilo Holograma */}
                        <div className="
                            mt-4 px-3 py-1 rounded bg-slate-900/90 border border-white/10 backdrop-blur-sm
                            text-center font-bold text-gray-200 text-xs tracking-wide shadow-lg
                            group-hover:border-cyan-500/50 group-hover:text-cyan-300 transition-colors
                        ">
                            {nodo.nombre}
                        </div>
                    </div>
                );
            })}
        </div>
      </div>

      {/* MODAL FONEKIDS (Estilo Terminal Holográfica) */}
      {carpetaAbierta && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="
                bg-slate-900/90 w-full max-w-sm rounded-3xl overflow-hidden 
                border border-white/20 shadow-[0_0_50px_rgba(124,58,237,0.3)]
                backdrop-blur-xl
            ">

                {/* Header del Modal */}
                <div className="p-6 text-center relative bg-gradient-to-b from-indigo-900/50 to-transparent border-b border-white/10">
                    <button 
                        onClick={() => setCarpetaAbierta(null)} 
                        className="absolute top-4 right-4 text-white/50 hover:text-white transition"
                    >
                        <X className="w-6 h-6" />
                    </button>
                    
                    <h2 className="text-2xl font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                        {carpetaAbierta.nombre}
                    </h2>
                    <p className="text-cyan-200/60 text-xs font-mono mt-1 tracking-wider">SELECCIONA MÓDULO</p>
                </div>

                {/* Lista de Juegos */}
                <div className="p-4 flex flex-col gap-3 max-h-[60vh] overflow-y-auto custom-scrollbar">
                    {carpetaAbierta.contenido?.map((subJuego) => (
                        <button
                            key={subJuego.id}
                            onClick={() => router.push(`/juegos/jugar/${subJuego.id}`)}
                            className="
                                group flex items-center gap-4 p-4 rounded-xl 
                                bg-white/5 hover:bg-white/10 border border-white/5 hover:border-cyan-500/50
                                transition-all duration-200 justify-between
                            "
                        >
                            <div className="flex items-center gap-4">
                                <div className="
                                    w-10 h-10 rounded-full flex items-center justify-center 
                                    bg-indigo-600/20 text-indigo-400 group-hover:bg-cyan-500/20 group-hover:text-cyan-400
                                    transition-colors
                                ">
                                    <Play className="w-5 h-5 fill-current" />
                                </div>
                                <div className="text-left">
                                    <h3 className="font-bold text-gray-200 group-hover:text-white">{subJuego.nombre}</h3>
                                    <p className="text-[10px] text-gray-500 group-hover:text-cyan-400 font-mono uppercase">Iniciar simulación</p>
                                </div>
                            </div>

                            {obtenerPuntaje(subJuego.id) && (
                                <span className="bg-emerald-900/50 border border-emerald-500/30 text-emerald-400 font-mono text-xs px-2 py-1 rounded">
                                    {obtenerPuntaje(subJuego.id)?.aciertos}/{obtenerPuntaje(subJuego.id)?.total}
                                </span>
                            )}
                        </button>
                    ))}
                </div>

                {/* Footer Modal */}
                <div className="p-4 bg-black/20 border-t border-white/5 text-center">
                    <p className="text-[10px] text-white/20 font-mono">SYSTEM READY</p>
                </div>
            </div>
        </div>
      )}

    </div>
  );
}
