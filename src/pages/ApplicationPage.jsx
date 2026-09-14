import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCall, uploadFile, createApplication } from "../api";
import { RESIDENT } from "../constants";
import Stepper from "../components/Stepper";
import { Loading, ErrorMessage } from "../components/UI";

export default function ApplicationPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [call, setCall] = useState(null);
  const [step, setStep] = useState(0);
  const [files, setFiles] = useState([]);
  const [result, setResult] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [loadingCall, setLoadingCall] = useState(true);
  const fileInputRef = useRef(null);
  const dragRef = useRef(null);

  useEffect(() => {
    getCall(id)
      .then((c) => {
        setCall(c);
        setLoadingCall(false);
      })
      .catch(() => setLoadingCall(false));
  }, [id]);

  const handleFile = async (file) => {
    if (!file || file.type !== "application/pdf") {
      alert("Solo se permiten archivos PDF.");
      return;
    }
    const entry = {
      id: crypto.randomUUID(),
      name: file.name,
      size: file.size,
      progress: 0,
      status: "uploading",
      documentId: null,
    };
    setFiles((prev) => [...prev, entry]);
    try {
      const doc = await uploadFile(file, (p) =>
        setFiles((prev) =>
          prev.map((f) => (f.id === entry.id ? { ...f, progress: p } : f))
        )
      );
      setFiles((prev) =>
        prev.map((f) =>
          f.id === entry.id
            ? { ...f, status: "done", progress: 100, documentId: doc.id }
            : f
        )
      );
    } catch {
      setFiles((prev) =>
        prev.map((f) => (f.id === entry.id ? { ...f, status: "error" } : f))
      );
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    dragRef.current?.classList.remove("dragover");
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    dragRef.current?.classList.add("dragover");
  };
  const handleDragLeave = () =>
    dragRef.current?.classList.remove("dragover");
  const removeFile = (fid) =>
    setFiles((prev) => prev.filter((f) => f.id !== fid));

  const uploadedIds = files
    .filter((f) => f.status === "done" && f.documentId)
    .map((f) => f.documentId);
  const canSubmit = uploadedIds.length > 0;

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const app = await createApplication(Number(id), RESIDENT.id, uploadedIds);
      setResult(app);
      setStep(2);
    } catch {
      alert("Error al registrar la postulacion.");
    }
    setSubmitting(false);
  };

  if (loadingCall) return <Loading />;
  if (!call) return <ErrorMessage>Convocatoria no encontrada.</ErrorMessage>;

  if (step === 2 && result) {
    return <ConfirmationStep result={result} call={call} files={files} navigate={navigate} />;
  }

  return (
    <div className="page">
      <Stepper current={step} />
      <div className="form-layout">
        <div className="form-card">
          <h2>Informacion de la Postulacion</h2>
          <ResidentInfo />
          <CallInfo call={call} />

          {step === 0 && (
            <div className="form-actions" style={{ marginTop: 24 }}>
              <button
                className="btn btn-primary"
                onClick={() => setStep(1)}
              >
                Continuar
              </button>
            </div>
          )}

          {step === 1 && (
            <div className="form-actions" style={{ marginTop: 24 }}>
              <button
                className="btn btn-secondary"
                onClick={() => setStep(0)}
              >
                Atras
              </button>
              <button
                className="btn btn-primary"
                disabled={!canSubmit || submitting}
                onClick={handleSubmit}
              >
                {submitting ? "Enviando..." : "Confirmar y Enviar"}
              </button>
            </div>
          )}
        </div>

        {step === 1 && (
          <DocumentUpload
            files={files}
            fileInputRef={fileInputRef}
            dragRef={dragRef}
            handleDrop={handleDrop}
            handleDragOver={handleDragOver}
            handleDragLeave={handleDragLeave}
            handleFile={handleFile}
            removeFile={removeFile}
          />
        )}
      </div>
    </div>
  );
}

function ResidentInfo() {
  return (
    <div className="resident-box">
      <div className="resident-box-title">DATOS DEL RESIDENTE</div>
      <div className="resident-grid">
        <div>
          <div className="resident-field-label">Nombre Completo</div>
          <div className="resident-field-value">{RESIDENT.name}</div>
        </div>
        <div>
          <div className="resident-field-label">Apartamento / Torre</div>
          <div className="resident-field-value">{RESIDENT.apartment}</div>
        </div>
        <div>
          <div className="resident-field-label">Estado Cuenta</div>
          <div className="resident-field-value green">{RESIDENT.status}</div>
        </div>
      </div>
    </div>
  );
}

function CallInfo({ call }) {
  return (
    <div className="spec-grid" style={{ marginTop: 16 }}>
      <div className="spec-item">
        <div className="spec-label">Convocatoria</div>
        <div className="spec-value">{call.title}</div>
      </div>
      <div className="spec-item">
        <div className="spec-label">Cupos Disponibles</div>
        <div className="spec-value">{call.availableSlots}</div>
      </div>
    </div>
  );
}

function DocumentUpload({
  files,
  fileInputRef,
  dragRef,
  handleDrop,
  handleDragOver,
  handleDragLeave,
  handleFile,
  removeFile,
}) {
  return (
    <div className="sidebar-card">
      <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>
        Documentos Requeridos
      </h2>
      <p
        style={{
          fontSize: 13,
          color: "var(--gray-500)",
          marginBottom: 16,
        }}
      >
        Adjunte su certificado de Paz y Salvo en formato PDF.
      </p>

      <div
        className="upload-zone"
        ref={dragRef}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="upload-icon">☁️</div>
        <div className="upload-title">Cargar Paz y Salvo</div>
        <div className="upload-subtitle">Arrastra o selecciona tu PDF</div>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf"
        style={{ display: "none" }}
        onChange={(e) => {
          const f = e.target.files[0];
          if (f) handleFile(f);
          e.target.value = "";
        }}
      />

      {files.map((f) => (
        <FileItem key={f.id} file={f} onRemove={removeFile} />
      ))}
    </div>
  );
}

function FileItem({ file, onRemove }) {
  if (file.status === "uploading") {
    return (
      <div className="upload-progress">
        <span style={{ fontSize: 18 }}>📄</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>
            {file.name}
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${file.progress}%` }}
            />
          </div>
        </div>
        <span className="progress-text">{file.progress}%</span>
      </div>
    );
  }

  if (file.status === "done") {
    return (
      <div className="uploaded-file">
        <span className="uploaded-file-icon">📄</span>
        <div className="uploaded-file-info">
          <div className="uploaded-file-name">{file.name}</div>
          <div className="uploaded-file-meta">
            {(file.size / 1048576).toFixed(1)} MB · Carga exitosa
          </div>
        </div>
        <button
          className="btn-danger"
          onClick={() => onRemove(file.id)}
          title="Eliminar"
        >
          🗑
        </button>
      </div>
    );
  }

  return (
    <div
      className="upload-progress"
      style={{ borderColor: "var(--red-100)", background: "var(--red-100)" }}
    >
      <span style={{ fontSize: 18 }}>⚠️</span>
      <div style={{ flex: 1, fontSize: 13, color: "var(--red-700)" }}>
        Error al cargar {file.name}
      </div>
      <button className="btn-danger" onClick={() => onRemove(file.id)}>
        Reintentar
      </button>
    </div>
  );
}

function ConfirmationStep({ result, call, files, navigate }) {
  return (
    <div className="page">
      <Stepper current={2} />
      <div className="confirm-layout">
        <div className="form-card">
          <h2>Resumen de la Solicitud</h2>
          <div className="summary-table">
            <SummaryRow
              label="Convocatoria"
              value={result.callTitle || call.title}
            />
            <SummaryRow
              label="Numero de Postulacion"
              value={result.applicationNumber}
              className="teal"
            />
            <SummaryRow
              label="Residente"
              value={result.residentName || RESIDENT.name}
            />
            <SummaryRow
              label="Apartamento"
              value={result.apartmentNumber || RESIDENT.apartment}
            />
            <SummaryRow
              label="Estado"
              value={
                <span
                  className={`badge ${result.status === "PENDING_VALIDATION" ? "badge-soon" : "badge-open"}`}
                >
                  {result.status === "PENDING_VALIDATION"
                    ? "Pendiente Validacion"
                    : result.status}
                </span>
              }
            />
            <SummaryRow
              label="Documento Adjunto"
              value={
                <span className="summary-doc-link">
                  {files.find((f) => f.status === "done")?.name || "N/A"}
                </span>
              }
            />
          </div>
          <div className="warning-box">
            <span className="warning-icon">⚠️</span>
            <div>
              <strong>Compromiso de Pago y Convivencia</strong>
              <br />
              Al enviar la postulacion, acepta el compromiso de pago si es
              seleccionado en el sorteo. Recuerde respetar el reglamento
              interno de copropiedad.
            </div>
          </div>
          <div className="form-actions">
            <button
              className="btn btn-primary"
              onClick={() => navigate("/")}
            >
              Volver al Inicio
            </button>
          </div>
        </div>

        <div className="sidebar-card success-panel">
          <div className="success-icon">✓</div>
          <div className="success-title">Postulacion Exitosa!</div>
          <div className="success-msg">
            Su registro ha sido procesado de manera correcta.
          </div>
          <div className="success-detail">
            <div className="success-detail-label">Numero de Postulacion</div>
            <div className="success-detail-value teal">
              {result.applicationNumber}
            </div>
          </div>
          <div className="success-detail">
            <div className="success-detail-label">Estado Inicial</div>
            <div className="success-detail-value">
              Pendiente{" "}
              <span className="badge badge-soon">Pendiente Validacion</span>
            </div>
          </div>
          <p className="success-note">
            Se enviara una notificacion por correo electronico con los
            resultados tras el sorteo.
          </p>
        </div>
      </div>
    </div>
  );
}

function SummaryRow({ label, value, className }) {
  return (
    <div className="summary-row">
      <span className="summary-label">{label}</span>
      <span className={`summary-value ${className || ""}`}>{value}</span>
    </div>
  );
}
