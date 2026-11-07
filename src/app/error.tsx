"use client";

import { useEffect } from "react";
import { RefreshCw } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-forest flex flex-col items-center justify-center px-6 text-center">
      <span className="text-xs uppercase tracking-ultra text-rose-antique font-sans font-medium mb-3">
        Ops, algo inesperado ocorreu
      </span>
      <h1 className="text-3xl sm:text-4xl font-display text-rose-antique mb-4">
        Não foi possível carregar a página
      </h1>
      <p className="text-sm sm:text-base text-rose-light/80 font-light max-w-md mb-8">
        Houve uma instabilidade temporária ao carregar este conteúdo.
      </p>
      <button
        onClick={() => reset()}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-sm bg-rose-antique text-forest-deep text-xs uppercase tracking-widest font-semibold hover:bg-rose-light transition-colors"
      >
        <RefreshCw className="w-4 h-4" aria-hidden="true" />
        <span>Tentar Novamente</span>
      </button>
    </div>
  );
}
