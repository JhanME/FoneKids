import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// 1. Definimos las rutas que SOLO pueden ver los usuarios registrados
//    El (.*) significa "y todo lo que esté dentro". 
//    Ejemplo: '/juegos(.*)' protege /juegos, /juegos/mapa, /juegos/nivel1, etc.
const isProtectedRoute = createRouteMatcher([
  '/juegos(.*)',
  '/',
  '/menu(.*)',
  '/psicoeducacion(.*)',
  '/avatar(.*)',
  '/progreso(.*)' // Agregado por si creas esta ruta en el futuro
]);

export default clerkMiddleware(async (auth, req) => {
  // 2. Si la ruta es protegida, obligamos a iniciar sesión
  if (isProtectedRoute(req)) await auth.protect();
});

export const config = {
  matcher: [
    // Esta expresión regular asegura que el middleware se ejecute en toda la app
    // excepto en archivos estáticos (imágenes, fuentes, etc) y archivos internos de Next.js
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Siempre ejecutar para rutas de API
    '/(api|trpc)(.*)',
  ],
};