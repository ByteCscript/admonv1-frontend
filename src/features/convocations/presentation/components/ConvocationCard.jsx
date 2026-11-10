import {
    canViewConvocationDetails,
    convocationStatusView,
} from "../../domain/entities/Convocation";

// Presentational Component Pattern:
// Component focused solely on visual representation.
//
// Single Responsibility Principle:
// Renders a call for applications and triggers the "view details" action.
export default function ConvocationCard({
    convocation,
    onViewDetails,
}) {
    const statusView = convocationStatusView(convocation);

    return (
        <div className="call-card" data-testid={`convocation-card-${convocation.id}`}>
            <div className="call-card-body">
                <div className="call-card-meta">
                    <span className={`badge ${statusView.badgeClass}`}>
                        {statusView.label}
                    </span>

                    <span className="call-card-slots">
                        👤 {convocation.totalSlots} cupos
                    </span>
                </div>

                <div className="call-card-title">
                    {convocation.title}
                </div>

                <div className="call-card-footer">
                    <button
                        data-testid={`convocation-view-details-button-${convocation.id}`}
                        className="btn-card"
                        disabled={!canViewConvocationDetails(convocation)}
                        onClick={onViewDetails}
                    >
                        Ver Detalles
                    </button>
                </div>
            </div>
        </div>
    );
}