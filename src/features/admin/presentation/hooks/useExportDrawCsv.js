import { useState } from "react";

import { exportDrawCsvUseCase } from "../../admin.dependencies";

// Presentation hook (CU 1.1.2 D5):
// exporta el CSV del sorteo de una convocatoria y dispara la descarga del
// archivo en el navegador. Solo ROLE_ADMIN.
export default function useExportDrawCsv(callId) {
  const [exporting, setExporting] = useState(false);
  const [exportError, setExportError] = useState(null);

  const exportCsv = async () => {
    setExporting(true);
    setExportError(null);

    try {
      const blob = await exportDrawCsvUseCase.execute(callId);

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `sorteo-convocatoria-${callId}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (exportError) {
      setExportError(exportError.message || "No se pudo exportar el CSV del sorteo.");
      throw exportError;
    } finally {
      setExporting(false);
    }
  };

  const clearExportError = () => setExportError(null);

  return {
    exportCsv,
    exporting,
    exportError,
    clearExportError,
  };
}
