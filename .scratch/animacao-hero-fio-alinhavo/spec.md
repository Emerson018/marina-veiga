# Spec: Animação do site e Hero com Fio de Alinhavo

Status: resolved

## Problem Statement

O hero, que é a primeira impressão da Cliente, está estático e sem vida. Além disso, o texto dele ("Autoridade Feminina", "mulheres que lideram", "vestir sua ambição") ainda fala do posicionamento executivo antigo, quando a consultoria hoje é de imagem pessoal ampla, para a vida inteira. O restante do site (Header, Sobre, Metodologia, FAQ, Rodapé e WhatsApp flutuante) tem pouca animação e não transmite o caráter de ateliê da marca.

## Solution

Dar vida ao site mantendo layout, cores (verde floresta e rosa antigo) e tipografia (Italiana e Montserrat), seguindo a **Fluidez Editorial**: transições sedosas e molas amortecidas, sem quique.

- **Hero:** a foto da Mariana sai e entra o **Fio de Alinhavo**, desenhado em canvas. Na abertura, o fio costura o contorno de um manequim de moulage com um vestido alinhavado e depois reage ao cursor com física de mola. O título e a bio são reescritos para o posicionamento amplo.
- **Sobre:** o retrato da Mariana entra com a **Revelação por Tecido**.
- **Metodologia:** o Fio de Alinhavo reaparece, discreto, costurando os três passos conforme a rolagem.
- **Demais seções:** **Revelação Sequencial** e microinterações de mola amortecida.
- **Catálogo e Dossiê:** não mudam por dentro. Recebem apenas uma entrada de seção consistente com o resto.

## Decisões

1. **Stack:** Framer Motion (já instalado, ADR-0004) é a única biblioteca de animação. O canvas fica restrito ao Fio de Alinhavo. GSAP foi descartado.
2. **Molas:** amortecimento alto, sem overshoot visível. O quique continua proibido (revisão do ADR-0004).
3. **Sem smooth scroll** (Lenis ou similar). O movimento fica nos elementos, não na rolagem.
4. **Hero sem foto:** a presença humana continua na seção Sobre (`foto-2`).
5. **Imagem a evitar:** nada de amostras de cores ou cartelas de tecido, porque Coloração Pessoal está fora do portfólio.
6. **Texto do hero:**
   - Título: "Elegância que nasce do que você já tem."
   - Bio: "Eu parto das suas peças, do seu corpo e da sua rotina para montar um estilo que funciona no trabalho, no fim de semana, nos eventos e nas viagens. E te entrego um mapa para *decidir sozinha* depois." O destaque fica em "decidir sozinha".
7. **Faixa de sinais do hero** (100% Personalizado · Híbrido · Até 7 dias): mantida, com entrada sequencial e sem contador animado.
8. **Header:** sempre visível. Ao sair do hero, encolhe levemente e ganha fundo verde translúcido com desfoque.

## Comportamento do Fio de Alinhavo

- **Desktop:** na entrada, costura o desenho em cerca de 2,5 s. Depois, o trecho mais próximo do cursor é puxado levemente e volta com mola amortecida.
- **Toque:** desenho de entrada e leve balanço ligado à rolagem, sem interação por toque.
- **`prefers-reduced-motion`:** desenho completo e estático.
- **Fora da viewport ou aba oculta:** o loop de animação pausa.
- **Acessibilidade:** o canvas é decorativo (`aria-hidden`). O conteúdo do hero continua em HTML semântico.
- **Sem JS ou antes de hidratar:** um fallback estático do desenho evita área vazia e CLS.
- **Desempenho:** `devicePixelRatio` limitado a 2 e nenhum trabalho no thread principal quando parado.

## User Stories

1. Como cliente, quero uma abertura viva e ligada ao universo de ateliê, para perceber o cuidado artesanal da consultoria logo no primeiro segundo.
2. Como cliente, quero ler no hero uma promessa que fale da minha vida inteira, não só do trabalho, para me reconhecer no público da Mariana.
3. Como cliente no celular, quero que as animações não atrapalhem a rolagem nem o arrasto do catálogo.
4. Como cliente sensível a movimento, quero que o site respeite a redução de movimento do sistema.
5. Como cliente, quero que o cabeçalho continue acessível o tempo todo, para ir ao catálogo ou ao WhatsApp quando quiser.

## Fora de escopo

- Mudanças internas no `CatalogGrid`, `ServiceCard` e `DossierShowcase`.
- Mudanças de layout, paleta ou tipografia.
- Novas bibliotecas de animação ou de smooth scroll.

## Issues

1. `issues/01-hero-copy-e-coreografia.md`
2. `issues/02-fio-de-alinhavo-canvas.md`
3. `issues/03-revelacao-por-tecido-sobre.md`
4. `issues/04-fio-na-metodologia.md`
5. `issues/05-microinteracoes-header-faq-rodape-whatsapp.md`
6. `issues/06-entrada-catalogo-dossie-e-auditoria.md`
