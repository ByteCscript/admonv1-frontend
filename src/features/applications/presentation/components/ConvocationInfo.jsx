// Presentational Component Pattern:
// Renders convocation information inside the application flow.
//
// Ubiquitous Language:
// Uses the Convocation domain terminology instead of legacy "Call".
export default function ConvocationInfo({
    convocation,
}) {
    return (
        <div
            className="spec-grid"
            style={{ marginTop: 16 }}
        >
            <div className="spec-item">
                <div className="spec-label">
                    Convocatoria
                </div>

                <div className="spec-value">
                    {convocation.title}
                </div>
            </div>

            <div className="spec-item">
                <div className="spec-label">
                    Cupos Disponibles
                </div>

                <div className="spec-value">
                    {convocation.availableSlots}
                </div>
            </div>
        </div>
    );
}