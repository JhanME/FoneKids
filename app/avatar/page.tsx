"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

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
      alert("Por favor ingresa un Nickname y selecciona un avatar.");
      return;
    }

    localStorage.setItem("nickname", nickname);
    localStorage.setItem("avatar", avatarSeleccionado);

    router.push("/menu_test");
  };

  if (loading)
    return (
      <div className="min-h-screen bg-white flex items-center justify-center text-yellow-600 font-semibold">
        Cargando...
      </div>
    );

  return (
    <div className="min-h-screen bg-yellow-50 flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md border border-yellow-300">
        <h1 className="text-3xl font-bold text-yellow-700 text-center mb-2 drop-shadow-sm">
          ¡Elige tu personaje!
        </h1>

        <p className="text-gray-600 text-center mb-6">
          Escoge un avatar y un nombre divertido para comenzar.
        </p>

        <label className="block text-yellow-700 font-semibold mb-1">
          Tu Nickname (Apodo):
        </label>
        <input
          type="text"
          placeholder="Ej: Súper Aventurero"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="w-full p-3 mb-6 border border-yellow-400 rounded-xl bg-white text-black focus:outline-none focus:border-yellow-600 shadow-sm"
        />

        <label className="block text-yellow-700 font-semibold mb-3">
          Selecciona tu avatar:
        </label>

        <div className="flex justify-center gap-6 mb-8">
          {avataresDisponibles.map((imgSrc, index) => (
            <div
              key={index}
              onClick={() => setAvatarSeleccionado(imgSrc)}
              className={`cursor-pointer rounded-full p-2 border-4 transition-all duration-200 bg-white shadow-sm hover:scale-105 ${
                avatarSeleccionado === imgSrc
                  ? "border-yellow-500 scale-110 shadow-md"
                  : "border-transparent hover:border-yellow-300"
              }`}
            >
              <img
                src={imgSrc}
                alt={`Avatar ${index}`}
                className="w-24 h-24 object-cover rounded-full"
              />
            </div>
          ))}
        </div>

        <button
          onClick={handleFinalizar}
          className={`w-full py-3 rounded-xl text-white font-bold text-lg shadow-md transition-all ${
            nickname && avatarSeleccionado
              ? "bg-yellow-500 hover:bg-yellow-600 hover:scale-[1.02]"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          disabled={!nickname || !avatarSeleccionado}
        >
          ¡Listo! Empezar
        </button>
      </div>
    </div>
  );
}
