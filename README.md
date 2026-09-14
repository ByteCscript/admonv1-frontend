# Frontend Architecture

This frontend is built with **React + Vite** and follows a feature-oriented structure inspired by **Clean Architecture**.

The main objective of the architecture is to keep presentation, application logic, domain concepts, and infrastructure concerns separated, reducing coupling between React components and external services.

---

## Technologies

Main technologies used in the frontend:

- **React**
- **Vite**
- **JavaScript**
- **React Router**
- **Fetch API**
- **CSS**
- **ESLint**

React is responsible for the presentation layer, while Vite is used as the development server and build tool.

React Router manages client-side navigation between pages and features.

HTTP communication with the backend is currently implemented using the native Fetch API.

---

## Architectural Style

The project follows a modular structure based on business features.

Instead of organizing the entire application only by technical type:

```text
components/
pages/
services/