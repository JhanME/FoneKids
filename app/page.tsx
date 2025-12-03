import Image from "next/image";

export default function Home() {
  return (
    // FONDO: Tema "Noche Espacial".
    // Usamos un gradiente radial para simular un resplandor lejano en el espacio.
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1e1b4b] via-[#0f172a] to-black flex items-center justify-center px-4 overflow-hidden relative">
      
      {/* DECORACIÓN DE FONDO (Estrellas/Nebulosas lejanas) */}
      {/* Estas son 'manchas' de luz para que el negro no se vea plano */}
      <div className="absolute top-10 left-1/4 w-72 h-72 bg-purple-600 rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-pulse"></div>
      <div className="absolute bottom-10 right-1/4 w-72 h-72 bg-blue-600 rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-pulse delay-1000"></div>

      {/* CAJA CENTRAL: Estilo "Cabina de Nave" o "Cristal Flotante" */}
      <div className="
        relative z-10
        bg-slate-900/40 /* Fondo oscuro semi-transparente */
        backdrop-blur-md /* Efecto de vidrio esmerilado */
        text-white
        rounded-[3rem]
        border-2
        border-white/10 /* Borde sutil y translúcido */
        /* Resplandor exterior (Glow) en lugar de sombra oscura */
        shadow-[0_0_40px_-5px_rgba(124,58,237,0.3)]
        p-10
        max-w-sm w-full
        text-center
      ">

        {/* Círculo de brillo detrás del logo para resaltarlo en la oscuridad */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-40 h-40 bg-white/20 rounded-full blur-2xl -z-10"></div>

        {/* Logo */}
        <div className="flex justify-center mb-8 hover:scale-105 transition-transform duration-300 ease-in-out">
          <Image
            src="/fonekids1.png"
            alt="FoneKids Logo"
            width={350}
            height={350}
            // Sombra blanca suave para que destaque del fondo oscuro
            className="drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
            priority
          />
        </div>

        {/* Texto de bienvenida "Neón" */}
        <p className="
          text-2xl
          font-extrabold
          /* Texto blanco brillante */
          text-white
          mb-8
          /* Sombra de texto para efecto neón */
          drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]
          tracking-wide
        ">
          ¡Bienvenido a <span className="text-yellow-400">Fonekids</span>!
        </p>

        {/* Botón estilo "Propulsor" o "Láser" */}
        <a
          href="/psicoeducacion"
          className="
            inline-block
            /* Degradado vibrante que contrasta con el fondo oscuro */
            bg-gradient-to-r from-orange-500 to-pink-600
            text-white
            font-black
            text-xl
            px-12
            py-4
            rounded-full
            /* Sombra brillante (Glow) del color del botón */
            shadow-[0_0_20px_rgba(249,115,22,0.6)]
            /* Borde inferior para 3D */
            border-b-[4px]
            border-orange-800/50
            /* Efectos Hover */
            hover:scale-110
            hover:shadow-[0_0_30px_rgba(249,115,22,0.8)]
            hover:brightness-110
            active:border-b-0
            active:translate-y-[4px]
            transition-all
            duration-200
          "
        >
          🚀 Ingresar
        </a>

      </div>
    </main>
  );
}