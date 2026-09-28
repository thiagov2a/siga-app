# Contribuir a SIGA

## Modelo de ramas

- **`main` está protegida**: no acepta push directo. Todo cambio entra por Pull Request, con el check `install-lint-build` en verde.
- Se trabaja en ramas efímeras desde `main`:

  | Prefijo    | Para qué                       |
  | ---------- | ------------------------------ |
  | `feat/*`   | funcionalidad nueva            |
  | `fix/*`    | arreglo de un bug              |
  | `chore/*`  | config, limpieza, dependencias |
  | `style/*`  | formato, sin cambios de lógica |

  Ejemplo: `feat/app-mobile-alumno`.

- Al mergear, la rama se borra sola (`delete_branch_on_merge`).

## Flujo

```bash
git checkout main
git pull
git checkout -b feat/mi-cambio

# ... commits ...

git push -u origin feat/mi-cambio
```

Abrir el PR contra `main` (GitHub usa el template de PR). Cuando el CI pasa, mergear con **Squash and merge** para dejar un commit limpio en `main`. Los botones de merge commit están deshabilitados.

## Antes de abrir el PR

```bash
pnpm lint
pnpm format:check
pnpm build
```

El CI corre exactamente estos tres comandos. Si fallan local, fallan en el PR.

## Reglas del proyecto

- **Textos siempre en español** (UI, docs, mensajes de commit).
- **Sin menciones a instituciones reales** ni a sistemas académicos concretos. Todo genérico: "tu universidad", "la facultad", "el sistema académico".
- **Sin librerías nuevas** sin discutirlo antes.
- **Sin tests**: la verificación es QA ejecutado por agente/ejecutor con evidencia, no una suite de unit tests.
- **Sin `as any`, `@ts-ignore`, `@ts-expect-error`**.

## Commits

Mensajes en español, en formato convencional:

```
feat: app mobile del alumno
fix: selector de tickets con loop infinito
chore: quitar steps de test del CI
style: formateo prettier
```

Un commit por unidad de cambio. Sin force push sobre `main` (está bloqueado por la protección de ramas).
