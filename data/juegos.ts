// data/juegos.ts

export interface NivelData {
  id: number;
  nombre: string;
  imgPregunta: string;
  imgRespuesta: string;
}

// 1. RIMAS
export const DATA_RIMAS: NivelData[] = [
  { id: 1, nombre: "Fresa", imgPregunta: "/assets/rimas/1_fresa.png", imgRespuesta: "/assets/rimas/1_mesa.png" },
  { id: 2, nombre: "Gato", imgPregunta: "/assets/rimas/2_gato.png", imgRespuesta: "/assets/rimas/2_mano.png" },
  { id: 3, nombre: "Copa", imgPregunta: "/assets/rimas/3_copa.png", imgRespuesta: "/assets/rimas/3_sopa.png" },
  { id: 4, nombre: "Cama", imgPregunta: "/assets/rimas/4_cama.png", imgRespuesta: "/assets/rimas/4_rana.png" },
  { id: 5, nombre: "Niña", imgPregunta: "/assets/rimas/5_nina.png", imgRespuesta: "/assets/rimas/5_pina.png" },
  { id: 6, nombre: "Botón", imgPregunta: "/assets/rimas/6_boton.png", imgRespuesta: "/assets/rimas/6_raton.png" },
];

// 2. SÍLABAS INICIALES
export const DATA_SILABAS_INICIALES: NivelData[] = [
  { id: 1, nombre: "Ropa", imgPregunta: "/assets/silabas/silabas_iniciales/1_ropa.png", imgRespuesta: "/assets/silabas/silabas_iniciales/1_rosa.png" },
  { id: 2, nombre: "Capa", imgPregunta: "/assets/silabas/silabas_iniciales/2_capa.png", imgRespuesta: "/assets/silabas/silabas_iniciales/2_rama.png" },
  { id: 3, nombre: "Tela", imgPregunta: "/assets/silabas/silabas_iniciales/3_tela.png", imgRespuesta: "/assets/silabas/silabas_iniciales/3_vela.png" },
  { id: 4, nombre: "Muleta", imgPregunta: "/assets/silabas/silabas_iniciales/4_muleta.png", imgRespuesta: "/assets/silabas/silabas_iniciales/4_muñeca.png" },
  { id: 5, nombre: "Lana", imgPregunta: "/assets/silabas/silabas_iniciales/5_lana.png", imgRespuesta: "/assets/silabas/silabas_iniciales/5_lata.png" },
  { id: 6, nombre: "Pala", imgPregunta: "/assets/silabas/silabas_iniciales/6_pala.png", imgRespuesta: "/assets/silabas/silabas_iniciales/6_pata.png" },
];

// 3. SÍLABAS FINALES
export const DATA_SILABAS_FINALES: NivelData[] = [
  { id: 1, nombre: "Bol sa", imgPregunta: "/assets/silabas/silabas_finales/1_bolsa.png", imgRespuesta: "/assets/silabas/silabas_finales/1_casa.png" },
  { id: 2, nombre: "ka ro", imgPregunta: "/assets/silabas/silabas_finales/2_carro.png", imgRespuesta: "/assets/silabas/silabas_finales/2_jarra.png" },
  { id: 3, nombre: "Ga too", imgPregunta: "/assets/silabas/silabas_finales/3_gato.png", imgRespuesta: "/assets/silabas/silabas_finales/3_trapo.png" },
  { id: 4, nombre: "Plato", imgPregunta: "/assets/silabas/silabas_finales/4_plato.png", imgRespuesta: "/assets/silabas/silabas_finales/4_zapato.png" },
  { id: 5, nombre: "Torre", imgPregunta: "/assets/silabas/silabas_finales/5_torre.png", imgRespuesta: "/assets/silabas/silabas_finales/5_trono.png" },
  { id: 6, nombre: "Botella", imgPregunta: "/assets/silabas/silabas_finales/6_botella.png", imgRespuesta: "/assets/silabas/silabas_finales/6_silla.png" },
];

// 4. SÍLABAS MEDIALES
export const DATA_SILABAS_MEDIALES: NivelData[] = [
    { id: 1, nombre: "Cuchillo", imgPregunta: "/assets/silabas/silabas_mediales/1_cuchillo.png", imgRespuesta: "/assets/silabas/silabas_mediales/1_mochila.png" },
    { id: 2, nombre: "Paleta", imgPregunta: "/assets/silabas/silabas_mediales/2 _paleta.png", imgRespuesta: "/assets/silabas/silabas_mediales/2_ventana.png" },
    { id: 3, nombre: "cor tina", imgPregunta: "/assets/silabas/silabas_mediales/3_cortina.png", imgRespuesta: "/assets/silabas/silabas_mediales/3_harina.png" },
    { id: 4, nombre: "Camello", imgPregunta: "/assets/silabas/silabas_mediales/4_camello.png", imgRespuesta: "/assets/silabas/silabas_mediales/4_cometa.png" },
    { id: 5, nombre: "Boleto", imgPregunta: "/assets/silabas/silabas_mediales/5_boleto.png", imgRespuesta: "/assets/silabas/silabas_mediales/5_maleta.png" },
];

// ... (Mantén lo anterior de Rimas y Sílabas) ...

// NUEVA INTERFAZ PARA FONEMAS Y LETRAS
export interface NivelSeleccion {
  id: number;
  tipo: "fonemas" | "sintesis" | "letra"; // Para saber qué dibujar
  titulo: string;
  instruccion: string;
  // Contenido visual/auditivo
  img1?: string; 
  nombreImg1?: string; // Para que el robot lo lea
  img2?: string;
  nombreImg2?: string;
  sonidoSintesis?: string; // Ej: "S... O... L..."
  letraMostrada?: string; // Ej: "A"
  // Opciones de respuesta
  opciones: string[]; // Ej: ["m", "l", "t"] o ["sol", "sal"]
  respuestaCorrecta: string; // Ej: "m"
}

// ... (Mantén lo anterior de Rimas y Sílabas) ...

// ==========================================
// 5. FONEMAS INICIALES (Parejas Correctas)
// ==========================================
export const DATA_FONEMAS_INICIALES: NivelData[] = [
  { 
    id: 1, nombre: "Taza", 
    imgPregunta: "/assets/fonemas/fonemas_iniciales/1_taza.png", 
    imgRespuesta: "/assets/fonemas/fonemas_iniciales/1_tigre.png" // /t/ = /t/
  },
  { 
    id: 2, nombre: "Luna", 
    imgPregunta: "/assets/fonemas/fonemas_iniciales/3_luna.png", 
    imgRespuesta: "/assets/fonemas/fonemas_iniciales/3_lapiz.png" // /l/ = /l/
  },
  { 
    id: 3, nombre: "Barco", 
    imgPregunta: "/assets/fonemas/fonemas_iniciales/6_barco.png", 
    imgRespuesta: "/assets/fonemas/fonemas_iniciales/6_burro.png" // /b/ = /b/
  },
  { 
    id: 4, nombre: "Foca", 
    imgPregunta: "/assets/fonemas/fonemas_iniciales/5_foca.png", 
    imgRespuesta: "/assets/fonemas/fonemas_iniciales/4_faro.png" // /f/ = /f/ (Usé Faro de la carpeta 4)
  },
  { 
    id: 5, nombre: "Bota", 
    imgPregunta: "/assets/fonemas/fonemas_iniciales/5_bota.png", 
    imgRespuesta: "/assets/fonemas/fonemas_iniciales/6_barco.png" // /b/ = /b/ (Reutilicé Barco para hacer par con Bota)
  }
  // Nota: Media y Nariz no tienen pareja clara en tu lista, las omití para evitar errores.
];

// ==========================================
// 6. FONEMAS FINALES (Parejas Correctas)
// ==========================================
export const DATA_FONEMAS_FINALES: NivelData[] = [
  { 
    id: 1, nombre: "Pez", 
    imgPregunta: "/assets/fonemas/fonemas_finales/1_pez.png", 
    imgRespuesta: "/assets/fonemas/fonemas_finales/1_luz.png" // /z/ = /z/
  },
  { 
    id: 2, nombre: "Pan", 
    imgPregunta: "/assets/fonemas/fonemas_finales/3_pan.png", 
    imgRespuesta: "/assets/fonemas/fonemas_finales/3_tren.png" // /n/ = /n/
  },
  { 
    id: 3, nombre: "Botón", 
    imgPregunta: "/assets/fonemas/fonemas_finales/6_boton.png", 
    imgRespuesta: "/assets/fonemas/fonemas_finales/6_raton.png" // /n/ = /n/
  },
  { 
    id: 4, nombre: "Flor", 
    imgPregunta: "/assets/fonemas/fonemas_finales/5_flor.png", 
    imgRespuesta: "/assets/fonemas/fonemas_finales/5_mar.png" // /r/ = /r/
  },
  { 
    id: 5, nombre: "Sol", 
    imgPregunta: "/assets/fonemas/fonemas_finales/2_sol.png", 
    imgRespuesta: "/assets/fonemas/fonemas_finales/4_arbol.png" // /l/ = /l/ (Uní Sol con Árbol)
  }
];

// ==========================================
// 7. FONEMAS MEDIALES (Parejas Correctas)
// ==========================================
export const DATA_FONEMAS_MEDIALES: NivelData[] = [
  { 
    id: 1, nombre: "Panda", 
    imgPregunta: "/assets/fonemas/fonemas_mediales/1_panda.png", 
    imgRespuesta: "/assets/fonemas/fonemas_mediales/1_poncho.png" // /n/ = /n/
  },
  { 
    id: 2, nombre: "Carta", 
    imgPregunta: "/assets/fonemas/fonemas_mediales/4_carta.png", 
    imgRespuesta: "/assets/fonemas/fonemas_mediales/4_torta.png" // /r/ = /r/
  },
  { 
    id: 3, nombre: "Calvo", 
    imgPregunta: "/assets/fonemas/fonemas_mediales/5_calvo.png", 
    imgRespuesta: "/assets/fonemas/fonemas_mediales/5_pulpo.png" // /l/ = /l/
  },
  { 
    id: 4, nombre: "Palta", 
    imgPregunta: "/assets/fonemas/fonemas_mediales/2_palta.png", 
    imgRespuesta: "/assets/fonemas/fonemas_mediales/6_dulce.png" // /l/ = /l/ (Uní Palta con Dulce)
  },
  { 
    id: 5, nombre: "Monte", 
    imgPregunta: "/assets/fonemas/fonemas_mediales/3_monte.png", 
    imgRespuesta: "/assets/fonemas/fonemas_mediales/6_gancho.png" // /n/ = /n/ (Uní Monte con Gancho)
  }
  // Agrega esto en data/juegos.ts
];

  export interface NivelSintesis {
    id: number;
    sonidos: string; // Lo que dice el robot: "S... O... L"
    opciones: string[]; // ["Sol", "Sal"]
    correcta: string;   // "Sol"
  }

export const DATA_SINTESIS: NivelSintesis[] = [
  { 
    id: 1, 
    sonidos: "S... O... L", 
    opciones: ["Sol", "Sal"], 
    correcta: "Sol" 
  },
  { 
    id: 2, 
    sonidos: "M... E... S", 
    opciones: ["Mes", "Pez"], 
    correcta: "Mes" 
  },
  { 
    id: 3, 
    sonidos: "C... A... S... A", 
    opciones: ["Casa", "Taza"], 
    correcta: "Casa" 
  },
  { 
    id: 4, 
    sonidos: "P... A... T... A", 
    opciones: ["Pata", "Lata"], 
    correcta: "Pata" 
  },
  { 
    id: 5, 
    sonidos: "R... A... T... A", 
    opciones: ["Rata", "Rana"], 
    correcta: "Rata" 
  },
  { 
    id: 6, 
    sonidos: "L... U... N... A", 
    opciones: ["Luna", "Lana"], 
    correcta: "Luna" 
  },
  { 
    id: 7, 
    sonidos: "F... L... O... R", 
    opciones: ["Flor", "Faro"], 
    correcta: "Flor" 
  },
  { 
    id: 8, 
    sonidos: "J... A... R... R... A", 
    opciones: ["Jara", "Torre"], 
    correcta: "Jara" 
  },
];

// ==========================================
// 9. LETRAS Y SONIDOS
// ==========================================

export interface NivelLetra {
  id: number;
  letra: string;      // "A"
  img: string;        // "/assets/letras/a.png"
  audioCorrecto: string; // Lo que debe buscar el niño
  opciones: string[]; // Los sonidos que tendrán los 3 botones
}

// --- NIVEL 1: VOCALES (3 Años) ---
// CONOCIMIENTO DEL NOMBRE
export const DATA_LETRAS_NOMBRES_3: NivelLetra[] = [
  { id: 1, letra: "A", img: "/assets/letras/a.png", audioCorrecto: "A", opciones: ["E", "U", "A"] },
  { id: 2, letra: "E", img: "/assets/letras/e.png", audioCorrecto: "E", opciones: ["T", "E", "I"] }, // 'T' como distractor sonoro
  { id: 3, letra: "I", img: "/assets/letras/i.png", audioCorrecto: "I", opciones: ["U", "I", "T"] },
  { id: 4, letra: "O", img: "/assets/letras/o.png", audioCorrecto: "O", opciones: ["U", "T", "O"] }, // 'Y' suena como 'i' a veces, mejor usar O
];

// CONOCIMIENTO DEL SONIDO (FONEMA)
// Truco: Repetimos vocales porque suenan igual que su nombre, pero la instrucción cambia
export const DATA_LETRAS_SONIDOS_3: NivelLetra[] = [
  { id: 1, letra: "A", img: "/assets/letras/a.png", audioCorrecto: "Aaa", opciones: ["Eee", "Uuu", "Aaa"] },
  { id: 2, letra: "E", img: "/assets/letras/e.png", audioCorrecto: "Eee", opciones: ["Ttt", "Eee", "Iii"] },
];

// --- NIVEL 2: CONSONANTES (4 Años +) ---
// CONOCIMIENTO DEL NOMBRE (El nombre de la letra: "Ene", "Efe")
export const DATA_LETRAS_NOMBRES_4: NivelLetra[] = [
  { id: 1, letra: "N", img: "/assets/letras/n.png", audioCorrecto: "Ene", opciones: ["Te", "Ye", "Ene"] },
  { id: 2, letra: "F", img: "/assets/letras/f.png", audioCorrecto: "Efe", opciones: ["Erre", "Te", "Efe"] },
  { id: 3, letra: "B", img: "/assets/letras/b.png", audioCorrecto: "Be", opciones: ["Te", "Be", "Erre"] },
  { id: 4, letra: "R", img: "/assets/letras/r.png", audioCorrecto: "Erre", opciones: ["Te", "Erre", "Ka"] },
];

// CONOCIMIENTO DEL SONIDO (El sonido gutural: "/nnn/", "/fff/")
export const DATA_LETRAS_SONIDOS_4: NivelLetra[] = [
  { 
    id: 1, letra: "N", img: "/assets/letras/n.png", 
    audioCorrecto: "en", // Truco: Muchas N para que haga "nnnn"
    opciones: ["Teh", "Yeh", "en"] 
  },
  { 
    id: 2, letra: "F", img: "/assets/letras/f.png", 
    audioCorrecto: "ef", // Truco: Muchas F para el soplido
    opciones: ["r", "es", "f"]
  },
  { 
    id: 3, letra: "B", img: "/assets/letras/b.png", 
    // NOTA: La B es "explosiva" (plosiva), no se puede alargar como la F.
    // El mejor truco es ponerle una 'u' muda muy corta o repetirla.
    audioCorrecto: "Beh", 
    opciones: ["Teh", "Beh", "e"] 
  },
  { 
    id: 4, letra: "R", img: "/assets/letras/r.png", 
    audioCorrecto: "er", // Vibrante
    opciones: ["es", "er", "kah"] 
  },
];

// ==========================================
// 10. MEMORIA VERBAL (ORACIONES)
// ==========================================

export interface NivelOracion {
  id: number;
  oracion: string; // "Ana dibuja flores"
  nivel: "Facil" | "Medio";
}

export const DATA_ORACIONES: NivelOracion[] = [
  // --- FÁCIL (3 palabras) ---
  { id: 1, oracion: "Ana dibuja flores", nivel: "Facil" },
  { id: 2, oracion: "Luis come manzana", nivel: "Facil" },
  { id: 3, oracion: "El perro ladra", nivel: "Facil" },
  { id: 4, oracion: "Mamá toma agua", nivel: "Facil" },

  // --- MEDIO (5+ palabras o más complejas) ---
  { id: 5, oracion: "Pedro arma bloques en la alfombra", nivel: "Medio" },
  { id: 6, oracion: "Diego pinta una casa en la escuela", nivel: "Medio" },
  { id: 7, oracion: "La niña juega con su muñeca nueva", nivel: "Medio" },
  { id: 8, oracion: "El gato duerme encima del sofá rojo", nivel: "Medio" },
];

// ==========================================
// 11. LENGUAJE ORAL (SEMÁNTICA)
// ==========================================

export interface NivelSemantica {
  id: number;
  palabra: string; // "Gato"
  opciones: string[]; // ["Es un animal que dice guau", ...]
  correcta: string;   // "Es un animal doméstico que maúlla"
}

export const DATA_SEMANTICA: NivelSemantica[] = [
  { 
    id: 1, 
    palabra: "Gato", 
    opciones: [
      "Es un animal que dice guau.", 
      "Es un animal doméstico que maúlla.", 
      "Es un animal que vive debajo del agua."
    ], 
    correcta: "Es un animal doméstico que maúlla." 
  },
  { 
    id: 2, 
    palabra: "Perro", 
    opciones: [
      "Es un animal que maúlla.", 
      "Es un animal que ladra.", 
      "Es un animal que vuela."
    ], 
    correcta: "Es un animal que ladra." 
  },
  { 
    id: 3, 
    palabra: "Pelota", 
    opciones: [
      "Es un objeto redondo para jugar.", 
      "Es una prenda de ropa.", 
      "Es un objeto que se come en el desayuno."
    ], 
    correcta: "Es un objeto redondo para jugar." 
  },
  { 
    id: 4, 
    palabra: "Carro", 
    opciones: [
      "Es un lugar para sentarse.", 
      "Es un animal que camina con cuatro patas.", 
      "Es un vehículo que sirve para transportar personas."
    ], 
    correcta: "Es un vehículo que sirve para transportar personas." 
  },
  { 
    id: 5, 
    palabra: "Camisa", 
    opciones: [
      "Es una prenda de vestir para la parte superior del cuerpo.", 
      "Es una prenda que no tiene cuello ni mangas.", 
      "Es un utensilio de cocina."
    ], 
    correcta: "Es una prenda de vestir para la parte superior del cuerpo." 
  },
  { 
    id: 6, 
    palabra: "Correr", 
    opciones: [
      "Es moverse muy despacio.", 
      "Es quedarse quieto mientras se piensa mucho.", 
      "Es moverse muy rápido con las piernas."
    ], 
    correcta: "Es moverse muy rápido con las piernas." 
  },
  { 
    id: 7, 
    palabra: "Saltar", 
    opciones: [
      "Es girar como un trompo.", 
      "Es levantarse del suelo empujando con los pies.", 
      "Es deslizarse por el piso."
    ], 
    correcta: "Es levantarse del suelo empujando con los pies." 
  },
];

// ==========================================
// 12. CONCIENCIA LÉXICA (CUENTOS)
// ==========================================

export interface PreguntaCuento {
  pregunta: string;
  opciones: string[];
  correcta: string;
}

export interface NivelCuento {
  id: string; // "sofia_gatito"
  titulo: string;
  historia: string;
  preguntas: PreguntaCuento[];
}

export const DATA_CUENTOS: NivelCuento[] = [
  {
    id: "sofia_gatito",
    titulo: "Sofía y el Gatito",
    historia: "Sofía es una niña curiosa y le gusta explorar su jardín. Un día encontró un pequeño gatito escondido entre las flores. Decidió acercarse despacio para no asustarlo. El gatito la miró con miedo, pero después de unos minutos comenzó a jugar con ella. Sofía quería llevarlo a su casa, pero sus padres le dijeron que no podían quedárselo. Al final, Sofía llamó a la vecina que cuidaba animales. La vecina adoptó al gatito y le ofreció un lugar seguro para vivir.",
    preguntas: [
      {
        pregunta: "¿Cómo se llama la niña del cuento?",
        opciones: ["Sofía", "Valentina", "Ana"],
        correcta: "Sofía"
      },
      {
        pregunta: "¿Qué encontró Sofía en el jardín?",
        opciones: ["Un perro", "Un gatito", "Una pelota"],
        correcta: "Un gatito"
      },
      {
        pregunta: "¿Qué hizo Sofía al final con el gatito?",
        opciones: ["Lo llevó a su casa", "Lo dejó en el jardín", "Lo llevó a la vecina"],
        correcta: "Lo llevó a la vecina"
      }
    ]
  }
];

// ==========================================
// 13. CONCIENCIA LÉXICA (COMPLETAR FRASES)
// ==========================================

export interface NivelLexica {
  id: number;
  frasePre: string;   // Texto antes del hueco ("El")
  frasePost: string;  // Texto después del hueco ("corre")
  audio: string;      // "El perro corre"
  imgCorrecta: string;// "/assets/lexica/perro.png"
  opciones: string[]; // Las 3 imágenes para elegir
}

export const DATA_LEXICA: NivelLexica[] = [
  {
    id: 1,
    frasePre: "El",
    frasePost: "corre.",
    audio: "El perro corre",
    imgCorrecta: "/assets/lexica/perro.png",
    // Distractores: Gato y Caballo (de tu lista)
    opciones: ["/assets/lexica/gato.png", "/assets/lexica/perro.png", "/assets/lexica/caballo.png"]
  },
  {
    id: 2,
    frasePre: "La",
    frasePost: "es roja.",
    audio: "La manzana es roja",
    imgCorrecta: "/assets/lexica/manzana.png",
    // Distractores: Platano y Carro (de tu lista)
    opciones: ["/assets/lexica/platano.png", "/assets/lexica/manzana.png", "/assets/lexica/carro.png"]
  },
  {
    id: 3,
    frasePre: "La",
    frasePost: "dice muu.",
    audio: "La vaca dice muu",
    imgCorrecta: "/assets/lexica/vaca.png",
    // Distractores: Oveja y Rana
    opciones: ["/assets/lexica/oveja.png", "/assets/lexica/rana.png", "/assets/lexica/vaca.png"]
  }
];
