import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ConvocationsPage from "./features/convocations/presentation/pages/ConvocationsPage";
import DetailPage from "./pages/DetailPage";
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
          <Route path="/convocatoria/:id" element={<DetailPage />} />
          <Route path="/convocatoria/:id/postular" element={<ApplicationPage />} />
          <Route path="/mis-postulaciones" element={<ApplicationsPage />} />
          <Route path="/postulacion/:id" element={<ApplicationDetailPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
