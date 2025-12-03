"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Volume2, BookOpen, ArrowRight } from "lucide-react";
import confetti from "canvas-confetti";
import { NivelCuento, PreguntaCuento } from "@/data/juegos"; 
import { guardarPuntaje } from "@/utils/score"; 

interface MotorProps {
  datos: NivelCuento; 
  colorFondo: string;
  idJuego?: string; 
}

export default function MotorCuentos({ datos, colorFondo, idJuego = "comprension" }: MotorProps) {
  const router = useRouter();
  
  // --- MODO TEST vs PRÁCTICA ---
  const [preguntasTest, setPreguntasTest] = useState<PreguntaCuento[]>([]);
  const [cargado, setCargado] = useState(false);
  const [esModoPractica, setEsModoPractica] = useState(false);

  useEffect(() => {
      const modoResultados = localStorage.getItem("modo_resultados") === "true";
      setEsModoPractica(modoResultados);

      // Si hay más de 3 preguntas, cortamos. Si no, usamos todas.
      if (modoResultados) {
          setPreguntasTest(datos.preguntas);
      } else {
          setPreguntasTest(datos.preguntas.slice(0, 3)); 
      }
      setCargado(true);
  }, [datos]);

  const [fase, setFase] = useState<"lectura" | "quiz">("lectura");
  const [indicePregunta, setIndicePregunta] = useState(0);
  const [bloqueado, setBloqueado] = useState(false);
  const [lecturaActiva, setLecturaActiva] = useState(false);
  
  const [aciertos, setAciertos] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);

  const hablar = (texto: string) => {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        setLecturaActiva(true);
        const u = new SpeechSynthesisUtterance(texto);
        u.lang = "es-ES";
        u.rate = 0.9;
        u.onend = () => setLecturaActiva(false);
        window.speechSynthesis.speak(u);
    }
  };

  const detenerAudio = () => {
      window.speechSynthesis.cancel();
      setLecturaActiva(false);
  };

  const iniciarQuiz = () => {
      detenerAudio();
      setFase("quiz");
  };

  const verificarRespuesta = (opcion: string) => {
      if (bloqueado) return;
      setBloqueado(true);
      setFeedback(opcion);

      const preguntaActual = preguntasTest[indicePregunta];
      const esCorrecta = opcion === preguntaActual.correcta;

      if (esCorrecta) {
          setAciertos(prev => prev + 1);
          if (esModoPractica) {
              confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
              hablar("¡Correcto!");
          }
      } else {
          if (esModoPractica) {
              hablar("Oh no, inténtalo de nuevo");
          }
      }

      setTimeout(() => {
          setBloqueado(false);
          setFeedback(null);
          
          if (indicePregunta + 1 < preguntasTest.length) {
              setIndicePregunta(indicePregunta + 1);
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
        <button onClick={() => { detenerAudio(); router.back(); }} className="bg-white/30 p-2 rounded-full hover:bg-white/50 transition">
          <ArrowLeft className="text-white w-6 h-6" />
        </button>
        <div className="bg-white/20 px-4 py-1 rounded-full text-white font-bold flex items-center gap-2">
          <BookOpen className="w-4 h-4" />
          {fase === "lectura" ? "Lectura" : `Pregunta ${indicePregunta + 1}/${preguntasTest.length}`}
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center w-full px-4 max-w-lg mx-auto pb-10 pt-2">
        
        {fase === "lectura" && (
            <div className="w-full flex flex-col items-center animate-in fade-in slide-in-from-bottom-4">
                <div className="bg-white rounded-3xl p-6 shadow-2xl w-full mb-6 relative">
                    <h2 className="text-2xl font-black text-gray-800 mb-4 text-center">{datos.titulo}</h2>
                    <div className="max-h-[40vh] overflow-y-auto text-lg text-gray-600 leading-relaxed text-justify pr-2">
                        {datos.historia}
                    </div>
                    <button 
                        onClick={() => lecturaActiva ? detenerAudio() : hablar(datos.historia)}
                        className={`absolute -bottom-6 right-6 p-4 rounded-full shadow-lg border-4 border-white transition-all ${lecturaActiva ? 'bg-red-500 text-white animate-pulse' : 'bg-yellow-400 text-yellow-900 hover:scale-110'}`}
                    >
                        <Volume2 className="w-8 h-8" />
                    </button>
                </div>
                <button 
                    onClick={iniciarQuiz}
                    className="bg-white text-teal-600 px-8 py-4 rounded-2xl font-black text-xl shadow-xl hover:bg-teal-50 transition flex items-center gap-2"
                >
                    RESPONDER <ArrowRight strokeWidth={3} />
                </button>
            </div>
        )}

        {fase === "quiz" && (
            <div className="w-full flex flex-col items-center animate-in slide-in-from-right-8 duration-300">
                <div className="bg-white/90 backdrop-blur rounded-2xl p-6 shadow-xl w-full mb-6 text-center border-4 border-white/50">
                    <h3 className="text-xl font-bold text-gray-800">
                        {preguntasTest[indicePregunta].pregunta}
                    </h3>
                    <button onClick={() => hablar(preguntasTest[indicePregunta].pregunta)} className="mt-2 bg-gray-100 text-gray-500 p-2 rounded-full hover:bg-gray-200">
                        <Volume2 className="w-5 h-5" />
                    </button>
                </div>

                <div className="w-full flex flex-col gap-3">
                    {preguntasTest[indicePregunta].opciones.map((opcion, idx) => {
                        let btnClass = "bg-white border-white text-gray-700 hover:bg-gray-50";
                        if (feedback === opcion) {
                            if (esModoPractica) {
                                btnClass = opcion === preguntasTest[indicePregunta].correcta ? "bg-green-500 text-white" : "bg-red-500 text-white";
                            } else {
                                btnClass = "bg-yellow-100 border-yellow-400 text-gray-900";
                            }
                        }
                        return (
                            <button
                                key={idx}
                                onClick={() => verificarRespuesta(opcion)}
                                disabled={bloqueado}
                                className={`
                                    ${btnClass}
                                    w-full py-4 px-6 rounded-2xl shadow-lg border-b-4 
                                    text-lg font-bold text-left transition-all active:scale-95 active:border-b-0 active:translate-y-1
                                `}
                            >
                                {opcion}
                            </button>
                        );
                    })}
                </div>
            </div>
        )}
      </div>
    </div>
  );
}