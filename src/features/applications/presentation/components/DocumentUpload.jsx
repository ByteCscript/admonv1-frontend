import { useRef } from "react";

// Presentational Component Pattern:
// Handles document upload user interaction.
export default function DocumentUpload({
    files,
    onUpload,
    onRemove,
}) {
    const fileInputRef = useRef(null);
    const dragRef = useRef(null);

    const handleFile = async (file) => {
        try {
            await onUpload(file);
        } catch (error) {
            if (
                error.message ===
                "Solo se permiten archivos PDF."
            ) {
                alert(error.message);
            }
        }
    };

    const handleDrop = (event) => {
        event.preventDefault();

        dragRef.current?.classList.remove(
            "dragover"
        );

        const file =
            event.dataTransfer.files[0];

        if (file) {
            handleFile(file);
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

            <p
                style={{
                    fontSize: 13,
                    color: "var(--gray-500)",
                    marginBottom: 16,
                }}
            >
                Adjunte su certificado de Paz y Salvo
                en formato PDF.
            </p>

            <div
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
                    Cargar Paz y Salvo
                </div>

                <div className="upload-subtitle">
                    Arrastra o selecciona tu PDF
                </div>
            </div>

            <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                style={{ display: "none" }}
                onChange={(event) => {
                    const file =
                        event.target.files[0];

                    if (file) {
                        handleFile(file);
                    }

                    event.target.value = "";
                }}
            />

            {files.map((file) => (
                <FileItem
                    key={file.id}
                    file={file}
                    onRemove={onRemove}
                />
            ))}
        </div>
    );
}

function FileItem({ file, onRemove }) {
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

    if (file.status === "done") {
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
                    className="btn-danger"
                    onClick={() =>
                        onRemove(file.id)
                    }
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
                Error al cargar {file.name}
            </div>

            <button
                className="btn-danger"
                onClick={() =>
                    onRemove(file.id)
                }
            >
                Eliminar
            </button>
        </div>
    );
}