"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Volume2, CheckCircle } from "lucide-react";
import confetti from "canvas-confetti";
import { NivelLexica } from "@/data/juegos"; 
import { guardarPuntaje } from "@/utils/score"; 

interface MotorProps {
  datos: NivelLexica[];
  colorFondo: string;
  idJuego?: string;
}

export default function MotorFrases({ datos, colorFondo, idJuego = "contar_palabras" }: MotorProps) {
  const router = useRouter();
  
  // --- MODO TEST vs PRÁCTICA ---
  const [preguntasTest, setPreguntasTest] = useState<NivelLexica[]>([]);
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
  const [completado, setCompletado] = useState(false); 
  const [errorIdx, setErrorIdx] = useState<number | null>(null);
  const [aciertos, setAciertos] = useState(0);

  const nivel = preguntasTest[indiceActual];
  const [opcionesBarajadas, setOpcionesBarajadas] = useState<string[]>([]);

  useEffect(() => {
    if (cargado && nivel) {
        setCompletado(false);
        setBloqueado(false);
        setErrorIdx(null);
        setOpcionesBarajadas([...nivel.opciones].sort(() => 0.5 - Math.random()));
        
        setTimeout(() => hablar(nivel.audio), 500);
    }
  }, [indiceActual, cargado]);

  const hablar = (texto: string) => {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(texto);
        u.lang = "es-ES";
        u.rate = 0.9;
        window.speechSynthesis.speak(u);
    }
  };

  const verificar = (imgSeleccionada: string, idx: number) => {
      if (bloqueado || completado) return;

      const esCorrecta = imgSeleccionada === nivel.imgCorrecta;

      if (esCorrecta) {
          setBloqueado(true);
          setCompletado(true); 
          setAciertos(prev => prev + 1);
          
          if (esModoPractica) {
              confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
              hablar("¡Muy bien!");
          }
      } else {
          setErrorIdx(idx);
          if (esModoPractica) {
              hablar("Esa no es. Intenta de nuevo.");
          }
      }

      // Avanzamos automáticamente
      setTimeout(() => {
          if (!esCorrecta) {
              setErrorIdx(null);
          }
          
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
      {/* HEADER */}
      <div className="p-4 flex justify-between items-center max-w-2xl mx-auto w-full">
        <button onClick={() => router.back()} className="bg-white/30 p-2 rounded-full hover:bg-white/50 transition">
          <ArrowLeft className="text-white w-6 h-6" />
        </button>
        <div className="bg-white/20 px-4 py-1 rounded-full text-white font-bold">
          {indiceActual + 1} / {preguntasTest.length}
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center w-full px-4 max-w-lg mx-auto pb-10">
        
        <h1 className="text-2xl font-black text-white text-center drop-shadow-md mb-8">Completa la Frase</h1>

        {/* ZONA DE LA FRASE */}
        <div className="bg-white rounded-3xl p-6 shadow-2xl w-full mb-10 flex flex-wrap items-center justify-center gap-4 min-h-[140px]">
            
            <span className="text-4xl font-black text-gray-700">{nivel.frasePre}</span>

            {/* EL HUECO */}
            <div className={`
                w-24 h-24 rounded-xl flex items-center justify-center transition-all duration-500
                ${completado ? "bg-white shadow-none border-4 border-green-400 scale-110" : "bg-gray-100 border-4 border-dashed border-gray-300"}
            `}>
                {completado ? (
                    <img src={nivel.imgCorrecta} alt="correcta" className="w-20 h-20 object-contain animate-in zoom-in" />
                ) : (
                    <span className="text-gray-300 text-4xl font-bold">?</span>
                )}
            </div>

            <span className="text-4xl font-black text-gray-700">{nivel.frasePost}</span>

            <button 
                onClick={() => hablar(nivel.audio)}
                className="ml-2 bg-yellow-100 text-yellow-600 p-3 rounded-full hover:bg-yellow-200 transition"
            >
                <Volume2 className="w-6 h-6" />
            </button>
        </div>

        {/* ZONA DE OPCIONES */}
        <div className="grid grid-cols-3 gap-4 w-full">
            {opcionesBarajadas.map((imgSrc, idx) => {
                // Si completado, ocultamos la opción correcta abajo para simular que "subió"
                if (completado && imgSrc === nivel.imgCorrecta) return <div key={idx} className="w-full h-24"></div>;

                const esError = errorIdx === idx;

                return (
                    <button
                        key={idx}
                        onClick={() => verificar(imgSrc, idx)}
                        disabled={bloqueado}
                        className={`
                            bg-white rounded-2xl p-2 shadow-lg border-b-4 border-gray-200 
                            h-28 flex items-center justify-center transition-all active:border-b-0 active:translate-y-1
                            ${esError ? "bg-red-100 border-red-400 shake" : ""}
                        `}
                    >
                        <img src={imgSrc} alt="opcion" className="w-full h-full object-contain" />
                    </button>
                );
            })}
        </div>

      </div>
    </div>
  );
}