import Image from "next/image";

export default function Psicoeducacion() {
  return (
    <main className="min-h-screen bg-yellow-50 flex items-center justify-center px-4 py-10">
      <div className="bg-white border border-yellow-300 rounded-3xl shadow-xl p-8 max-w-3xl w-full">

        <h1 className="text-3xl font-extrabold text-orange-600 text-center mb-6">
          Psicoeducación para Padres
        </h1>

        <div className="flex flex-col md:flex-row items-center gap-6">

          {/* Imagen */}
          <Image
            src="/nina_indicaciones1.png"
            alt="Indicaciones para padres"
            width={220}
            height={220}
            className="rounded-2xl shadow-lg bg-yellow-50 p-2"
          />

          {/* Texto */}
          <div className="text-gray-800 text-justify leading-relaxed">

            <p className="mb-3 font-bold text-orange-600 text-lg">
              ¡Hola, mamás, papás y cuidadores!
            </p>

            <p className="mb-3">
              Para niños de 8 años, se recomienda no exceder
              <span className="font-semibold text-yellow-700"> 2 horas diarias </span>
              de uso recreativo de pantallas (televisión, videojuegos, tablet, celular).
              <span className="font-semibold"> (OMS, AAP 2016)</span>.
            </p>

            <p className="mb-2 font-semibold text-orange-600 text-lg">
              Recomendación
            </p>

            <p>
              Este resultado es orientativo y no reemplaza la evaluación de un profesional.
              Si notas dificultades en la lectura o escritura, lo ideal es consultar con un especialista
              para recibir orientación adecuada.
            </p>

          </div>
        </div>

        {/* Botones */}
        <div className="flex justify-between mt-10">

          <a
            href="/"
            className="px-6 py-3 bg-orange-500 text-white rounded-2xl font-bold shadow-lg hover:bg-orange-600 hover:scale-105 transition active:scale-95"
          >
            Volver
          </a>

          <a
            href="/registro"
            className="px-6 py-3 bg-orange-500 text-white rounded-2xl font-bold shadow-lg hover:bg-orange-600 hover:scale-105 transition active:scale-95"
          >
            Siguiente →
          </a>

        </div>
      </div>
    </main>
  );
}
