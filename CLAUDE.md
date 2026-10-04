# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

**Subnet** — an IPv4 subnet calculator / visual planner. The user enters a root network (CIDR), carves subnets out of it, and sees them on a map. State is shareable via URL (compressed into search params). Scaffolded from [`XenoPOMP/next-template`](https://github.com/XenoPOMP/next-template) (docs: https://next-template-docs.vercel.app/), so much of the tooling (hygen templates, `.config/`, Storybook, Serwist) is template infrastructure rather than app logic.

Stack: Next.js 15 (App Router) + React 19, TypeScript (<6, strict, `noUncheckedIndexedAccess`), Tailwind 3 + SCSS modules, Zustand, TanStack Query, Zod 4, Vitest + Testing Library, Cypress, Storybook 10. Package manager is **Yarn 1** (Node `^22.13 || ^24.11`).

## Commands

```bash
yarn dev                 # next dev (localhost:3000)
yarn build / yarn start  # production build (output: 'standalone') / serve it
yarn lint:code           # eslint --max-warnings=0
yarn lint:css            # stylelint (config in .config/)
yarn lint:ci             # both of the above
yarn unit:test           # vitest in watch mode (config: .config/vitest.config.ts)
yarn coverage            # vitest run --coverage (istanbul)
yarn e2e:ci              # start dev server + cypress headless (e2e = interactive)
yarn storybook           # storybook on :6006
yarn knip                # unused exports/deps (yarn knip:deps for deps only)
yarn fullpack            # regenerate .env.example + engine (node semver) requirements
yarn tauri:dev           # desktop shell; tauri:build sets IS_TAURI=1 (static export)
```

Vitest config lives in `.config/`, so always pass `-c .config/vitest.config.ts`. Run a single test file / test name:

```bash
yarn unit:test run __tests__/unit/ip/network.test.tsx
yarn unit:test run -t "some test name"
```

CI (`.github/workflows/ci.yml`) runs on Node 22 and 24: storybook build → `lint:ci` → coverage → `build` → `e2e:ci`. Husky pre-commit runs lint-staged (eslint on js/ts, stylelint on scss).

New components can be scaffolded with hygen: `_templates/comp/new` generates component, SCSS module, story and test.

## Architecture

### Path aliases (tsconfig)
`@/*` → `src/*`, `@app/*` → `app/*`, `@test/*` → `__tests__/*`, `@public/*` → `public/*`, `~/*` → repo root (e.g. `~/middleware.ts`). Tests mirror `src/` under `__tests__/unit/`; test helpers/fixtures/custom matchers (e.g. `toMatchStructure`) are in `__tests__/assets/` and are excluded from test discovery (see `.config/helpers/test-exclude/`).

### Routing and locale
- `app/(translated)/` holds the only page (`NetForm` + `NetMapContainer` inside `DashboardLayout`).
- `middleware.ts` forces a `?locale=` search param on every request (negotiated from `Accept-Language`, default `en-US`; supported: `en-US`, `ru-RU`). Locale is read from search params, **not** from the path. Translations are plain TS objects in `src/i18n/locales/` (`default.ts` defines the `LanguageResource` shape, `en.ts`/`ru.ts` implement it, `appLocales` maps locale → resource). A new string must be added to all three.
- `next.config.ts` wraps the base config via `src/utils/next/app-config.ts` (`globalNextConfig`: optional MDX and Serwist/PWA wrappers; Serwist is currently disabled). `IS_TAURI=1` switches output from `standalone` to static `export`.

### Domain core (`src/utils/`)
- `utils/ip/` — `Address` (IPv4 as octets/bitmaps) and `Network` (CIDR: address, mask clamped 0–32, derived broadcast, optional `name`/`color`), plus host pools and mask helpers. Pure classes, heavily unit-tested in `__tests__/unit/ip/`.
- `utils/base-number/` — class hierarchy (`BaseNumber` → `Binary`/`Decimal`/…) used by `Address` for base conversion and arithmetic; `BaseNumber` is deliberately non-standalone (`PrivateApiError`).
- `utils/compression/` — URL state serialization. Root network and subnets are stored as LZ-string `compressToEncodedURIComponent` JSON; `decompressRootNetwork` / `decompessSubnets` (sic) validate with Zod and rebuild `Network`/`Address` instances, returning `undefined` / `[]` on invalid input.

### State (`src/zustand/`)
`useNetworkStore` is the central store: `root`, `subnets[]` (`{id: uuid, network}`), and form state (`form.<id>.input/error`, mutated through `lodash.set`). `loadFromSearchParams(root, subnets)` hydrates it from the compressed URL params. `createPersistentStore` is a helper for localStorage-persisted stores (`skipHydration: true`, so hydrate manually via `use-hydrated-store`). Note that store mutations mutate arrays/objects in place before `set` (see `createSubnet`), so don't assume immutable updates when adding code that depends on reference equality.

### Projects (multiple network maps)
`useProjectsStore` (persisted to localStorage under `[subnet]:projects`) holds `projects[]` (`name`, `emoji`, `description`, plus a `snapshot`) and `activeId`. `useNetworkStore` stays the *working copy* of the active project: `getSnapshot()` / `loadSnapshot()` convert it to/from the compressed-string format used by share links (plus raw `form` inputs). `switchProject`/`createProject`/`deleteProject` save the active project, then load the target into the network store. `ProjectSwitcher` (header, right side) calls `useProjectsBootstrap`, which rehydrates the store on mount, loads the active project and autosaves (300 ms debounce) on every network-store change. `NetForm` is keyed by `activeId` because `NetworkInput` keeps local state (name/color) that must be re-initialised from the store on switch. An empty `name` means "untitled" and is localized at render time (`t.projects.untitled`).

### UI and theming
- `src/components/ui/` — layout primitives (`HStack`, `VStack`, `ZStack`, `Stack`), network widgets (`NetMap`, `NetSlider`, `NetworkInput`, `Overlaps`), and `ui/kit/` design-system components (Button, Field, Glass, TabView, …). Each component dir typically has `X.tsx`, `X.props.ts`, `X.variants.ts` (class-variance-authority), `X.module.scss`, `X.stories.tsx`; barrels via `index.ts(x)`.
- `src/components/hoc/` — `slotable` (Radix Slot) and `with-classname`.
- `src/themes/` — Tailwind theming through `tailwindcss-themer` (`definitions/lightTheme|darkTheme`) plus custom plugins (`plugins/custom-classes.ts`, e.g. `.scrollable-x`); `src/styles/` holds SCSS config/mixins and the design-system tokens.
- `src/hooks/`, `src/types/`, `src/errors/`, `src/decorators/` are small shared libraries; `src/utils/env.ts` validates env with Zod (`NEXT_PUBLIC_CANONICAL_URL`, see `.env.example`).

### Tooling conventions
- ESLint is the shared `xenopomp-essentials/eslint` flat config with `deprecation: 'error'` and **required JSDoc on every function declaration/arrow/function expression** (`jsdoc/require-jsdoc`); existing code uses `// eslint-disable-next-line jsdoc/require-jsdoc` where a doc comment is pointless. Warnings fail the lint (`--max-warnings=0`).
- Prettier uses `@trivago/prettier-plugin-sort-imports` and `prettier-plugin-tailwindcss` — don't hand-order imports/classes.
- Stylelint enforces camelCase class names in SCSS modules (custom rule in `.config/helpers/stylelint/`).
- Vitest runs in jsdom with `__tests__/setup.vitest.ts`; stories, `DesignSystem`, `SB_Preview*` files and service-worker output are excluded from coverage.

## Deployment (offline Docker release)

`./release.sh` (run from repo root; needs `jq`, docker buildx) builds a `linux/amd64` image `subnet:<package.json version>` using the multi-stage `Dockerfile` (Next standalone, Node 24 alpine, port 3000) and saves it as a tar into `release/subnet/images/` (colons in the filename normalised to `_`). On the target host `release/subnet/start.sh` loads the tar, writes `FRONT_IMAGE_TAG` to `.env`, and starts `docker-compose.yml` (project `subnet-app`, container `subnet-frontend`, published on `192.168.10.222:9000`). The `start.sh` log messages are in Russian. Bump `version` in `package.json` before releasing.

## Desktop (Tauri)

`src-tauri/` is a Tauri 2 shell (`ru.xenopomp.subnet`) loading `../out` (static export) in production and `http://localhost:3000` in dev; `tauri:build` sets `IS_TAURI=1` so Next exports statically — note that the middleware-based locale redirect does not run in a static export.
