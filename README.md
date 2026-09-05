# @lomray/prettier-config

Lomray's shared Prettier 3 configuration: 100-column lines, single quotes, semicolons,
trailing commas and JSX closing brackets on a separate line.

## Install

```sh
npm install --save-dev prettier@^3.9.6 @lomray/prettier-config
```

Add this to `package.json`:

```json
{
  "prettier": "@lomray/prettier-config"
}
```

To override individual options, use `.prettierrc.mjs`:

```js
import config from '@lomray/prettier-config';

export default {
    ...config,
    printWidth: 120,
};
```

Requires Node `^22.13.0 || >=24` and Prettier 3.9.6+. It does not depend on ESLint.
Existing formatting options are unchanged.

## Migrate from v2

Upgrade Node and Prettier to the versions above. Older Prettier loaders can ignore an ESM
shared config loaded through `package.json` on recent Node versions. The current toolchain
loads both documented configuration forms correctly. No option changes are required.

## Develop

Use the Node version in `.nvmrc`, then run `npm ci`, `npm test`,
`npm run test:packed` and `npm audit`. CI checks Node 22 and 24.
