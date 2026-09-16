// Presentational Component Pattern:
// Renders documents associated with an application.
//
// Single Responsibility Principle:
// Responsible only for document visualization.
export default function ApplicationDocuments({
    documents = [],
}) {
    if (documents.length === 0) {
        return null;
    }

    return (
        <>
            <h2 style={{ marginTop: 24 }}>
                Documentos Adjuntos
            </h2>

            {documents.map((document) => (
                <div
                    key={document.id}
                    className="uploaded-file"
                    style={{ marginTop: 12 }}
                >
                    <span className="uploaded-file-icon">
                        📄
                    </span>

                    <div className="uploaded-file-info">
                        <div className="uploaded-file-name">
                            {document.originalName}
                        </div>

                        <div className="uploaded-file-meta">
                            {(document.size / 1048576).toFixed(1)} MB
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}