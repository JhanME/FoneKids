"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

// --- IMPORTAMOS TODOS LOS MOTORES ---
import MotorJuego from "@/components/MotorJuego";
import MotorSintesis from "@/components/MotorSintesis";
import MotorAudio from "@/components/MotorAudio";
import MotorOraciones from "@/components/MotorOraciones";
import MotorSemantica from "@/components/MotorSemantica";
import MotorCuentos from "@/components/MotorCuentos";
import MotorFrases from "@/components/MotorFrases";

// --- IMPORTAMOS TODA LA DATA ---
import { 
  DATA_RIMAS, 
  DATA_SILABAS_INICIALES, 
  DATA_SILABAS_FINALES, 
  DATA_SILABAS_MEDIALES,
  DATA_FONEMAS_INICIALES, 
  DATA_FONEMAS_FINALES, 
  DATA_FONEMAS_MEDIALES, 
  DATA_SINTESIS,
  DATA_LETRAS_NOMBRES_3,
  DATA_LETRAS_SONIDOS_3,
  DATA_LETRAS_NOMBRES_4,
  DATA_LETRAS_SONIDOS_4,
  DATA_ORACIONES,
  DATA_SEMANTICA,
  DATA_CUENTOS,
  DATA_LEXICA
} from "@/data/juegos";

export default function JugarPage() {
  const params = useParams();
  const idJuego = params.id as string;

  // 🎀 EDAD (necesaria para letras)
  const [edad, setEdad] = useState<number>(4);

  useEffect(() => {
    const edadLS = localStorage.getItem("edad");
    if (edadLS) setEdad(Number(edadLS));
  }, []);

  // ╔══════════════════════════════════════╗
  // 1. 🌟 MOTOR SÍNTESIS (S-O-L → SOL)
  // ╚══════════════════════════════════════╝
  if (idJuego === "sintesis") {
    return (
      <MotorSintesis 
        titulo="Unir Sonidos"
        instruccion="Escucha los sonidos y elige la palabra correcta."
        datos={DATA_SINTESIS}
        colorFondo="bg-pink-300"
        idJuego={idJuego}
      />
    );
  }

  // ╔══════════════════════════════════════╗
  // 2. 🔊 LETRAS — NOMBRE / SONIDO
  // ╚══════════════════════════════════════╝
  if (idJuego === "letra_nombre" || idJuego === "letra_sonido") {
    const esNombre = idJuego === "letra_nombre";

    const data =
      edad <= 3
        ? esNombre ? DATA_LETRAS_NOMBRES_3 : DATA_LETRAS_SONIDOS_3
        : esNombre ? DATA_LETRAS_NOMBRES_4 : DATA_LETRAS_SONIDOS_4;

    const titulo = esNombre ? "Nombre de la Letra" : "Sonido de la Letra";
    const instruccion = esNombre
      ? "Observa la letra y di cómo se llama."
      : "Observa la letra y di cómo suena.";

    return (
      <MotorAudio
        titulo={titulo}
        instruccion={instruccion}
        datos={data}
        colorFondo="bg-indigo-300"
        idJuego={idJuego}
      />
    );
  }

  // ╔══════════════════════════════════════╗
  // 3. 🧠 MEMORIA (ORACIONES)
  // ╚══════════════════════════════════════╝
  if (idJuego === "memoria") {
    return (
      <MotorOraciones
        datos={DATA_ORACIONES}
        colorFondo="bg-orange-300"
        idJuego={idJuego}
      />
    );
  }

  // ╔══════════════════════════════════════╗
  // 4. 🌱 SEMÁNTICA (SIGNIFICADOS)
  // ╚══════════════════════════════════════╝
  if (idJuego === "semantica") {
    return (
      <MotorSemantica
        datos={DATA_SEMANTICA}
        colorFondo="bg-green-300"
        idJuego={idJuego}
      />
    );
  }

  // ╔══════════════════════════════════════╗
  // 5. 📖 CUENTOS (COMPRENSIÓN LECTORA)
  // ╚══════════════════════════════════════╝
  if (idJuego === "comprension") {
    return (
      <MotorCuentos
        datos={DATA_CUENTOS[0]}
        colorFondo="bg-emerald-300"
        idJuego={idJuego}
      />
    );
  }

  // ╔══════════════════════════════════════╗
  // 6. ✨ LÉXICA (COMPLETAR FRASES)
  // ╚══════════════════════════════════════╝
  if (idJuego === "contar_palabras") {
    return (
      <MotorFrases
        datos={DATA_LEXICA}
        colorFondo="bg-teal-300"
        idJuego={idJuego}
      />
    );
  }

  // ╔══════════════════════════════════════╗
  // 7. ✔/✖ CHECK X (RIMAS, SÍLABAS, FONEMAS)
  // ╚══════════════════════════════════════╝

  const juegosCheckX = [
    "rimas_finales",
    "silaba_inicial", "silaba_final", "silaba_medial",
    "fonema_inicial", "fonema_final", "fonema_medial"
  ];

  if (juegosCheckX.includes(idJuego)) {
    let config = {
      datos: [] as any[],
      titulo: "",
      instruccion: "",
      color: "bg-gray-200",
      modoSilabeo: false
    };

    switch (idJuego) {
      case "rimas_finales":
        config = {
          datos: DATA_RIMAS,
          titulo: "Rimas",
          instruccion: "¿Riman?",
          color: "bg-purple-300",
          modoSilabeo: true
        };
        break;

      case "silaba_inicial":
        config = {
          datos: DATA_SILABAS_INICIALES,
          titulo: "Sílabas",
          instruccion: "¿Empiezan igual?",
          color: "bg-blue-300",
          modoSilabeo: true
        };
        break;

      case "silaba_final":
        config = {
          datos: DATA_SILABAS_FINALES,
          titulo: "Sílabas",
          instruccion: "¿Terminan igual?",
          color: "bg-indigo-300",
          modoSilabeo: true
        };
        break;

      case "silaba_medial":
        config = {
          datos: DATA_SILABAS_MEDIALES,
          titulo: "Sílabas",
          instruccion: "¿Suena igual al medio?",
          color: "bg-teal-300",
          modoSilabeo: true
        };
        break;

      case "fonema_inicial":
        config = {
          datos: DATA_FONEMAS_INICIALES,
          titulo: "Sonido Inicial",
          instruccion: "¿Empiezan igual?",
          color: "bg-orange-300",
          modoSilabeo: false
        };
        break;

      case "fonema_final":
        config = {
          datos: DATA_FONEMAS_FINALES,
          titulo: "Sonido Final",
          instruccion: "¿Terminan igual?",
          color: "bg-red-300",
          modoSilabeo: false
        };
        break;

      case "fonema_medial":
        config = {
          datos: DATA_FONEMAS_MEDIALES,
          titulo: "Sonido Medio",
          instruccion: "¿Suena igual al medio?",
          color: "bg-rose-300",
          modoSilabeo: false
        };
        break;
    }

    return (
      <MotorJuego
        titulo={config.titulo}
        instruccion={config.instruccion}
        datos={config.datos}
        colorFondo={config.color}
        modoSilabeo={config.modoSilabeo}
        idJuego={idJuego}
      />
    );
  }

  // ╔══════════════════════════════════════╗
  // ❌ Si no existe el juego
  // ╚══════════════════════════════════════╝
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-100 p-6 text-center">
      <h1 className="text-3xl font-extrabold text-gray-400 mb-2">Juego no encontrado</h1>
      <p className="text-gray-500">ID: {idJuego}</p>
      <p className="text-sm text-gray-400 mt-4">Revisa el mapa para corregir el enlace.</p>
    </div>
  );
}
