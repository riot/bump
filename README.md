# riot-bump

Simple CLI tool for bump a new version

Replaces all occurrences of a string within the JavaScript files in the given directory with the version number in package.json

## Install

```bash
npm install riot-bump --save-dev
```

## Usage

```bash
./node_modules/.bin/riot-bump directory searchedString
```

`directory` — It is the location of the .js files that will be replaced. Defaults to `dist/`  
`searchedString` — Case sensitive string to replace. Defaults to "WIP"

The version number is readed from the package.json file in the current directory.

The replacement is made without creating backup files.
