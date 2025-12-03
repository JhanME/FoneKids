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
  Ear,
  BrainCircuit, 
  MessageCircle,
  BookCheck
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
    <Suspense fallback={<div>Cargando mapa...</div>}>
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

  const colors = {
    purple: "bg-purple-300 border-purple-500 shadow-purple-200",
    blue:   "bg-sky-300 border-sky-500 shadow-sky-200",
    teal:   "bg-teal-300 border-teal-500 shadow-teal-200",
    orange: "bg-orange-300 border-orange-500 shadow-orange-200",
    red:    "bg-rose-300 border-rose-500 shadow-rose-200",
    pink:   "bg-pink-300 border-pink-500 shadow-pink-200",
    indigo: "bg-indigo-300 border-indigo-500 shadow-indigo-200",
    green:  "bg-emerald-300 border-emerald-500 shadow-emerald-200",
  };

  // ------------------------------------------
  // ÁREAS
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
        <div className="absolute -bottom-2 bg-white flex items-center gap-1 px-3 py-1 rounded-full border border-emerald-200 shadow-sm">
          <span className="text-xs font-black text-emerald-600">
            {score.aciertos}/{score.total}
          </span>
        </div>
      );
    } else {
      return (
        <div className="absolute -bottom-2 bg-white flex gap-0.5 px-2 py-1 rounded-full border border-gray-200 shadow-sm">
          <Star className="w-3 h-3 text-gray-300" />
          <Star className="w-3 h-3 text-gray-300" />
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFF] flex flex-col items-center font-sans">

      {/* HEADER */}
      <div className="sticky top-0 z-40 w-full max-w-md bg-white/80 backdrop-blur-md border-b border-pink-200 p-4 flex items-center justify-between shadow-sm">
        <button 
          onClick={() => router.back()}
          className="p-2 rounded-full bg-pink-100 hover:bg-pink-200 transition"
        >
            <ArrowLeft className="w-6 h-6 text-pink-600" />
        </button>
        <h1 className="font-black text-pink-600 uppercase tracking-wide text-sm drop-shadow">
            {areaId?.replace("_", " ")}
        </h1>
        <div className="w-11 h-11 rounded-full border-2 border-pink-300 overflow-hidden shadow">
            <img src={avatar} alt="avatar" className="w-full h-full object-cover"/>
        </div>
      </div>

      {/* MAPA */}
      <div className="flex-1 w-full max-w-md p-8 pb-32 mt-4 relative">
        <div className="flex flex-col items-center gap-12">

            {/* Línea pastel */}
            <div className="absolute top-10 bottom-20 w-1 bg-pink-200/60 -z-10 rounded-full"></div>

            {nodosVisibles.map((nodo, index) => {
                const Icono = nodo.icono;
                let translateClass = index % 2 === 0 ? "-translate-x-8" : "translate-x-8";

                return (
                    <div key={nodo.id} className={`flex flex-col items-center ${translateClass}`}>
                        <button
                            onClick={() => handleNodeClick(nodo)}
                            className={`group relative w-24 h-24 rounded-full flex items-center justify-center 
                                transition-all duration-150 active:translate-y-2 active:border-b-0
                                border-b-[8px] shadow-xl z-10
                                ${nodo.color}
                                scale-105 hover:scale-110
                            `}
                        >
                            {nodo.tipo === "carpeta" && (
                                <div className="absolute -top-3 bg-white text-pink-600 text-[10px] font-bold px-2 py-0.5 rounded-full border border-pink-200 shadow-sm uppercase tracking-wider">
                                    Colección
                                </div>
                            )}

                            <Icono className="w-10 h-10 text-white drop-shadow-md" />

                            {nodo.tipo === "juego" && renderEstadoJuego(nodo.id)}
                        </button>

                        <span className="mt-2 font-bold text-pink-600 text-sm bg-white/80 px-2 py-0.5 rounded-lg backdrop-blur-sm">
                            {nodo.nombre}
                        </span>
                    </div>
                );
            })}
        </div>
      </div>

      {/* MODAL FONEKIDS */}
      {carpetaAbierta && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden border-4 border-pink-200">

                <div className="p-6 text-center text-white rounded-t-3xl" style={{ background: "linear-gradient(135deg, #F9A8D4, #FECACA)" }}>
                    <h2 className="text-2xl font-black uppercase tracking-wide drop-shadow">
                        {carpetaAbierta.nombre}
                    </h2>
                    <p className="text-white/80 text-sm font-medium mt-1">Elige un nivel</p>
                </div>

                <div className="p-4 flex flex-col gap-3 max-h-[60vh] overflow-y-auto">
                    {carpetaAbierta.contenido?.map((subJuego) => (
                        <button
                            key={subJuego.id}
                            onClick={() => router.push(`/juegos/jugar/${subJuego.id}`)}
                            className="flex items-center gap-4 p-4 rounded-xl border-2 border-pink-100 hover:bg-pink-50 transition shadow-sm justify-between"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-pink-200 rounded-full flex items-center justify-center text-pink-700 shadow-inner">
                                    <Play className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-pink-700">{subJuego.nombre}</h3>
                                    <p className="text-xs text-pink-400 font-bold uppercase">Toca para jugar</p>
                                </div>
                            </div>

                            {obtenerPuntaje(subJuego.id) && (
                                <span className="bg-emerald-100 text-emerald-700 font-bold text-sm px-2 py-1 rounded-lg">
                                    {obtenerPuntaje(subJuego.id)?.aciertos}/{obtenerPuntaje(subJuego.id)?.total}
                                </span>
                            )}
                        </button>
                    ))}
                </div>

                <div className="p-4 bg-pink-50 border-t border-pink-100">
                    <button 
                      onClick={() => setCarpetaAbierta(null)} 
                      className="w-full py-3 rounded-xl font-bold text-pink-600 hover:bg-pink-100 transition">
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
      )}

    </div>
  );
}
