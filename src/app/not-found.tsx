import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-forest flex flex-col items-center justify-center px-6 text-center">
      <span className="text-xs uppercase tracking-ultra text-rose-antique font-sans font-medium mb-3">
        404 · Página Não Encontrada
      </span>
      <h1 className="text-3xl sm:text-4xl font-display text-rose-antique mb-4">
        Conteúdo Indisponível
      </h1>
      <p className="text-sm sm:text-base text-rose-light/80 font-light max-w-md mb-8">
        A página que você está procurando não existe ou foi movida.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-sm bg-rose-antique text-forest-deep text-xs uppercase tracking-widest font-semibold hover:bg-rose-light transition-colors"
      >
        <ArrowLeft className="w-4 h-4" aria-hidden="true" />
        <span>Retornar ao Início</span>
      </Link>
    </div>
  );
}
