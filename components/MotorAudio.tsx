"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Volume2, Music4, MousePointerClick } from "lucide-react";
import confetti from "canvas-confetti";
import { NivelLetra } from "@/data/juegos"; 
import { guardarPuntaje } from "@/utils/score"; 

interface MotorProps {
  titulo: string;
  instruccion: string;
  datos: NivelLetra[];
  colorFondo: string;
  idJuego?: string; 
}

export default function MotorAudio({ titulo, instruccion, datos, colorFondo, idJuego = "letras" }: MotorProps) {
  const router = useRouter();
  
  // --- ESTADO: MODO TEST vs PRÁCTICA ---
  const [preguntasTest, setPreguntasTest] = useState<NivelLetra[]>([]);
  const [cargado, setCargado] = useState(false);
  const [esModoPractica, setEsModoPractica] = useState(false);

  useEffect(() => {
      // 1. Revisar si ya terminamos el test
      const modoResultados = localStorage.getItem("modo_resultados") === "true";
      setEsModoPractica(modoResultados);

      if (modoResultados) {
          setPreguntasTest(datos); // MODO PRÁCTICA: ¡TODOS LOS EJERCICIOS!
      } else {
          setPreguntasTest(datos.slice(0, 3)); // MODO TEST: SOLO 3
      }
      setCargado(true);
  }, [datos]);

  const [indiceActual, setIndiceActual] = useState(0);
  const [bloqueado, setBloqueado] = useState(false);
  const [reproduciendo, setReproduciendo] = useState<number | null>(null);
  
  const [seleccionado, setSeleccionado] = useState<number | null>(null);
  const [opcionesMezcladas, setOpcionesMezcladas] = useState<string[]>([]);
  const [aciertos, setAciertos] = useState(0);

  const nivel = preguntasTest[indiceActual];

  useEffect(() => {
    if (nivel) {
        const mezcla = [...nivel.opciones].sort(() => 0.5 - Math.random());
        setOpcionesMezcladas(mezcla);
        setSeleccionado(null); 
    }
  }, [indiceActual, cargado]);

  const hablar = (texto: string, callback?: () => void) => {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(texto);
        u.lang = "es-ES";
        u.rate = 0.9;
        u.onend = () => { if (callback) callback(); };
        window.speechSynthesis.speak(u);
    } else {
        if (callback) callback();
    }
  };

  const manejarClick = (sonido: string, indexBtn: number) => {
    if (bloqueado) return;
    setReproduciendo(indexBtn);
    hablar(sonido, () => setReproduciendo(null));

    if (seleccionado === indexBtn) {
        verificarRespuesta(sonido);
    } else {
        setSeleccionado(indexBtn);
    }
  };

  const verificarRespuesta = (sonidoElegido: string) => {
      setBloqueado(true);
      const esCorrecta = sonidoElegido === nivel.audioCorrecto;

      if (esCorrecta) {
          setAciertos(prev => prev + 1);
          // Si estamos en modo práctica, damos feedback positivo
          if (esModoPractica) {
              confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
              hablar("¡Correcto!");
          }
      } else {
          // Si estamos en modo práctica, avisamos del error
          if (esModoPractica) {
              hablar("Inténtalo de nuevo");
          }
      }

      // En modo práctica esperamos más para que disfrute el feedback
      setTimeout(() => {
          avanzar(esCorrecta ? aciertos + 1 : aciertos);
      }, esModoPractica ? 1500 : 800);
  };

  const avanzar = (puntajeActual: number) => {
    setBloqueado(false);
    setSeleccionado(null);
    
    if (indiceActual + 1 < preguntasTest.length) {
        setIndiceActual(indiceActual + 1);
    } else {
        // Solo guardamos puntaje si es el TEST inicial
        if (!esModoPractica) {
            guardarPuntaje(idJuego, puntajeActual, preguntasTest.length);
        }
        router.back();
    }
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
        <h1 className="text-2xl font-black text-white text-center drop-shadow-md mb-2">{titulo}</h1>
        <p className="text-white/90 text-center mb-8 font-medium text-lg">{instruccion}</p>

        <div className="bg-white p-8 rounded-3xl shadow-2xl mb-10 w-48 h-48 flex items-center justify-center">
             <img src={nivel.img} alt={nivel.letra} className="w-full h-full object-contain" />
        </div>

        <div className="grid grid-cols-3 gap-4 w-full">
            {opcionesMezcladas.map((sonido, idx) => {
                const esActivo = reproduciendo === idx; 
                const esSeleccionado = seleccionado === idx; 
                let clasesBoton = "bg-white border-gray-200 hover:bg-gray-50 text-gray-400";
                
                if (esSeleccionado) clasesBoton = "bg-blue-100 border-blue-400 text-blue-500 ring-4 ring-blue-200 scale-105";
                if (esActivo) clasesBoton = "bg-yellow-300 border-yellow-500 text-yellow-800 scale-110";

                return (
                    <button
                        key={idx}
                        onClick={() => manejarClick(sonido, idx)}
                        className={`relative group h-28 w-full rounded-2xl shadow-lg border-b-8 transition-all duration-200 flex flex-col items-center justify-center gap-1 ${clasesBoton}`}
                    >
                        {esActivo ? <Music4 className="w-10 h-10 animate-bounce" /> : <Volume2 className="w-10 h-10" />}
                        {esSeleccionado && !esActivo && (
                             <div className="absolute -top-3 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded-full animate-bounce">¡Confirma!</div>
                        )}
                    </button>
                );
            })}
        </div>
      </div>
    </div>
  );
}