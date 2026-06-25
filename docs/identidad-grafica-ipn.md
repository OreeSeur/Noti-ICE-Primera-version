# Identidad gráfica IPN aplicada al portal

Este documento resume los ajustes visuales aplicados al frontend para mantener una apariencia más cercana a la identidad gráfica institucional del Instituto Politécnico Nacional.

## Colores institucionales usados

Se definieron variables CSS globales en `src/index.css`:

```css
--color-ipn-guinda: #6f1d46;
--color-ipn-guinda-dark: #4f1231;
--color-ipn-guinda-soft: #f6edf2;
--color-ipn-gray: #636569;
--color-ipn-black: #000000;
--color-ipn-white: #ffffff;
```

Uso recomendado:

- Guinda: acciones principales, sidebar, enlaces destacados, encabezados y acentos.
- Gris: textos secundarios, divisores, degradados sobrios y elementos de apoyo.
- Negro/blanco: contraste, fondos y legibilidad.

## Tipografía

El portal utiliza `Noto Sans` como familia tipográfica principal mediante `index.html` y `src/index.css`.

```css
font-family: "Noto Sans", ui-sans-serif, system-ui, sans-serif;
```

## Logotipo

El escudo/logotipo del IPN debe mantenerse sin deformaciones:

- No cambiar proporciones.
- No aplicar sombras, contornos o efectos no autorizados.
- No alterar colores del escudo.
- Usar siempre `height` o `width` con `auto` para conservar proporción.

## Componentes ajustados

Se reforzó la identidad visual en:

- `Sidebar`
- `Topbar`
- `Footer`
- `HeroBanner`
- `LoginForm`
- `InfoCard`
- `PageHeader`
- Estados visuales comunes

## Criterio visual

El portal debe conservar una apariencia sobria, institucional y legible:

- Fondos claros con acentos guinda.
- Contrastes suficientes en modo claro y modo oscuro.
- Uso moderado de degradados.
- Sin efectos exagerados sobre logotipos institucionales.
- Jerarquía tipográfica clara.
