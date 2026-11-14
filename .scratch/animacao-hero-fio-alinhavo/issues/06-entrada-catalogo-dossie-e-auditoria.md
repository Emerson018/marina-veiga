# 06: Entrada de seção do Catálogo e do Dossiê, mais auditoria final

Status: resolved

**What to build:** Envolver o título das seções do Catálogo e do Dossiê numa entrada consistente com o resto do site, sem tocar nos componentes internos. Depois, auditar o site inteiro contra as diretrizes de acessibilidade e desempenho do `AGENTS.md`.

**Blocked by:** 01, 02, 03, 04, 05

- [x] `CatalogGrid`, `ServiceCard` e `DossierShowcase` sem mudança de lógica ou interação.
- [x] Arrasto do catálogo no celular intacto.
- [x] Auditoria: foco visível, `prefers-reduced-motion`, sem CLS, alvos de toque, `touch-action: manipulation`.
- [x] `npm run build` e `npm test` passando.

## Comments

- O Dossiê não tem título de seção, então a entrada envolve o palco inteiro. Nenhuma lógica mudou.
- `CatalogGrid.tsx` ainda tem um `transition-all` anterior a este trabalho. Ficou como está, porque o Catálogo não deve mudar por dentro.
- O `next lint` não está configurado no projeto, então não rodou.
