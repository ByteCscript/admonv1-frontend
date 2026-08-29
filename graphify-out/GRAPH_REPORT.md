# Graph Report - admonv1-frontend  (2026-08-28)

## Corpus Check
- Corpus is ~4,149 words - fits in a single context window. You may not need a graph.

## Summary
- 72 nodes · 82 edges · 16 communities (8 shown, 8 thin omitted)
- Extraction: 89% EXTRACTED · 11% INFERRED · 0% AMBIGUOUS · INFERRED: 9 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- API Service Layer
- React+Vite Stack
- Package Config
- Social Icons
- React Dependencies
- ESLint Base
- ESLint Core
- React Hooks Lint
- React Refresh Lint
- Globals Package
- React Types
- React DOM Types
- Vite Build
- Vite React Plugin

## God Nodes (most connected - your core abstractions)
1. `Social Media Icon Sprite Sheet` - 7 edges
2. `React + Vite Template` - 6 edges
3. `scripts` - 5 edges
4. `ApplicationPage()` - 4 edges
5. `getCall()` - 4 edges
6. `uploadFile()` - 4 edges
7. `README Documentation` - 4 edges
8. `MiConjunto - Sistema de Gestion Residencial Entry Point` - 4 edges
9. `getCalls()` - 3 edges
10. `createApplication()` - 3 edges

## Surprising Connections (you probably didn't know these)
- `MiConjunto - Sistema de Gestion Residencial Entry Point` --references--> `React Logo`  [INFERRED]
  index.html → src/assets/react.svg
- `Vite Logo` --semantically_similar_to--> `Favicon (Vite Lightning Bolt)`  [INFERRED] [semantically similar]
  src/assets/vite.svg → public/favicon.svg
- `Hero Image - Isometric Container Box` --rationale_for--> `Sistema de Gestion Residencial (MiConjunto)`  [INFERRED]
  src/assets/hero.png → index.html
- `React Logo` --conceptually_related_to--> `React + Vite Template`  [INFERRED]
  src/assets/react.svg → README.md
- `Vite Logo` --conceptually_related_to--> `React + Vite Template`  [INFERRED]
  src/assets/vite.svg → README.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **React + Vite Development Stack** — concept_react_vite_template, src_assets_react_svg, src_assets_vite_svg, public_favicon_svg, index_html [INFERRED 0.85]
- **Social Media Icon Sprite Collection** — public_icons_svg, symbol_bluesky_icon, symbol_discord_icon, symbol_github_icon, symbol_x_icon, symbol_social_icon, symbol_documentation_icon [EXTRACTED 1.00]
- **Application Branding and Identity Assets** — src_assets_hero_png, public_favicon_svg, concept_residencial_management [INFERRED 0.75]

## Communities (16 total, 8 thin omitted)

### Community 0 - "API Service Layer"
Cohesion: 0.24
Nodes (10): createApplication(), generatePresignedUrl(), getCall(), getCalls(), uploadFile(), App(), ApplicationPage(), CallsPage() (+2 more)

### Community 1 - "React+Vite Stack"
Cohesion: 0.27
Nodes (11): Hot Module Replacement (HMR), React Compiler, React + Vite Template, Sistema de Gestion Residencial (MiConjunto), TypeScript ESLint Integration, MiConjunto - Sistema de Gestion Residencial Entry Point, Favicon (Vite Lightning Bolt), README Documentation (+3 more)

### Community 2 - "Package Config"
Cohesion: 0.20
Nodes (9): name, private, scripts, build, dev, lint, preview, type (+1 more)

### Community 3 - "Social Icons"
Cohesion: 0.25
Nodes (8): Social Media Integration Icons, Social Media Icon Sprite Sheet, Bluesky Social Icon, Discord Icon, Documentation Icon, GitHub Icon, Generic Social Icon, X (Twitter) Icon

### Community 4 - "React Dependencies"
Cohesion: 0.29
Nodes (7): dependencies, react, react-dom, react-router-dom, react, react-dom, react-router-dom

### Community 5 - "ESLint Base"
Cohesion: 0.67
Nodes (3): @eslint/js, devDependencies, @eslint/js

## Knowledge Gaps
- **30 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+25 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **8 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `devDependencies` connect `ESLint Base` to `Package Config`, `ESLint Core`, `React Hooks Lint`, `React Refresh Lint`, `Globals Package`, `React Types`, `React DOM Types`, `Vite Build`, `Vite React Plugin`?**
  _High betweenness centrality (0.181) - this node is a cross-community bridge._
- **Why does `dependencies` connect `React Dependencies` to `Package Config`?**
  _High betweenness centrality (0.075) - this node is a cross-community bridge._
- **Are the 5 inferred relationships involving `React + Vite Template` (e.g. with `React Compiler` and `Hot Module Replacement (HMR)`) actually correct?**
  _`React + Vite Template` has 5 INFERRED edges - model-reasoned connections that need verification._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _30 weakly-connected nodes found - possible documentation gaps or missing edges._