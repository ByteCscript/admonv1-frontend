import { StatusBadge } from "../../../../components/UI";

// Presentational Component Pattern:
// Renders application status and its contextual message.
//
// Single Responsibility Principle:
// Centralizes status visualization behavior.
export default function ApplicationStatus({
    status,
    showMessage = false,
}) {
    const messages = {
        PENDING_VALIDATION:
            "Su postulación está en proceso de validación por la administración.",

        APPROVED:
            "Su postulación ha sido aprobada. Recibirá más instrucciones por correo.",

        REJECTED:
            "Su postulación no fue aprobada. Contacte a administración para más información.",
    };

    return (
        <>
            <StatusBadge status={status} />

            {showMessage && messages[status] && (
                <p
                    style={{
                        fontSize: 14,
                        color: "var(--gray-500)",
                        marginTop: 12,
                        lineHeight: 1.5,
                    }}
                >
                    {messages[status]}
                </p>
            )}
        </>
    );
}