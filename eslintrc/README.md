# eslintrc
This projects maintains a curated list of eslint rules for typescript projects.
Rule selection is subject to practicality, personal taste and inter-operability with built-in typescript rules.

## Install

### GIT

Add this repository as a git submodule to your root repository:
```bash
# if the typescript project is the root repository, run:
git submodule add https://github.com/pfui-bah-kiste/eslintrc.git

# if the typescript project is within a sub-directory of the root repository, e.g. server, run:
git submodule add https://github.com/pfui-bah-kiste/eslintrc.git server/eslintrc
```

To update the submodule to the latest version, run:
```bash
git submodule update --recursive --remote --merge
```

### Non-GIT

Copy the ```.eslintrc.json``` file into a new directory named ```eslintrc``` inside the root project directory (or a any sub-directory thereof, e.g. server).

### VS Code

Install extension:
```ESLint (Author: Microsoft)```

## Configure

### Node Modules

Add the following ```devDependencies``` to the ```package.json``` file. The specific versions will be regularly updated once possible rule changes/additions/deprecations have been verified and integrated into the list.

__Hint:__ After updating these versions, make sure to run ```npm install``` and restart VS Code for eslint to pick any rule changes.

```json
"@typescript-eslint/eslint-plugin": "6.5.0",
"@typescript-eslint/parser": "6.5.0",
"eslint": "8.48.0",
"eslint-plugin-jsdoc": "46.5.0",
```

### ESLint and TSConfig

In the root of the typescript project,

* create the ```.eslintrc.json``` file with the following content:
```javascript
{
    "root": true,
    // NOTE: adjust environment according to the runtime the project will be executed in
    "env": {
        "browser": true,
        "node": false
    },
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "project": "tsconfig.json"
    },
    "plugins": [
        "@typescript-eslint",
        "eslint-plugin-jsdoc"
    ],
    "extends": [
        // NOTE: adjust path according to the chosen directory structure
        "./eslintrc/.eslintrc.json"
    ]
}
```

* append the following content to the ```tsconfig.json``` file:
```javascript
// The rules below are consistent with the list of enabled eslint rules.
// To create a new tsconfig.json file, execute the command 'tsc --init'.

"compilerOptions": {
    // [...]

    /* Type Checking */
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    // "useUnknownInCatchVariables": true,
    "alwaysStrict": true,
    "noUnusedLocals": true,
    // "noUnusedParameters": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    // "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,
    // "allowUnusedLabels": true,
    // "allowUnreachableCode": true,
}
```

__Hint:__ In order to exclude some files and/or directories (e.g. the dist/ directory) from the linter,
* add them to the ```exclude``` section inside the ```tsconfig.json``` file:

```json
"exclude": [ "dist/" ]
```

* as well as to the ```ignorePatterns``` section of the ```.eslintrc.json``` file:

```json
"ignorePatterns": [ "dist/" ]
```
