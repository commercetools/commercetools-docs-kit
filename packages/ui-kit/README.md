# UI components library

This package contains UI components for building commercetools documentation websites.

## Getting started

To create a new documentation website you need to install this theme and its peer dependencies:

```
npx install-peerdeps --dev @commercetools-docs/ui-kit
```

## Design System

The package includes a small design system that should be used for everything related to documentation websites.
It exposes design tokens that mostly derive from the original [commercetools design system library](https://github.com/commercetools/ui-kit).

```js
import { designSystem } from '@commercetools-docs/ui-kit';
```

The exported `designSystem` object contains several top-level entries:

- `colors`
- `tokens`
- `dimensions`
- `typography`
