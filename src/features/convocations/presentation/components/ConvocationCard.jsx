// Presentational Component Pattern:
// Component focused solely on visual representation.
//
// Single Responsibility Principle:
// Renders a call for applications and triggers the "view details" action.
export default function ConvocationCard({
    convocation,
    onViewDetails,
}) {
    const isOpen = convocation.availableSlots > 0;

    return (
        <div className="call-card">
            <div className="call-card-body">
                <div className="call-card-meta">
                    <span
                        className={`badge ${isOpen ? "badge-open" : "badge-closed"
                            }`}
                    >
                        {isOpen ? "Abierta" : "Cerrada"}
                    </span>

                    <span className="call-card-slots">
                        👤 {convocation.availableSlots} cupos disponibles
                    </span>
                </div>

                <div className="call-card-title">
                    {convocation.title}
                </div>

                <div className="call-card-footer">
                    <button
                        className="btn-card"
                        disabled={!isOpen}
                        onClick={onViewDetails}
                    >
                        Ver Detalles
                    </button>
                </div>
            </div>
        </div>
    );
}