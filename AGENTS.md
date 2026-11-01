## Agent skills

### Issue tracker

Local markdown files in `.scratch/`. See `docs/agents/issue-tracker.md`.

### Triage labels

Canonical roles mapped 1:1 (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`). See `docs/agents/triage-labels.md`.

### Domain docs

Single-context (`GLOSSARY.md` and `docs/adr/` at repo root). See `docs/agents/domain.md`.

### Web Design & UI Guidelines

For all tasks related to website creation, UI/UX development, prototyping, visual design, and code reviews:
- Strictly apply `.agents/skills/web-design-guidelines/SKILL.md` (Vercel Web Interface Guidelines) together with `.agents/skills/frontend-design/SKILL.md` (Frontend Design Guidelines).
- **Visual & Brand Identity (`frontend-design`):**
  - Ground designs specifically in Mariana Veiga's consulting subject matter, audience, and context; avoid generic templates and AI clichés (e.g. indiscriminate warm-cream/terracotta combos, uniform rounded SaaS cards, meaningless numbered steps).
  - Make deliberate, opinionated choices for typography, hierarchy, and color palettes.
  - Spend boldness in one memorable place, keeping the rest quiet, disciplined, and purposeful.
  - Write intentional, user-centric copy with plain language and active CTAs.
- **Core Technical & Interaction Standards (`web-design-guidelines`):**
  - **Accessibility:** Semantic HTML (`<button>`, `<a>`, `<label>`), `aria-label` for icon buttons, meaningful `alt` text for images, and full keyboard navigation.
  - **Focus & Interaction:** Visible focus rings (`focus-visible`), no `outline: none` without replacement, mobile touch targets without tap delay (`touch-action: manipulation`).
  - **Forms & Inputs:** Proper input types (`tel`, `email`), accessible labels, no blocked paste.
  - **Performance & Media:** Explicit image dimensions to avoid CLS, lazy loading below fold, compositor-friendly animations (`transform`/`opacity` only, no `transition: all`, respect `prefers-reduced-motion`).
  - **Mobile & Layout:** Safe-area insets, responsive design, and WhatsApp CTA links using semantic `<a>` tags with proper formatting.

