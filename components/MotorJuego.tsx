"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Volume2, Check, X } from "lucide-react";
import confetti from "canvas-confetti";
import { NivelData } from "@/data/juegos"; 
import { guardarPuntaje } from "@/utils/score"; 

interface MotorProps {
  titulo: string;
  instruccion: string;
  datos: NivelData[];
  colorFondo: string;
  modoSilabeo?: boolean;
  idJuego?: string; 
}

export default function MotorJuego({ titulo, instruccion, datos, colorFondo, modoSilabeo = false, idJuego = "test" }: MotorProps) {
  const router = useRouter();
  
  // --- ESTADO DE PREGUNTAS (TEST vs PRÁCTICA) ---
  const [preguntasTest, setPreguntasTest] = useState<NivelData[]>([]);
  const [cargado, setCargado] = useState(false);
  const [esModoPractica, setEsModoPractica] = useState(false);

  useEffect(() => {
      // 1. Verificar si ya terminó el test para activar el modo divertido
      const modoResultados = localStorage.getItem("modo_resultados") === "true";
      setEsModoPractica(modoResultados);

      if (modoResultados) {
          // MODO PRÁCTICA: ¡CARGAR TODO! (Juega todos los niveles)
          setPreguntasTest(datos); 
      } else {
          // MODO TEST: Solo las primeras 3
          setPreguntasTest(datos.slice(0, 3));
      }
      
      setCargado(true);
  }, [datos]);

  const [indiceActual, setIndiceActual] = useState(0);
  const [bloqueado, setBloqueado] = useState(false);
  const [aciertos, setAciertos] = useState(0);

  // Estados visuales
  const [imgIzquierda, setImgIzquierda] = useState("");
  const [imgDerecha, setImgDerecha] = useState("");
  const [nombreIzq, setNombreIzq] = useState("");
  const [nombreDer, setNombreDer] = useState("");
  const [esMatchCorrecto, setEsMatchCorrecto] = useState(true);
  
  // Feedback visual (Neutro por defecto para no dar pistas en el examen)
  const [estadoFeedback, setEstadoFeedback] = useState<"neutro" | "acierto" | "error">("neutro");

  const nivelActual = preguntasTest[indiceActual];

  useEffect(() => {
    if (!nivelActual) return;

    // Lógica del Crupier (50% Verdad / 50% Mentira)
    const debeSerCorrecto = Math.random() > 0.5;
    setEsMatchCorrecto(debeSerCorrecto);

    setImgIzquierda(nivelActual.imgPregunta);
    setNombreIzq(nivelActual.nombre);

    if (debeSerCorrecto) {
        setImgDerecha(nivelActual.imgRespuesta);
        setNombreDer(extraerNombreDeArchivo(nivelActual.imgRespuesta));
    } else {
        // Buscar distractor en toda la base de datos original
        const otrosNiveles = datos.filter(d => d.id !== nivelActual.id);
        const nivelImpostor = otrosNiveles[Math.floor(Math.random() * otrosNiveles.length)];
        setImgDerecha(nivelImpostor.imgRespuesta);
        setNombreDer(extraerNombreDeArchivo(nivelImpostor.imgRespuesta));
    }

    setEstadoFeedback("neutro");
  }, [indiceActual, preguntasTest, datos]); // Agregamos 'datos' a las dependencias

  const extraerNombreDeArchivo = (path: string) => {
      try {
          const parts = path.split('/');
          const fileName = parts[parts.length - 1]; 
          const cleanName = fileName.split('_')[1].split('.')[0]; 
          return cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
      } catch (e) {
          return "Imagen";
      }
  };

  // --- FUNCIÓN DE HABLAR MEJORADA (Con bypass de silabeo) ---
  const hablarTexto = (texto: string, esFeedback = false) => {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        
        let textoFinal = texto;
        let velocidad = 1.0; 

        // Solo silabeamos si el modo está activo Y NO es un mensaje de feedback
        if (modoSilabeo && !esFeedback) {
            const regexSilabeo = /(?<=[aeiouáéíóú])(?=[bcdfghjklmnpqrstvwxyz]{1,2}[aeiouáéíóú])/gi;
            textoFinal = texto.replace(regexSilabeo, ", ");
            velocidad = 0.6; 
        }

        const utterance = new SpeechSynthesisUtterance(textoFinal);
        utterance.lang = "es-ES"; 
        utterance.rate = velocidad; 
        window.speechSynthesis.speak(utterance);
    }
  };

  const verificarRespuesta = (usuarioDiceSi: boolean) => {
    if (bloqueado) return;
    setBloqueado(true);

    const acerto = (esMatchCorrecto && usuarioDiceSi) || (!esMatchCorrecto && !usuarioDiceSi);

    if (acerto) {
        setAciertos(prev => prev + 1);
        
        // --- SOLO DAMOS FEEDBACK SI ESTÁ EN MODO PRÁCTICA ---
        if (esModoPractica) {
             setEstadoFeedback("acierto");
             hablarTexto("¡Muy bien!", true); // true = no silabear
             confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        }
    } else {
        if (esModoPractica) {
             setEstadoFeedback("error");
             hablarTexto("Inténtalo de nuevo", true); // true = no silabear
        }
    }

    // Avanzar
    setTimeout(() => {
        setBloqueado(false);
        if (indiceActual + 1 < preguntasTest.length) {
            setIndiceActual(indiceActual + 1);
        } else {
            // FIN DEL JUEGO
            finalizarJuego(acerto ? aciertos + 1 : aciertos);
        }
    }, esModoPractica ? 1500 : 500); // Si es práctica esperamos más para que vea el feedback
  };

  const finalizarJuego = (puntajeFinal: number) => {
      // Solo guardamos el puntaje si estamos en el test inicial
      if (!esModoPractica) {
          guardarPuntaje(idJuego, puntajeFinal, preguntasTest.length);
      }
      router.back(); 
  };

  if (!cargado) return null;

  // Clases para el feedback visual (solo en modo práctica)
  const containerClass = (esModoPractica && estadoFeedback === "acierto") ? "ring-8 ring-green-400" : 
                         (esModoPractica && estadoFeedback === "error") ? "ring-8 ring-red-400" : "";

  return (
    <div className={`min-h-screen flex flex-col ${colorFondo} transition-all duration-300`}>
      <div className="p-4 flex justify-between items-center max-w-2xl mx-auto w-full">
        <button onClick={() => router.back()} className="bg-white/30 p-2 rounded-full hover:bg-white/50 transition">
          <ArrowLeft className="text-white w-6 h-6" />
        </button>
        <div className="bg-white/20 px-4 py-1 rounded-full text-white font-bold">
          {indiceActual + 1} / {preguntasTest.length}
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full px-4 pb-10">
        <h1 className="text-3xl font-black text-white text-center drop-shadow-md mb-2">{titulo}</h1>
        <p className="text-white/90 text-center mb-8 font-medium">{instruccion}</p>

        {/* TARJETAS */}
        <div className={`bg-white/90 backdrop-blur-sm p-6 rounded-3xl shadow-2xl w-full flex items-center justify-center gap-4 ${containerClass} transition-all`}>
            
            {/* IZQUIERDA */}
            <div className="flex-1 flex flex-col items-center gap-3">
                <div className="bg-white p-2 rounded-2xl shadow-md border-2 border-gray-100 cursor-pointer" onClick={() => hablarTexto(nombreIzq)}>
                    <img src={imgIzquierda} alt="izq" className="w-28 h-28 object-contain" />
                </div>
                <button onClick={() => hablarTexto(nombreIzq)} className="bg-yellow-400 text-yellow-900 p-3 rounded-full shadow-lg border-2 border-white">
                    <Volume2 className="w-6 h-6" strokeWidth={3} />
                </button>
            </div>

            <div className="text-gray-300 font-black text-xl">?</div>

            {/* DERECHA */}
            <div className="flex-1 flex flex-col items-center gap-3">
                <div className="bg-white p-2 rounded-2xl shadow-md border-2 border-gray-100 cursor-pointer" onClick={() => hablarTexto(nombreDer)}>
                    <img src={imgDerecha} alt="der" className="w-28 h-28 object-contain" />
                </div>
                <button onClick={() => hablarTexto(nombreDer)} className="bg-yellow-400 text-yellow-900 p-3 rounded-full shadow-lg border-2 border-white">
                    <Volume2 className="w-6 h-6" strokeWidth={3} />
                </button>
            </div>
        </div>

        {/* BOTONES */}
        <div className="flex gap-6 mt-10 w-full px-4">
            <button onClick={() => verificarRespuesta(false)} className="flex-1 bg-white border-b-[6px] border-red-200 active:border-b-0 active:translate-y-1 py-4 rounded-2xl flex items-center justify-center shadow-lg transition-all group">
                <X className="w-12 h-12 text-red-500" strokeWidth={4} />
            </button>

            <button onClick={() => verificarRespuesta(true)} className="flex-1 bg-white border-b-[6px] border-green-200 active:border-b-0 active:translate-y-1 py-4 rounded-2xl flex items-center justify-center shadow-lg transition-all group">
                <Check className="w-12 h-12 text-green-500" strokeWidth={4} />
            </button>
        </div>
      </div>
    </div>
  );
}