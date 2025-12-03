// utils/score.ts

// 1. Mapa de qué juegos pertenecen a cada área
const JUEGOS_POR_AREA: Record<string, string[]> = {
  fonologica: [
    "rimas_finales", 
    "silaba_inicial", "silaba_final", "silaba_medial",
    "fonema_inicial", "fonema_final", "fonema_medial",
    "sintesis"
  ],
  letras: ["letra_nombre"],
  memoria: ["memoria"],
  lenguaje: ["semantica", "comprension"],
  lexica: ["contar_palabras"]
};

// 2. Guardar puntaje individual (ya lo tenías)
export const guardarPuntaje = (idJuego: string, aciertos: number, total: number) => {
  if (typeof window !== "undefined") {
    const recordActual = localStorage.getItem("fonekids_scores");
    const scores = recordActual ? JSON.parse(recordActual) : {};
    
    scores[idJuego] = { aciertos, total };
    
    localStorage.setItem("fonekids_scores", JSON.stringify(scores));
  }
};

// 3. Leer puntaje individual (ya lo tenías)
export const obtenerPuntaje = (idJuego: string) => {
  if (typeof window !== "undefined") {
    const recordActual = localStorage.getItem("fonekids_scores");
    if (!recordActual) return null;
    
    const scores = JSON.parse(recordActual);
    return scores[idJuego] || null; 
  }
  return null;
};

// 4. NUEVO: Calcular Progreso General de un Área (0 a 100)
export const obtenerProgresoArea = (areaId: string): number => {
  if (typeof window !== "undefined") {
    const juegosDelArea = JUEGOS_POR_AREA[areaId];
    if (!juegosDelArea) return 0;

    const recordActual = localStorage.getItem("fonekids_scores");
    if (!recordActual) return 0;
    
    const scores = JSON.parse(recordActual);
    
    let totalJugados = 0;
    let sumaPorcentajes = 0;

    juegosDelArea.forEach((juegoId) => {
      if (scores[juegoId]) {
        const { aciertos, total } = scores[juegoId];
        // Calculamos porcentaje de este juego (ej: 2/3 = 66%)
        if (total > 0) {
            sumaPorcentajes += (aciertos / total) * 100;
            totalJugados++;
        }
      }
    });

    if (totalJugados === 0) return 0;

    // Promedio simple: Suma de % / Cantidad de juegos en el área (o solo los jugados)
    // Para ser estricto: Dividimos por el TOTAL de juegos que EXISTEN en el área
    // Así si solo jugó 1 de 8, tendrá un porcentaje bajo global.
    return Math.round(sumaPorcentajes / juegosDelArea.length);
  }
  return 0;
};