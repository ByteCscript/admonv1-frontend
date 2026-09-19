# Graph Report - admonv1-frontend  (2026-09-18)

## Corpus Check
- Corpus is ~8,386 words - fits in a single context window. You may not need a graph.

## Summary
- 214 nodes · 373 edges · 12 communities
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Application Use Cases
- Application Domain
- App Routing
- Package Config
- UI Components
- Presentation Layer
- Convocations Logic
- Auth Domain
- Document Management
- Dev Tooling

## God Nodes (most connected - your core abstractions)
1. `react` - 13 edges
2. `authenticatedFetch()` - 11 edges
3. `react-router-dom` - 10 edges
4. `ApplicationRepository` - 7 edges
5. `HttpAuthRepository` - 7 edges
6. `Loading()` - 6 edges
7. `ErrorMessage()` - 6 edges
8. `uploadDocumentRequest()` - 6 edges
9. `HttpApplicationRepository` - 6 edges
10. `AuthRepository` - 6 edges

## Surprising Connections (you probably didn't know these)
- `generatePresignedUrl()` --calls--> `authenticatedFetch()`  [EXTRACTED]
  src/features/applications/infrastructure/api/documents.api.js → src/shared/infrastructure/http/authenticatedFetch.js
- `completeDocument()` --calls--> `authenticatedFetch()`  [EXTRACTED]
  src/features/applications/infrastructure/api/documents.api.js → src/shared/infrastructure/http/authenticatedFetch.js
- `CreateApplicationPage()` --calls--> `useConvocation()`  [EXTRACTED]
  src/features/applications/presentation/pages/CreateApplicationPage.jsx → src/features/convocations/presentation/hooks/useConvocation.js
- `HttpApplicationRepository` --inherits--> `ApplicationRepository`  [EXTRACTED]
  src/features/applications/infrastructure/repositories/HttpApplicationRepository.js → src/features/applications/domain/repositories/ApplicationRepository.js
- `HttpDocumentRepository` --inherits--> `DocumentRepository`  [EXTRACTED]
  src/features/applications/infrastructure/repositories/HttpDocumentRepository.js → src/features/applications/domain/repositories/DocumentRepository.js

## Import Cycles
- None detected.

## Communities (12 total, 0 thin omitted)

### Community 0 - "Application Use Cases"
Cohesion: 0.09
Nodes (12): CreateApplication, GetApplicationById, GetApplications, UploadDocument, applicationRepository, createApplicationUseCase, documentRepository, getApplicationByIdUseCase (+4 more)

### Community 1 - "Application Domain"
Cohesion: 0.13
Nodes (10): ApplicationRepository, createApplicationRequest(), fetchApplicationById(), fetchApplications(), HttpApplicationRepository, ConvocationRepository, fetchConvocationById(), fetchConvocations() (+2 more)

### Community 2 - "App Routing"
Cohesion: 0.13
Nodes (12): react, react-router-dom, App(), Navbar(), Login, authRepository, loginUseCase, tokenStorage (+4 more)

### Community 3 - "Package Config"
Cohesion: 0.09
Nodes (23): dependencies, react, react-dom, react-router-dom, name, private, scripts, build (+15 more)

### Community 4 - "UI Components"
Cohesion: 0.14
Nodes (15): ErrorMessage(), Loading(), StatusBadge(), getApplicationsUseCase, ApplicationCard(), ApplicationDetails(), ApplicationDocuments(), ApplicationStatus() (+7 more)

### Community 5 - "Presentation Layer"
Cohesion: 0.16
Nodes (9): Stepper(), STEPS, Tooltip(), RESIDENT, ApplicationStepper(), ApplicationSummary(), ConvocationInfo(), DocumentUpload() (+1 more)

### Community 6 - "Convocations Logic"
Cohesion: 0.15
Nodes (8): GetConvocationById, GetConvocations, convocationRepository, getConvocationByIdUseCase, getConvocationsUseCase, ConvocationInfo(), useConvocation(), ConvocationDetailPage()

### Community 7 - "Auth Domain"
Cohesion: 0.17
Nodes (4): AuthSession, AuthRepository, loginRequest(), HttpAuthRepository

### Community 8 - "Document Management"
Cohesion: 0.31
Nodes (6): DocumentRepository, completeDocument(), generatePresignedUrl(), uploadBinary(), uploadDocumentRequest(), HttpDocumentRepository

### Community 9 - "Dev Tooling"
Cohesion: 0.20
Nodes (10): devDependencies, eslint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals, @types/react, @types/react-dom (+2 more)

## Knowledge Gaps
- **29 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+24 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 67 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `App Routing` to `Application Use Cases`, `Package Config`, `UI Components`, `Presentation Layer`, `Convocations Logic`?**
  _High betweenness centrality (0.290) - this node is a cross-community bridge._
- **Why does `react-router-dom` connect `App Routing` to `Package Config`, `UI Components`, `Presentation Layer`, `Convocations Logic`?**
  _High betweenness centrality (0.140) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `Dev Tooling` to `Package Config`?**
  _High betweenness centrality (0.082) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _29 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Application Use Cases` be split into smaller, more focused modules?**
  _Cohesion score 0.09259259259259259 - nodes in this community are weakly interconnected._
- **Should `Application Domain` be split into smaller, more focused modules?**
  _Cohesion score 0.12698412698412698 - nodes in this community are weakly interconnected._
- **Should `App Routing` be split into smaller, more focused modules?**
  _Cohesion score 0.12535612535612536 - nodes in this community are weakly interconnected._