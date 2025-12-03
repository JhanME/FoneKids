"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Volume2, Ear, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";
import { NivelSintesis } from "@/data/juegos"; 
import { guardarPuntaje } from "@/utils/score"; 

interface MotorProps {
  titulo: string;
  instruccion: string;
  datos: NivelSintesis[];
  colorFondo: string;
  idJuego?: string; 
}

export default function MotorSintesis({ titulo, instruccion, datos, colorFondo, idJuego = "sintesis" }: MotorProps) {
  const router = useRouter();
  
  // --- MODO TEST vs PRÁCTICA ---
  const [preguntasTest, setPreguntasTest] = useState<NivelSintesis[]>([]);
  const [cargado, setCargado] = useState(false);
  const [esModoPractica, setEsModoPractica] = useState(false);

  useEffect(() => {
      const modoResultados = localStorage.getItem("modo_resultados") === "true";
      setEsModoPractica(modoResultados);

      if (modoResultados) {
          setPreguntasTest(datos); // CARGA TODO
      } else {
          setPreguntasTest(datos.slice(0, 3)); // CARGA 3
      }
      setCargado(true);
  }, [datos]);

  const [indiceActual, setIndiceActual] = useState(0);
  const [bloqueado, setBloqueado] = useState(false);
  const [estaHablando, setEstaHablando] = useState(false); 
  const [feedback, setFeedback] = useState<string | null>(null);
  const [aciertos, setAciertos] = useState(0);

  const nivel = preguntasTest[indiceActual];

  useEffect(() => {
    if(cargado && nivel) {
        setTimeout(() => hablarSonidos(), 800);
    }
  }, [indiceActual, cargado]);

  const hablarSonidos = () => {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        setEstaHablando(true); 
        const utterance = new SpeechSynthesisUtterance(nivel.sonidos);
        utterance.lang = "es-ES";
        utterance.rate = 0.6; 
        utterance.onend = () => setEstaHablando(false); 
        window.speechSynthesis.speak(utterance);
    }
  };

  // Feedback hablado (solo en modo práctica)
  const hablarFeedback = (texto: string) => {
    const u = new SpeechSynthesisUtterance(texto);
    u.lang = "es-ES";
    window.speechSynthesis.speak(u);
  };

  const verificar = (opcion: string) => {
    if (bloqueado) return;
    setBloqueado(true);
    setFeedback(opcion);

    const esCorrecta = opcion === nivel.correcta;

    if (esCorrecta) {
        setAciertos(prev => prev + 1);
        if (esModoPractica) {
            confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
            hablarFeedback("¡Excelente!");
        }
    } else {
        if (esModoPractica) {
            hablarFeedback("Inténtalo de nuevo");
        }
    }

    setTimeout(() => {
        setBloqueado(false);
        setFeedback(null);
        
        if (indiceActual + 1 < preguntasTest.length) {
            setIndiceActual(indiceActual + 1);
        } else {
            finalizarJuego(esCorrecta ? aciertos + 1 : aciertos);
        }
    }, esModoPractica ? 1500 : 1000);
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

      <div className="flex-1 flex flex-col items-center justify-center w-full px-6 max-w-md mx-auto pb-10">
        <h1 className="text-3xl font-black text-white text-center drop-shadow-md mb-2">{titulo}</h1>
        <p className="text-white/90 text-center mb-10 font-medium text-lg">{instruccion}</p>

        <div onClick={hablarSonidos} className="cursor-pointer group relative mb-12">
            {estaHablando && <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-20"></div>}
            <div className="w-40 h-40 bg-white rounded-full shadow-2xl flex items-center justify-center transform transition group-hover:scale-105 active:scale-95">
                {estaHablando ? <Volume2 className="w-20 h-20 text-pink-500 animate-pulse" /> : <Ear className="w-20 h-20 text-gray-400" />}
            </div>
        </div>

        <div className="grid grid-cols-2 gap-4 w-full">
            {nivel.opciones.map((opcion, idx) => {
                let btnClass = "bg-white text-gray-700 hover:bg-gray-50 border-white"; 
                if (feedback === opcion) {
                    // En modo test solo se pone amarillo (selección), en práctica podría ser verde/rojo
                    btnClass = esModoPractica 
                        ? (opcion === nivel.correcta ? "bg-green-400 text-white border-green-500" : "bg-red-400 text-white border-red-500")
                        : "bg-yellow-100 border-yellow-300 text-gray-800";
                }

                return (
                    <button
                        key={idx}
                        onClick={() => verificar(opcion)}
                        disabled={bloqueado}
                        className={`
                            ${btnClass}
                            py-6 px-4 rounded-2xl text-2xl font-black shadow-lg
                            border-b-8 active:border-b-0 active:translate-y-2
                            transition-all flex flex-col items-center gap-2
                        `}
                    >
                        {opcion}
                    </button>
                )
            })}
        </div>
      </div>
    </div>
  );
}