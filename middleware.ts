// middleware.ts
import {NextRequest, NextResponse} from "next/server";
import createMiddleware from "next-intl/middleware";
import {routing} from "@/i18n/routing";

// Middleware de next-intl basado en tu routing
const intl = createMiddleware(routing);

export default function middleware(req: NextRequest) {
  const {pathname, search} = req.nextUrl;

  // 1) Si hay dos prefijos de locale seguidos (/es/en/... o /en/es/...), corrige a uno solo
  //    Mantendremos el ÚLTIMO como "intención del usuario" (puedes invertir si lo prefieres)
  const dup = pathname.match(/^\/(en|es)\/(en|es)(\/.*)?$/);
  if (dup) {
    const intended = dup[2];              // el segundo prefijo
    const rest = dup[3] ?? "";            // el resto del path
    const fixed = `/${intended}${rest}${search || ""}`;
    return NextResponse.redirect(new URL(fixed, req.url));
  }

  // 2) Si hay un solo prefijo al inicio, sincroniza cookie NEXT_LOCALE para coherencia
  const one = pathname.match(/^\/(en|es)(\/.*)?$/);
  if (one) {
    const urlLocale = one[1];
    const res = intl(req);
    res.headers.append(
      "set-cookie",
      `NEXT_LOCALE=${urlLocale}; Path=/; Max-Age=31536000; SameSite=Lax`
    );
    return res;
  }

  // 3) En cualquier otro caso, delega a next-intl
  return intl(req);
}

// Con localePrefix: "always", siempre hay prefijo, por eso no incluimos "/"
export const config = {
  matcher: ["/(en|es)/:path*"]
};