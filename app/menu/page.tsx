"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Ear,
  Type,
  BrainCircuit,
  MessageCircle,
  BookOpen,
  Star,
  Lock 
} from "lucide-react";
import { obtenerProgresoArea } from "@/utils/score";

export default function MenuAreas() {
  const router = useRouter();

  const [avatar, setAvatar] = useState("");
  const [nickname, setNickname] = useState("");
  const [edad, setEdad] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const avatarLS = localStorage.getItem("avatar");
    const nicknameLS = localStorage.getItem("nickname");
    const edadLS = localStorage.getItem("edad");

    if (!avatarLS || !nicknameLS || !edadLS) {
        setAvatar("https://api.dicebear.com/7.x/avataaars/svg?seed=Felix");
        setNickname("Pequeño Genio");
        setEdad(4); 
        setLoading(false);
        return;
    }

    setAvatar(avatarLS);
    setNickname(nicknameLS);
    setEdad(Number(edadLS));
    setLoading(false);
  }, []);

  if (loading) return null;

  const colors = {
    fonologica: "bg-indigo-500 border-indigo-700 shadow-indigo-200",
    letras:     "bg-pink-500 border-pink-700 shadow-pink-200",
    memoria:    "bg-orange-500 border-orange-700 shadow-orange-200",
    lenguaje:   "bg-green-500 border-green-700 shadow-green-200",
    lexica:     "bg-teal-500 border-teal-700 shadow-teal-200",
  };

  const areasBase = [
    { id: "fonologica", nombre: "Conciencia Fonológica", icono: Ear, minEdad: 3, color: colors.fonologica },
    { id: "letras", nombre: "Letras y Sonidos", icono: Type, minEdad: 5, color: colors.letras },
    { id: "memoria", nombre: "Memoria Verbal", icono: BrainCircuit, minEdad: 4, color: colors.memoria },
    { id: "lenguaje", nombre: "Lenguaje Oral", icono: MessageCircle, minEdad: 5, color: colors.lenguaje },
    { id: "lexica", nombre: "Conciencia Léxica", icono: BookOpen, minEdad: 3, color: colors.lexica },
  ];

  let areasVisibles = [];

  if (edad! === 3) {
    areasVisibles = areasBase.filter(a => a.id === "fonologica" || a.id === "lexica");
  } 
  else if (edad! === 4) {
    areasVisibles = areasBase.filter(a => a.id === "fonologica" || a.id === "memoria" || a.id === "lexica");
  } 
  else {
    areasVisibles = areasBase;
  }

  const handleAreaClick = (areaId: string) => {
    router.push(`/juegos/mapa?area=${areaId}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center font-sans" style={{ backgroundColor: "#FFF7E6" }}>
      
      {/* HEADER */}
      <div className="sticky top-4 z-50 w-full max-w-md px-4">
        <div className="bg-white rounded-2xl shadow-lg border-b-4 border-[#EACF9F] p-2 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#F7E8C9] overflow-hidden border-2 border-[#E6D3A8] p-1">
              <img src={avatar} alt="avatar" className="w-full h-full object-cover rounded-lg" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "#A37B45" }}>
                Edad: {edad}
              </span>
              <span className="text-lg font-black leading-none" style={{ color: "#6B4F2A" }}>
                {nickname}
              </span>
            </div>
          </div>

          <div className="flex items-center px-3 py-1 rounded-full border border-[#EAD8B5]" style={{ backgroundColor: "#FFF3DA" }}>
            <Star className="text-yellow-500 fill-yellow-400 w-5 h-5 mr-1" />
            <span className="font-extrabold" style={{ color: "#8A5E2E" }}>Inicio</span>
          </div>
        </div>
      </div>

      <h2 className="mt-8 text-xl font-black uppercase tracking-wide" style={{ color: "#6B4F2A" }}>
        Elige tu aventura
      </h2>

      {/* MAPA DE ÁREAS */}
      <div className="flex-1 w-full max-w-md p-8 pb-32 mt-2 relative">
        <div className="flex flex-col items-center gap-10">
          
          {areasVisibles.map((area, index) => {
            const Icono = area.icono;

            const progreso = obtenerProgresoArea(area.id);
            const haJugado = progreso > 0;

            return (
              <div 
                key={area.id}
                className={`flex flex-col items-center transform ${index % 2 === 0 ? "-translate-x-10" : "translate-x-10"}`}
              >
                <button
                  onClick={() => handleAreaClick(area.id)}
                  className={`group relative w-28 h-28 rounded-full flex items-center justify-center 
                    transition-all duration-150 active:translate-y-2 active:border-b-0
                    border-b-[8px] shadow-2xl
                    ${area.color}
                  `}
                >
                  <div className="absolute top-4 left-6 w-5 h-4 bg-white opacity-20 rounded-full transform -rotate-45"></div>

                  <Icono className="w-12 h-12 text-white drop-shadow-md" strokeWidth={2.5} />

                  {/* TEXTO DEL BADGE (NO CAMBIO) */}
                  <div className={`
                    absolute -top-2 -right-2 text-[10px] font-black px-2 py-1 rounded-full 
                    border-2 border-white shadow-sm transition-all transform group-hover:scale-110 
                    flex items-center justify-center min-w-[35px]
                    ${haJugado ? "bg-green-500 text-white" : "bg-yellow-400 text-yellow-900"}
                  `}>
                    {haJugado ? `${progreso}%` : "GO!"}
                  </div>

                </button>

                <span className="mt-3 text-center font-bold uppercase text-xs tracking-wider w-32 leading-tight"
                      style={{ color: "#8A5E2E" }}>
                    {area.nombre}
                </span>
              </div>
            );
          })}

          <div className="opacity-30 grayscale flex flex-col items-center mt-4">
             <div className="w-20 h-20 rounded-3xl bg-gray-200 border-b-[6px] border-gray-300 flex items-center justify-center">
                <Lock className="text-gray-400 w-8 h-8" />
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}
