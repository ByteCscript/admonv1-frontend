import Tooltip from "../../../../components/Tooltip";
import { convocationStatusView } from "../../domain/entities/Convocation";

// Presentational Component Pattern:
// Renders convocation information without infrastructure dependencies.
//
// Single Responsibility Principle:
// Responsible only for convocation detail visualization.
export default function ConvocationInfo({
    convocation,
}) {
    const statusView = convocationStatusView(convocation);

    return (
        <>
            <span className={`badge ${statusView.badgeClass}`}>
                {statusView.label}
            </span>

            <h1
                style={{
                    fontSize: 28,
                    fontWeight: 700,
                    color: "var(--gray-900)",
                    marginTop: 12,
                }}
            >
                {convocation.title}
            </h1>

            <h2>Información de la Convocatoria</h2>

            <div className="spec-grid">
                <div className="spec-item">
                    <div className="spec-label">
                        Cupos
                        <Tooltip text="Número de cupos de parqueadero que se asignarán en esta convocatoria. No cambia al registrar o aprobar postulaciones." />
                    </div>

                    <div className="spec-value">
                        {convocation.totalSlots}
                    </div>
                </div>

                <div className="spec-item">
                    <div className="spec-label">
                        Estado
                        <Tooltip text="Una convocatoria abierta acepta postulaciones hasta su fecha de cierre. Después, los cupos se asignan entre las postulaciones aprobadas: por sorteo si son más que los cupos, o directamente si hay cupos para todas." />
                    </div>

                    <div className="spec-value">
                        {statusView.label}
                    </div>
                </div>
            </div>
        </>
    );
}