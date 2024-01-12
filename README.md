# Zustand Test

Template using Zustand with Next.js, React, Tailwind CSS, ESLint, Prettier, and VSCode

## Installation

Clone the repository then run:

    npm install

## Usage

Start the development server:

    npm run dev

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Create a production build:

    npm run build

Start the production server:

    npm run start

Check for formatting errors:

    npm run lint

## Development

### VSCode Extensions

Install the following extensions for VSCode:

- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier - Code Formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## Packages

`npm install` installs the following packages:

### [Next.js](nextjs.org/)

    npx create-next-app@latest

Configuration files:

- `next.config.js`

### [Tailwind CSS](https://tailwindcss.com/)

Configuration files:

- `tailwind.config.js`
- `postcss.config.js`

### [ESLint](https://eslint.org/)

    npm install --save-dev @typescript-eslint/parser @typescript-eslint/eslint-plugin

Configuration files:

- `.eslintrc.json`

### [Prettier](https://prettier.io/)

    npm install --save-dev --save-exact prettier

[Import Sorter](https://github.com/trivago/prettier-plugin-sort-imports) plugin for Prettier:

    npm install --save-dev prettier-plugin-import-sorter

#### Integration with ESLint

[ESLint plugin](https://github.com/prettier/eslint-plugin-prettier) for Prettier:

    npm install --save-dev eslint-plugin-prettier

[eslint-config-prettier](https://github.com/prettier/eslint-config-prettier) package turns off all eslint rules that are unnecessary or might conflict with Prettier

    npm install --save-dev eslint-config-prettier

#### Integration with Tailwind CSS

[Tailwind CSS plugin](https://github.com/tailwindlabs/prettier-plugin-tailwindcss) for Prettier:

    npm install --save-dev prettier-plugin-tailwindcss

Configuration files:

- `.prettierrc`
- `.prettierignore`
- `.vscode/settings.json`
- `.eslintrc.json`
