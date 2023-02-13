// start build hack to force components are are injected into all MDX pages into a central bundle at SSR generation time (memory problems)
import additionalContentComponents from './shortcodes';
// eslint-disable-next-line no-unused-vars
const doSomethingFakeWithTheImports = [additionalContentComponents];
// end build hack to force shared components into a central place at SSR bundling time
