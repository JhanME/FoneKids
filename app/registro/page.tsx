"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Registro() {
  const router = useRouter();

  // Estados del formulario
  const [sexo, setSexo] = useState("");
  const [edad, setEdad] = useState("");
  const [grado, setGrado] = useState("");
  
  // (He ocultado estos estados si no tienen inputs visuales todavía, 
  // pero puedes descomentarlos si vas a agregar los campos)
  // const [idioma, setIdioma] = useState("");
  // const [correoPadre, setCorreoPadre] = useState("");

  const handleSiguiente = () => {
    if (!sexo || !edad || !grado) {
      // Usamos un alert temporal, pero idealmente podrías usar un modal bonito
      alert("⚠️ ¡Ups! Por favor completa todos los datos para despegar.");
      return;
    }

    // Guardar en localStorage (o podrías enviarlo a tu base de datos aquí)
    localStorage.setItem("sexo", sexo);
    localStorage.setItem("edad", edad);
    localStorage.setItem("grado", grado);

    router.push("/avatar");
  };

  return (
    // FONDO: Espacio profundo con nebulosas animadas
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1e1b4b] via-[#0f172a] to-black flex flex-col items-center justify-center px-4 py-10 relative overflow-hidden">

      {/* DECORACIÓN: Manchas de luz ambiental */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-purple-600 rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-cyan-600 rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-pulse delay-700"></div>

      {/* Logo flotando */}
      <div className="mb-8 relative z-10 hover:scale-105 transition-transform duration-300">
        <Image
          src="/fonekids1.png" // Asegúrate de usar la ruta correcta de tu logo
          alt="Fonekids"
          width={180}
          height={180}
          className="drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]"
        />
      </div>

      {/* TARJETA DEL FORMULARIO */}
      <div className="
        relative z-10
        bg-slate-900/60
        backdrop-blur-xl
        border border-white/10
        rounded-[2.5rem]
        shadow-[0_0_40px_-10px_rgba(124,58,237,0.3)]
        p-8 md:p-10
        max-w-md w-full
      ">

        <h1 className="
          text-3xl font-extrabold text-center mb-8
          text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500
          drop-shadow-[0_0_5px_rgba(244,114,182,0.5)]
        ">
          Configura tu Perfil
        </h1>

        {/* --- CAMPO: SEXO --- */}
        <div className="mb-6">
          <label className="block text-cyan-300 font-bold mb-2 ml-1 tracking-wide">
            ¿Eres Niño o Niña?
          </label>
          <div className="relative">
            <select
              value={sexo}
              onChange={(e) => setSexo(e.target.value)}
              className="
                w-full p-4
                bg-slate-800/80
                text-white
                border-2 border-slate-600
                rounded-2xl
                appearance-none /* Quita la flecha fea por defecto del navegador */
                focus:outline-none
                focus:border-cyan-400
                focus:shadow-[0_0_15px_rgba(34,211,238,0.4)]
                transition-all
                cursor-pointer
              "
            >
              <option value="" className="bg-slate-800 text-gray-400">Selecciona una opción...</option>
              <option value="hombre" className="bg-slate-800">👦 Niño</option>
              <option value="mujer" className="bg-slate-800">👧 Niña</option>
            </select>
            {/* Flecha personalizada (CSS puro) */}
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-cyan-400">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>

        {/* --- CAMPO: EDAD --- */}
        <div className="mb-6">
          <label className="block text-purple-300 font-bold mb-2 ml-1 tracking-wide">
            ¿Cuántos años tienes?
          </label>
          <div className="relative">
            <select
              value={edad}
              onChange={(e) => setEdad(e.target.value)}
              className="
                w-full p-4
                bg-slate-800/80
                text-white
                border-2 border-slate-600
                rounded-2xl
                appearance-none
                focus:outline-none
                focus:border-purple-400
                focus:shadow-[0_0_15px_rgba(192,132,252,0.4)]
                transition-all
                cursor-pointer
              "
            >
              <option value="" className="bg-slate-800 text-gray-400">Selecciona tu edad...</option>
              <option value="3" className="bg-slate-800">3 años</option>
              <option value="4" className="bg-slate-800">4 años</option>
              <option value="5" className="bg-slate-800">5 años</option>
              <option value="6" className="bg-slate-800">6 años</option>
              <option value="7" className="bg-slate-800">7 años</option>
              <option value="8" className="bg-slate-800">8 años</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-purple-400">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>

        {/* --- CAMPO: GRADO --- */}
        <div className="mb-10">
          <label className="block text-pink-300 font-bold mb-2 ml-1 tracking-wide">
            Grado escolar:
          </label>
          <div className="relative">
            <select
              value={grado}
              onChange={(e) => setGrado(e.target.value)}
              className="
                w-full p-4
                bg-slate-800/80
                text-white
                border-2 border-slate-600
                rounded-2xl
                appearance-none
                focus:outline-none
                focus:border-pink-400
                focus:shadow-[0_0_15px_rgba(244,114,182,0.4)]
                transition-all
                cursor-pointer
              "
            >
              <option value="" className="bg-slate-800 text-gray-400">Selecciona tu grado...</option>
              <option value="1" className="bg-slate-800">🏫 Kinder / Inicial</option>
              <option value="1er grado" className="bg-slate-800">📚 1er grado</option>
              <option value="2do grado" className="bg-slate-800">📚 2do grado</option>
              <option value="3er grado" className="bg-slate-800">📚 3er grado</option>
              <option value="4to grado" className="bg-slate-800">📚 4to grado</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-pink-400">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>

        {/* BOTÓN SIGUIENTE */}
        <button
          onClick={handleSiguiente}
          className="
            w-full
            bg-gradient-to-r from-orange-500 to-pink-600
            text-white
            py-4
            rounded-full
            text-xl font-black tracking-wider
            shadow-[0_0_20px_rgba(249,115,22,0.5)]
            border-b-[4px] border-orange-800/50
            hover:scale-105
            hover:shadow-[0_0_30px_rgba(249,115,22,0.7)]
            active:border-b-0 active:translate-y-1
            transition-all duration-200
          "
        >
          Siguiente 🚀
        </button>

      </div>
    </div>
  );
}