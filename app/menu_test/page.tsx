"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Ear, Type, BrainCircuit, MessageCircle, BookOpen, Star, Lock, Trophy 
} from "lucide-react";
import { obtenerProgresoArea } from "@/utils/score"; 

export default function MenuAreas() {
  const router = useRouter();

  const [avatar, setAvatar] = useState("");
  const [nickname, setNickname] = useState("");
  const [edad, setEdad] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [progresos, setProgresos] = useState<Record<string, number>>({});
  const [modoResultados, setModoResultados] = useState(false);

  useEffect(() => {
    const avatarLS = localStorage.getItem("avatar");
    const nicknameLS = localStorage.getItem("nickname");
    const edadLS = localStorage.getItem("edad");
    const modoResultadosLS = localStorage.getItem("modo_resultados");

    if (!avatarLS || !nicknameLS || !edadLS) {
        setAvatar("https://api.dicebear.com/7.x/avataaars/svg?seed=Felix");
        setNickname("Pequeño Genio");
        setEdad(4); 
    } else {
        setAvatar(avatarLS);
        setNickname(nicknameLS);
        setEdad(Number(edadLS));
    }

    if (modoResultadosLS === "true") {
        setModoResultados(true);
    }

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
      alert("¡Test Finalizado! Ahora verás tu plan de refuerzo.");
      window.location.reload(); 
  };

  if (loading) return null;

  const colors = {
    fonologica: "bg-indigo-500 border-indigo-700 shadow-indigo-200", 
    letras:     "bg-pink-500 border-pink-700 shadow-pink-200",       
    memoria:    "bg-orange-500 border-orange-700 shadow-orange-200", 
    lenguaje:   "bg-green-500 border-green-700 shadow-green-200",    
    lexica:     "bg-teal-500 border-teal-700 shadow-teal-200",       
  };

  const areasBase = [
    { id: "fonologica", nombre: "Conciencia Fonológica", icono: Ear, color: colors.fonologica },
    { id: "letras", nombre: "Letras y Sonidos", icono: Type, color: colors.letras },
    { id: "memoria", nombre: "Memoria Verbal", icono: BrainCircuit, color: colors.memoria },
    { id: "lenguaje", nombre: "Lenguaje Oral", icono: MessageCircle, color: colors.lenguaje },
    { id: "lexica", nombre: "Conciencia Léxica", icono: BookOpen, color: colors.lexica },
  ];

  let areasPorEdad = [];

  if (edad! <= 3) {
    areasPorEdad = areasBase.filter(a => ["fonologica", "lexica"].includes(a.id));
  } 
  else if (edad! === 4) {
    areasPorEdad = areasBase.filter(a => ["fonologica", "memoria", "lexica"].includes(a.id));
  } 
  else {
    areasPorEdad = areasBase;
  }

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
    <div className="min-h-screen bg-yellow-50 flex flex-col items-center font-sans pb-24">

      {/* HEADER */}
      <div className="sticky top-4 z-50 w-full max-w-md px-4">
        <div className="bg-white rounded-3xl shadow-xl border-2 border-yellow-300 p-3 flex justify-between items-center">
          
          {/* Avatar y nombre */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-yellow-100 overflow-hidden border-2 border-yellow-300 p-1">
               <img src={avatar} alt="avatar" className="w-full h-full object-cover rounded-lg" />
            </div>
            <div className="flex flex-col">
               <span className="text-xs font-bold text-orange-400 uppercase tracking-wider">
                   {modoResultados ? "Refuerzo" : "Evaluación"}
               </span>
               <span className="text-lg font-black text-orange-700 leading-none">{nickname}</span>
            </div>
          </div>

          {/* Botón Inicio */}
          <div className="flex items-center bg-yellow-100 px-3 py-1 rounded-full border border-yellow-300">
              <Star className="text-yellow-500 fill-yellow-400 w-5 h-5 mr-1" />
              <span className="font-extrabold text-orange-700">Inicio</span>
          </div>
        </div>
      </div>

      <h2 className="mt-8 text-2xl font-black text-orange-700 uppercase tracking-wide text-center px-4">
        {modoResultados ? "Tus Áreas de Refuerzo" : "Completa el Test"}
      </h2>

      {/* MAPA DE BOLITAS */}
      <div className="flex-1 w-full max-w-md p-8 mt-2 relative">
        <div className="flex flex-col items-center gap-10">

          {areasVisibles.map((area, index) => {
            const Icono = area.icono;
            let translateClass = "";
            if (index % 2 === 0) translateClass = "-translate-x-10";
            else translateClass = "translate-x-10";

            const porcentaje = progresos[area.id] || 0;
            const haJugado = porcentaje > 0;

            return (
              <div key={area.id} className={`flex flex-col items-center ${translateClass} transition-transform`}>
                
                {/* Bolita (NO SE CAMBIA) */}
                <button
                  onClick={() => handleAreaClick(area.id)}
                  className={`
                    group relative w-28 h-28 rounded-full flex items-center justify-center 
                    transition-all duration-150 active:translate-y-2 active:border-b-0
                    border-b-[8px] shadow-2xl
                    ${area.color}
                  `}
                >
                  <div className="absolute top-4 left-6 w-5 h-4 bg-white opacity-20 rounded-full transform -rotate-45"></div>

                  <Icono className="w-12 h-12 text-white drop-shadow-md" strokeWidth={2.5} />

                  <div className={`
                    absolute -top-2 -right-2 text-[10px] font-black px-2 py-1 rounded-full border-2 border-white shadow-sm
                    min-w-[35px] flex items-center justify-center group-hover:scale-110 transition
                    ${haJugado ? "bg-green-500 text-white" : "bg-yellow-400 text-yellow-900"}
                  `}>
                    {haJugado ? `${porcentaje}%` : "GO!"}
                  </div>
                </button>

                {/* Nombre del área (CAMBIADO) */}
                <span className="mt-3 text-center font-bold text-orange-700 uppercase text-xs tracking-wider w-32 leading-tight">
                    {area.nombre}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* BOTÓN FINALIZAR TEST */}
      {!modoResultados && (
        <div className="fixed bottom-6 w-full max-w-md px-6 z-50">
            <button 
              onClick={finalizarTest}
              className="w-full bg-orange-400 border-b-4 border-orange-600 text-white font-black text-xl py-4 rounded-2xl shadow-xl hover:scale-105 active:border-b-0 active:translate-y-1 transition flex items-center justify-center gap-3"
            >
                <Trophy className="w-8 h-8" />
                FINALIZAR TEST
            </button>
        </div>
      )}

    </div>
  );
}
