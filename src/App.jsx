import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ConvocationsPage from "./features/convocations/presentation/pages/ConvocationsPage";
import ConvocationDetailPage from "./features/convocations/presentation/pages/ConvocationDetailPage";
import CreateApplicationPage from "./features/applications/presentation/pages/CreateApplicationPage";
import ApplicationsPage from "./features/applications/presentation/pages/ApplicationsPage";
import ApplicationDetailPage from "./features/applications/presentation/pages/ApplicationDetailPage";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/convocations" element={<ConvocationsPage />} />
          <Route
            path="/convocations/:id"
            element={<ConvocationDetailPage />}
          />
          <Route
            path="/convocations/:id/apply"
            element={<CreateApplicationPage />}
          />
          <Route path="/mis-postulaciones" element={<ApplicationsPage />} />
          <Route
            path="/applications/:id"
            element={<ApplicationDetailPage />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
