# KodNest Premium Build System

A premium SaaS design system for B2C product experiences. Calm, intentional, coherent, confident. Not flashy, not loud, not playful.

---

## Design philosophy

- **Calm** — No animation noise, no gradients, no glassmorphism, no neon.
- **Intentional** — Every spacing and type size comes from the scale. No random values.
- **Coherent** — One visual language across layout, components, and states.
- **Confident** — Serif headlines, clear hierarchy, generous whitespace.

Everything must feel like one mind designed it. No visual drift.

---

## Color system

Maximum **4 colors** across the system (plus semantic success/warning derived from muted palette).

| Role        | Token              | Value     | Use                    |
|------------|--------------------|-----------|------------------------|
| Background | `--kn-background`  | `#F7F6F3` | Page and panel bg      |
| Primary text | `--kn-text-primary` | `#111111` | Body and headings   |
| Accent     | `--kn-accent`      | `#8B0000` | Primary actions, focus |
| Success    | `--kn-success`     | `#5A6B5A` | Shipped, done          |
| Warning    | `--kn-warning`     | `#8B7355` | In progress, caution   |

**Do not use:** gradients, glassmorphism, neon, or colors outside this set.

---

## Typography

- **Headings:** Serif (`Georgia` / system serif). Large, confident, generous spacing. Use `--kn-font-heading`.
- **Body:** Clean sans-serif (`Segoe UI` / system). 16–18px, line-height 1.6–1.8. Use `--kn-font-body`.
- **Text blocks:** Max width `720px` (`--kn-text-max-width`). Use class `.kn-text-block`.
- **Scale:** Only use tokens. No decorative fonts, no random sizes.

| Token           | Size  | Use           |
|-----------------|-------|----------------|
| `--kn-text-xs`  | 14px  | Labels, badges |
| `--kn-text-sm`  | 16px  | Body default   |
| `--kn-text-base`| 17px  | Base body      |
| `--kn-text-lg`  | 18px  | Emphasized body|
| `--kn-text-xl`  | 24px  | H3             |
| `--kn-text-2xl` | 32px  | H2             |
| `--kn-text-3xl` | 40px  | H1, context headline |

---

## Spacing system

**Only these values:** `8px`, `16px`, `24px`, `40px`, `64px`.

| Token           | Value |
|-----------------|-------|
| `--kn-space-1`  | 8px   |
| `--kn-space-2`  | 16px  |
| `--kn-space-3`  | 24px  |
| `--kn-space-4`  | 40px  |
| `--kn-space-5`  | 64px  |

Never use 13px, 27px, or any value outside this scale. Whitespace is part of the design.

---

## Global layout structure

Every page must follow this order:

1. **Top Bar**
2. **Context Header**
3. **Primary Workspace** (70%) + **Secondary Panel** (30%)
4. **Proof Footer**

### Top Bar

- **Left:** Project name (`.kn-top-bar__project`).
- **Center:** Progress indicator — e.g. "Step X / Y" (`.kn-top-bar__progress`).
- **Right:** Status badge — "Not Started" | "In Progress" | "Shipped" (`.kn-badge`, `.kn-badge--in-progress`, `.kn-badge--shipped`).

### Context Header

- One large serif headline (`.kn-context-header__headline`).
- One-line subtext (`.kn-context-header__subtext`). Clear purpose, no hype language.

### Primary Workspace (70%)

- Main product interaction. Clean cards (`.kn-card`), predictable components. No crowding.

### Secondary Panel (30%)

- Short step explanation (`.kn-panel__explanation`).
- Copyable prompt box (`.kn-prompt-box`).
- Buttons: Copy, Build in Lovable, It Worked, Error, Add Screenshot (`.kn-panel-actions`). Calm styling.

### Proof Footer (persistent)

- Checklist: □ UI Built □ Logic Working □ Test Passed □ Deployed.
- Each checkbox requires user proof input (`.kn-proof-footer`, `.kn-proof-footer__list`, `.kn-proof-footer__item`, `.kn-proof-footer__checkbox`).

---

## Component rules

- **Primary button:** Solid deep red (`--kn-accent`). Class: `.kn-btn.kn-btn--primary`.
- **Secondary button:** Outlined (border, transparent fill). Class: `.kn-btn.kn-btn--secondary`.
- **Same hover and border radius everywhere:** `--kn-radius` (4px), `--kn-transition` (180ms ease-in-out).
- **Inputs:** Clean borders, no heavy shadows, clear focus state (`.kn-input`).
- **Cards:** Subtle border, no drop shadows, balanced padding (`.kn-card`).

---

## Interaction rules

- **Transitions:** 150–200ms, ease-in-out. Token: `--kn-transition` (180ms).
- **No bounce, no parallax, no decorative motion.**

---

## Error and empty states

- **Errors:** Explain what went wrong and how to fix it. Never blame the user. Use `.kn-error`, `.kn-error__title`, `.kn-error__message`, `.kn-error__fix`.
- **Empty states:** Provide the next action. Never feel dead. Use `.kn-empty`, `.kn-empty__message`, `.kn-empty__action`.

---

## File structure

```
kodnest-design-system/
  index.css           ← Import this in your app
  base.css            ← Reset, tokens, base typography
  layout.css          ← Top bar, context header, workspace, panel, proof footer
  components.css      ← Buttons, badges, cards, inputs, prompt box, error, empty
  tokens/
    colors.css
    typography.css
    spacing.css
    motion.css
    radius.css
  DESIGN-SYSTEM.md    ← This document
```

---

## Usage

In your app:

```html
<link rel="stylesheet" href="path/to/kodnest-design-system/index.css" />
```

Then use the layout and component classes as documented above. Do not introduce new colors, spacing values, or type sizes outside the tokens. Keep the system coherent.
