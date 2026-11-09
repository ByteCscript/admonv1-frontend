import { StatusBadge } from "../../../../components/UI";

// Presentational Component Pattern:
// Renders application status and its contextual message.
//
// Single Responsibility Principle:
// Centralizes status visualization behavior.
export default function ApplicationStatus({
    status,
    showMessage = false,
    waitlistPosition = null,
}) {
    const messages = {
        REGISTERED:
            "Su postulación fue registrada correctamente y está pendiente de validación.",

        PENDING_VALIDATION:
            "Su postulación está en proceso de validación por la administración.",

        APPROVED:
            "Su postulación ha sido aprobada. Recibirá más instrucciones por correo.",

        REJECTED:
            "Su postulación no fue aprobada. Contacte a administración para más información.",

        CANCELLED:
            "Su postulación fue cancelada. Ya no participa en esta convocatoria.",

        // C.U-08 · resultado del sorteo de cupos (RN-20).
        SELECTED:
            "Su postulación fue seleccionada en el sorteo y obtuvo un cupo de parqueadero.",

        NOT_SELECTED: waitlistPosition
            ? `Su postulación no obtuvo cupo en el sorteo. Está en la posición ${waitlistPosition} de la lista de espera; si un seleccionado renuncia, el cupo se ofrece en ese orden.`
            : "Su postulación no obtuvo cupo en el sorteo y quedó en la lista de espera.",
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