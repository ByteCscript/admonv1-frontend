import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ConvocationsPage from "./features/convocations/presentation/pages/ConvocationsPage";
import ConvocationDetailPage from "./features/convocations/presentation/pages/ConvocationDetailPage";
import ApplicationPage from "./pages/ApplicationPage";
import ApplicationsPage from "./pages/ApplicationsPage";
import ApplicationDetailPage from "./pages/ApplicationDetailPage";
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
          <Route path="/convocatoria/:id/postular" element={<ApplicationPage />} />/* Pendiente aca hay que seguir la traza toda en ngles a ApplicationPage */
          <Route path="/mis-postulaciones" element={<ApplicationsPage />} />
          <Route path="/postulacion/:id" element={<ApplicationDetailPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
