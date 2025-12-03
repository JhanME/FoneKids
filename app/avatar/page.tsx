"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
// Nota: Puedes usar Image de next/image si prefieres, 
// pero img funciona bien para assets dinámicos simples.

export default function AvatarSelection() {
  const router = useRouter();

  const [sexo, setSexo] = useState("");
  const [nickname, setNickname] = useState("");
  const [avatarSeleccionado, setAvatarSeleccionado] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sexoGuardado = localStorage.getItem("sexo");
    if (sexoGuardado) setSexo(sexoGuardado);
    setLoading(false);
  }, []);

  const avataresDisponibles =
    sexo === "hombre"
      ? ["/nino_1.png", "/nino_2.png"]
      : ["/nina_1.png", "/nina_2.png"];

  const handleFinalizar = () => {
    if (!nickname || !avatarSeleccionado) {
      alert("⚠️ ¡Falta información! Escribe un nombre y elige tu avatar.");
      return;
    }

    localStorage.setItem("nickname", nickname);
    localStorage.setItem("avatar", avatarSeleccionado);

    router.push("/menu_test");
  };

  if (loading)
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
        <div className="text-cyan-400 font-bold text-xl animate-pulse">
          Cargando motores... 🚀
        </div>
      </div>
    );

  return (
    // FONDO: Espacio profundo
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1e1b4b] via-[#0f172a] to-black flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      {/* DECORACIÓN: Nebulosas de fondo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-64 bg-cyan-600/20 rounded-full blur-[100px] animate-pulse"></div>

      {/* TARJETA DE CRISTAL */}
      <div className="
        relative z-10
        bg-slate-900/60
        backdrop-blur-xl
        border border-white/10
        rounded-[2.5rem]
        shadow-[0_0_50px_-10px_rgba(34,211,238,0.2)]
        p-8 md:p-10
        w-full max-w-md
      ">
        
        <h1 className="
          text-3xl md:text-4xl font-extrabold text-center mb-2
          text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400
          drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]
        ">
          ¡Elige tu Personaje!
        </h1>

        <p className="text-gray-300 text-center mb-8 text-lg">
          ¿Cómo te llamarán en esta aventura?
        </p>

        {/* INPUT DEL NICKNAME */}
        <div className="mb-8 group">
          <label className="block text-cyan-300 font-bold mb-2 ml-1 tracking-wide text-sm uppercase">
            Tu Nickname (Apodo):
          </label>
          <input
            type="text"
            placeholder="Ej: Capitán Veloz"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="
              w-full p-4
              bg-slate-800/80
              text-white placeholder-gray-500
              border-2 border-slate-600
              rounded-2xl
              focus:outline-none
              focus:border-cyan-400
              focus:shadow-[0_0_20px_rgba(34,211,238,0.3)]
              transition-all
              text-lg font-medium
            "
          />
        </div>

        {/* SELECCIÓN DE AVATAR */}
        <label className="block text-purple-300 font-bold mb-4 ml-1 tracking-wide text-sm uppercase">
          Selecciona tu avatar:
        </label>

        <div className="flex justify-center gap-6 mb-10">
          {avataresDisponibles.map((imgSrc, index) => (
            <div
              key={index}
              onClick={() => setAvatarSeleccionado(imgSrc)}
              className={`
                relative cursor-pointer 
                rounded-full 
                transition-all duration-300 
                group
                ${
                  avatarSeleccionado === imgSrc
                    ? "scale-110" // Si está seleccionado, crece
                    : "hover:scale-105 opacity-70 hover:opacity-100" // Si no, opaco y crece un poco al hover
                }
              `}
            >
              {/* Anillo de energía (Borde) */}
              <div className={`
                absolute -inset-1 rounded-full blur-md transition-all duration-300
                ${
                   avatarSeleccionado === imgSrc 
                   ? "bg-gradient-to-r from-yellow-400 to-orange-500 opacity-100" 
                   : "bg-gray-600 opacity-0 group-hover:opacity-40"
                }
              `}></div>

              {/* Imagen del Avatar */}
              <img
                src={imgSrc}
                alt={`Avatar ${index}`}
                className={`
                  relative
                  w-28 h-28 
                  object-cover 
                  rounded-full 
                  border-4 
                  shadow-xl
                  ${
                    avatarSeleccionado === imgSrc
                      ? "border-yellow-400 shadow-[0_0_30px_rgba(250,204,21,0.5)]" // Borde brillante
                      : "border-slate-600 grayscale-[30%]" // Borde oscuro y un poco gris
                  }
                `}
              />
              
              {/* Checkmark flotante si está seleccionado */}
              {avatarSeleccionado === imgSrc && (
                <div className="absolute bottom-0 right-0 bg-yellow-400 text-black rounded-full p-1 shadow-lg animate-bounce">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* BOTÓN FINALIZAR */}
        <button
          onClick={handleFinalizar}
          disabled={!nickname || !avatarSeleccionado}
          className={`
            w-full py-4 rounded-full text-xl font-black tracking-wider shadow-lg transition-all duration-300
            ${
              nickname && avatarSeleccionado
                ? "bg-gradient-to-r from-orange-500 to-pink-600 text-white hover:scale-105 hover:shadow-[0_0_30px_rgba(249,115,22,0.6)] border-b-[4px] border-orange-800/50 active:border-b-0 active:translate-y-1"
                : "bg-slate-700 text-slate-400 cursor-not-allowed border-none"
            }
          `}
        >
          {nickname && avatarSeleccionado ? "¡Listo! Despegar 🚀" : "Completa los datos..."}
        </button>

      </div>
    </div>
  );
}