# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## 15.0.2 - UNRELEASED
### Added
- **Dockerfile** Is now included based on the latest **Knowledge Base UI** codebase using **nginx**.
- **.gitlab-ci.yml** Is now included using the **Standard Pipeline**.

### Removed
- **npm run start:localhost** Which was an obscure alternative to launch the frontend in a few years old microfrontend setup.

## 15.0.1 - 2023-03-31

_Unchanged, this is a test-release as the first internal version published by the pipeline._

## 15.0.0 - 2023-03-28

:::
This release is intended to be the last version published of this scaffolding.
I recommend moving towards the Vite + Vitest + @testing-library/vue + Storybook 7 CLI stack.
:::

### Changed
- **ESLint** Now warns against imports used only as types without the marking them accordingly. 
- **ESLint** Reset Vue HTML closing bracket style to default setting: use `npm run lint -- --fix` to apply on project. 
- **Storybook** Updated to Storybook v7 Release Candidate
- **package.json** Updated to latest stable dependencies.
- **package.json** Uses declares `"type": "module"`.
- **Webpack config** Use NodeJS-specific imports to avoid potential collisions with packages in `node_modules/`.

## 14.0.2 - 2022-12-15
### Changed
- **package.json** Updated to latest stable dependencies.

### Fixed
- **vue-i18n** Is no longer failing if the translations directory includes a `package.json`	or `package-lock.json`.

## 14.0.1 - 2022-12-09
### Changed
- **package.json** Updated to latest stable dependencies.
- **package.json** Downgraded `babel-loader` to v8 so that it stays compatible with the current `Storybook`.

## 14.0.0 - 2022-11-25

Note that replacing Vuex with pinia is considered a breaking change as it requires a more involved manual migration.

### Changed
- **babel.config.js** Specify the concrete version of corejs, because 3 is interpreted as 3.0
- **Jest** Replaced `babel-jest` and `ts-jest` with `@swc/jest` for faster testing.
- **package.json** Updated to latest stable dependencies.
- **Vuex** Has been migrated to Pinia
- **webpack-dev-server** `onBeforeSetupMiddleware` is deprecated, use `setupMiddlewares` instead.

### Fixed
- **webpack-dev-server** Has been mapped to a working (at the time of writing) example API.

## 13.2.11 - 2022-09-14
### Changed
- **Jest** Has been upgraded to `v29`. Note that the `ts-jest` babel config has been changed according the warning against using globals.

## 13.2.10 - 2022-09-14
### Changed
- **TypeScript** To use `noUncheckedIndexedAccess`.
- **package.json** Updated to latest stable dependencies. Now with more accurate test store types to work with TypeScript 4.8.

## 13.2.9 - 2022-08-15
### Changed
- **package.json** Updated to latest stable dependencies. This includes fixing the vue-i18n type signature and errors due to using Composition API with a Legacy mode.

## 13.2.8 - 2022-07-04
### Changed
- **package.json** Updated to latest stable dependencies.
- **webcomponents** now sets the `emits` declaration, also allowing `events` to be added from the component.

### Fixed
- **Jest** make workaround for `vue-test-utils` safer to use.

## 13.2.7 - 2022-05-23
### Changed
- **package.json** Updated to latest stable dependencies. Now including `Jest v28`.

## 13.2.6 - 2022-05-05
### Changed
- **package.json** Now uses `npm audit --omit=dev` instead of `npm audit --production`.
- **package.json** Updated to latest stable dependencies skipping `Jest v28` until `vue3-jest v28` lands.

### Added
- **webcomponents** Support to put text nodes into named slots by wrapping them into span elements.

## 13.2.5 - 2022-04-13
### Changed
- **webcomponents** Dropped workaround for pre-2.1 version of the **ScopedElementsMixin** which auto-applied a polyfill breaking **JSDOM**. The latest **LionComponents** no longer include this behavior.
- **TypeScript** Config now sets `jsx` to `preserve` to prevent issues with **Storybook**.
- **package.json** Updated to latest stable dependencies.

## 13.2.4 - 2022-03-25
### Changed
- **@vue/vue3-jest** Has superseded the **vue3-jest** transformer which is no longer in development.
- **package.json** Updated to latest stable dependencies.

## 13.2.3 - 2022-03-04

### Changed
- **vue-i18n** Now works with strict CSP settings disallowing the unsafe `eval()` function.
- **package.json** Updated to latest stable dependencies.

### Fixed
- **TypeScript** Prepared `test/utils/setup-options` to work with **v4.6**.

## 13.2.2 - 2022-02-24
### Fixed
- **sass** Example code no longer imports from **node_modules** using the **~** as it's no longer necessary to do so.
- **TypeScript** Type checking no longer uses the **fork-ts-checker-webpack-plugin** as it introduced a regression in v7. Instead using **Volar** for dev and **vue-tsc** for testing. The added benefit is type checking on Vue files. _Note that @types/react used by Storybook is known to break the type checker. [See issue about it.](https://github.com/johnsoncodehk/volar/discussions/592) To address, types are explicitly declared in tsconfig.json in order to automatically pull in every typing from `node_modules/@types/`._

## 13.2.1 - 2022-02-22

- **webcomponents** Has an ESLint disable comment that the CLI no longer strips out.

## 13.2.0 - 2022-02-22

### Changed
- **package.json** Split production and dev dependencies so that `npm audit --production` shows relevant results.
- **package.json** Updated to latest stable dependencies.
- **webpack-merge** Has been dropped in favor of simply using the spread operator

### Added
- **src/domain** Now includes an example domain object factory, the **Joke** to showcase the pattern.

## 13.1.4 - 2022-01-17

### Added
- **webcomponents** now supports DOM to Vue event mapping.
### Changed
- **package.json** Updated to latest stable dependencies.

## 13.1.3 - 2021-12-03

### Added
- **Storybook** ESLint plugin for well formed stories.

### Changed
- **package.json** Updated to latest stable dependencies.

## 13.1.2 - 2021-10-29

### Changed
- **package.json** Updated to latest stable dependencies.

### Fixed
- **Jest** Now correctly reads `JSON` files that were causing test warnings with `vue-i18n`. The problem was that `Webpack v5` loaded them slightly differently.

## 13.1.1 - 2021-09-27

### Changed
- **Jest** Updated to `v27` now swapping `vue-jest` out with `vue3-jest`.
- **package.json** Updated to latest stable dependencies.
- **Webpack** The `webpack-dev-server` has been updated to [v4](https://github.com/webpack/webpack-dev-server/blob/master/CHANGELOG.md#400-beta0-2020-11-27).

## 13.1.0 - 2021-08-04

### Changed
- **package.json** Updated to latest stable dependencies.

### Added
- **Storybook** Includes the **A11Y addon** offering accessibility checks for stories.

### Fixed
- **Editor config** Now formats `yml` and `yaml` files consistently. (With space indent.)
- **Jest + JSDOM** The [scoped-elements polyfill](https://github.com/webcomponents/polyfills/issues/459) workaround now includes a more reliable implementation.

## 13.0.4 - 2021-06-25

### Changed
- **package.json** Updated to latest stable dependencies.

### Fixed
- **@vue/test-utils** Use regular `mount` over `shallowMount` when testing the use of `LionDialog`. As of `v2.0.0-rc.7` tests started failing fue to more strict stubbing.

## 13.0.3 - 2021-06-11

### Added
- **Jest** now also bundles `@bundled-es-modules/*` back to CJS if needed. Some of these modules are used by `Lion Components`.

## 13.0.2 - 2021-06-11

### Added
- **webcomponents** `toVueComponent` now ignores props with `undefined` value. Use the `allowUndefinedProps` options of tweak or opt-out.

## 13.0.1 - 2021-06-10

### Fixed
- **webcomponents** `toVueComponent` test no longer fails in some `JSDOM` environments.

## 13.0.0 - 2021-06-10

### Changed

- **TypeScript** is now the project's default language. Specifically for `Storybook` stories due to their highly dynamic nature JavaScript is still in use.
- **test/utils** split `createOptions` for @vue/test-utils and `createStore` to simplify component test setup.
- **package.json** Updated to latest stable dependencies.

### Added
- **webcomponents** `toVueComponent` now detects `Vue` props by default. This allows `Vue` to bind props over attributes to the webcomponent when multi-word names are used. Props are detected by having dynamic `get` and `set` methods and have a name not starting with a `_`. Opting out by declaring the `props` option explicitly.
- **Jest** set default environment to `jsdom` to prep for `Jest v27`.
- **Jest + JSDOM + LionComponents** Workaround from JSDOM - custom-elements polyfill incompatibility. Lion started using the next major version of `Lit` and the `@open-wc/scoped-elements` polyfill. The [polyfill is not compatible with JSDOM](https://github.com/open-wc/open-wc/issues/2221).

## 12.0.0 - 2021-03-31

The scaffolding has been upgraded to Vue 3 in this release. We also upgraded the libraries we depend on to their Vue 3 equivalents
(vuex, vue-router, vue-i18n, @fortawesome/vue-fontawesome, @storybook/vue3 and @vue/test-utils).

The way to wire up the application has changed to Vue 3's 
[createApp](https://v3.vuejs.org/guide/migration/global-api.html#a-new-global-api-createapp) factory function. Because of 
this new format, during the testing phase the plugins and widgets aren't hooked up globally any more, but instead on a 
test-by-test basis through the `setupOptions` utility function.

The examples in the scaffolding have been rewritten to the Composition API, and the web components wrapper has been made compatible
with the [new render function API](https://v3.vuejs.org/guide/migration/render-function-api.html#overview).

### Deprecated

In order to simplify npm scripts, also using more conventional names the following one have been deprecated.

- **npm scripts** `npm run dev` and `dev:localhost`. Use `npm start` and `npm run start:localhost` instead.
- **npm scripts** `npm run storybook:build`. Use `npm run pages` instead for a `GitLab Pages` ready format.
- **npm scripts** `npm run unit:watch`. Use `npm run unit --watch` or simply `npx jest --watch` instead.

### Changed
- **Vue** and its related dependencies have been upgraded to `Vue 3`.
- Replaced CleanWebpackPlugin with [Webpack 5's `output.clean` option](https://webpack.js.org/guides/output-management/#cleaning-up-the-dist-folder).
- Replaced file-loader with [Webpack 5's Asset Modules](https://webpack.js.org/guides/asset-modules/).
- **package.json** Updated to latest supported dependencies. Note that `npm outdated` will now show packages both from `Vue v3` even though they are in their latest form. This will be resolved once `Vue 3` will become the default version.

### Added
- **package.json** Now has two more standard scripts: `start` (running `dev` for backwards compatibility) and `pages` (running `storybook:build`)
- **terser-webpack-plugin** Not because it's directly used but as a workaround for an open [Storybook build bug](https://github.com/storybookjs/storybook/issues/13893#issuecomment-791287980).

## 11.6.0 - 2021-02-26
### Changed
- **Storybook** Has been updated to `6.2-beta-4` now supporting **Webpack 5** and **bookmarkable Story args**.
- **Webpack** Has been updated to the latest `v5` now with **simpler setup** and experimental **ESM support**. 
- **package.json** Updated to latest stable dependencies.

### Fixed
- **Webpack + Babel** No longer need to process `@lion/` and `@open-wc/` with `babel` as `Webpack 5` now understands optional chaining.
- **Webpack** Remove explicit `sourceMap` option for style loaders. They are no longer needed.
- **Webpack** Remove mode-dependent hashing. Use `[contenthash]` always, as it no longer interferes with development mode.
- **Webpack** Apply minor simplifications to the configs.
- Removed `eslint-config-vue`, because it was deprecated and superseded by `eslint-plugin-vue`.
- Replaced deprecated `babel-eslint` with `@babel/eslint-parser`.
- Removed `@babel/plugin-proposal-optional-chaining` from the dependencies and Babel config, as it is now part of `@babel/preset-env`.

## 11.5.0 - 2021-01-12
### Changed
- **test/utils** `createComponent` and `mountComponent` have been replaced by a combination of `setupOptions` and the `@vue/test-utils`. This allows for relying on the [API of the test utils](https://vue-test-utils.vuejs.org/api/) and offer the app's own setup as a test helper.
- **package.json** Updated to latest supported dependencies. Note that `Webpack` remained on v4 until [Storybook supports it](https://github.com/storybookjs/storybook/issues/9216).
- **Webpack** Added `.js` extension to `build/webpack.config.js` in the `package.json` to be compatible with `Webpack 5` future expectations.

### Added
- **test/utils** Added `JSDoc` to `setupOptions` and `setupStore` to allow better code assist and in-place docs on how to use the helpers.

## 11.4.1 - 2020-12-08
### Changed
- **Webpack / fonts** Dropped unused IE11 font `eot`. Added support for `otf`.
- **package.json** Updated to latest supported dependencies.
- **Storybook + Bulma** Bulma interferes with the Storybook code sample styling previously done by `highlight.js`, now via `prism.js`. The `.storybook/fix-prismjs-js.css` to counteract it has been renamed as well, imported by the `.storybook/preview.js`.

### Fixed
- **Webpack / fonts** No longer use `url-loader` to inline small (<10kB) `woff` and `woff2` files tripping over some strict `Content Security Policy` rules. Also dropped the `url-loader` altogether.

## 11.4.0 - 2020-11-04
### Added
- **test/utils** now supports replacing the store actions with async mocks. Set via the `mockActions` option, `mountComponent` and `mountComponent` has it on by default, while `setupStore` leaves the actions as is. This is to cater for testing that components dispatch the right actions, independently of what those do. In contrast, the store itself is expected to be integration tested with the real implementations.
- **local .npmrc** is now ignored to allow locally overriding the registry or user credentials.
- **Storybook** now includes the [essential-addons](https://storybook.js.org/docs/vue/essentials/introduction) allowing automatic doc generation, viewport.

### Fixed
- **eslint/vue** now using PascalCased component names.
- **Webpack** removed deprecated `optimization.moduleIds = 'hashed'` option.
- **browserslistrc** no longer targets old, `pre-Chromium` versions of `Edge` resulting in a smaller bundle size.
- **jsdoc.json** configuration missing config the codebase already relied on

### Changed
- Replaced `Buefy / BModal` popup example with `Lion Components / LionDialog` webcomponent. This change allows `Bulma` focusing on theming and `Lion` on behavior and accessibility. Additionally, neither of these technologies lock the frontend in the `Vue` ecosystem.
- Removed the `@charset` from the scss files.
According to ["Input Encoding" in the sass docs](https://sass-lang.com/documentation/syntax/parsing#input-encoding), UTF-8 is used as the default encoding. Additionally, dart-sass (which is used here) only supports UTF-8. So, the `@charset` was not just redundant, but also harmful as it suggested that another character set was also an option.
- **package.json** Updated to latest supported dependencies.

## 11.3.0 - 2020-08-24
### Added
- **Webpack** Now prepends `DEV_HOST` (defaulting to `''`) to both the `public path` and `api path`. This allows anchoring requests to the right host if there is another one serving the page.
- **package.json** Has a `dev:localhost` script setting the `DEV_HOST` to `http://localhost:3000`. This option is intended to be used for some of the microfrontend use cases.
- **VueRouter** Added handler for unmatched route to address dev-time confusion regarding why a blank page might render.

### Changed
- **package.json** Updated to latest dependencies.

## [11.2.5] - 2020-08-17
### Changed
- **package.json** Updated to latest dependencies. Most notably, [Storybook v6](https://github.com/storybookjs/storybook/blob/next/CHANGELOG.md#600-august-10-2020).

## [11.2.4] - 2020-07-30
### Added
- **CLI / api.js** `default_api_path` and `API_PATH` env (takes precedence) have been added to allow independently setting the api from the `publicPath`
- **.gitignore** `local/` local dev utility directory is ignored

### Changed
- **package.json** Updated to latest dependencies.

## [11.2.3] - 2020-07-24
### Removed
- **editorconfig** Removed `indent_size`, a leftover from space indentation.

### Changed
- **package.json** Updated to latest dependencies.

## [11.2.2] - 2020-07-07
### Removed
- **Babel** `@babel/polyfill` as it's no longer necessary.

### Changed
- **package.json** Updated to latest dependencies. Unfortunately the 18 `prototype pollution` `minimist` vulnerabilities are still in the project.
- **webpack-merge** `merge` is now a named export as of `v5`.

### Fixed
- **Webpack** Fixed incorrect chunk name for `code-split` route of `the-app.vue`.
- **Webpack** Removed unused `HotModuleReplacementPlugin` import.

## [11.2.1] - 2020-07-06
### Changed
- **Sass** is now backed by the `sass` package instead of `node-sass`. It is built on the faster `dart-sass` implementation compiled into `JavaScript` without the need to use `gyp`.
- **package.json** Updated to latest dependencies.

### Fixed
- **Jest** Subtle `moduleNameMapper` config issue ignoring the `/` following the `src` and `test` aliases.
- **Webpack** Removed `HotModuleReplacementPlugin` from config, as it's automatically added in `development` mode.

## [11.2.0] - 2020-06-12
### Added
- **CLI** Put more attention to code samples and explanations
- **CLI** Enable option to strip out example code when not used for exploring or learning.

## [11.1.0] - 2020-06-11
### Changed
- **package.json** Updated to latest dependencies, including [Bulma v0.9](https://github.com/jgthms/bulma/releases/tag/0.9.0).
- **package.json** `npm run lint` is no longer run together with the `npm run build`. It made `npm run analyze` fail on ESLint errors.

### Added
- **Storybook** Stories are now also gathered from the `.storybook` directory
- **Storybook** Categorization of stories turned on by default.

## [11.0.5] - 2020-05-27
### Changed
- **package.json** Updated to latest dependencies, including [Jest v26.0.1](https://github.com/facebook/jest/releases/tag/v26.0.0).

## Fixed
- **ESLint** Now properly lints `.storybook` also with `VSCode`.
- **td-modal-card.stories.js** Invalid HTML template.

## [11.0.4] - 2020-04-20
### Changed
- **package.json** Updated to latest dependencies. Unfortunately the 18 `prototype pollution` `minimist` vulnerabilities are still in the project.
- **Storybook** Updated to recommended newer form of [configuration](https://medium.com/storybookjs/declarative-storybook-configuration-49912f77b78).
- **spec/test** Removed unnecessary describe block around tests, as the files are already declaring this information, also in the test output. `describe()` still makes sense situationally, for grouping tests ran in different contexts.
- **jest/Vue** Dropped `jest-serializer-vue` being enabled by default. See articles about [The case against snapshot](https://engineering.ezcater.com/the-case-against-react-snapshot-testing) and [Why I stopped using snapshot testing with Jest](https://medium.com/@tomgold_48918/why-i-stopped-using-snapshot-testing-with-jest-3279fe41ffb2).

### Fixed
- **ESLint** Now also lints `.storybook` directory. Also the `.vue` files are explicitly added to files to be linted via `--ext`.
- **Storybook** Now uses correct `main.scss` for importing styles, over the recently renamed `app.scss`.

## [11.0.3] - 2020-03-23
### Fixed
- **create-vue-app** CLI missing package `chew-dir`.

## [11.0.2] - 2020-03-23
### Fixed
- **Jest** Fixed order of mock declarations causing an import of `src/some.svg` to throw errors in while testing.

## [11.0.1] - 2020-03-12
### Changed
- **package.json** Updated to latest dependencies.

### Fixed
- **ESLint** Fixed [vue/prop-name-casing](https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/prop-name-casing.md) rule by removing undocumented options.
- **td-modal-card** Fixed massive typo of using `state` where `data` would've been appropriate.
- **Bulma** Fixed `Bulma` locking the [root font size](https://github.com/jgthms/bulma/blob/master/sass/base/generic.sass#L34) to the default `16px` value of browsers. The purpose is to allow users control the size of `1rem` via their browser `font-size` setting for accessibility reasons.

## [11.0.0] - 2020-03-10
### Major change
- **.browserslistrc** Removed `Internet Explorer` support. Old `Edge` still remains for the time being.

### Changed
- **package.json** Updated to latest dependencies.
- **ESLint** [Dangling commas](https://eslint.org/docs/rules/comma-dangle) are now expected on `multiline`. This is done to allow adding additional lines without modifying the last one with an extra comma (also causing the version control to see it as a change).
- **src/styles** Simplified Bulma setup code also removing `-override` anti-pattern.
- **td-icon** Now mimics the underlying `vue-font-awesome` API with only the prefix swapped out if needed. The code also has an example of the icon definition used directly bypassing the `library`.

## [10.1.0] - 2020-02-20
### Changed
- **package.json** Updated to latest dependencies.
- **webpack** `mode` following `NODE_ENV` conventions over expecting `--mode` via the `CLI`

### Fixed
- **package.json** `npm run prod`, a leftover from the removed `Express` server support is cleaned out.

### Removed
- **eslint-loader** from `Webpack` build. Instead `npm run build` also checks for lint issues, and `npm run dev` no longer runs the linter. Developers are expected to run `npm test` before commit and use an ESLint extension for their IDE instead.

_Thanks for [Jesse van Assen](https://gitlab.com/jessevanassen) for his contribution!_

## [10.0.2] - 2020-01-27
### Fixed
- **eslint** Disabled template literal related rules that triggered recent [babel-eslint#799](https://github.com/babel/babel-eslint/issues/799#issuecomment-568195009) bug as a workaround.

### Changed
- **webpack** Prevent Node.js globals getting polyfilled in the bundle. This option will be removed in `Webpack 5` anyway.
- **package.json** Updated to latest dependencies.

### Removed
- **babel** Both `@babel/plugin-syntax-dynamic-import` and `babel-plugin-transform-dynamic-import` as this language feature now works out of the box since the latest `babel` (testing included).

## [10.0.1] - 2020-01-20
### Changed
- **build** Now uses `[contenthash]` file naming over `[hash]`. This allows typically the `vendor chunk` to keep its URL when only the app changes. Read more [in this article](https://medium.com/@sahilkkrazy/hash-vs-chunkhash-vs-contenthash-e94d38a32208) or in the [webpack docs](https://webpack.js.org/guides/caching/).
- **eslint** Trailing spaces are a warning now. (`"no-trailing-spaces": "warn"`)
- **package.json** Updated to almost latest dependencies. (Keeping `axios` in `0.19.0` to prevent the `0.19.1` [XSS detection bugs](https://github.com/axios/axios/commit/841466416b6851666955113a60ae46830a27003f) caused by a tricky regex.)
- **Storybook** Now uses port `3333` by default instead of a random one.
- **the-app** Received a host of accessibility fixes, even though it's meant to be a placeholder. The changes are marked with explanation comments.

### Added
- **bulma-overrides** Warning against copy-pasting `Bulma` selectors to override arbitrary rules. Every such update is a maintenance cost potentially breaking on upgrade.

## [10.0.0] - 2019-11-28

Now with [Storybook](https://storybook.js.org/docs/guides/guide-vue/) support by default! It's best used to fire up catalogue of
UI elements used by this app. Worried that a theme update breaks your app? Create some example layouts and check them out at a
glance! Run `npm run storybook` for UI development or `npm run storybook:build` to generate a static site.

### Major change
- **/server** With `Express` has been removed. In practice almost all consumers were deleting it either opting for an `NGINX` file server, or static hosting such as `GitLab Pages` or `Netlify`. Those who did retain an app server usually went for `Koa`.
- **/src/store/gateway** Has moved to `/src/api` since the purpose of the module is to isolate the pesky side-effects of networking, now the `/src/store` can be side-effect free making it simpler to test.

### Changed
- **i18n.js** Use the default export of the Webpack-loaded module imported from JSON to prevent confusion.
- **package.json** Updated to latest dependencies.
- **.gitignore** `/public`, the conventional GitLab pages directory is now in ignored

### Added
- **Storybook support** Just drop down a `.stories.js` anywhere in `/src` and you are good to go.
- **dev-server.config.js** Has examples to proxy some requests to a remote server and commented out code for responding on its own.
- **/test/utils** To take care typical higher-level test setup needs, such as spinning up a store with either the `api` or the `http-client` being mocked out.
- **/test/integration** Now has an example of a `deep mounted` app and `vuex store` cases.

## [9.2.8] - 2019-09-24
### Changed
- **package.json** Updated to latest dependencies.

## [9.2.7] - 2019-08-23
### Changed
- **package.json** Updated to latest dependencies.

## [9.2.6] - 2019-07-16
### Added
- **explanations** Added to `Babel` config and the `/build`. 

### Changed
- **package.json** Updated to latest dependencies.

## [9.2.5] - 2019-07-05
### Changed
- **.gitignore** Has now consistent rules for ignoring directories. Thanks to [Ádám T.Nagy](https://gitlab.com/tnagy.adam)!

## [9.2.4] - 2019-07-04
### Added
- **jsconfig.json** Now allowing `IDEs`, such as `Visual Studio Code` to assist with imports coming from aliased paths, such as the `src` and `test` directories.

### Changed
- **package.json** Updated to latest dependencies including `ESLint v6`.

## [9.2.3] - 2019-06-25
### Fixed
- **ESLint** Mixed tabs and spaces.

### Changed
- **Webpack** Get the public path fallback directly from the `package.json`.
- **Webpack** Generate cacheable output in `/dist/assets`.
- **ESLint** Return with an error status if there are lint warnings.

### Added
- **Source** More explanation comments.
- **ESLint** Warning for `debugger` and `alert`.

## [9.2.2] - 2019-06-17
### Fixed
- **ESLint / server** Fixed invalid `.eslintrc.json` in the `/server` dir, and the fact that it wasn't linted on test.

## [9.2.1] - 2019-06-17
### Fixed
- **Babel / PostCSS** Extracted target browser config to `.browserslistrc` file with stricter settings.

## [9.2.0] - 2019-06-17
### Changed
- **Bulma / Buefy** Optimized bundle size by cherry picking the necessary modules.
- **webpack** Converted [deprecated query style loaders](https://webpack.js.org/concepts/loaders/#loader-features) in favor for `options` style.
- **webpack** Renamed CSS chunk file names to more descriptive form.

### Added
- **webpack / babel** Support for dynamic imports in order to support lazy loading required features / components.
- **PostCSS / Autoprefixer** `IE11` support for [CSS Grid](https://css-tricks.com/snippets/css/complete-guide-grid/). Check out [guide](https://css-tricks.com/css-grid-in-ie-css-grid-and-the-new-autoprefixer/) on its support!

### Removed
- **webpack / file-loader** `SVG`s are no longer assumed to be fonts, instead removed rule addressing to make room for potential icon use case.

## [9.1.3] - 2019-06-05
### Changed
- **.eslintrc** Changed to `JSON` format. `YAML` was meant to reduce the clutter. Instead the files got longer and required teams to constantly convert from JSON.
- **package.json** Updated to latest dependencies

## [9.1.2] - 2019-05-25
### Changed
- **package.json** Updated to latest dependencies
- **examples** Updated to latest Font Awesome icon format
- **examples** Favor named exports over default ones

### Removed
- **webpack** Removed unused `less` compiler and loader

## [9.1.1] - 2019-04-17
### Changed
- **package.json** Updated to latest dependencies
- **Babel** Downgraded `core-js` to `v2` due to `IE11` issues

## [9.1.0] - 2019-04-12
### Changed
- **package.json** Updated to latest dependencies
- **Babel** Updated `core-js` to `v3`

### Fixed
- **test** Fixed broken imports

## [9.0.7] - 2019-03-13
### Changed
- **package.json** Updated to latest dependencies
- **code style** Replace `Array.prototype.concat` with `spread syntax`
- **devServer** config has been moved to a single file instead of merging two parts together

### Fixed
- **vue/conventions** renamed `App` to `TheApp` to follow recommended naming conventions
- **jest/example** passing `async` function to `describe`

## [9.0.6] - 2019-01-29
### Changed
- **html-webpack-plugin** Set `chunkSortMode` to `None`. This avoids a latent [Cyclic dependency] issue(https://github.com/jantimon/html-webpack-plugin/issues/981#issuecomment-406558538) set off when trying to integrate with `Stencil` components.

## [9.0.5] - 2019-01-24
### Removed
- **vue-loader** No longer is appended to style loading pipe due to request to make it simpler to use CSS modules
- **webpack** Remove unused resolveLoader rule

### Changed
- **code style** Replace `Object.assign({}, foo, bar)` with simpler `{ ...foo, ...bar }` where object mutation was not needed

### Added
- **.gitignore** Ignore `Visual Studio Code` local `.history` directory

## [9.0.4] - 2019-01-04
### Changed
- **package.json** Updated to latest dependencies
- **editorconfig** Use space indentations in `yaml` files

### Added
- **Comments** About some of the encountered anti-patterns: _deep-reffing_ in tests and _scoped-style bloat_

## [9.0.3] - 2018-11-05
### Changed
- **package.json** Updated to latest dependencies
- **Babel** Polyfill browsers by usage instead of always including everything
- **ESlint** Allowed using double quotes to avoid escaping single ones

## [9.0.2] - 2018-09-19
### Fixed
- **Babel - Jest** Fix failing tests by converting `.babelrc` to `babel.config.js`. See: https://github.com/facebook/jest/issues/6229#issuecomment-420170801

## [9.0.1] - 2018-09-19
### Changed
- **Buefy** Removed temporary babel-hack to cherry pick elements and use the now official `/dist` components
- **Babel** Updated to `v7`
- **package.json** Updated dependencies to latest versions

## [9.0.0] - 2018-09-14
### Changed
- **Scaffolding** Migrated from `slush` generator to `npm initializer` + example repo.

## [8.3.0] - 2018-08-06
### Added
- **Vuex** Is now used by default for state management
- **babel** `Stage 3` features have been enabled to allow using the `rest/spread operator`

## [8.2.3] - 2018-08-06
### Added
- **webpack.base.config.js** `sourcemap` option for style loaders
- **sass** added `resolve-url-loader` to fix relative `url` imports in `sass` / `scss` files

## [8.2.2] - 2018-08-02
### Removed
- **express-static** Unused dependency which has been replaced by the built-in middleware a while ago

## [8.2.1] - 2018-08-02
### Fixed
- **Scaffolding** Reverted string templates as it tipped off the template compiler

## [8.2.0] - 2018-08-02
### Added
- **PostCSS** Turn on `Stage 3+` features including `CSS grids` with `postcss-preset-env`
- **Networking** Some clarification on how to proxy requests to 3rd party APIs

### Changed
- **ESlint** Fixed `/server` directory

### Fixed
- **Bulma** Modal dialog can now be closed with the `X` in the top right corner. It's also centerd in `IE11` now.

## [8.1.1] - 2018-08-02
### Changed
- **package.json** Updated to latest dependencies
- **jest** Set `testURL` to make tests using `localStorage` pass

## [8.1.0] - 2018-07-20
### Changed
- **test** Moved `specs` together with source. This results in less up and down scrolling when doing TDD as the repo grows.
- **ESlint** Converted format to `YAML`. The extensionless `.eslintrc` has been deprecated anyway: https://eslint.org/docs/user-guide/configuring#configuration-file-formats

## [8.0.0] - 2018-07-19
### Breaking changes
- Replaced `Karma` + `Mocha` + `Sinon` + `Chai` + `Webpack test config` with `Jest`

### Added
- **Jest** Now supporting parallel test run, ability to only run failed / specific tests and DOM isolation

### Changed
- **package.json** Updated to latest dependencies

## [7.2.5] - 2018-07-03
### Fixed
- **package.json** Fix public path not being properly set by prompts.

## [7.2.4] - 2018-06-27
- Updated dependencies to latest major version

## [7.2.3] - 2018-06-27
- Updated dependencies to latest stable version

### Changed
- `webpack.base.config.js` no longer adds style related rules in test mode
- `webpack.test.config.js` also ignore `sass` and `scss` extensions

## [7.2.2] - 2018-06-19
### Fixed 
- **gulp-install** is no longer being used. It already didn't work and it started to interfere with the generation.

## [7.2.1] - 2018-06-19
### Changed
- **Font Awesome** CSS is explicitly bundled instead of being runtime injected with inline styles
- **cs-icon** has been renamed to **td-icon**

## [7.2.0] - 2018-06-19
### Changed 
- **.editorconfig** now uses tabs by default by popular request
- **.eslintrc** warns on not indenting with tabs
- **app** extracted a `component` and a `widget` as an example of breaking down large components

### Added
- **Font Awesome 5** icon support with example

## [7.1.1] - 2018-06-12
### Fixed
- `webpack.base.config.js` misleading the `gulp-template` engine

## [7.1.0] - 2018-06-12
### Added
- **Babel** Now uses white listing over banning `node_modules` to allow cherry bundling some packages from source, such as `Buefy`
- **Buefy** components are now cherry picked and bundled in to reduce bundle size
- **Bulma** theming and override support added via `src/styles`
- **Vue** files can now be imported without extension and can represent a directory

## [7.0.0] - 2018-06-12
### Breaking changes
- Updated linter rules to use recommended Vue.js settings: https://vuejs.org/v2/style-guide/

### Changed
- Recommended project structure, for smaller files
- `src/store/index.js` uses separate functions to allow them calling each other without using `this`
- `gateway.js` moved into `store` as an implementation detail of it

## [6.1.0] - 2018-06-12
### Changed
- Replace `PhantomJs` with `Jsdom` for smaller test footprint. Also disabling `Vue` transitions, as `Jsdom` does not support them

## [6.0.10] - 2018-06-12
### Changed
- Updated dependencies to latest stable version

## [6.0.9] - 2018-04-25
### Fixed
- ```.eslintrc``` readd missing files

## [6.0.8] - 2018-04-25
### Changed
- Update ```vue-loader```, ```mini-css-extract-plugin```, and ```bulma``` to latest major version

### Added
- Add content hash to generated bundles

## [6.0.7] - 2018-04-25
### Changed
- Updated dependencies to latest stable version

### Added
- Added example of store pattern, unit and integration testing

## [6.0.6] - 2018-03-22
### Fixed
- **vue-loader** Fixed ignored less compilation setting


## [6.0.5] - 2018-03-22
### Fixed
- **app.vue** Corrected public path setting location

## [6.0.4] - 2018-03-22
### Fixed
- **.eslintrc** Split by context
- **test** Fixed typo in comments

## [6.0.3] - 2018-03-22
### Changed
- **babel** no longer compiles code to ```CommonJs``` modules

### Fixed
- **webpack.config** relocated ```devServer``` config
- **webpack.test.config** Removed reference of Semantic UI
- **main** Fixed lint error

## [6.0.2] - 2018-03-22
### Fixed
- **vue-loader** No longer uses a template compiler at runtime, instead templates in ```.vue``` components are converted to render functions.

## [6.0.1] - 2018-03-22
### Fixed
- **package.json** Removed leftover Semantic UI fix script

## [6.0.0] - 2018-03-22
### Breaking changes
- **semantic-ui-less** Has been replaced by ```Bulma```
- **jquery** Has been removed

### Added
- **bulma** To replace ```Semantic UI``` with a more modern, light weight alternative
- **buefy** For ```Vue.js``` convenience to use ```Bulma```
- **vue-focus-trap** To address lack of focus trapping behavior in modals

## [5.5.2] - 2018-03-22
### Changed
- Updated generator dependencies to latest version

## [5.5.1] - 2018-03-22
### Changed
- Updated dependencies to latest version

## [5.5.0] - 2018-03-10
### Changed
- Updated to ```Webpack 4```
- Replaced ```extract-text-webpack-plugin``` with ```mini-css-extract-plugin```
- Moved ```HotModuleReplacementPlugin``` out of ```base``` config, as tests don't need it

### Fixed
- Warnings in ```.eslintrc```

## [5.4.0] - 2017-11-24
FYI: a ```public path``` is where your site is expected to be served from.
Eg. if using ```GitLab pages``` your site will be served from ```https://yourname.gitlab.io/your-project/```. In this case your public path is ```/your-project/```.

### Added
- **webpack** Public path can now be configured outside of source code
  - in ```package.json > config``` to set the default
  - which can be overridden by the ```PUBLIC_PATH``` environment variable
- **vue-loader** now extracts CSS from components. This reduces problems when using stricter ```Content-Security-Policy``` headers

### Fixed
- **server** ```npm run prod``` works again, also now redirects to the ```public path``` from the ```/```

## [5.3.0] - 2017-10-27
### Removed
- **package.json**
  - ```json-loader```, ```shortid```, and ```style-loader``` as they were not required (Webpack can now load JSON files out of box)
  - ```npm prune``` postinstall script: it used to be a convenience so that devs don't forget to --save[-dev] install ed packages. ```NPM 5``` now does this out of box

### Changed
- **package.json** Updated dependencies to latest versions
- **.babelrc** replaced ```babel-preset-es2015``` with ```babel-preset-env``` as per the recommended here: ```babeljs.io/env```
- **webpack-dev-server** Now allows connections outside from ```localhost```

### Fixed
- **/test/index.js** Now ignores ```index.html``` and no longer needs the ```webpack.test.config.js``` to use the ```null-loader``` for it causing warnings
- **/dev-server.config.js** Warning due to using deprecated ```setup``` hook

## [5.2.1] - 2017-09-05
### Fixed
- **webpack.test.config** Fixed failing test by not loading HTML files

## [5.2.0] - 2017-09-05
### Fixed
- **eslint** Ignore ```node_modules``` and ```dist```
- **dev-server.config**, **wepback.config** Fixed broken public path: The ```dist``` should not be included in it

### Added
- **HtmlWebpackPlugin** to infer and required CSS and JS. **CopyWebpackPlugin** is no longer necessary
- **CommonsChunkPlugin** to automatically split out vendor code (all node_modules and bundled Semantic UI style)

### Changed
- **package.json** Updated dependencies to latest versions
- **npm run dev** No longer auto-opens a browser tab: the ```--open``` is not a stable flag recently

## [5.1.1] - 2017-08-10
### Fixed
- **defaults** Fixed error on missing git user in config

## [5.1.0] - 2017-08-04
### Added
- **webpack** bundle size analyze ran via ```npm run analyze```

## [5.0.1] - 2017-07-27
### Changed
- **webpack** simplified production build via the ```-p``` option and one less entry
- **vue-loader** downgraded to ```12.2.2``` to avoid ```inject-loader``` based bug

### Fixed
- ```Vue``` not being used warning 

## [5.0.0] - 2017-07-15
### Added
- **Hot Module Reload** turned on with ```webpack-dev-server```

### Changed
- **server.js** moved to its own package as **index.js** only being used for production

### Removed
- Dropped ```concurrently``` and ```reloadify``` as dependencies

## [4.5.2] - 2017-07-13
### Fixed
- **webpack.base.config.js** Fixed broken font and image paths

## [4.5.1] - 2017-07-13
### Changed
- **package.json** Simplified scripts

## [4.5.0] - 2017-07-13
### Changed
- **package.json** Updated to latest dependencies
- Various separation of concerns fixes

## [4.4.0] - 2017-02-27
### Fixed
- **package.json** Fixed prod and dev dependencies

## [4.3.1] - 2017-02-15
### Fixed
- **webpack** Added missing postcss-loader config to allow autoprefixing css
