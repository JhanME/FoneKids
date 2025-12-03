"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Volume2 } from "lucide-react";
import confetti from "canvas-confetti";
import { NivelSemantica } from "@/data/juegos"; 
import { guardarPuntaje } from "@/utils/score"; 

interface MotorProps {
  datos: NivelSemantica[];
  colorFondo: string;
  idJuego?: string; 
}

export default function MotorSemantica({ datos, colorFondo, idJuego = "semantica" }: MotorProps) {
  const router = useRouter();
  
  // --- MODO TEST vs PRÁCTICA ---
  const [preguntasTest, setPreguntasTest] = useState<NivelSemantica[]>([]);
  const [cargado, setCargado] = useState(false);
  const [esModoPractica, setEsModoPractica] = useState(false);

  useEffect(() => {
      const modoResultados = localStorage.getItem("modo_resultados") === "true";
      setEsModoPractica(modoResultados);

      if (modoResultados) {
          setPreguntasTest(datos); 
      } else {
          setPreguntasTest(datos.slice(0, 3)); 
      }
      setCargado(true);
  }, [datos]);

  const [indiceActual, setIndiceActual] = useState(0);
  const [bloqueado, setBloqueado] = useState(false);
  const [opcionSeleccionada, setOpcionSeleccionada] = useState<string | null>(null);
  const [aciertos, setAciertos] = useState(0);

  const nivel = preguntasTest[indiceActual];

  const hablar = (texto: string) => {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(texto);
        u.lang = "es-ES";
        window.speechSynthesis.speak(u);
    }
  };

  const verificar = (opcion: string) => {
    if (bloqueado) return;
    setBloqueado(true);
    setOpcionSeleccionada(opcion);

    const esCorrecta = opcion === nivel.correcta;

    if (esCorrecta) {
        setAciertos(prev => prev + 1);
        if (esModoPractica) {
            confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
            hablar("¡Muy bien!");
        }
    } else {
        if (esModoPractica) {
            hablar("Inténtalo de nuevo");
        }
    }

    setTimeout(() => {
        setBloqueado(false);
        setOpcionSeleccionada(null);
        
        if (indiceActual + 1 < preguntasTest.length) {
            setIndiceActual(indiceActual + 1);
        } else {
            finalizarJuego(esCorrecta ? aciertos + 1 : aciertos);
        }
    }, esModoPractica ? 2000 : 1000);
  };

  const finalizarJuego = (puntajeFinal: number) => {
      if (!esModoPractica) {
          guardarPuntaje(idJuego, puntajeFinal, preguntasTest.length);
      }
      router.back();
  };

  if (!cargado) return null;

  return (
    <div className={`min-h-screen flex flex-col ${colorFondo} transition-colors duration-500`}>
      <div className="p-4 flex justify-between items-center max-w-2xl mx-auto w-full">
        <button onClick={() => router.back()} className="bg-white/30 p-2 rounded-full hover:bg-white/50 transition">
          <ArrowLeft className="text-white w-6 h-6" />
        </button>
        <div className="bg-white/20 px-4 py-1 rounded-full text-white font-bold">
          {indiceActual + 1} / {preguntasTest.length}
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center w-full px-4 max-w-lg mx-auto pb-10 pt-4">
        
        <h1 className="text-2xl font-black text-white text-center drop-shadow-md mb-2">Significados</h1>
        <p className="text-white/90 text-center mb-6 font-medium">¿Qué significa esta palabra?</p>

        <div 
            onClick={() => hablar(nivel.palabra)}
            className="bg-white w-full rounded-3xl p-6 shadow-xl mb-8 flex flex-col items-center justify-center cursor-pointer active:scale-95 transition"
        >
            <Volume2 className="w-10 h-10 text-gray-400 mb-2" />
            <span className="text-4xl font-black text-gray-800 uppercase tracking-wide">
                {nivel.palabra}
            </span>
        </div>

        <div className="w-full flex flex-col gap-3">
            {nivel.opciones.map((opcion, idx) => {
                let btnClass = "bg-white border-white hover:bg-gray-50 text-gray-700";
                
                if (opcionSeleccionada === opcion) {
                    if (esModoPractica) {
                        btnClass = opcion === nivel.correcta 
                            ? "bg-green-500 border-green-600 text-white" 
                            : "bg-red-500 border-red-600 text-white";
                    } else {
                        btnClass = "bg-yellow-100 border-yellow-400 text-gray-900";
                    }
                }

                return (
                    <button
                        key={idx}
                        onClick={() => verificar(opcion)}
                        disabled={bloqueado}
                        className={`
                            relative w-full rounded-2xl shadow-lg border-b-4 transition-all
                            p-4 text-left font-bold text-lg leading-tight outline-none
                            active:border-b-0 active:translate-y-1
                            ${btnClass}
                        `}
                    >
                        {opcion}
                    </button>
                );
            })}
        </div>
      </div>
    </div>
  );
}