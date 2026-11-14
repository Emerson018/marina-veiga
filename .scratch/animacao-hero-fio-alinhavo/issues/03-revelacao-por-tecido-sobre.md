# 03: Revelação por Tecido no retrato da seção Sobre

Status: resolved

**What to build:** No `AboutManifesto.tsx`, o retrato da Mariana (`foto-2`) entra por uma máscara que desce como um tecido assentando, com leve paralaxe ligada à rolagem. O texto do manifesto entra em Revelação Sequencial.

**Blocked by:** nenhuma

- [x] Máscara animada só com `transform`/`clip-path`, disparada uma vez (`viewport once`).
- [x] Paralaxe sutil (`useScroll`/`useTransform`), desligada com `prefers-reduced-motion`.
- [x] Dimensões da imagem preservadas, sem CLS.
- [x] Layout, cores e texto da seção inalterados.

## Comments

- A máscara usa duas translações opostas (só `transform`), não `clip-path`: um elemento totalmente recortado nunca dispara o `IntersectionObserver`, e o AGENTS.md pede animações só com `transform`/`opacity`.
