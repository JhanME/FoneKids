import Image from "next/image";

export default function Psicoeducacion() {
  return (
    // FONDO: El mismo universo oscuro y profundo que la home
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1e1b4b] via-[#0f172a] to-black flex items-center justify-center px-4 py-10 relative overflow-hidden">
      
      {/* DECORACIÓN DE FONDO (Nebulosas) */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-pulse delay-1000"></div>

      {/* TARJETA PRINCIPAL: Panel de cristal flotante */}
      <div className="
        relative z-10
        bg-slate-900/60        /* Fondo oscuro translúcido */
        backdrop-blur-xl       /* Efecto cristal más fuerte para leer mejor el texto */
        border border-white/10 /* Borde sutil */
        rounded-3xl
        shadow-[0_0_50px_-10px_rgba(124,58,237,0.25)] /* Resplandor violeta suave */
        p-8
        max-w-3xl w-full
      ">

        {/* Título con efecto degradado (Oro espacial) */}
        <h1 className="
          text-3xl md:text-4xl 
          font-extrabold 
          text-center 
          mb-8
          text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300
          drop-shadow-[0_0_10px_rgba(251,146,60,0.5)]
        ">
          Psicoeducación para Padres
        </h1>

        <div className="flex flex-col md:flex-row items-center gap-8">

          {/* Imagen con marco brillante */}
          <div className="relative group">
            {/* Efecto de resplandor detrás de la imagen */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
            <Image
              src="/nina_indicaciones1.png"
              alt="Indicaciones para padres"
              width={220}
              height={220}
              className="
                relative
                rounded-2xl
                border-2 border-white/20
                shadow-2xl
                bg-slate-800/50 /* Fondo oscuro por si la imagen tiene transparencia */
              "
            />
          </div>

          {/* Texto Informativo */}
          <div className="text-gray-200 text-justify leading-relaxed text-lg">

            <p className="mb-4 font-bold text-pink-400 text-xl tracking-wide">
              ¡Hola, mamás, papás y cuidadores! 👋
            </p>

            <p className="mb-4">
              Para niños de 8 años, se recomienda no exceder
              {/* Resaltado en amarillo neón */}
              <span className="font-bold text-yellow-300 mx-1 drop-shadow-[0_0_5px_rgba(253,224,71,0.5)]"> 
                2 horas diarias 
              </span>
              de uso recreativo de pantallas (televisión, videojuegos, tablet, celular).
              <span className="text-slate-400 text-sm ml-2 block sm:inline"> (OMS, AAP 2016).</span>
            </p>

            <p className="mb-2 font-bold text-cyan-400 text-lg uppercase tracking-wider">
              Recomendación
            </p>

            <p className="text-slate-300">
              Este resultado es orientativo y no reemplaza la evaluación de un profesional.
              Si notas dificultades en la lectura o escritura, lo ideal es consultar con un especialista
              para recibir orientación adecuada.
            </p>

          </div>
        </div>

        {/* Botones de Navegación */}
        <div className="flex justify-between mt-12 pt-6 border-t border-white/10">

          {/* Botón Volver (Estilo "Secundario/Frío") */}
          <a
            href="/"
            className="
              px-8 py-3
              rounded-full
              font-bold
              text-cyan-100
              border border-cyan-500/30
              bg-cyan-900/20
              hover:bg-cyan-500/20
              hover:border-cyan-400
              hover:scale-105
              transition-all duration-300
              backdrop-blur-sm
            "
          >
            ← Volver
          </a>

          {/* Botón Siguiente (Estilo "Propulsor/Acción") */}
          <a
            href="/registro"
            className="
              px-8 py-3
              rounded-full
              font-bold
              text-white
              bg-gradient-to-r from-orange-500 to-pink-600
              shadow-[0_0_20px_rgba(236,72,153,0.4)]
              border-b-[4px] border-pink-800/50
              hover:scale-105
              hover:shadow-[0_0_30px_rgba(236,72,153,0.6)]
              active:border-b-0 active:translate-y-1
              transition-all duration-200
            "
          >
            Siguiente →
          </a>

        </div>
      </div>
    </main>
  );
}