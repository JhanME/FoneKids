"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Registro() {
  const router = useRouter();

  const [edad, setEdad] = useState("");
  const [grado, setGrado] = useState("");
  const [idioma, setIdioma] = useState("");
  const [correoPadre, setCorreoPadre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [sexo, setSexo] = useState("");

  const handleSiguiente = () => {
    if (!sexo || !edad || !grado) {
      alert("Por favor completa al menos Sexo, Edad y Grado para continuar.");
      return;
    }

    localStorage.setItem("sexo", sexo);
    localStorage.setItem("edad", edad);
    localStorage.setItem("grado", grado);
    localStorage.setItem("idioma", idioma);
    localStorage.setItem("correoPadre", correoPadre);

    router.push("/avatar");
  };

  return (
    <div className="min-h-screen bg-yellow-50 flex flex-col items-center justify-center px-4 py-10">

      {/* Logo arriba */}
      <div className="mb-6">
        <Image
          src="/logo-fonekids.png"  // cambia por la ruta real
          alt="Fonekids"
          width={180}
          height={180}
          className="drop-shadow-lg"
        />
      </div>

      {/* Caja del formulario */}
      <div className="bg-white text-gray-800 rounded-3xl border border-yellow-300 shadow-xl p-8 max-w-sm w-full">

        <h1 className="text-3xl font-extrabold text-orange-600 text-center mb-6">
          Registro de Usuario
        </h1>

        {/* Sexo */}
        <label className="block text-gray-800 font-medium mb-1">Sexo:</label>
        <select
          value={sexo}
          onChange={(e) => setSexo(e.target.value)}
          className="w-full p-3 mb-5 border border-yellow-300 rounded-xl bg-yellow-50 focus:outline-none focus:ring-2 focus:ring-orange-400"
        >
          <option value="">Seleccione sexo</option>
          <option value="hombre">Niño</option>
          <option value="mujer">Niña</option>
        </select>

        {/* Edad */}
        <label className="block text-gray-800 font-medium mb-1">Edad:</label>
        <select
          value={edad}
          onChange={(e) => setEdad(e.target.value)}
          className="w-full p-3 mb-5 border border-yellow-300 rounded-xl bg-yellow-50 focus:outline-none focus:ring-2 focus:ring-orange-400"
        >
          <option value="">Seleccione edad</option>
          <option value="3">3 años</option>
          <option value="4">4 años</option>
          <option value="5">5 años</option>
          <option value="6">6 años</option>
          <option value="7">7 años</option>
        </select>

        {/* Grado */}
        <label className="block text-gray-800 font-medium mb-1">
          Grado académico:
        </label>
        <select
          value={grado}
          onChange={(e) => setGrado(e.target.value)}
          className="w-full p-3 mb-5 border border-yellow-300 rounded-xl bg-yellow-50 focus:outline-none focus:ring-2 focus:ring-orange-400"
        >
          <option value="">Seleccione grado</option>
          <option value="1">Kinder/Inicial</option>
          <option value="1er grado">1er grado</option>
          <option value="2do grado">2do grado</option>
          <option value="3er grado">3er grado</option>
          <option value="4to grado">4to grado</option>
        </select>

        {/* Idioma */}
        <label className="block text-gray-800 font-medium mb-1">
          Idioma materno:
        </label>
        <input
          type="text"
          value={idioma}
          onChange={(e) => setIdioma(e.target.value)}
          className="w-full p-3 mb-5 border border-yellow-300 rounded-xl bg-yellow-50 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />

        {/* Correo padre */}
        <label className="block text-gray-800 font-medium mb-1">
          Correo del apoderado:
        </label>
        <input
          type="email"
          value={correoPadre}
          onChange={(e) => setCorreoPadre(e.target.value)}
          className="w-full p-3 mb-5 border border-yellow-300 rounded-xl bg-yellow-50 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />

        {/* Contraseña */}
        <label className="block text-gray-800 font-medium mb-1">
          Contraseña:
        </label>
        <input
          type="password"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          className="w-full p-3 mb-6 border border-yellow-300 rounded-xl bg-yellow-50 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />

        {/* Botón */}
        <button
          onClick={handleSiguiente}
          className="w-full bg-orange-500 text-white py-3 rounded-2xl text-lg font-bold shadow-lg hover:bg-orange-600 transition active:scale-95"
        >
          Siguiente →
        </button>
      </div>
    </div>
  );
}
