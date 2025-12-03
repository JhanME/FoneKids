"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Volume2, PlayCircle } from "lucide-react";
import confetti from "canvas-confetti";
import { NivelSeleccion } from "@/data/juegos"; 

interface MotorProps {
  datos: NivelSeleccion[];
  colorFondo: string;
}

export default function MotorSeleccion({ datos, colorFondo }: MotorProps) {
  const router = useRouter();
  
  const [indiceActual, setIndiceActual] = useState(0);
  const [juegoTerminado, setJuegoTerminado] = useState(false);
  const [bloqueado, setBloqueado] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null); // Guardamos la opción clickeada para pintarla

  const nivel = datos[indiceActual];

  // Reproducir audio al cargar (Fluido, sin silabeo)
  useEffect(() => {
    if (!nivel) return;
    // Pequeña espera para que cargue la UI
    setTimeout(() => {
       reproducirInstruccion();
    }, 800);
  }, [indiceActual, datos]);

  const reproducirInstruccion = () => {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        
        let textoALeer = "";

        if (nivel.tipo === "fonemas") {
            // Lee: "Mamá... Mano..."
            textoALeer = `${nivel.nombreImg1 || ""}... ${nivel.nombreImg2 || ""}`;
        } else if (nivel.tipo === "sintesis") {
            // Lee los sonidos separados lentamente
            textoALeer = nivel.sonidoSintesis || "";
        } else if (nivel.tipo === "letra") {
            textoALeer = `La letra... ${nivel.letraMostrada}`;
        }

        const utterance = new SpeechSynthesisUtterance(textoALeer);
        utterance.lang = "es-ES";
        
        // Ajustamos velocidad según tipo
        if (nivel.tipo === "sintesis") utterance.rate = 0.5; // Muy lento para s-o-l
        else utterance.rate = 0.9; // Normal fluido

        window.speechSynthesis.speak(utterance);
    }
  };

  const verificar = (opcionSeleccionada: string) => {
    if (bloqueado) return;
    setBloqueado(true);
    setFeedback(opcionSeleccionada); // Marcamos cuál tocó el niño

    const esCorrecta = opcionSeleccionada.toLowerCase() === nivel.respuestaCorrecta.toLowerCase();

    if (esCorrecta) {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        // Feedback auditivo positivo
        const utterance = new SpeechSynthesisUtterance("¡Excelente!");
        utterance.lang = "es-ES";
        window.speechSynthesis.speak(utterance);
    } else {
        // Feedback auditivo error
        const utterance = new SpeechSynthesisUtterance("Inténtalo de nuevo");
        utterance.lang = "es-ES";
        window.speechSynthesis.speak(utterance);
    }

    setTimeout(() => {
        setBloqueado(false);
        setFeedback(null);
        if (esCorrecta) {
            if (indiceActual + 1 < datos.length) {
                setIndiceActual(indiceActual + 1);
            } else {
                setJuegoTerminado(true);
            }
        }
    }, 1500);
  };

  if (juegoTerminado) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center animate-in zoom-in">
        <h1 className="text-4xl font-black text-yellow-500 mb-4">¡NIVEL COMPLETADO!</h1>
        <div className="text-8xl mb-6">🌟</div>
        <button onClick={() => router.back()} className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold text-lg shadow-xl hover:scale-105 transition">
          Volver al Mapa
        </button>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col ${colorFondo} transition-colors duration-500`}>
      {/* HEADER */}
      <div className="p-4 flex justify-between items-center max-w-2xl mx-auto w-full">
        <button onClick={() => router.back()} className="bg-white/30 p-2 rounded-full hover:bg-white/50 transition">
          <ArrowLeft className="text-white w-6 h-6" />
        </button>
        <div className="bg-white/20 px-4 py-1 rounded-full text-white font-bold">
          {indiceActual + 1} / {datos.length}
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center w-full px-4 max-w-lg mx-auto pb-10">
        
        <h1 className="text-2xl font-black text-white text-center drop-shadow-md mb-2">{nivel.titulo}</h1>
        <p className="text-white/90 text-center mb-6 font-medium text-lg">{nivel.instruccion}</p>

        {/* --- ZONA VISUAL (Cambia según el tipo de juego) --- */}
        <div className="bg-white rounded-3xl p-6 shadow-2xl w-full flex flex-col items-center justify-center mb-8 min-h-[200px] relative">
            
            {/* TIPO 1: FONEMAS (2 Imágenes) */}
            {nivel.tipo === "fonemas" && (
                <div className="flex justify-center items-center gap-6">
                    <div className="flex flex-col items-center">
                        {/* Placeholder si no hay imagen real aún */}
                        {nivel.img1 ? (
                             <img src={nivel.img1} alt="img1" className="w-24 h-24 object-contain" />
                        ) : (
                             <div className="w-24 h-24 bg-gray-200 rounded-xl flex items-center justify-center text-3xl">🖼️</div>
                        )}
                        <span className="text-gray-500 font-bold mt-2">{nivel.nombreImg1}</span>
                    </div>
                    <div className="text-3xl text-gray-300 font-black">+</div>
                    <div className="flex flex-col items-center">
                         {nivel.img2 ? (
                             <img src={nivel.img2} alt="img2" className="w-24 h-24 object-contain" />
                        ) : (
                             <div className="w-24 h-24 bg-gray-200 rounded-xl flex items-center justify-center text-3xl">🖼️</div>
                        )}
                        <span className="text-gray-500 font-bold mt-2">{nivel.nombreImg2}</span>
                    </div>
                </div>
            )}

            {/* TIPO 2: SÍNTESIS (Sonido -> Palabra) */}
            {nivel.tipo === "sintesis" && (
                <div className="flex flex-col items-center">
                    <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center animate-pulse">
                        <Volume2 className="w-16 h-16 text-blue-500" />
                    </div>
                    <p className="mt-4 text-2xl font-black text-gray-700 tracking-[0.2em] uppercase">
                        {nivel.sonidoSintesis}
                    </p>
                </div>
            )}

            {/* TIPO 3: LETRAS (Ver letra -> Sonido) */}
            {nivel.tipo === "letra" && (
                <div className="flex flex-col items-center">
                    <div className="text-[120px] font-black text-gray-800 leading-none">
                        {nivel.letraMostrada}
                    </div>
                </div>
            )}

            {/* Botón Replay Dorado */}
            <button 
                onClick={reproducirInstruccion}
                className="absolute -bottom-5 bg-yellow-400 text-yellow-900 p-3 rounded-full shadow-lg border-4 border-white hover:scale-110 transition transform"
            >
                <PlayCircle className="w-8 h-8 fill-current" />
            </button>
        </div>

        {/* --- ZONA OPCIONES (Botones de Respuesta) --- */}
        <div className="grid grid-cols-3 gap-4 w-full">
            {nivel.opciones.map((opcion, idx) => {
                // Estado visual del botón
                let btnColor = "bg-white border-gray-200 text-gray-700 hover:border-blue-400";
                
                if (feedback === opcion) {
                    if (opcion.toLowerCase() === nivel.respuestaCorrecta.toLowerCase()) {
                        btnColor = "bg-green-500 border-green-600 text-white scale-105 shadow-green-200";
                    } else {
                        btnColor = "bg-red-500 border-red-600 text-white shake";
                    }
                }

                return (
                    <button
                        key={idx}
                        onClick={() => verificar(opcion)}
                        className={`
                            ${btnColor}
                            border-b-4 active:border-b-0 active:translate-y-1
                            rounded-2xl py-4 text-2xl font-black shadow-lg transition-all
                            flex flex-col items-center justify-center
                        `}
                    >
                        {opcion}
                        {/* Si es tipo "sintesis" tal vez quieras mostrar iconos o texto más pequeño */}
                    </button>
                )
            })}
        </div>

      </div>
    </div>
  );
}