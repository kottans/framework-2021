# Framework

A gradual FE JS framework development.

## End game

Have a web app as a practical implementation
of an application backed with a basic FE framework.

Framework features:

- components with props
- html-like syntax
- app state management
- event handling
- async network requests

Out of scope:

- reconciliation
- app state persistency between sessions
- everything else :)

## Development

`npm install` to install dependencies.
Ignore npm audit warnings.
If any changes appear on `package-lock.json` just commit those.

`npm start` to launch dev server, app would be served at http://localhost:1234/

`npm run lint` to lint and prettify your code

The project implements a pre-commit hook that launches staged files linting.
If your IDE reports a commit failure then run `npm run lint` and/or `npm run lint:staged`
and fix reported issues. Note that [`.eslintrc.js`](./.eslintrc.js) allows
`console.error` and `console.warn`.

`npm run build` to build production distribution package

`npm run deploy` to publish built app
