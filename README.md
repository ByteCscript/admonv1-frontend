# Frontend Architecture

This frontend is built with **React + Vite** and follows a **feature-first architecture based on Clean Architecture principles**.

The main architectural objective is to separate business rules, application logic, external integrations, and UI concerns so that React components are not directly coupled to backend APIs or infrastructure details.

---

## 🛠️ Technologies

The frontend currently uses:

* **React**
* **Vite**
* **JavaScript**
* **React Router**
* **Fetch API**
* **CSS**
* **ESLint**

React is responsible for building the user interface, while Vite provides the development environment and production build process.

React Router handles client-side navigation.

Communication with the backend is implemented through infrastructure adapters using the native Fetch API.

---

## 🏗️ Architectural Style

The project follows a **Feature-First Clean Architecture** approach.

Instead of organizing the entire application exclusively by technical type:

```text
components/
pages/
services/
api/
```

the application is organized primarily around **business features**:

```text
features/
├── authentication/
├── convocations/
├── applications/
└── documents/
```

Each feature owns the components and logic required to implement its business capability.

Internally, features are divided into architectural layers:

```text
feature/
├── domain/
├── application/
├── infrastructure/
└── presentation/
```

This provides two levels of organization:

```text
Business Feature
      │
      ├── Domain
      ├── Application
      ├── Infrastructure
      └── Presentation
```

The feature defines **what business capability the code belongs to**, while the internal layers define **what responsibility the code has**.

---

## 🧱 Clean Architecture Layers

The dependency flow follows the principles of Clean Architecture:

```text
┌──────────────────────────────┐
│         Presentation         │
│   React Pages / Components   │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│          Application         │
│           Use Cases          │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│            Domain            │
│      Business Concepts       │
└──────────────────────────────┘

        Infrastructure
              │
              │ implements / integrates
              ▼
     Backend APIs / HTTP
```

The important rule is that business and application logic should not depend directly on React components or HTTP implementation details.

---

## 📂 Feature Structure

A feature can follow a structure similar to:

```text
src/features/
└── convocations/
    ├── domain/
    │   ├── entities/
    │   └── repositories/
    │
    ├── application/
    │   └── use-cases/
    │
    ├── infrastructure/
    │   └── api/
    │
    └── presentation/
        ├── components/
        └── pages/
```

The exact contents of each feature may vary depending on its complexity.

Not every feature is required to contain every possible folder.

---

## 🧠 Domain Layer

The `domain` layer contains concepts that represent the business.

```text
domain/
├── entities/
└── repositories/
```

Typical responsibilities include:

* Business entities.
* Domain models.
* Repository contracts.
* Business concepts independent from React.
* Rules that do not depend on infrastructure.

The domain layer should avoid dependencies on:

```text
React
React Router
Fetch API
HTTP
Browser APIs
Backend implementation details
```

This keeps business concepts isolated from external technologies.

---

## ⚙️ Application Layer

The `application` layer contains the **use cases** of the application.

```text
application/
└── use-cases/
```

Examples include operations such as:

```text
fetchConvocations
fetchConvocationById
checkApplicationEligibility
createApplication
fetchApplications
```

A use case represents an action that the application can perform.

The presentation layer should invoke these use cases instead of implementing business workflows directly inside React components.

Conceptually:

```text
React Page
    │
    ▼
Use Case
    │
    ▼
Repository / Gateway
```

This keeps pages focused primarily on UI state, events and rendering.

---

## 🔌 Infrastructure Layer

The `infrastructure` layer contains implementations that communicate with external systems.

```text
infrastructure/
└── api/
```

This includes concerns such as:

* Backend HTTP requests.
* Fetch API.
* Authentication headers.
* API endpoints.
* Request/response transformations.
* External storage integrations.

For example:

```text
GET  /api/calls
GET  /api/calls/:id
POST /api/applications
POST /api/documents/presigned-url
```

Infrastructure is therefore responsible for **how information is obtained**, while the application layer defines **what operation needs to be performed**.

---

## 🖥️ Presentation Layer

The `presentation` layer contains everything directly related to React and the user interface.

```text
presentation/
├── pages/
└── components/
```

### Pages

Pages represent complete application screens associated with routes.

Their responsibilities include:

* Coordinating UI state.
* Reading route parameters.
* Calling application use cases.
* Handling loading/error states.
* Rendering components.

### Components

Components contain reusable UI elements used by pages or other components.

Examples may include:

```text
Loading
ErrorMessage
StatusBadge
Navbar
```

Business logic and direct backend communication should be kept outside reusable presentation components whenever possible.

---

## 🔄 Request Flow

A typical request follows this flow:

```text
User
 │
 ▼
React Page
 │
 ▼
Application Use Case
 │
 ▼
Repository / Gateway
 │
 ▼
Infrastructure API Adapter
 │
 ▼
Backend API
```

The response travels back through the same abstraction boundaries:

```text
Backend API
 │
 ▼
Infrastructure Adapter
 │
 ▼
Application
 │
 ▼
Presentation
 │
 ▼
User Interface
```

This prevents pages from becoming tightly coupled to backend implementation details.

---

## 📦 Feature Independence

Each feature should contain the logic associated with its own business capability.

For example:

```text
features/
├── authentication/
├── convocations/
├── applications/
└── documents/
```

The goal is to avoid a global structure where unrelated business functionality becomes mixed inside generic folders such as:

```text
pages/
services/
api/
components/
```

Feature ownership makes the codebase easier to navigate and allows functionality to evolve with fewer dependencies between unrelated modules.

---

## 🔐 Authentication

Authentication should be treated as its own application capability rather than embedding authentication logic directly into unrelated features.

Conceptually:

```text
Authentication
      │
      ▼
Token Management
      │
      ▼
Infrastructure API Requests
      │
      ▼
Authorization: Bearer <token>
```

Other features may consume authentication information, but they should not be responsible for implementing the login process themselves.

---

## 🌐 Backend Communication

Frontend features communicate with the backend through infrastructure adapters.

The presentation layer should avoid patterns such as:

```text
React Component
      │
      ▼
fetch(...)
```

The preferred flow is:

```text
React Component
      │
      ▼
Use Case
      │
      ▼
Gateway / Repository
      │
      ▼
Fetch API
```

This provides a clear boundary between UI code and external communication.

---

## 🧩 Architectural Principles

The architecture follows several principles:

### Separation of Concerns

Each layer has a clearly defined responsibility.

### Dependency Direction

Business logic should not depend directly on presentation or infrastructure details.

### Feature Ownership

Business functionality is grouped by feature rather than exclusively by technical type.

### Low Coupling

React components should have minimal knowledge about backend implementation details.

### High Cohesion

Code related to the same business capability remains close together.

### Replaceable Infrastructure

HTTP implementations can evolve without requiring major changes to presentation or business logic.

---

## 🧭 Architectural Overview

```text
src/
│
├── features/
│   │
│   ├── authentication/
│   │   ├── domain/
│   │   ├── application/
│   │   ├── infrastructure/
│   │   └── presentation/
│   │
│   ├── convocations/
│   │   ├── domain/
│   │   ├── application/
│   │   ├── infrastructure/
│   │   └── presentation/
│   │
│   ├── applications/
│   │   ├── domain/
│   │   ├── application/
│   │   ├── infrastructure/
│   │   └── presentation/
│   │
│   └── documents/
│       ├── domain/
│       ├── application/
│       ├── infrastructure/
│       └── presentation/
│
├── shared/
│   └── ...
│
├── App.jsx
└── main.jsx
```

---

## 📌 Architecture Summary

```text
Architecture     : Clean Architecture principles
Organization     : Feature First
UI               : React
Build Tool       : Vite
Routing          : React Router
HTTP Client      : Fetch API

Feature Layers:
  Domain         → Business concepts and contracts
  Application    → Use cases
  Infrastructure → API implementations and external services
  Presentation   → React pages and components
```

The architecture is designed to allow the frontend to grow by adding or evolving business features without concentrating application logic inside React components or creating direct dependencies between the UI and external services.
