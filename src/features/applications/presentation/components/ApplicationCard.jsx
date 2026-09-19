import { StatusBadge } from "../../../../components/UI";

// Presentational Component Pattern:
// Renders a single application summary.
//
// Single Responsibility Principle:
// Handles only application list-item visualization.
export default function ApplicationCard({
    application,
    onSelect,
}) {
    return (
        <div
            data-testid={`application-card-${application.id}`}
            className="application-row"
            onClick={onSelect}
        >
            <div className="app-row-main">
                <div className="app-row-number">
                    {application.applicationNumber}
                </div>

                <div className="app-row-call">
                    {application.callTitle}
                </div>
            </div>

            <div className="app-row-meta">
                <span>
                    {application.apartmentNumber}
                </span>

                <span>
                    {new Date(
                        application.createdAt
                    ).toLocaleDateString("es-CO")}
                </span>

                <StatusBadge
                    status={application.status}
                />
            </div>
        </div>
    );
}