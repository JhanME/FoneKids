"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Volume2, CheckCircle } from "lucide-react";
import confetti from "canvas-confetti";
import { NivelOracion } from "@/data/juegos"; 
import { guardarPuntaje } from "@/utils/score"; 

interface MotorProps {
  datos: NivelOracion[];
  colorFondo: string;
  idJuego?: string;
}

export default function MotorOraciones({ datos, colorFondo, idJuego = "memoria" }: MotorProps) {
  const router = useRouter();
  
  // --- ESTADO: MODO TEST vs PRÁCTICA ---
  const [preguntasTest, setPreguntasTest] = useState<NivelOracion[]>([]);
  const [cargado, setCargado] = useState(false);
  const [esModoPractica, setEsModoPractica] = useState(false);

  useEffect(() => {
      const modoResultados = localStorage.getItem("modo_resultados") === "true";
      setEsModoPractica(modoResultados);

      if (modoResultados) {
          setPreguntasTest(datos); // ¡CARGAR TODO!
      } else {
          setPreguntasTest(datos.slice(0, 3)); // SOLO 3
      }
      setCargado(true);
  }, [datos]);

  const [indiceActual, setIndiceActual] = useState(0);
  const [bloqueado, setBloqueado] = useState(false);
  const [palabrasDisponibles, setPalabrasDisponibles] = useState<{id: number, texto: string}[]>([]);
  const [fraseConstruida, setFraseConstruida] = useState<{id: number, texto: string}[]>([]);
  const [aciertos, setAciertos] = useState(0);
  const [feedbackVisual, setFeedbackVisual] = useState<"neutro" | "correcto" | "error">("neutro");

  const nivel = preguntasTest[indiceActual];

  useEffect(() => {
    if (cargado && nivel) {
        cargarNivel();
    }
  }, [indiceActual, cargado]);

  const cargarNivel = () => {
      setFraseConstruida([]);
      setBloqueado(false);
      setFeedbackVisual("neutro");
      const palabrasRaw = nivel.oracion.split(" ");
      const palabrasObj = palabrasRaw.map((p, i) => ({ id: i, texto: p }));
      const barajadas = [...palabrasObj].sort(() => Math.random() - 0.5);
      setPalabrasDisponibles(barajadas);
  };

  const hablarFrase = () => {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(nivel.oracion);
        u.lang = "es-ES";
        u.rate = 0.9; 
        window.speechSynthesis.speak(u);
    }
  };

  const hablarFeedback = (texto: string) => {
    const u = new SpeechSynthesisUtterance(texto);
    u.lang = "es-ES";
    window.speechSynthesis.speak(u);
  }

  const agregarPalabra = (palabra: {id: number, texto: string}) => {
      if (bloqueado) return;
      setFraseConstruida([...fraseConstruida, palabra]);
      setPalabrasDisponibles(palabrasDisponibles.filter(p => p.id !== palabra.id));
  };

  const quitarPalabra = (palabra: {id: number, texto: string}) => {
      if (bloqueado) return;
      setPalabrasDisponibles([...palabrasDisponibles, palabra]);
      setFraseConstruida(fraseConstruida.filter(p => p.id !== palabra.id));
  };

  const comprobar = () => {
      if (fraseConstruida.length === 0) return;
      setBloqueado(true);

      const oracionUsuario = fraseConstruida.map(p => p.texto).join(" ");
      const limpiaOriginal = nivel.oracion.replace(/[.,]/g, "").toLowerCase().trim();
      const limpiaUsuario = oracionUsuario.replace(/[.,]/g, "").toLowerCase().trim();
      const esCorrecta = limpiaUsuario === limpiaOriginal;

      if (esCorrecta) {
          setAciertos(prev => prev + 1);
          if (esModoPractica) {
              setFeedbackVisual("correcto");
              confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
              hablarFeedback("¡Muy bien!");
          }
      } else {
          if (esModoPractica) {
              setFeedbackVisual("error");
              hablarFeedback("Escucha otra vez");
          }
      }

      setTimeout(() => {
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

      <div className="flex-1 flex flex-col items-center justify-start w-full px-4 max-w-lg mx-auto pb-10 pt-4">
        <span className="text-white/80 font-bold uppercase tracking-widest text-sm mb-4 bg-black/10 px-3 py-1 rounded-full">Nivel {nivel.nivel}</span>

        <div className={`w-full bg-white/90 backdrop-blur min-h-[120px] rounded-3xl p-4 shadow-xl mb-6 flex flex-wrap gap-2 items-center justify-center relative border-4 transition-all duration-300 ${feedbackVisual === 'correcto' ? 'border-green-500' : feedbackVisual === 'error' ? 'border-red-500' : 'border-transparent'}`}>
            {fraseConstruida.length === 0 && <span className="text-gray-400 font-medium text-center">Toca las palabras abajo...</span>}
            {fraseConstruida.map((palabra) => (
                <button key={palabra.id} onClick={() => quitarPalabra(palabra)} className="bg-white border-2 border-orange-200 text-orange-800 px-4 py-2 rounded-xl font-bold shadow-sm">{palabra.texto}</button>
            ))}
            {feedbackVisual === "correcto" && <div className="absolute -top-3 -right-3 bg-green-500 text-white p-1 rounded-full shadow"><CheckCircle /></div>}
        </div>

        <button onClick={hablarFrase} className="mb-8 bg-orange-500 text-white p-6 rounded-full shadow-lg border-4 border-orange-300 active:scale-95 transition hover:scale-105 hover:bg-orange-400 group">
            <Volume2 className="w-12 h-12 group-hover:animate-pulse" />
        </button>
        <p className="text-white/90 text-center font-medium mb-8 -mt-4">Escucha y ordena</p>

        <div className="w-full flex flex-wrap gap-3 justify-center mb-8">
            {palabrasDisponibles.map((palabra) => (
                <button key={palabra.id} onClick={() => agregarPalabra(palabra)} className="bg-white text-gray-800 px-5 py-3 rounded-2xl font-bold shadow-lg border-b-4 border-gray-200 active:border-b-0 active:translate-y-1 transition text-lg">{palabra.texto}</button>
            ))}
        </div>

        {palabrasDisponibles.length === 0 && feedbackVisual !== "correcto" && (
            <button onClick={comprobar} className="w-full bg-green-500 text-white py-4 rounded-2xl font-black text-xl shadow-xl hover:bg-green-400 transition animate-in slide-in-from-bottom-4">COMPROBAR</button>
        )}
      </div>
    </div>
  );
}