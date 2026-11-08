import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import HomePage from "./pages/HomePage";

import Navbar from "./components/Navbar";
import ConvocationsPage from "./features/convocations/presentation/pages/ConvocationsPage";
import ConvocationDetailPage from "./features/convocations/presentation/pages/ConvocationDetailPage";
import CreateApplicationPage from "./features/applications/presentation/pages/CreateApplicationPage";
import ApplicationsPage from "./features/applications/presentation/pages/ApplicationsPage";
import ApplicationDetailPage from "./features/applications/presentation/pages/ApplicationDetailPage";
import LoginPage from "./features/auth/presentation/pages/LoginPage";
import ProtectedRoute from "./features/auth/presentation/components/ProtectedRoute";
import AdminCallsPage from "./features/admin/presentation/pages/AdminCallsPage";
import CreateCallPage from "./features/admin/presentation/pages/CreateCallPage";
import EditCallPage from "./features/admin/presentation/pages/EditCallPage";
import CallDrawPage from "./features/admin/presentation/pages/CallDrawPage";
import CallDrawResultsPage from "./features/admin/presentation/pages/CallDrawResultsPage";
import AdminApplicationsPage from "./features/admin-applications/presentation/pages/AdminApplicationsPage";
import AdminApplicationDetailPage from "./features/admin-applications/presentation/pages/AdminApplicationDetailPage";
import ResidentDrawResultsPage from "./features/convocations/presentation/pages/ResidentDrawResultsPage";

import "./App.css";

function AppRoutes() {
  const location = useLocation();

  const isLoginPage = location.pathname === "/login";

  return (
    <div className="app">
      {!isLoginPage && <Navbar />}

      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Routes */}
        <Route
          path="/convocations"
          element={
            <ProtectedRoute>
              <ConvocationsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/convocations/:id"
          element={
            <ProtectedRoute>
              <ConvocationDetailPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/convocations/:id/apply"
          element={
            <ProtectedRoute>
              <CreateApplicationPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/mis-postulaciones"
          element={
            <ProtectedRoute>
              <ApplicationsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/applications/:id"
          element={
            <ProtectedRoute>
              <ApplicationDetailPage />
            </ProtectedRoute>
          }
        />

        {/* Administration Routes (RN-06: ROLE_ADMIN only) */}
        <Route
          path="/admin/convocations"
          element={
            <ProtectedRoute requiredRole="ROLE_ADMIN">
              <AdminCallsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/convocations/new"
          element={
            <ProtectedRoute requiredRole="ROLE_ADMIN">
              <CreateCallPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/convocations/:id/edit"
          element={
            <ProtectedRoute requiredRole="ROLE_ADMIN">
              <EditCallPage />
            </ProtectedRoute>
          }
        />

        {/* C.U-08 · Ejecutar sorteo de cupos (ROLE_ADMIN only) */}
        <Route
          path="/admin/convocations/:id/draw"
          element={
            <ProtectedRoute requiredRole="ROLE_ADMIN">
              <CallDrawPage />
            </ProtectedRoute>
          }
        />

        {/* CU 1.1.2 D4 · Resultados del sorteo (administrador) */}
        <Route
          path="/admin/calls/:id/draw/results"
          element={
            <ProtectedRoute requiredRole="ROLE_ADMIN">
              <CallDrawResultsPage />
            </ProtectedRoute>
          }
        />

        {/* CU 1.1.2 D4 · Resultados del sorteo (residente autenticado) */}
        <Route
          path="/calls/:id/draw/results"
          element={
            <ProtectedRoute>
              <ResidentDrawResultsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/applications"
          element={
            <ProtectedRoute requiredRole="ROLE_ADMIN">
              <AdminApplicationsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/applications/:id"
          element={
            <ProtectedRoute requiredRole="ROLE_ADMIN">
              <AdminApplicationDetailPage />
            </ProtectedRoute>
          }
        />

        {/* Default Route */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
