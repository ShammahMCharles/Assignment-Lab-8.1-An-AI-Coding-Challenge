# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.
You can also try [the experimental native React Compiler support in plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md#rust-react-compiler) by using `compiler: true` in the plugin options instead of using the Babel plugin.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

You can also install [eslint-plugin-react-x](https://npmx.dev/package/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://npmx.dev/package/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

# Flash Cards Copilot

A simple flash-card study application built with React and TypeScript. Create cards with a question, answer, and optional hint, then click a card to flip between its front and back. Cards can be organized into named decks.

## Features

- Flip cards to reveal answers
- Add a question, answer, and hint to each card
- Create multiple named decks
- Switch between decks from the deck navigation
- See the number of cards in each deck
- Responsive layout styled with Tailwind CSS
- Icons provided by Lucide React

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- `clsx`
- `lucide-react`
- ESLint

## Getting Started

### Requirements

- Node.js 18 or newer
- npm

### Install and run

```bash
npm install
npm run dev
```

Open the local URL shown by Vite in your browser.

## Available Commands

```bash
npm run dev       # Start the development server
npm run build     # Type-check and create a production build
npm run lint      # Run ESLint
npm run preview   # Preview the production build
```

## How It Was Created

The project started as a Vite React and TypeScript application. The implementation was built in small steps:

1. The initial app was set up with Vite, React, and TypeScript.
2. A `Card` type was created to describe each flash card's ID, front, back, and optional hint.
3. A `FlashCard` component was added with React state to track whether an individual card is flipped.
4. A `CardForm` component was added to collect and create new cards.
5. Tailwind CSS was integrated with Vite for utility-based styling.
6. The single card list was expanded into a `Deck` model containing a name and its own cards.
7. The main app was updated with controls for creating decks, switching decks, and adding cards to the active deck.

Deck and card data currently live in React state, so they reset when the page is refreshed. A future version could persist them with `localStorage` or a database.

## How GitHub Copilot Helped

GitHub Copilot Chat was used as a coding assistant during development. Its help included:

- Inspecting the existing Vite and React project structure
- Suggesting the `Deck` data structure and state-management approach
- Implementing the deck creation and deck-switching UI
- Reviewing the changes for TypeScript and ESLint problems
- Running build and lint checks to verify the result

The final code and design decisions were reviewed and adapted in the project rather than accepted blindly. The application remains a learning project, and the developer is responsible for testing and maintaining the code.

## Project Structure

```text
src/
├── Components/
│   ├── CardForm/       # Form for adding cards
│   ├── FlashCard/      # Flip-card presentation and interaction
│   └── types/          # Shared Card and Deck types
├── App.tsx             # Deck state, deck controls, and card layout
├── index.css           # Global styles and Tailwind import
└── main.tsx            # React application entry point
