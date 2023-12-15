# prettier-config

This package provides Lomray base JS (Typescript) .prettierrc.js as an extensible shared config.

## Usage

1. Install package:

  ```sh
  npm i --save-dev @lomray/prettier-config
  ```

2. Example you .prettierrc.js.
```js
export default {
	...require('@lomray/prettier-config'),
};
```
