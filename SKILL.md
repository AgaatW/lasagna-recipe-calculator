# Inline Suggestions Skill for js-lucas

This skill guides AI code assistants in providing context-aware inline suggestions for the React + Vite social platform project.

## When to Trigger

- User types in `.jsx`/`.js` files in `src/`
- User modifies CSS in `src/assets/css/style.css`
- User edits `index.html` forms or structure
- User requests component help or refactoring

## Suggestion Patterns

### React Component Completions

**Pattern 1: Function Component**
```jsx
export default function ComponentName({ prop1, prop2 }) {
  const [state, setState] = useState(initialValue);
  
  const handleEvent = (e) => {
    // Handle event
  };
  
  return <div>{/* JSX */}</div>;
}
```

**Pattern 2: Form Component**
```jsx
export default function FormComponent() {
  const [formData, setFormData] = useState({ field1: '', field2: '' });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Process form
  };
  
  return (
    <form onSubmit={handleSubmit} className="form-container">
      <input 
        type="text" 
        name="field1"
        className="form-input"
        value={formData.field1}
        onChange={handleChange}
      />
    </form>
  );
}
```

### CSS Naming Completions

When user types class names, suggest kebab-case patterns used in project:
- `.main-header`
- `.navbar`
- `.form-group`
- `.carousel-wrapper`
- `.section-title`
- `.-input`, `.btn`, `.card`

### Hook Usage Suggestions

- `useState` for local component state
- `useEffect` for side effects (with proper dependency arrays)
- `useReducer` for complex state logic
- Avoid custom hooks (not in scope yet)

## Don't Suggest

- TypeScript/type annotations
- CSS preprocessors (Sass, Less)
- Utility classes (Tailwind)
- CSS-in-JS libraries
- Class components
- Redux, Context API (unless explicitly requested)
- Path aliases or import rewrites

## Quick Reference

| Situation | Suggest |
|-----------|---------|
| User starts function component | Full functional component template |
| User typing className | Autocomplete kebab-case classes |
| User adds form input | Controlled input with state + handler |
| User types `useState` | Full hook with setter pattern |
| User in CSS file | Kebab-case class naming patterns |
| User asks about state | `useState` or `useReducer` depending on complexity |

## Context Files

- **Main guides:** [AGENTS.md](./AGENTS.md)
- **ESLint config:** [eslint.config.js](./eslint.config.js)
- **Vite config:** [vite.config.js](./vite.config.js)
- **HTML entry:** [index.html](./index.html)

## Common Gotchas to Avoid in Suggestions

1. **React Refresh:** Don't suggest `export const Component = () => {}` unless it's a utility, use default export
2. **Event Naming:** Always use `handle*` for handlers (e.g., `handleChange` not `onChange`)
3. **Dependency Arrays:** When suggesting `useEffect`, always include dependency array (not `[]` unless intentional)
4. **Import Organization:** ES modules only, no `require()`
5. **CSS Specificity:** Don't nest deeply; use flat kebab-case naming instead

## Example Inline Suggestions

**Scenario 1:** User types `function Recipe` in JS file
```jsx
export default function RecipeCalculator() {
  const [recipes, setRecipes] = useState([]);
  
  return <div className="recipe-container">{/* ... */}</div>;
}
```

**Scenario 2:** User types `className="f` in JSX
Suggest: `form-group`, `form-input`, `form-label`

**Scenario 3:** User types `const [` in component
Suggest state pattern with common variable names:
```jsx
const [formData, setFormData] = useState({});
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState(null);
```

---

**Last Updated:** 2026-04-26  
**Scope:** React 19 + Vite 6 project  
**Audience:** Inline code suggestion engines
