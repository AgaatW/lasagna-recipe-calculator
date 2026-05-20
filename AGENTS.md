# AI Agent Guidelines for js-lucas (React + Vite)

## Quick Start for AI Assistants

**Project Type:** React 19 + Vite 6 SPA  
**Key Commands:**
- `npm run dev` — Start dev server (HMR enabled on localhost:5173)
- `npm run build` — Production build to `/dist`
- `npm run lint` — ESLint check (flat config, React Hooks enforced)

---

## Code Conventions

### JavaScript/JSX
- **Module System:** ES modules (`import`/`export`)
- **Components:** PascalCase (e.g., `RecipeCalculator.jsx`)
- **Variables:** camelCase; ESLint allows PascalCase for uppercase constants (e.g., `MY_CONSTANT`)
- **React Patterns:**
  - Use functional components with hooks
  - ESLint enforces Rules of Hooks (`react-hooks/rules-of-hooks`)
  - React Refresh enabled — avoid default exports in component files

### CSS
- **Naming:** kebab-case for class names (e.g., `.main-header`, `.form-group`)
- **Location:** `/src/assets/css/style.css`
- **No CSS Modules or Tailwind** — plain CSS only
- **No CSS-in-JS libraries** — not configured

### HTML
- **Location:** `/index.html`
- **Semantic HTML:** Use `<header>`, `<section>`, `<form>`, etc.
- **Forms:** Bootstrap-style class naming for styling

### File Organization
```
src/
  assets/
    css/         → Global styles
    fonts/       → Web fonts
    js/          → JavaScript entry point (app.js is currently empty)
  components/    → React components (to be created)
public/          → Static assets
dist/            → Build output (gitignored)
```

---

## What to Suggest

✅ **DO suggest:**
- Functional React components with hooks (`useState`, `useEffect`, `useReducer`)
- Event handlers with React naming conventions (`handleClick`, `onSubmit`)
- Props destructuring in component signatures
- Fragment shorthand (`<>...</>`) for conditional rendering
- CSS class composition (combining kebab-case classes)
- Form handling patterns (controlled inputs, event listeners)

❌ **DON'T suggest:**
- Class components (use functional components)
- TypeScript features (not configured; would need setup)
- Path aliases (`@/`, `~/`) — not configured
- CSS Modules, Sass, Tailwind, or Styled Components
- State management libraries (`Redux`, `Zustand`) unless explicitly requested
- JSX spread operator for props (`{...props}`) without explanation
- CommonJS (`require`) — use ES modules

---

## ESLint Rules in Effect

- `eslint-plugin-react-hooks` — enforces Hook rules, dependency arrays
- `eslint-plugin-react-refresh` — warns on exports that may break Fast Refresh
- Core rules: `ecmaVersion: 2020`, JSX enabled

**Lint before committing:** `npm run lint`

---

## Development Workflow

1. **Edit** files in `src/`
2. **Vite HMR** auto-refreshes browser during dev
3. **Lint locally** before pushing: `npm run lint`
4. **Build for production:** `npm run build`
5. **Preview build locally:** `npm run preview`

---

## Common Patterns in This Codebase

### Component Structure
```jsx
export default function RecipeForm() {
  const [recipe, setRecipe] = useState('');
  
  const handleChange = (e) => setRecipe(e.target.value);
  return <form onSubmit={handleChange}>...</form>;
}
```

### CSS Class Application
```jsx
<div className="main-header">
  <h1 className="title">Recipe Calculator</h1>
</div>
```

### Form Handling
Use controlled inputs with state. Example:
```jsx
<input 
  type="text" 
  className="form-input"
  value={recipe} 
  onChange={handleChange}
/>
```

---

## Context for Inline Suggestions

When providing inline code suggestions:
- Maintain kebab-case for CSS class names
- Use functional components and hooks exclusively
- Keep component files small (~200 lines max)
- Export components as default when possible (React Refresh friendly)
- Include prop types as JSDoc comments if validation is complex
- Link to MDN for DOM APIs, React docs for hooks

---

## Next Steps if Needed

If the project grows beyond this scope, consider:
- **TypeScript Setup:** See [Vite TS docs](https://vitejs.dev/guide/#typescript)
- **Path Aliases:** Configure in `vite.config.js` and `jsconfig.json`
- **Component Storybook:** For component documentation and testing
- **Vitest:** For unit testing (Vite-native)
