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