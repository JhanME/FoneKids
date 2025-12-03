import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-yellow-50 flex items-center justify-center px-4">

      {/* Caja centrada estilo Fonekids */}
      <div className="
        bg-white 
        text-gray-800 
        rounded-3xl 
        border border-yellow-300 
        shadow-2xl 
        p-10 
        max-w-sm w-full 
        text-center
      ">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image
            src="/fonekids1.png"
            alt="FoneKids Logo"
            width={350}
            height={350}
            className="drop-shadow-md"
            priority
          />
        </div>

        {/* Texto bienvenida */}
        <p className="text-lg font-semibold text-orange-600 mb-6">
          ¡Bienvenido a Fonekids!  
        </p>

        {/* Botón estilo FANEKIDS */}
        <a
          href="/psicoeducacion"
          className="
            inline-block 
            bg-orange-400 
            text-white 
            font-extrabold 
            px-12 
            py-4 
            rounded-full 
            shadow-xl 
            border-b-4 
            border-orange-600 
            hover:scale-105 
            active:border-b-0 
            active:translate-y-1 
            transition 
          "
        >
          Ingresar
        </a>

      </div>
    </main>
  );
}
