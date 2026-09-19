import { useRef } from "react";

import Tooltip from "../../../../components/Tooltip";

// Presentational Component Pattern:
// Handles document upload user interaction for a catalog of document types.
export default function DocumentUpload({
    types,
    filesByType,
    onUpload,
    onRemove,
}) {
    return (
        <div className="sidebar-card">
            <h2
                style={{
                    fontSize: 18,
                    fontWeight: 700,
                    marginBottom: 16,
                }}
            >
                Documentos Requeridos
            </h2>

            {types.map((type) => (
                <DocumentTypeBlock
                    key={type.code}
                    type={type}
                    file={filesByType[type.code]}
                    onUpload={onUpload}
                    onRemove={onRemove}
                />
            ))}
        </div>
    );
}

function DocumentTypeBlock({
    type,
    file,
    onUpload,
    onRemove,
}) {
    const fileInputRef = useRef(null);
    const dragRef = useRef(null);

    const tooltipText =
        `Formato: PDF. Tamaño máximo: ${(
            type.maxSizeBytes / 1048576
        ).toFixed(0)} MB. Objetivo: ${type.purpose} ${
            type.required ? "Obligatorio." : "Opcional."
        }`;

    const handleFile = (selectedFile) => {
        onUpload(type.code, selectedFile);
    };

    const handleDrop = (event) => {
        event.preventDefault();

        dragRef.current?.classList.remove(
            "dragover"
        );

        const droppedFile =
            event.dataTransfer.files[0];

        if (droppedFile) {
            handleFile(droppedFile);
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();

        dragRef.current?.classList.add(
            "dragover"
        );
    };

    const handleDragLeave = () => {
        dragRef.current?.classList.remove(
            "dragover"
        );
    };

    return (
        <div className="document-type-block" data-testid={`document-type-block-${type.code}`}>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 8,
                }}
            >
                <span
                    style={{
                        fontSize: 14,
                        fontWeight: 600,
                    }}
                >
                    {type.label}
                </span>

                <span
                    className={`badge ${
                        type.required
                            ? "badge-closed"
                            : "badge-open"
                    }`}
                >
                    {type.required
                        ? "Obligatorio"
                        : "Opcional"}
                </span>

                <Tooltip text={tooltipText} />
            </div>

            {!file || file.status === "error" ? (
                <>
                    <div
                        data-testid={`document-upload-zone-${type.code}`}
                        className="upload-zone"
                        ref={dragRef}
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onClick={() =>
                            fileInputRef.current?.click()
                        }
                    >
                        <div className="upload-icon">
                            ☁️
                        </div>

                        <div className="upload-title">
                            Cargar {type.label}
                        </div>

                        <div className="upload-subtitle">
                            Arrastra o selecciona tu PDF
                        </div>
                    </div>

                    <input
                        data-testid={`document-upload-input-${type.code}`}
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf"
                        style={{ display: "none" }}
                        onChange={(event) => {
                            const selectedFile =
                                event.target.files[0];

                            if (selectedFile) {
                                handleFile(selectedFile);
                            }

                            event.target.value = "";
                        }}
                    />

                    {file?.status === "error" && (
                        <div
                            className="upload-progress"
                            style={{
                                borderColor: "var(--red-100)",
                                background: "var(--red-100)",
                            }}
                        >
                            <span style={{ fontSize: 18 }}>
                                ⚠️
                            </span>

                            <div
                                style={{
                                    flex: 1,
                                    fontSize: 13,
                                    color: "var(--red-700)",
                                }}
                            >
                                {file.message ||
                                    `Error al cargar ${file.name}`}
                            </div>

                            <button
                                data-testid={`document-upload-remove-error-${type.code}`}
                                className="btn-danger"
                                onClick={() =>
                                    onRemove(type.code)
                                }
                            >
                                Eliminar
                            </button>
                        </div>
                    )}
                </>
            ) : (
                <FileItem
                    file={file}
                    typeCode={type.code}
                    onRemove={() => onRemove(type.code)}
                />
            )}
        </div>
    );
}

function FileItem({ file, typeCode, onRemove }) {
    if (file.status === "uploading") {
        return (
            <div className="upload-progress">
                <span style={{ fontSize: 18 }}>
                    📄
                </span>

                <div style={{ flex: 1 }}>
                    <div
                        style={{
                            fontSize: 13,
                            fontWeight: 600,
                            marginBottom: 4,
                        }}
                    >
                        {file.name}
                    </div>

                    <div className="progress-bar">
                        <div
                            className="progress-fill"
                            style={{
                                width: `${file.progress}%`,
                            }}
                        />
                    </div>
                </div>

                <span className="progress-text">
                    {file.progress}%
                </span>
            </div>
        );
    }

    return (
        <div className="uploaded-file">
            <span className="uploaded-file-icon">
                📄
            </span>

            <div className="uploaded-file-info">
                <div className="uploaded-file-name">
                    {file.name}
                </div>

                <div className="uploaded-file-meta">
                    {(file.size / 1048576).toFixed(1)} MB
                    {" · "}
                    Carga exitosa
                </div>
            </div>

            <button
                data-testid={typeCode ? `document-upload-remove-file-${typeCode}` : "document-upload-remove-file"}
                className="btn-danger"
                onClick={onRemove}
                title="Eliminar"
            >
                🗑
            </button>
        </div>
    );
}
